<script setup lang="ts">
import type { VideoItem } from '~/data/videos'

// VideoLikeButton for lists whose API has no per-visitor `liked` flag: looks it up in the browser after mount
const props = defineProps<{ slug: string, likes: number }>()
const emit = defineEmits<{ change: [{ liked: boolean, likes: number }] }>()
const liked = ref(false)
const likes = ref(props.likes)
onMounted(async () => {
  try {
    const res = await $fetch<{ video: VideoItem, liked: boolean }>(`/api/videos/${props.slug}`)
    liked.value = res.liked
    likes.value = res.video.likes
  }
  catch {}
})
</script>

<template>
  <VideoLikeButton :slug="slug" :likes="likes" :liked="liked" @change="emit('change', $event)" />
</template>
