<script setup lang="ts">
// Parallelogram call-to-action with trailing chevron ("Subscribe >", "Watch videos >")
const props = withDefaults(defineProps<{
  to?: string
  href?: string
  color?: 'sky' | 'coral' | 'blue' | 'purple' | 'white'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit'
  disabled?: boolean
}>(), { color: 'sky', size: 'md', type: 'button' })

const colors = {
  sky: 'bg-brand-sky text-white hover:bg-[#1c98c8]',
  coral: 'bg-brand-coral text-white hover:bg-[#f0474f]',
  blue: 'bg-brand-blue text-white hover:bg-[#0068c4]',
  purple: 'bg-brand-purple text-white hover:bg-[#9459e6]',
  white: 'bg-white text-brand-sky hover:bg-paper-light',
}
const sizes = {
  sm: 'h-9 px-6 text-xs',
  md: 'h-11 px-8 text-sm',
  lg: 'h-14 px-10 text-base',
}
const cls = computed(() => [
  'skew-box inline-flex items-center justify-center gap-3 font-medium tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-50',
  colors[props.color],
  sizes[props.size],
])
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="cls">
    <slot /><Icon name="chevron" class="h-3.5 w-3.5 shrink-0" />
  </NuxtLink>
  <a v-else-if="href" :href="href" :target="/^https?:/.test(href) ? '_blank' : undefined" :rel="/^https?:/.test(href) ? 'noopener' : undefined" :class="cls">
    <slot /><Icon name="chevron" class="h-3.5 w-3.5 shrink-0" />
  </a>
  <button v-else :type="type" :disabled="disabled" :class="cls">
    <slot /><Icon name="chevron" class="h-3.5 w-3.5 shrink-0" />
  </button>
</template>
