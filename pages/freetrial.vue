<script setup lang="ts">
import {
  firstTimerCards, genreOptions, gradeOptions, services, studioOptions, timeOptions, trialBring, trialFaqs,
  trialClass, trialPhotos, trialPlan, trialSteps, validateTrial, type TrialErrors, type TrialForm,
} from '~/data/trial'
import { site } from '~/data/site'

useSeoMeta({
  title: 'New Here? Free Trial Lesson',
  description: 'Book a free trial lesson at EYS-Kids Dance Academy. See how booking works, what to bring on the day and answers to common questions.',
})

/* ---------- Booking form ---------- */
const blank = (): TrialForm => ({
  childName: '', childKana: '', grade: '', parentName: '', phone: '', email: '',
  studio: '', genre: genreOptions[0], date1: '', time1: '', date2: '', time2: '', notes: '', privacy: false,
})
const form = reactive<TrialForm>(blank())
const touched = reactive<Partial<Record<keyof TrialForm, boolean>>>({})
const serverErrors = ref<TrialErrors>({})
const submitted = ref(false)
const sending = ref(false)
const failure = ref('')
const done = ref<{ id: string, form: TrialForm } | null>(null)
const minDate = ref('')

// Preselection from /courses (?class=) and /pricing (?plan=). Applied after hydration
// because the page is prerendered without the query; unknown ids are ignored.
const route = useRoute()
const query = (k: string) => route.query[k] ?? (import.meta.client ? new URLSearchParams(window.location.search).get(k) : null)
const selectedClass = ref<ReturnType<typeof trialClass>>(null)
const selectedPlan = ref<ReturnType<typeof trialPlan>>(null)
function applySelection() {
  selectedClass.value = trialClass(query('class'))
  selectedPlan.value = trialPlan(query('plan'))
  if (selectedClass.value) {
    form.classId = selectedClass.value.id
    if (selectedClass.value.genre && genreOptions.includes(selectedClass.value.genre)) form.genre = selectedClass.value.genre
    if (selectedClass.value.studio) form.studio = selectedClass.value.studio
  }
  if (selectedPlan.value) form.planId = selectedPlan.value.id
}
const selections = computed(() => [
  ...(selectedClass.value ? [{ key: 'class', label: 'Selected class', title: selectedClass.value.title, detail: selectedClass.value.detail }] : []),
  ...(selectedPlan.value ? [{ key: 'plan', label: 'Selected plan', title: selectedPlan.value.name, detail: selectedPlan.value.detail }] : []),
])
function clearClass() {
  selectedClass.value = null
  form.classId = undefined
}
function clearPlan() {
  selectedPlan.value = null
  form.planId = undefined
}

onMounted(() => {
  const t = new Date(Date.now() + 9 * 3600_000 + 86_400_000) // tomorrow, JST
  minDate.value = t.toISOString().slice(0, 10)
  applySelection()
})
// Nuxt briefly drops the query while hydrating a prerendered page; re-apply once it is back
watch(() => [route.query.class, route.query.plan], (now, before) => {
  if (now.some((v, i) => v !== before[i])) applySelection()
})

const errors = computed<TrialErrors>(() => ({ ...validateTrial(form), ...serverErrors.value }))
const err = (k: keyof TrialForm) => (submitted.value || touched[k]) ? errors.value[k] : undefined
function blur(k: keyof TrialForm) {
  touched[k] = true
}
watch(form, () => { serverErrors.value = {} }, { deep: true })

