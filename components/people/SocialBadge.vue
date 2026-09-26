<script setup lang="ts">
import type { SocialPlatform } from '~/data/voices'

// Round social-network badge pinned to the corner of review cards (Rank.png).
defineProps<{ platform: SocialPlatform }>()
const labels = { facebook: 'Facebook', instagram: 'Instagram', twitter: 'X' }
</script>

<template>
  <span
    class="grid h-8 w-8 place-items-center rounded-full text-white shadow-[0_1px_3px_rgba(0,0,0,.25)]"
    :class="{ 'bg-[#3B5998]': platform === 'facebook', 'bg-[#1DA1F2]': platform === 'twitter', 'bg-[#C13584]': platform === 'instagram' }"
    role="img" :aria-label="labels[platform]"
  >
    <svg v-if="platform === 'facebook'" viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v7h4v-7h3l1-4h-4V8Z" /></svg>
    <svg v-else-if="platform === 'twitter'" viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M22 6.2c-.7.3-1.5.5-2.4.6.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 5a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.9.1a4.1 4.1 0 0 0 3.8 2.8A8.2 8.2 0 0 1 2 18.7 11.6 11.6 0 0 0 8.3 20.5c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1Z" /></svg>
    <Icon v-else name="instagram" class="h-4 w-4" />
  </span>
</template>
