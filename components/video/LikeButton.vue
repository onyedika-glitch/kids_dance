<script setup lang="ts">
// Heart button: one like per browser, stored anonymously (see server/utils/visitor.ts)
const props = defineProps<{ slug: string, likes: number, liked: boolean }>()
const emit = defineEmits<{ change: [{ liked: boolean, likes: number }] }>()

const liked = ref(props.liked)
const likes = ref(props.likes)
const busy = ref(false)
const failed = ref(false)
watch(() => [props.liked, props.likes], () => { liked.value = props.liked; likes.value = props.likes })

async function toggle() {
  if (busy.value) return
  busy.value = true
  failed.value = false
  const next = !liked.value
  // Optimistic update, rolled back if the server says no
  liked.value = next
  likes.value += next ? 1 : -1
  try {
    const res = await $fetch<{ liked: boolean, likes: number }>(`/api/videos/${props.slug}/like`, { method: 'POST', body: { like: next } })
    liked.value = res.liked
    likes.value = res.likes
    emit('change', res)
  }
  catch {
    liked.value = !next
    likes.value += next ? -1 : 1
    failed.value = true
  }
  finally {
    busy.value = false
  }
}
</script>

<template>
  <span class="inline-flex flex-col items-start">
    <button type="button" class="inline-flex h-11 items-center gap-2 rounded-full px-5 font-display text-sm font-semibold transition active:scale-95" :class="liked ? 'bg-brand-coral text-white' : 'bg-white text-brand-coral shadow-pop hover:bg-brand-coral/10'" :aria-pressed="liked" :disabled="busy" @click="toggle">
      <svg viewBox="0 0 24 24" class="h-5 w-5" :fill="liked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 20s-7.5-4.6-9.2-9.4C1.6 7.2 4 4 7.3 4c2 0 3.4 1.1 4.7 2.8C13.3 5.1 14.7 4 16.7 4 20 4 22.4 7.2 21.2 10.6 19.5 15.4 12 20 12 20Z" /></svg>
      {{ liked ? 'Loved it!' : 'Love this video' }}
      <span class="rounded-full px-2 text-xs" :class="liked ? 'bg-white/25' : 'bg-brand-coral/10'">{{ likes }}</span>
    </button>
    <span v-if="failed" class="mt-1 text-xs font-semibold text-brand-coral" role="alert">Couldn't save your like. Please try again.</span>
  </span>
</template>
