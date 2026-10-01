<script setup lang="ts">
import { site } from '~/data/site'
import { inquiryTypes, validateInquiry, type InquiryErrors, type InquiryForm } from '~/data/contact'
import { naira, type SponsorPackage } from '~/data/support'

// Contact form for parents, schools and brands (adults only). Posts to /api/contact.
const props = withDefaults(defineProps<{
  defaultType?: InquiryForm['type']
  defaultPackage?: string
}>(), { defaultType: '', defaultPackage: '' })

const uid = useId()
const { data: support } = useFetch<{ packages: SponsorPackage[] }>('/api/support', { key: 'support-info' })
const packages = computed(() => support.value?.packages ?? [])

const blank = (): InquiryForm => ({ type: props.defaultType, name: '', email: '', organization: '', package: props.defaultPackage, message: '', adult: false })
const form = reactive<InquiryForm>(blank())
watch(() => [props.defaultType, props.defaultPackage], () => {
  if (props.defaultType) form.type = props.defaultType
  form.package = props.defaultPackage
})
watch(() => form.type, (t) => { if (t !== 'brand') form.package = '' })

const website = ref('') // honeypot
const touched = reactive<Partial<Record<keyof InquiryForm, boolean>>>({})
const submitted = ref(false)
const serverErrors = ref<InquiryErrors>({})
const sending = ref(false)
const done = ref<string | null>(null)
const failure = ref('')
const formEl = ref<HTMLFormElement | null>(null)
const doneEl = ref<HTMLElement | null>(null)

const errors = computed(() => ({ ...validateInquiry(form), ...serverErrors.value }))
const show = (k: keyof InquiryForm) => (submitted.value || touched[k]) ? errors.value[k] : undefined
watch(form, () => { serverErrors.value = {} })

async function focusFirstError() {
  await nextTick()
  formEl.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
}

async function submit() {
  submitted.value = true
  failure.value = ''
  if (Object.keys(validateInquiry(form)).length) return focusFirstError()
  sending.value = true
  try {
    const res = await $fetch<{ ok: boolean, id: string }>('/api/contact', { method: 'POST', body: { ...form, website: website.value } })
    done.value = res.id
    await nextTick()
    doneEl.value?.focus()
  }
  catch (e: any) {
    const data = e?.data?.data ?? e?.data
    if (e?.statusCode === 422 && data?.errors) {
      serverErrors.value = data.errors
      focusFirstError()
    }
    else if (e?.statusCode === 429) failure.value = 'You\'ve sent a few messages in a row. Please wait a little and try again.'
    else if (e?.statusCode === 503) failure.value = `Our message service is taking a short break. Please email us at ${site.email} instead.`
    else failure.value = `Sorry, your message didn't go through. Please email us at ${site.email}.`
  }
  finally {
    sending.value = false
  }
}
function reset() {
  Object.assign(form, blank())
  for (const k in touched) delete touched[k as keyof InquiryForm]
  submitted.value = false
  done.value = null
}

const id = (k: string) => `${uid}-${k}`
const field = 'mt-1.5 block min-h-[48px] w-full rounded-lg border-2 bg-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-ink-mute/70 focus:border-brand-sky focus:ring-4 focus:ring-brand-sky/15'
const cls = (k: keyof InquiryForm) => [field, show(k) ? 'border-brand-coral' : 'border-ink/15']
const labelCls = 'font-display text-base font-semibold text-ink'
const errCls = 'mt-1.5 block text-sm font-bold text-brand-coral'
</script>

