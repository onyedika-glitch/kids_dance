<script setup lang="ts">
import { site } from '~/data/site'
import { naira, otherWays, supportReasons, type SponsorPackage } from '~/data/support'

useSeoMeta({
  title: 'Support Us',
  description: 'Help keep Tiny Explorers Hub free for every family. Give a one-off gift with Paystack, sponsor a letter of our ABC Adventure, or share us with a friend.',
})

interface SupportInfo { enabled: boolean, amounts: number[], min: number, max: number, packages: SponsorPackage[] }
const { data } = await useFetch<SupportInfo>('/api/support', { key: 'support-info' })
const enabled = computed(() => !!data.value?.enabled)
const amounts = computed(() => data.value?.amounts ?? [])
const min = computed(() => data.value?.min ?? 100)
const max = computed(() => data.value?.max ?? 5_000_000)
const packages = computed(() => data.value?.packages ?? [])

const { public: { siteUrl } } = useRuntimeConfig()
const shareText = `Tiny Explorers Hub: cheerful 10-second learning videos for toddlers and preschoolers. ABCs, animals, songs and more. ${siteUrl || ''}`.trim()
const wayHref: Record<string, string> = {
  facebook: site.facebook,
  youtube: site.youtubeSubscribe,
  whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
}
const wayColor: Record<string, string> = { facebook: 'bg-brand-sky', youtube: 'bg-brand-coral', whatsapp: 'bg-brand-green' }

// Gift form
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const choice = ref<number | 'custom'>(2000)
const custom = ref('')
const form = reactive({ email: '', name: '', message: '', adult: false })
const touched = reactive<Record<string, boolean>>({})
const submitted = ref(false)
const sending = ref(false)
const failure = ref('')
const serverErrors = ref<Record<string, string>>({})
const formEl = ref<HTMLFormElement | null>(null)

const amount = computed(() => choice.value === 'custom' ? Number(custom.value.replace(/[,\s₦]/g, '')) : choice.value)
const localErrors = computed(() => {
  const e: Record<string, string> = {}
  const a = amount.value
  if (!Number.isInteger(a) || a < min.value || a > max.value) e.amount = choice.value === 'custom' && !custom.value ? 'Please enter an amount' : `Please choose a whole amount between ${naira(min.value)} and ${naira(max.value)}`
  if (!form.email.trim()) e.email = 'Please enter your email for the receipt'
  else if (!EMAIL.test(form.email.trim())) e.email = 'That email doesn\'t look quite right'
  if (form.name.trim().length > 80) e.name = 'Please keep your name under 80 characters'
  if (form.message.trim().length > 500) e.message = 'Please keep your message under 500 characters'
  if (!form.adult) e.adult = 'Please confirm you are 18 or older'
  return e
})
const errors = computed(() => ({ ...localErrors.value, ...serverErrors.value }))
const show = (k: string) => (submitted.value || touched[k]) ? errors.value[k] : undefined
watch([form, choice, custom], () => { serverErrors.value = {} })

async function focusFirstError() {
  await nextTick()
  formEl.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
}

async function give() {
  submitted.value = true
  failure.value = ''
  if (!enabled.value) return
  if (Object.keys(localErrors.value).length) return focusFirstError()
  sending.value = true
  try {
    const res = await $fetch<{ url: string, reference: string }>('/api/support/initialize', {
      method: 'POST',
      body: { amount: amount.value, email: form.email.trim(), name: form.name.trim() || undefined, message: form.message.trim() || undefined, adult: true },
    })
    window.location.href = res.url
  }
  catch (e: any) {
    sending.value = false
    const d = e?.data?.data ?? e?.data
    if (e?.statusCode === 422 && d?.errors) {
      serverErrors.value = d.errors
      focusFirstError()
    }
    else if (e?.statusCode === 429) failure.value = 'Too many tries in a row. Please wait a few minutes and try again.'
    else if (e?.statusCode === 503) failure.value = `Online giving isn't available right now. Please email us at ${site.email} and we'll help.`
    else failure.value = `Sorry, we couldn't reach Paystack. Please try again, or email us at ${site.email}.`
  }
}