const formEl = ref<HTMLFormElement | null>(null)
// Honeypot: hidden from people, bots tend to fill it
const website = ref('')
async function submit() {
  submitted.value = true
  failure.value = ''
  if (Object.keys(errors.value).length) {
    await nextTick()
    formEl.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
    return
  }
  sending.value = true
  try {
    const res = await $fetch<{ ok: boolean, id: string }>('/api/trial', { method: 'POST', body: { ...form, website: website.value } })
    done.value = { id: res.id, form: { ...form } }
    await nextTick()
    document.getElementById('trial-done')?.focus()
  }
  catch (e: any) {
    const data = e?.data?.data ?? e?.data
    if (e?.statusCode === 422 && data?.errors) {
      serverErrors.value = data.errors
      await nextTick()
      formEl.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
    }
    else if (e?.statusCode === 429) {
      failure.value = `We've received several submissions in a short time, so booking is paused for now. Please try again in a little while, or book by phone at ${site.phone}.`
    }
    else {
      failure.value = `Sorry, we couldn't send your booking. Please try again later, or book by phone at ${site.phone}.`
    }
  }
  finally {
    sending.value = false
  }
}
function reset() {
  Object.assign(form, blank())
  for (const k in touched) delete touched[k as keyof TrialForm]
  submitted.value = false
  done.value = null
  applySelection()
}