<template>
  <ChamferCard size="lg" body-class="px-5 py-7 sm:px-9 sm:py-9">
    <div v-if="done" ref="doneEl" class="py-8 text-center outline-none" role="status" tabindex="-1">
      <span class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-green text-white"><Icon name="check" class="h-8 w-8" /></span>
      <h3 class="mt-4 text-2xl font-bold text-ink">Thank you! Message sent.</h3>
      <p class="mt-2 text-ink-soft">We'll reply to you by email soon. Your reference is <strong class="text-ink">{{ done }}</strong>.</p>
      <SkewButton color="sky" class="mt-6" @click="reset">Send another message</SkewButton>
    </div>

    <form v-else ref="formEl" novalidate class="relative grid gap-5" @submit.prevent="submit">
      <div class="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label>Website<input v-model="website" type="text" name="website" tabindex="-1" autocomplete="off"></label>
      </div>

      <fieldset :aria-describedby="show('type') ? id('type-err') : undefined">
        <legend :class="labelCls">What is this about?</legend>
        <div class="mt-2 grid gap-2 sm:grid-cols-2">
          <label
            v-for="t in inquiryTypes" :key="t.id"
            class="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-2.5 transition focus-within:ring-4 focus-within:ring-brand-sky/15"
            :class="form.type === t.id ? 'border-brand-sky bg-band-ice' : 'border-ink/15 bg-white hover:border-brand-sky/50'"
          >
            <input v-model="form.type" type="radio" name="type" :value="t.id" class="h-4 w-4 shrink-0 accent-brand-sky" :aria-invalid="!!show('type')" @change="touched.type = true">
            <span class="text-sm font-bold text-ink">{{ t.label }}</span>
          </label>
        </div>
        <p v-if="show('type')" :id="id('type-err')" :class="errCls">{{ show('type') }}</p>
      </fieldset>

      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label :for="id('name')" :class="labelCls">Your name</label>
          <input :id="id('name')" v-model="form.name" type="text" autocomplete="name" :class="cls('name')" :aria-invalid="!!show('name')" :aria-describedby="show('name') ? id('name-err') : undefined" @blur="touched.name = true">
          <span v-if="show('name')" :id="id('name-err')" :class="errCls">{{ show('name') }}</span>
        </div>
        <div>
          <label :for="id('email')" :class="labelCls">Email</label>
          <input :id="id('email')" v-model="form.email" type="email" autocomplete="email" inputmode="email" :class="cls('email')" :aria-invalid="!!show('email')" :aria-describedby="show('email') ? id('email-err') : undefined" @blur="touched.email = true">
          <span v-if="show('email')" :id="id('email-err')" :class="errCls">{{ show('email') }}</span>
        </div>
      </div>

      <div class="grid gap-5" :class="form.type === 'brand' && packages.length ? 'sm:grid-cols-2' : ''">
        <div>
          <label :for="id('org')" :class="labelCls">School, brand or organization <span class="font-sans text-sm font-normal text-ink-mute">(optional)</span></label>
          <input :id="id('org')" v-model="form.organization" type="text" autocomplete="organization" :class="cls('organization')" :aria-invalid="!!show('organization')" :aria-describedby="show('organization') ? id('org-err') : undefined" @blur="touched.organization = true">
          <span v-if="show('organization')" :id="id('org-err')" :class="errCls">{{ show('organization') }}</span>
        </div>
        <div v-if="form.type === 'brand' && packages.length">
          <label :for="id('package')" :class="labelCls">Package <span class="font-sans text-sm font-normal text-ink-mute">(optional)</span></label>
          <select :id="id('package')" v-model="form.package" :class="[cls('package'), 'appearance-auto']" :aria-invalid="!!show('package')" :aria-describedby="show('package') ? id('package-err') : undefined">
            <option value="">Not sure yet</option>
            <option v-for="p in packages" :key="p.id" :value="p.id">{{ p.name }} (from {{ naira(p.from) }})</option>
          </select>
          <span v-if="show('package')" :id="id('package-err')" :class="errCls">{{ show('package') }}</span>
        </div>
      </div>

      <div>
        <label :for="id('message')" :class="labelCls">Message</label>
        <textarea :id="id('message')" v-model="form.message" rows="5" :class="cls('message')" :aria-invalid="!!show('message')" :aria-describedby="show('message') ? id('message-err') : undefined" placeholder="Tell us a little about what you have in mind" @blur="touched.message = true" />
        <span v-if="show('message')" :id="id('message-err')" :class="errCls">{{ show('message') }}</span>
      </div>

      <div>
        <label class="flex cursor-pointer items-start gap-3 rounded-lg bg-paper-light px-4 py-3 ring-1 ring-ink/10 focus-within:ring-4 focus-within:ring-brand-sky/20">
          <input v-model="form.adult" type="checkbox" class="mt-0.5 h-5 w-5 shrink-0 accent-brand-green" :aria-invalid="!!show('adult')" :aria-describedby="show('adult') ? id('adult-err') : undefined" @change="touched.adult = true">
          <span class="text-sm text-ink"><strong>I'm 18 or older.</strong> <span class="text-ink-soft">This form is for grown-ups only. Please don't include any child's personal details.</span></span>
        </label>
        <p v-if="show('adult')" :id="id('adult-err')" :class="errCls">{{ show('adult') }}</p>
      </div>

      <p v-if="failure" class="rounded-lg bg-brand-coral/10 px-4 py-3 text-sm font-bold text-brand-coral" role="alert">{{ failure }}</p>
      <div class="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-xs text-ink-mute">We only use your details to reply. See our <NuxtLink to="/privacy" class="font-bold text-brand-sky underline-offset-2 hover:underline">privacy policy</NuxtLink>.</p>
        <SkewButton type="submit" color="coral" size="lg" :disabled="sending" class="w-full sm:w-auto">
          {{ sending ? 'Sending…' : 'Send message' }}
        </SkewButton>
      </div>
    </form>
  </ChamferCard>
</template>
