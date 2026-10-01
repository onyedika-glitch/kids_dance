<script setup lang="ts">
import { site } from '~/data/site'

useSeoMeta({
  title: 'Thank You',
  description: 'Confirming your gift to Tiny Explorers Hub.',
  robots: 'noindex',
})

// Paystack sends ?reference= (and ?trxref=). The status always comes from /api/support/verify, never from the URL.
const route = useRoute()
const reference = computed(() => {
  const r = route.query.reference ?? route.query.trxref
  const v = String(Array.isArray(r) ? r[0] : r ?? '').trim()
  return /^[A-Z0-9-]{8,60}$/i.test(v) ? v : ''
})

const { data, status: fetchStatus, error, refresh } = await useFetch<{ status: 'success' | 'pending' | 'failed' | 'abandoned', amount: number, currency: string }>('/api/support/verify', {
  query: { reference },
  immediate: !!reference.value,
  server: false,
})

const state = computed(() => {
  if (!reference.value) return 'missing'
  if (fetchStatus.value === 'pending' || fetchStatus.value === 'idle') return 'checking'
  if (error.value) return 'unknown'
  const s = data.value?.status
  if (s === 'success') return 'success'
  if (s === 'failed' || s === 'abandoned') return 'failed'
  return 'pending'
})
const amountText = computed(() => {
  const d = data.value
  if (!d?.amount) return ''
  try { return new Intl.NumberFormat('en-NG', { style: 'currency', currency: d.currency || 'NGN', maximumFractionDigits: 0 }).format(d.amount) }
  catch { return `₦${d.amount.toLocaleString('en-US')}` }
})
const mailto = computed(() => `mailto:${site.email}?subject=${encodeURIComponent(`My gift${reference.value ? ` (${reference.value})` : ''}`)}`)

interface View { icon: 'search' | 'clock' | 'check' | 'close', tone: string, title: string, text: string }
const view = computed((): View => {
  const views: Record<string, View> = {
  missing: { icon: 'search', tone: 'bg-brand-sky', title: 'We couldn\'t find a payment', text: 'This page needs a payment reference from Paystack. If you just gave, please check your email for the receipt or get in touch.' },
  checking: { icon: 'clock', tone: 'bg-brand-yellow', title: 'Checking your payment…', text: 'This only takes a moment.' },
  success: { icon: 'check', tone: 'bg-brand-green', title: 'Thank you, big-hearted explorer!', text: `Your gift${amountText.value ? ` of ${amountText.value}` : ''} has arrived. It helps us make new letters, animal facts and songs, and keeps every video free. A receipt is on its way to your email.` },
  pending: { icon: 'clock', tone: 'bg-brand-orange', title: 'Your payment is still processing', text: 'Paystack hasn\'t confirmed it yet. This can take a few minutes with some banks. You\'ll get an email receipt once it goes through.' },
  failed: { icon: 'close', tone: 'bg-brand-coral', title: 'The payment didn\'t go through', text: 'No money was taken. You\'re welcome to try again, perhaps with a different card or method.' },
  unknown: { icon: 'clock', tone: 'bg-brand-orange', title: 'We couldn\'t confirm your payment just now', text: 'Our check with Paystack didn\'t work this time. If money left your account, don\'t worry: your receipt from Paystack is your proof, and we\'ll sort it out.' },
  }
  return views[state.value] ?? views.unknown
})
</script>

<template>
  <div>
    <section class="band py-14 md:py-20" aria-labelledby="thanks-title">
      <div class="container-x">
        <ChamferCard size="lg" class="mx-auto max-w-xl" body-class="px-6 py-10 text-center sm:px-10 sm:py-12">
          <div aria-live="polite">
            <span class="mx-auto grid h-20 w-20 place-items-center rounded-full text-white" :class="[view.tone, state === 'checking' ? 'motion-safe:animate-pulse' : '']">
              <Icon :name="view.icon" class="h-10 w-10" />
            </span>
            <h1 id="thanks-title" class="mt-6 text-3xl font-bold text-ink sm:text-4xl">{{ view.title }}</h1>
            <p class="mt-4 leading-relaxed text-ink-soft">{{ view.text }}</p>
            <p v-if="reference" class="mt-4 text-xs text-ink-mute">Reference: <span class="[overflow-wrap:anywhere] font-bold text-ink-soft">{{ reference }}</span></p>
          </div>

          <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <template v-if="state === 'success'">
              <SkewButton to="/videos" color="sky">Watch the videos</SkewButton>
              <a target="_blank" rel="noopener" :href="`https://wa.me/?text=${encodeURIComponent('I just supported Tiny Explorers Hub, free learning videos for little ones. Take a look!')}`" class="inline-flex min-h-[44px] items-center gap-1.5 px-4 text-sm font-bold text-brand-sky hover:underline"><Icon name="whatsapp" class="h-4 w-4" />Share on WhatsApp<span class="sr-only"> (opens in a new tab)</span></a>
            </template>
            <template v-else-if="state === 'pending' || state === 'unknown'">
              <SkewButton color="sky" @click="refresh()">Check again</SkewButton>
              <a :href="mailto" class="inline-flex min-h-[44px] items-center gap-1.5 px-4 text-sm font-bold text-brand-sky hover:underline"><Icon name="mail" class="h-4 w-4" />Email us</a>
            </template>
            <template v-else-if="state === 'failed'">
              <SkewButton to="/support#give" color="coral">Try again</SkewButton>
              <a :href="mailto" class="inline-flex min-h-[44px] items-center gap-1.5 px-4 text-sm font-bold text-brand-sky hover:underline"><Icon name="mail" class="h-4 w-4" />Email us</a>
            </template>
            <template v-else-if="state === 'missing'">
              <SkewButton to="/support" color="sky">Back to Support Us</SkewButton>
              <a :href="mailto" class="inline-flex min-h-[44px] items-center gap-1.5 px-4 text-sm font-bold text-brand-sky hover:underline"><Icon name="mail" class="h-4 w-4" />Email us</a>
            </template>
          </div>
          <p v-if="state !== 'checking'" class="mt-6 text-xs text-ink-mute">Questions about a gift? Write to <a :href="mailto" class="[overflow-wrap:anywhere] font-bold text-brand-sky hover:underline">{{ site.email }}</a>.</p>
        </ChamferCard>
      </div>
    </section>

    <JoinCta />
  </div>
</template>