const input = 'block h-12 w-full border bg-white px-4 text-base text-ink transition placeholder:text-ink-mute/70 focus:border-brand-sky focus:outline-none focus:ring-2 focus:ring-brand-sky/30 sm:text-sm'
// 2026-09-30 → Wed, Sep 30, 2026 (the ISO date is a calendar day, so format it in UTC)
const fmtDate = (iso: string) => new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`))
const border = (k: keyof TrialForm) => err(k) ? 'border-brand-coral' : 'border-[#CCCCCC]'

/* ---------- Class preview / FAQ ---------- */
const activeService = ref(services[0].id)
const service = computed(() => services.find(s => s.id === activeService.value)!)
const openFaq = ref<number | null>(0)
</script>

<template>
  <div>
    <!-- Header (stat.png) -->
    <section class="relative pt-10 sm:pt-16" aria-labelledby="trial-title">
      <div class="band absolute inset-x-0 bottom-0 top-20 sm:top-[70px]" aria-hidden="true" />
      <div class="relative text-center">
        <EventSpeechTag text="Dance freely at EYS-Kids!" class="!w-[150px] sm:!w-[190px]" />
        <p class="mt-2 font-display text-[52px] font-light leading-none tracking-[0.08em] text-white sm:text-[80px]" aria-hidden="true">Free Trial</p>
        <h1 id="trial-title" class="mt-5 px-4 text-lg tracking-wide text-ink sm:mt-7 sm:text-2xl">Book a Free Trial Lesson</h1>
      </div>

      <div class="container-x relative mt-8 sm:mt-12">
        <ul class="relative z-10 mx-auto grid max-w-[880px] grid-cols-2 sm:grid-cols-4">
          <li v-for="p in trialPhotos" :key="p.src">
            <img :src="p.src" :alt="p.alt" width="216" height="166" decoding="async" class="aspect-[220/170] w-full object-cover">
          </li>
        </ul>

        <!-- Flow + checklist (card.png) -->
        <div class="-mt-10 bg-paper-light px-4 pb-8 pt-16 [clip-path:polygon(22px_0,calc(100%-22px)_0,100%_22px,100%_100%,0_100%,0_22px)] sm:px-8">
          <div class="grid items-center gap-8 lg:grid-cols-[1fr_340px]">
            <div>
              <h2 class="mx-auto w-fit bg-brand-coral px-8 py-1 text-center text-xs font-medium text-white [clip-path:polygon(10px_0,100%_0,calc(100%-10px)_100%,0_100%)] sm:px-12 sm:text-sm lg:ml-10">From booking to your free trial lesson</h2>
              <ol class="mt-5 grid grid-cols-2 gap-y-4 sm:flex sm:items-center sm:justify-center">
                <template v-for="(s, i) in trialSteps" :key="s.no">
                  <li class="relative mx-auto w-[124px] drop-shadow-card sm:mx-0 sm:w-[112px] lg:w-[104px]">
                    <div class="hex-clip grid aspect-[112/100] place-items-center bg-white text-center">
                      <span>
                        <span class="block font-display text-[10px] font-semibold text-ink">STEP <span class="text-base text-brand-coral">{{ s.no }}</span></span>
                        <span class="mt-0.5 block px-3 text-[10px] leading-tight text-brand-coral sm:text-[11px]">{{ s.text }}</span>
                      </span>
                    </div>
                  </li>
                  <li v-if="i < trialSteps.length - 1" class="hidden h-0 w-0 shrink-0 border-y-[9px] border-l-[12px] border-y-transparent border-l-[#CCCCCC] sm:mx-1 sm:block" aria-hidden="true" />
                </template>
              </ol>
            </div>
            <div class="border border-brand-blue bg-white px-5 py-4">
              <h2 class="flex items-center justify-center gap-3 text-sm font-medium text-brand-blue">
                <Icon name="megaphone" class="h-6 w-6" />What to bring on the day
              </h2>
              <ul class="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-ink sm:grid-cols-3">
                <li v-for="b in trialBring" :key="b" class="flex items-center gap-1.5"><Icon name="check" class="h-3.5 w-3.5 shrink-0 text-brand-blue" />{{ b }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Booking form -->
        <div id="form" class="scroll-mt-24 bg-white px-4 pb-14 pt-12 sm:px-10 md:px-16">
          <div v-if="done" id="trial-done" tabindex="-1" class="mx-auto max-w-[560px] text-center focus:outline-none" role="status">
            <span class="hex-clip mx-auto grid h-16 w-[72px] place-items-center bg-brand-sky text-white"><Icon name="check" class="h-8 w-8" /></span>
            <h2 class="mt-5 text-xl font-medium text-ink sm:text-2xl">We've received your booking</h2>
            <p class="mt-4 text-sm leading-loose text-ink-soft">
              Thank you for booking a free trial lesson, {{ done.form.parentName }}.<br>
              {{ done.form.studio }} will contact you within 2 business days to confirm your trial date.
            </p>
            <dl class="mt-6 grid grid-cols-[120px_1fr] gap-y-2 bg-paper-light px-6 py-5 text-left text-sm">
              <dt class="text-ink-mute">Booking no.</dt><dd class="font-display font-semibold text-ink">{{ done.id }}</dd>
              <dt class="text-ink-mute">Child</dt><dd class="text-ink">{{ done.form.childName }} ({{ done.form.grade }})</dd>
              <dt class="text-ink-mute">1st choice</dt><dd class="text-ink">{{ fmtDate(done.form.date1) }}, {{ done.form.time1 }}</dd>
              <dt class="text-ink-mute">2nd choice</dt><dd class="text-ink">{{ fmtDate(done.form.date2) }}, {{ done.form.time2 }}</dd>
              <template v-if="selectedClass && done.form.classId"><dt class="text-ink-mute">Class</dt><dd class="text-ink">{{ selectedClass.title }}</dd></template>
              <template v-if="selectedPlan && done.form.planId"><dt class="text-ink-mute">Plan</dt><dd class="text-ink">{{ selectedPlan.name }}</dd></template>
            </dl>
            <p class="mt-5 text-xs leading-relaxed text-ink-mute">If you don't receive a confirmation email, please call us at {{ site.phone }}.</p>
            <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <SkewButton to="/" color="sky">Back to Home</SkewButton>
              <button type="button" class="text-sm text-brand-blue underline-offset-4 hover:underline" @click="reset">Book for another child</button>
            </div>
          </div>

          <form v-else ref="formEl" novalidate class="mx-auto max-w-[720px]" aria-labelledby="form-title" @submit.prevent="submit">
            <h2 id="form-title" class="text-center text-xl font-medium text-brand-blue sm:text-2xl">Free Trial Lesson Booking Form</h2>
            <div class="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
              <label>Website<input v-model="website" type="text" name="website" tabindex="-1" autocomplete="off"></label>
            </div>
            <p class="mt-3 text-center text-xs text-ink-soft"><span class="mr-1 bg-brand-coral px-1.5 py-0.5 text-[10px] text-white">Required</span> fields must be filled in.</p>

            <div v-if="selections.length" class="mt-8 space-y-3">
              <div v-for="sel in selections" :key="sel.key" class="flex items-center gap-4 border border-brand-sky bg-[#EEF8FC] px-5 py-3">
                <Icon name="check" class="h-5 w-5 shrink-0 text-brand-sky" />
                <p class="min-w-0 flex-1 text-sm leading-snug">
                  <span class="block text-[11px] text-brand-sky">{{ sel.label }}</span>
                  <span class="font-medium text-ink">{{ sel.title }}</span>
                  <span class="block text-xs text-ink-soft">{{ sel.detail }}</span>
                </p>
                <button type="button" class="min-h-[40px] shrink-0 px-2 text-xs text-ink-mute underline-offset-4 hover:text-brand-coral hover:underline" @click="sel.key === 'class' ? clearClass() : clearPlan()">Remove</button>
              </div>
            </div>

            <fieldset class="mt-10">
              <legend class="w-full border-l-4 border-brand-sky pl-3 text-base font-medium text-ink">About your child</legend>
              <div class="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label for="childName" class="flex items-center gap-2 text-sm text-ink">Child's full name<span class="bg-brand-coral px-1.5 py-0.5 text-[10px] text-white">Required</span></label>
                  <input id="childName" v-model="form.childName" type="text" autocomplete="off" placeholder="e.g. Hana Yamada" :class="[input, border('childName')]" class="mt-2" :aria-invalid="!!err('childName')" :aria-describedby="err('childName') ? 'childName-err' : undefined" @blur="blur('childName')">
                  <p v-if="err('childName')" id="childName-err" class="mt-1.5 text-xs text-brand-coral">{{ err('childName') }}</p>
                </div>
                <div>
                  <label for="childKana" class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink">Nickname<span class="bg-brand-coral px-1.5 py-0.5 text-[10px] text-white">Required</span><span class="text-xs text-ink-mute">What should we call your child?</span></label>
                  <input id="childKana" v-model="form.childKana" type="text" autocomplete="off" maxlength="40" placeholder="e.g. Hana" :class="[input, border('childKana')]" class="mt-2" :aria-invalid="!!err('childKana')" :aria-describedby="err('childKana') ? 'childKana-err' : undefined" @blur="blur('childKana')">
                  <p v-if="err('childKana')" id="childKana-err" class="mt-1.5 text-xs text-brand-coral">{{ err('childKana') }}</p>
                </div>
                <div>
                  <label for="grade" class="flex items-center gap-2 text-sm text-ink">Age / grade<span class="bg-brand-coral px-1.5 py-0.5 text-[10px] text-white">Required</span></label>
                  <div class="relative mt-2">
                    <select id="grade" v-model="form.grade" :class="[input, border('grade')]" class="appearance-none pr-10" :aria-invalid="!!err('grade')" :aria-describedby="err('grade') ? 'grade-err' : undefined" @blur="blur('grade')">
                      <option value="" disabled>Please select</option>
                      <option v-for="g in gradeOptions" :key="g" :value="g">{{ g }}</option>
                    </select>
                    <Icon name="chevron-down" class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" />
                  </div>
                  <p v-if="err('grade')" id="grade-err" class="mt-1.5 text-xs text-brand-coral">{{ err('grade') }}</p>
                </div>
              </div>
            </fieldset>

            <fieldset class="mt-10">
              <legend class="w-full border-l-4 border-brand-sky pl-3 text-base font-medium text-ink">About you (parent/guardian)</legend>
              <div class="mt-5 grid gap-5 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <label for="parentName" class="flex items-center gap-2 text-sm text-ink">Your full name<span class="bg-brand-coral px-1.5 py-0.5 text-[10px] text-white">Required</span></label>
                  <input id="parentName" v-model="form.parentName" type="text" autocomplete="name" placeholder="e.g. Hanako Yamada" :class="[input, border('parentName')]" class="mt-2 sm:max-w-[340px]" :aria-invalid="!!err('parentName')" :aria-describedby="err('parentName') ? 'parentName-err' : undefined" @blur="blur('parentName')">
                  <p v-if="err('parentName')" id="parentName-err" class="mt-1.5 text-xs text-brand-coral">{{ err('parentName') }}</p>
                </div>
                <div>
                  <label for="phone" class="flex items-center gap-2 text-sm text-ink">Phone number<span class="bg-brand-coral px-1.5 py-0.5 text-[10px] text-white">Required</span></label>
                  <input id="phone" v-model="form.phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="e.g. 090-1234-5678" :class="[input, border('phone')]" class="mt-2" :aria-invalid="!!err('phone')" :aria-describedby="err('phone') ? 'phone-err' : undefined" @blur="blur('phone')">
                  <p v-if="err('phone')" id="phone-err" class="mt-1.5 text-xs text-brand-coral">{{ err('phone') }}</p>
                </div>
                <div>
                  <label for="email" class="flex items-center gap-2 text-sm text-ink">Email address<span class="bg-brand-coral px-1.5 py-0.5 text-[10px] text-white">Required</span></label>
                  <input id="email" v-model="form.email" type="email" inputmode="email" autocomplete="email" placeholder="e.g. example@eys-kids.com" :class="[input, border('email')]" class="mt-2" :aria-invalid="!!err('email')" :aria-describedby="err('email') ? 'email-err' : undefined" @blur="blur('email')">
                  <p v-if="err('email')" id="email-err" class="mt-1.5 text-xs text-brand-coral">{{ err('email') }}</p>
                </div>
              </div>
            </fieldset>

            <fieldset class="mt-10">
              <legend class="w-full border-l-4 border-brand-sky pl-3 text-base font-medium text-ink">Your preferences</legend>
              <div class="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label for="studio" class="flex items-center gap-2 text-sm text-ink">Preferred studio<span class="bg-brand-coral px-1.5 py-0.5 text-[10px] text-white">Required</span></label>
                  <div class="relative mt-2">
                    <select id="studio" v-model="form.studio" :class="[input, border('studio')]" class="appearance-none pr-10" :aria-invalid="!!err('studio')" :aria-describedby="err('studio') ? 'studio-err' : undefined" @blur="blur('studio')">
                      <option value="" disabled>Please select</option>
                      <option v-for="s in studioOptions" :key="s" :value="s">{{ s }}</option>
                    </select>
                    <Icon name="chevron-down" class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" />
                  </div>
                  <p v-if="err('studio')" id="studio-err" class="mt-1.5 text-xs text-brand-coral">{{ err('studio') }}</p>
                </div>
                <div>
                  <label for="genre" class="flex items-center gap-2 text-sm text-ink">Preferred genre<span class="bg-ink-mute px-1.5 py-0.5 text-[10px] text-white">Optional</span></label>
                  <div class="relative mt-2">
                    <select id="genre" v-model="form.genre" :class="[input, border('genre')]" class="appearance-none pr-10">
                      <option v-for="g in genreOptions" :key="g" :value="g">{{ g }}</option>
                    </select>
                    <Icon name="chevron-down" class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" />
                  </div>
                </div>

                <div v-for="n in ([1, 2] as const)" :key="n" class="sm:col-span-2">
                  <p :id="`pref${n}-label`" class="flex items-center gap-2 text-sm text-ink">{{ n === 1 ? '1st' : '2nd' }} choice date<span class="bg-brand-coral px-1.5 py-0.5 text-[10px] text-white">Required</span></p>
                  <div class="mt-2 grid gap-3 sm:grid-cols-2" role="group" :aria-labelledby="`pref${n}-label`">
                    <div>
                      <label :for="`date${n}`" class="sr-only">{{ n === 1 ? '1st' : '2nd' }} choice: date</label>
                      <input :id="`date${n}`" v-model="form[`date${n}`]" type="date" :min="minDate || undefined" :class="[input, border(`date${n}`)]" :aria-invalid="!!err(`date${n}`)" :aria-describedby="err(`date${n}`) ? `date${n}-err` : undefined" @blur="blur(`date${n}`)">
                      <p v-if="err(`date${n}`)" :id="`date${n}-err`" class="mt-1.5 text-xs text-brand-coral">{{ err(`date${n}`) }}</p>
                    </div>
                    <div>
                      <label :for="`time${n}`" class="sr-only">{{ n === 1 ? '1st' : '2nd' }} choice: time</label>
                      <div class="relative">
                        <select :id="`time${n}`" v-model="form[`time${n}`]" :class="[input, border(`time${n}`)]" class="appearance-none pr-10" :aria-invalid="!!err(`time${n}`)" :aria-describedby="err(`time${n}`) ? `time${n}-err` : undefined" @blur="blur(`time${n}`)">
                          <option value="" disabled>Select a time</option>
                          <option v-for="t in timeOptions" :key="t" :value="t">{{ t }}</option>
                        </select>
                        <Icon name="chevron-down" class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" />
                      </div>
                      <p v-if="err(`time${n}`)" :id="`time${n}-err`" class="mt-1.5 text-xs text-brand-coral">{{ err(`time${n}`) }}</p>
                    </div>
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label for="notes" class="flex items-center gap-2 text-sm text-ink">Notes<span class="bg-ink-mute px-1.5 py-0.5 text-[10px] text-white">Optional</span></label>
                  <textarea id="notes" v-model="form.notes" rows="4" placeholder="Let us know about any dance experience, siblings joining, or anything we should keep in mind" :class="[input, border('notes')]" class="mt-2 h-auto py-3" :aria-invalid="!!err('notes')" :aria-describedby="err('notes') ? 'notes-err' : undefined" @blur="blur('notes')" />
                  <p v-if="err('notes')" id="notes-err" class="mt-1.5 text-xs text-brand-coral">{{ err('notes') }}</p>
                </div>
              </div>
            </fieldset>

            <div class="mt-10 bg-paper-light px-5 py-5 text-center">
              <p class="text-xs leading-relaxed text-ink-soft">We use your personal information only to arrange your trial lesson and contact you. We never share it with third parties.</p>
              <label class="mt-4 inline-flex min-h-[40px] cursor-pointer items-center gap-3 text-sm text-ink">
                <input v-model="form.privacy" type="checkbox" class="h-5 w-5 accent-brand-sky" :aria-invalid="!!err('privacy')" :aria-describedby="err('privacy') ? 'privacy-err' : undefined" @blur="blur('privacy')">
                I agree to the handling of my personal information
              </label>
              <p v-if="err('privacy')" id="privacy-err" class="mt-1 text-xs text-brand-coral">{{ err('privacy') }}</p>
            </div>

            <p v-if="submitted && Object.keys(errors).length" class="mt-6 text-center text-sm text-brand-coral" role="alert">Some fields need attention. Please check the items marked in red.</p>
            <p v-if="failure" class="mt-6 text-center text-sm text-brand-coral" role="alert">{{ failure }}</p>

            <div class="mt-8 text-center">
              <SkewButton type="submit" color="coral" size="lg" :disabled="sending" class="w-full max-w-[340px]">
                {{ sending ? 'Sending…' : 'Submit Booking' }}
              </SkewButton>
              <p class="mt-4 text-xs text-ink-mute">Book by phone: <a :href="site.phoneHref" class="font-display font-semibold text-brand-blue">{{ site.phone }}</a> (Phone hours {{ site.hours }})</p>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- New to dance classes? (sample.png) -->
    <section class="section" aria-labelledby="first-title">
      <div class="container-x">
        <div class="mx-auto max-w-[510px] bg-band-sky p-[5px] [clip-path:polygon(28px_0,calc(100%-28px)_0,100%_28px,100%_calc(100%-28px),calc(100%-28px)_100%,28px_100%,0_calc(100%-28px),0_28px)]">
          <div class="bg-white p-2 pb-4 [clip-path:polygon(26px_0,calc(100%-26px)_0,100%_26px,100%_calc(100%-26px),calc(100%-26px)_100%,26px_100%,0_calc(100%-26px),0_26px)] sm:p-3 sm:pb-5">
            <div class="grid grid-cols-[1fr_1.2fr_1fr] items-center">
              <img src="/images/trial/friends.webp" alt="Smiling girls" width="200" height="216" loading="lazy" decoding="async" class="aspect-[135/140] w-full object-cover">
              <h2 id="first-title" class="text-center leading-tight">
                <span class="block text-[11px] text-ink sm:text-sm">New to dance classes?</span>
                <span class="mt-1 block text-base font-bold text-brand-blue sm:text-2xl">Start Here</span>
              </h2>
              <img src="/images/trial/sneaker.webp" alt="Feet in dance shoes taking a step" width="172" height="202" loading="lazy" decoding="async" class="aspect-[135/140] w-full object-cover [clip-path:polygon(0_0,82%_0,100%_14%,100%_100%,0_100%)]">
            </div>
            <ul class="mt-3 grid grid-cols-2 gap-3 px-1 sm:gap-4">
              <li v-for="c in firstTimerCards" :key="c.title">
                <ChamferCard size="sm" class="h-full" body-class="flex h-full flex-col [--c:18px]">
                  <img :src="c.image" :alt="c.alt" width="216" height="150" loading="lazy" decoding="async" class="aspect-[228/150] w-full object-cover">
                  <div class="flex flex-1 flex-col items-center px-3 pb-4 pt-3 text-center">
                    <h3 class="text-[13px] font-medium leading-snug text-ink">{{ c.title }}</h3>
                    <p class="mt-1.5 flex-1 text-xs leading-relaxed text-ink-soft">{{ c.text }}</p>
                    <NuxtLink :to="c.to" class="mt-3 inline-flex h-10 w-[125px] -skew-x-[16deg] items-center justify-center border border-brand-sky text-[11px] text-brand-sky transition hover:bg-brand-sky hover:text-white" :aria-label="`Learn more: ${c.title}`">
                      <span class="inline-flex skew-x-[16deg] items-center gap-3">Learn more<Icon name="chevron" class="h-3.5 w-3.5" /></span>
                    </NuxtLink>
                  </div>
                </ChamferCard>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Take a peek at our classes! (info.png) -->
    <section class="pb-14 md:pb-20" aria-labelledby="peek-title">
      <div class="container-x">
        <div class="relative mx-auto flex max-w-[420px] items-end justify-center">
          <div class="relative grid h-44 w-48 shrink-0 place-items-center sm:h-52 sm:w-56">
            <svg class="absolute inset-0 h-full w-full" viewBox="0 0 220 210" aria-hidden="true">
              <path d="M110 8 212 82 173 202H47L8 82Z" fill="#F8EEFF" stroke="#F3E3FF" stroke-width="16" stroke-linejoin="round" />
            </svg>
            <h2 id="peek-title" class="relative -rotate-6 text-center text-lg leading-relaxed text-ink-soft sm:text-xl">Take a peek<br>at our classes!</h2>
          </div>
          <img src="/images/trial/boy.webp" alt="A smiling boy" width="146" height="192" loading="lazy" decoding="async" class="-ml-8 h-40 w-auto sm:h-48">
        </div>
      </div>
      <div class="border-t border-paper pt-6">
        <div class="container-wide">
          <h3 class="text-center text-base text-ink">EYS Services</h3>
          <div class="mt-4 flex snap-x gap-3 overflow-x-auto px-1 pb-3 md:justify-center" role="tablist" aria-label="EYS services">
            <button v-for="s in services" :id="`svc-tab-${s.id}`" :key="s.id" type="button" role="tab" :aria-selected="activeService === s.id" :aria-controls="`svc-panel`" class="relative w-[128px] shrink-0 snap-start rounded-lg px-2 pb-2 pt-3 text-center shadow-[0_2px_8px_rgba(0,0,0,.08)] transition" :class="activeService === s.id ? 'bg-brand-purple text-white' : 'bg-white text-ink hover:bg-paper-light'" @click="activeService = s.id">
              <span class="block font-display text-[11px] font-semibold leading-tight" :style="activeService === s.id ? {} : { color: s.color }">{{ s.name }}</span>
              <span class="mt-2 block border-t pt-1.5 text-[10px]" :class="activeService === s.id ? 'border-white/40' : 'border-paper'">{{ s.label }}</span>
              <Icon v-if="activeService === s.id" name="check" class="absolute right-1.5 top-1.5 h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <p class="mt-2 flex items-center justify-center gap-3 bg-paper-light py-2 text-center text-xs text-ink-soft">
          <svg viewBox="0 0 24 24" class="h-5 w-5 text-brand-sky" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M3 4h18l-7 8v7l-4 2v-9Z" /></svg>
          Tap a panel above to see that service's classes
        </p>
        <div id="svc-panel" role="tabpanel" :aria-labelledby="`svc-tab-${activeService}`" class="container-x mt-6">
          <ul class="grid gap-3 sm:grid-cols-2">
            <li v-for="c in service.classes" :key="c.name" class="flex items-center gap-4 border-l-4 bg-white px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,.08)]" :style="{ borderColor: service.color }">
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-ink">{{ c.name }}</p>
                <p class="mt-0.5 text-xs text-ink-soft">{{ c.target }}, {{ c.day }}</p>
              </div>
              <a href="#form" class="shrink-0 text-xs text-brand-sky hover:underline">Try it</a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section bg-paper" aria-labelledby="faq-title">
      <div class="container-x max-w-[800px]">
        <SectionHeading en="Q&A" title="FAQ" />
        <dl class="mt-10 space-y-3">
          <div v-for="(f, i) in trialFaqs" :key="i" class="bg-white shadow-[0_1px_4px_rgba(0,0,0,.06)]">
            <dt>
              <button :id="`faq-q-${i}`" type="button" class="flex min-h-[56px] w-full items-center gap-4 px-5 py-3 text-left text-sm font-medium text-ink transition hover:text-brand-blue" :aria-expanded="openFaq === i" :aria-controls="`faq-a-${i}`" @click="openFaq = openFaq === i ? null : i">
                <span class="font-display text-lg font-semibold text-brand-sky" aria-hidden="true">Q</span>
                <span class="flex-1">{{ f.q }}</span>
                <Icon :name="openFaq === i ? 'minus' : 'plus'" class="h-4 w-4 shrink-0 text-brand-sky" />
              </button>
            </dt>
            <dd :id="`faq-a-${i}`" role="region" :aria-labelledby="`faq-q-${i}`" class="grid transition-[grid-template-rows] duration-300" :class="openFaq === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
              <div class="overflow-hidden" :inert="openFaq !== i || undefined">
                <p class="flex gap-4 border-t border-paper px-5 py-4 text-sm leading-relaxed text-ink-soft">
                  <span class="font-display text-lg font-semibold leading-none text-brand-coral" aria-hidden="true">A</span>{{ f.a }}
                </p>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <CampaignBanner />
  </div>
</template>
