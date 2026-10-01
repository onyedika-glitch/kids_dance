<script setup lang="ts">
import type { NewsSummary } from '~/data/news'
import type { Category, VideoItem } from '~/data/videos'
import type { ChannelStats } from '~/server/api/stats.get'

useSeoMeta({
  title: 'Tiny Explorers Hub | Learn, Discover, Grow, Adventure',
  description: 'Short, cheerful learning videos for toddlers and preschoolers: ABCs and phonics, amazing animal facts, songs, faith and family fun. Big dreams start small!',
})

const [{ data: lib }, { data: stats }, { data: ranking }, { data: updates }] = await Promise.all([
  useFetch<{ videos: VideoItem[], categories: Category[], total: number }>('/api/videos', { key: 'home-videos' }),
  useFetch<ChannelStats>('/api/stats', { key: 'stats' }),
  useFetch<{ videos: (VideoItem & { rank: number })[], totalLikes: number }>('/api/ranking', { key: 'home-ranking' }),
  useFetch<{ total: number, items: NewsSummary[] }>('/api/news', { query: { limit: 3 }, key: 'home-news' }),
])

const videos = computed(() => lib.value?.videos ?? [])
const featured = computed(() => videos.value.find(v => v.featured) ?? videos.value.find(v => v.mediaFile) ?? null)
const latest = computed(() => videos.value.slice(0, 6))
const loved = computed(() => ranking.value?.videos.slice(0, 3) ?? [])
</script>

<template>
  <div>
    <HomeHero :video="featured" />
    <HomeStats :stats="stats ?? null" />
    <HomeAbout />
    <HomeLatest v-if="latest.length" :videos="latest" :total="lib?.total ?? latest.length" />
    <HomeAbc :videos="videos" />
    <HomeCategories v-if="lib" :categories="lib.categories" :videos="videos" />
    <HomeLoved :videos="loved" />
    <HomeEarn />
    <HomeNews v-if="updates?.items.length" :items="updates.items" />
    <JoinCta />
  </div>
</template>