const field = 'mt-1.5 block min-h-[48px] w-full rounded-lg border-2 bg-white px-4 py-3 text-base text-ink outline-none transition placeholder:text-ink-mute/70 focus:border-brand-sky focus:ring-4 focus:ring-brand-sky/15 disabled:bg-paper-light disabled:text-ink-mute'
const cls = (k: string) => [field, show(k) ? 'border-brand-coral' : 'border-ink/15']
const labelCls = 'font-display text-base font-semibold text-ink'
const errCls = 'mt-1.5 block text-sm font-bold text-brand-coral'
const buttonLabel = computed(() => {
  if (sending.value) return 'Opening Paystack…'
  const a = amount.value
  return Number.isInteger(a) && a >= min.value && a <= max.value ? `Give ${naira(a)} with Paystack` : 'Give with Paystack'
})
</script>

<template>
  <div>
    <PageHero en="SUPPORT" title="Help keep tiny adventures free for every family" image="/images/posters/happy-new-week.webp" alt="Three smiling children waving in a sunny park" :crumbs="[{ label: 'Support Us' }]" />

    <!-- Why it matters -->
    <section class="section bg-paper-light" aria-labelledby="why-title">
      <div class="container-x">
        <div class="mx-auto max-w-2xl text-center">
          <h2 id="why-title" class="text-3xl font-bold text-ink sm:text-4xl">Why your support matters</h2>
          <p class="mt-4 leading-relaxed text-ink-soft">
            Tiny Explorers Hub is a small, family-run channel. Every short video takes time to plan, make and edit.
            A little support from grown-ups like you keeps it going.
          </p>
        </div>
        <ul class="mt-10 grid gap-5 md:grid-cols-3">
          <li v-for="r in supportReasons" :key="r.title">
            <ChamferCard size="sm" class="h-full" body-class="p-6">
              <span class="grid h-12 w-12 place-items-center rounded-xl text-white" :style="{ backgroundColor: r.color }"><Icon :name="r.icon" class="h-6 w-6" /></span>
              <h3 class="mt-4 text-xl font-semibold text-ink">{{ r.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ r.text }}</p>
            </ChamferCard>
          </li>
        </ul>
      </div>
    </section>

    <!-- One-off gift -->
    <section id="give" class="section band scroll-mt-24" aria-labelledby="give-title">
      <div class="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div class="lg:sticky lg:top-28">
          <p class="font-display text-sm font-semibold uppercase tracking-widest text-brand-orange">One-off gift</p>
          <h2 id="give-title" class="mt-2 text-3xl font-bold text-ink sm:text-4xl">Give a little, help a lot</h2>
          <p class="mt-4 leading-relaxed text-ink-soft">
            Pick an amount and pay safely with Paystack. You'll get an email receipt.
          </p>
          <ul class="mt-6 space-y-3 text-sm text-ink">
            <li class="flex gap-3"><Icon name="shield" class="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />Payments are handled by Paystack. We never see your card details.</li>
            <li class="flex gap-3"><Icon name="check" class="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />We keep only your email, the amount and the payment reference.</li>
            <li class="flex gap-3"><Icon name="heart" class="mt-0.5 h-5 w-5 shrink-0 text-brand-coral" />Your gift goes towards new letters, animals and songs.</li>
          </ul>
        </div>

        <ChamferCard size="lg" body-class="px-5 py-7 sm:px-9 sm:py-9">
          <div v-if="!enabled" class="mb-6 flex gap-3 rounded-lg bg-brand-yellow/20 px-4 py-3 text-sm text-ink ring-1 ring-brand-yellow" role="note">
            <Icon name="clock" class="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
            <p><strong>Online giving is coming soon — email us.</strong> Want to help today? Write to <a :href="`mailto:${site.email}?subject=${encodeURIComponent('Supporting Tiny Explorers Hub')}`" class="[overflow-wrap:anywhere] font-bold text-brand-sky underline underline-offset-2">{{ site.email }}</a> and we'll send you the details.</p>
          </div>

          <form ref="formEl" novalidate @submit.prevent="give">
            <fieldset :disabled="!enabled || sending" class="grid gap-5" :class="{ 'opacity-60': !enabled }">
              <fieldset :aria-describedby="show('amount') ? 'amount-err' : undefined">
                <legend :class="labelCls">Choose an amount</legend>
                <div class="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <label
                    v-for="a in amounts" :key="a"
                    class="flex min-h-[52px] cursor-pointer items-center justify-center rounded-lg border-2 font-display text-lg font-semibold transition focus-within:ring-4 focus-within:ring-brand-sky/20"
                    :class="choice === a ? 'border-brand-sky bg-brand-sky text-white' : 'border-ink/15 bg-white text-ink hover:border-brand-sky/60'"
                  >
                    <input v-model="choice" type="radio" name="amount" :value="a" class="sr-only">{{ naira(a) }}
                  </label>
                  <label
                    class="col-span-2 flex min-h-[52px] cursor-pointer items-center justify-center rounded-lg border-2 font-display text-lg font-semibold transition focus-within:ring-4 focus-within:ring-brand-sky/20 sm:col-span-1"
                    :class="choice === 'custom' ? 'border-brand-sky bg-brand-sky text-white' : 'border-ink/15 bg-white text-ink hover:border-brand-sky/60'"
                  >
                    <input v-model="choice" type="radio" name="amount" value="custom" class="sr-only" :aria-invalid="choice !== 'custom' && !!show('amount')">Other
                  </label>
                </div>
                <div v-if="choice === 'custom'" class="mt-3">
                  <label for="gift-custom" class="text-sm font-bold text-ink">Your amount in naira</label>
                  <div class="relative">
                    <span class="pointer-events-none absolute left-4 top-1/2 mt-[3px] -translate-y-1/2 font-bold text-ink-mute" aria-hidden="true">₦</span>
                    <input id="gift-custom" v-model="custom" type="text" inputmode="numeric" autocomplete="off" :placeholder="`${min.toLocaleString('en-US')} or more`" :class="[cls('amount'), 'pl-9']" :aria-invalid="!!show('amount')" :aria-describedby="show('amount') ? 'amount-err' : undefined" @blur="touched.amount = true">
                  </div>
                </div>
                <p v-if="show('amount')" id="amount-err" :class="errCls">{{ show('amount') }}</p>
              </fieldset>

              <div>
                <label for="gift-email" :class="labelCls">Email for your receipt</label>
                <input id="gift-email" v-model="form.email" type="email" autocomplete="email" inputmode="email" :class="cls('email')" :aria-invalid="!!show('email')" :aria-describedby="show('email') ? 'email-err' : undefined" @blur="touched.email = true">
                <span v-if="show('email')" id="email-err" :class="errCls">{{ show('email') }}</span>
              </div>

              <div>
                <label for="gift-name" :class="labelCls">Your name <span class="font-sans text-sm font-normal text-ink-mute">(optional)</span></label>
                <input id="gift-name" v-model="form.name" type="text" autocomplete="name" :class="cls('name')" :aria-invalid="!!show('name')" :aria-describedby="show('name') ? 'name-err' : undefined" @blur="touched.name = true">
                <span v-if="show('name')" id="name-err" :class="errCls">{{ show('name') }}</span>
              </div>

              <div>
                <label for="gift-message" :class="labelCls">A note for the team <span class="font-sans text-sm font-normal text-ink-mute">(optional)</span></label>
                <textarea id="gift-message" v-model="form.message" rows="3" maxlength="500" :class="cls('message')" :aria-invalid="!!show('message')" :aria-describedby="show('message') ? 'message-err' : undefined" placeholder="Which letter should we make next?" @blur="touched.message = true" />
                <span v-if="show('message')" id="message-err" :class="errCls">{{ show('message') }}</span>
              </div>

              <div>
                <label class="flex cursor-pointer items-start gap-3 rounded-lg bg-paper-light px-4 py-3 ring-1 ring-ink/10 focus-within:ring-4 focus-within:ring-brand-sky/20">
                  <input v-model="form.adult" type="checkbox" class="mt-0.5 h-5 w-5 shrink-0 accent-brand-green" :aria-invalid="!!show('adult')" :aria-describedby="show('adult') ? 'adult-err' : undefined" @change="touched.adult = true">
                  <span class="text-sm text-ink"><strong>I'm 18 or older.</strong> <span class="text-ink-soft">Gifts can only be made by grown-ups.</span></span>
                </label>
                <p v-if="show('adult')" id="adult-err" :class="errCls">{{ show('adult') }}</p>
              </div>

              <p v-if="failure" class="rounded-lg bg-brand-coral/10 px-4 py-3 text-sm font-bold text-brand-coral" role="alert">{{ failure }}</p>

              <SkewButton type="submit" color="coral" size="lg" :disabled="!enabled || sending" class="w-full">{{ buttonLabel }}</SkewButton>
              <p class="-mt-2 text-center text-xs text-ink-mute">You'll be taken to Paystack's secure checkout, then brought back here.</p>
            </fieldset>
          </form>
        </ChamferCard>
      </div>
    </section>

    <!-- Sponsorship -->
    <section class="section bg-paper-light" aria-labelledby="sponsor-title">
      <div class="container-x">
        <div class="mx-auto max-w-2xl text-center">
          <p class="font-display text-sm font-semibold uppercase tracking-widest text-brand-orange">For brands &amp; businesses</p>
          <h2 id="sponsor-title" class="mt-2 text-3xl font-bold text-ink sm:text-4xl">Sponsor a tiny adventure</h2>
          <p class="mt-4 leading-relaxed text-ink-soft">Put your name next to something parents are happy to share. Sponsored videos are always clearly labelled.</p>
        </div>

        <ul class="mt-12 grid gap-6 md:grid-cols-3 md:items-stretch">
          <li v-for="p in packages" :key="p.id" class="relative" :class="p.popular ? 'md:-mt-3' : ''">
            <span v-if="p.popular" class="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-yellow px-4 py-1 font-display text-sm font-semibold text-ink shadow-pop">Most popular</span>
            <ChamferCard size="md" class="h-full" :body-class="['flex flex-col p-6 sm:p-7', p.popular ? 'ring-4 ring-inset ring-brand-yellow' : ''].join(' ')">
              <h3 class="text-2xl font-semibold text-ink" :class="p.popular ? 'mt-2' : ''">{{ p.name }}</h3>
              <p class="mt-3">
                <span class="block text-xs font-bold uppercase tracking-wider text-ink-mute">Starting from</span>
                <span class="font-display text-3xl font-bold text-brand-sky">{{ naira(p.from) }}</span>
              </p>
              <p class="mt-3 text-sm leading-relaxed text-ink-soft">{{ p.blurb }}</p>
              <ul class="mt-5 space-y-2.5 text-sm text-ink">
                <li v-for="i in p.includes" :key="i" class="flex gap-2.5"><Icon name="check" class="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />{{ i }}</li>
              </ul>
              <div class="mt-auto pt-7">
                <SkewButton :to="`/work-with-us?package=${p.id}`" :color="p.popular ? 'coral' : 'sky'" class="w-full">Ask about this package<span class="sr-only">: {{ p.name }}</span></SkewButton>
              </div>
            </ChamferCard>
          </li>
        </ul>
        <p class="mt-8 text-center text-xs text-ink-mute">Prices are starting points. We'll send a final quote once we know what you have in mind.</p>
        <p class="mt-3 text-center text-sm"><NuxtLink to="/work-with-us" class="inline-flex min-h-[40px] items-center gap-1 font-bold text-brand-sky hover:underline">See all the ways to work with us<Icon name="chevron" class="h-3.5 w-3.5" /></NuxtLink></p>
      </div>
    </section>

    <!-- Other ways -->
    <section class="section band-warm" aria-labelledby="other-title">
      <div class="container-x">
        <h2 id="other-title" class="text-center text-3xl font-bold text-ink sm:text-4xl">Other ways to help, for free</h2>
        <p class="mx-auto mt-3 max-w-xl text-center text-ink">Every follow, subscribe and share helps another family find us.</p>
        <ul class="mt-10 grid gap-4 sm:grid-cols-3">
          <li v-for="w in otherWays" :key="w.key">
            <a :href="wayHref[w.key]" target="_blank" rel="noopener" class="group block h-full drop-shadow-card focus-visible:outline-none">
              <span class="chamfer chamfer-sm flex h-full items-center gap-4 bg-white p-5 transition group-hover:-translate-y-0.5 group-focus-visible:ring-4 group-focus-visible:ring-ink">
                <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white" :class="wayColor[w.key]"><Icon :name="w.icon" class="h-6 w-6" /></span>
                <span>
                  <span class="block font-display text-lg font-semibold text-ink">{{ w.title }}</span>
                  <span class="block text-sm text-ink-soft">{{ w.text }}</span>
                  <span class="sr-only">(opens in a new tab)</span>
                </span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
