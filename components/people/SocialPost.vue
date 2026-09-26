<script setup lang="ts">
import type { SocialPost } from '~/data/voices'

// Social-media style voice card (View.png / Media.png): Facebook, Instagram or X layout.
// The like button toggles locally and reports the change to the parent.
const props = withDefaults(defineProps<{
  post: SocialPost
  compact?: boolean
  headingTag?: string
}>(), { compact: false, headingTag: 'h3' })
const emit = defineEmits<{ like: [liked: boolean] }>()

const liked = ref(false)
const likes = computed(() => props.post.likes + (liked.value ? 1 : 0))
function toggleLike() {
  liked.value = !liked.value
  emit('like', liked.value)
}
const platformLabel = { facebook: 'Facebook', instagram: 'Instagram', twitter: 'X' }
</script>

<template>
  <article class="flex h-full flex-col rounded-md bg-white text-ink shadow-[0_2px_6px_rgba(0,0,0,.16)]" :aria-label="`${post.name}'s ${platformLabel[post.platform]} post`">
    <!-- header -->
    <header class="flex items-start gap-3 px-3 pt-3" :class="{ 'justify-center text-center': post.platform === 'instagram' && !compact }">
      <span v-if="post.platform !== 'instagram' || compact" class="relative shrink-0">
        <img v-if="post.avatar" :src="post.avatar" alt="" width="48" height="48" loading="lazy" decoding="async" class="h-11 w-11 rounded-full bg-paper object-cover" :class="{ 'h-12 w-12': !compact }" />
        <span v-else class="grid h-11 w-11 place-items-center rounded-full bg-paper text-sm text-ink-mute" aria-hidden="true">{{ post.name.slice(0, 1) }}</span>
        <span v-if="post.platform === 'facebook'" class="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-[#3B5998] text-white" aria-hidden="true">
          <svg viewBox="0 0 24 24" class="h-3 w-3" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v7h4v-7h3l1-4h-4V8Z" /></svg>
        </span>
        <span v-else-if="post.platform === 'twitter'" class="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-ink text-white" aria-hidden="true">
          <svg viewBox="0 0 24 24" class="h-2.5 w-2.5" fill="currentColor"><path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" /></svg>
        </span>
        <span v-else class="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-[#C13584] text-white" aria-hidden="true">
          <Icon name="instagram" class="h-3 w-3" />
        </span>
      </span>
      <div class="min-w-0">
        <div class="flex items-baseline gap-3" :class="{ 'justify-center': post.platform === 'instagram' && !compact }">
          <component :is="headingTag" class="text-base leading-tight">{{ post.name }}</component>
          <span v-if="post.platform !== 'instagram'" class="shrink-0 text-[10px] text-ink-mute">{{ post.time }}</span>
        </div>
        <p class="mt-1 inline-block rounded-full bg-[#DDD] px-4 text-[11px] leading-5 text-ink-mute">{{ post.className }}</p>
      </div>
    </header>

    <!-- body -->
    <template v-if="post.platform === 'instagram'">
      <div v-if="!compact" class="mx-3 mt-3 flex-1 rounded bg-paper-light" aria-hidden="true" />
      <div class="mt-3 flex items-center gap-2.5 px-3">
        <button type="button" class="-m-1 grid h-8 w-8 place-items-center rounded-full transition-colors" :class="liked ? 'text-[#ED4956]' : 'text-ink hover:text-[#ED4956]'" :aria-pressed="liked" :aria-label="`Like (${likes})`" @click="toggleLike">
          <Icon name="heart" class="h-5 w-5" :class="{ 'fill-current': liked }" />
        </button>
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20.5 12a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.2-4.2A8.5 8.5 0 1 1 20.5 12Z" /></svg>
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M21 3 10 13.5M21 3l-6.5 18-4.5-7.5L3 9.5 21 3Z" /></svg>
        <svg viewBox="0 0 24 24" class="ml-auto h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12v18l-6-5-6 5V3Z" /></svg>
      </div>
      <p class="mt-2 px-3 text-[11px]">Liked by Sample and <span class="font-display">{{ likes }}</span> others</p>
      <p class="mt-1 px-3 text-[11px] leading-[1.7]" :class="compact ? 'line-clamp-2' : 'line-clamp-3'">{{ post.text }}</p>
      <p class="px-3 pb-3 pt-1 text-[10px] text-ink-mute">{{ post.time }}</p>
    </template>

    <template v-else>
      <p class="mt-3 px-3 text-[11px] leading-[1.8]" :class="compact ? 'line-clamp-3' : (post.platform === 'facebook' ? 'line-clamp-[10]' : 'line-clamp-5')">{{ post.text }}</p>
      <div v-if="post.platform === 'twitter' && !compact" class="mx-3 mt-3 min-h-[70px] flex-1 rounded-lg border border-[#DDD]" aria-hidden="true" />
      <div v-else class="flex-1" />

      <template v-if="post.platform === 'facebook'">
        <div class="mt-3 flex items-center justify-between px-3 text-[10px] text-ink-mute">
          <span class="flex items-center gap-1.5">
            <span class="flex -space-x-1" aria-hidden="true">
              <span class="grid h-4 w-4 place-items-center rounded-full bg-[#1877F2] text-white ring-1 ring-white"><svg viewBox="0 0 24 24" class="h-2.5 w-2.5" fill="currentColor"><path d="M2 10h4v11H2V10Zm6 11V10l4.5-7.5c1.5 0 2.5 1 2.2 2.6L14 9h6a2 2 0 0 1 2 2.3l-1.4 7.6A2.5 2.5 0 0 1 18.1 21H8Z" /></svg></span>
              <span class="grid h-4 w-4 place-items-center rounded-full bg-[#F33E58] text-white ring-1 ring-white"><Icon name="heart" class="h-2.5 w-2.5 fill-current" /></span>
              <span class="grid h-4 w-4 place-items-center rounded-full bg-[#F7B125] ring-1 ring-white" />
            </span>
            <span class="font-display">{{ likes }}</span>
          </span>
          <span>{{ post.comments }} comments &middot; {{ post.shares }} shares</span>
        </div>
        <div class="mx-3 mt-2 grid grid-cols-3 border-t border-[#DDD] text-[10px] text-ink-soft">
          <button type="button" class="flex h-9 items-center justify-center gap-1 transition-colors" :class="liked ? 'font-bold text-[#1877F2]' : 'hover:text-[#1877F2]'" :aria-pressed="liked" @click="toggleLike">
            <svg viewBox="0 0 24 24" class="h-4 w-4" :fill="liked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M2 10h4v11H2V10Zm6 11V10l4.5-7.5c1.5 0 2.5 1 2.2 2.6L14 9h6a2 2 0 0 1 2 2.3l-1.4 7.6A2.5 2.5 0 0 1 18.1 21H8Z" /></svg>
            Like
          </button>
          <span class="flex h-9 items-center justify-center gap-1 whitespace-nowrap"><Icon name="comment" class="h-3.5 w-3.5" />Comment</span>
          <span class="flex h-9 items-center justify-center gap-1">
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M14 4l7 7-7 7v-4c-5 0-8.5 1.5-11 5 1-5 4-10 11-11V4Z" /></svg>
            Share
          </span>
        </div>
      </template>

      <div v-else class="mt-2 flex items-center justify-between px-3 pb-2 text-[10px] text-ink-mute">
        <span class="flex h-9 items-center gap-1"><svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M20.5 11.5a8 8 0 0 1-11.8 7l-4.2 1.2 1.2-4A8 8 0 1 1 20.5 11.5Z" /></svg>{{ post.comments }}</span>
        <span class="flex h-9 items-center gap-1"><svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M7 4 3 8l4 4M3 8h12a3 3 0 0 1 3 3v2M17 20l4-4-4-4M21 16H9a3 3 0 0 1-3-3v-2" /></svg>{{ post.shares }}</span>
        <button type="button" class="flex h-9 items-center gap-1 transition-colors" :class="liked ? 'text-[#F91880]' : 'hover:text-[#F91880]'" :aria-pressed="liked" :aria-label="`Like (${likes})`" @click="toggleLike">
          <Icon name="heart" class="h-4 w-4" :class="{ 'fill-current': liked }" />{{ likes }}
        </button>
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" /></svg>
      </div>
    </template>
  </article>
</template>
