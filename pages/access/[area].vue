<script setup lang="ts">
import type { Area, StudioCardData } from '~/data/studios'

const route = useRoute()
const slug = computed(() => String(route.params.area))
const { data, error } = await useFetch<{ area: Area, parent?: Area, children: (Area & { count: number })[], studios: StudioCardData[] }>(
  () => `/api/areas/${slug.value}`,
)
if (error.value || !data.value) throw createError({ statusCode: 404, statusMessage: 'Not Found', fatal: true })

const area = computed(() => data.value!.area)
const crumbs = computed(() => [
  { label: 'Access', to: '/access' },
  ...(data.value!.parent ? [{ label: data.value!.parent.name, to: `/access/${data.value!.parent.slug}` }] : []),
  { label: area.value.label },
])

useSeoMeta({
  title: () => `Kids' Dance Classes in ${area.value.name}`,
  description: () => `All EYS-Kids Dance Academy studios in ${area.value.name}: addresses, access and genres for our easy-to-reach kids' dance studios near the station. Book a free trial lesson today.`,
})
</script>

<template>
  <div>
    <PageHero :en="area.label" :title="`EYS-Kids dance studios in ${area.name}`" :image="area.image" :alt="`${area.name} cityscape`" :crumbs="crumbs" />

    <section class="relative pb-16 pt-10 md:pb-20 md:pt-14" aria-label="Studio list">
      <div class="band absolute inset-0 opacity-30" aria-hidden="true" />
      <div class="container-x relative">
        <div class="mx-auto max-w-[750px]">
          <nav v-if="data!.children.length || data!.parent" aria-label="Narrow down by area" class="mb-10 flex flex-wrap justify-center gap-2">
            <NuxtLink v-if="data!.parent" :to="`/access/${data!.parent.slug}`" class="inline-flex h-10 items-center gap-1 rounded-full border border-brand-sky/40 bg-white px-4 text-xs text-brand-sky hover:bg-brand-sky hover:text-white">
              <Icon name="chevron-left" class="h-3.5 w-3.5" />All studios in {{ data!.parent.name }}
            </NuxtLink>
            <NuxtLink v-for="c in data!.children" :key="c.slug" :to="`/access/${c.slug}`" class="inline-flex h-10 items-center rounded-full border border-brand-sky/40 bg-white px-4 text-xs text-brand-sky hover:bg-brand-sky hover:text-white">
              {{ c.label }} ({{ c.count }})
            </NuxtLink>
          </nav>
          <StudioResults :studios="data!.studios" :title="`EYS-Kids studios in ${area.name}`">
            <template #empty>
              <div class="mt-5"><SkewButton to="/access" size="sm">Search Other Areas</SkewButton></div>
            </template>
          </StudioResults>
          <div class="mt-12 text-center">
            <SkewButton to="/access" color="white" class="border border-brand-sky">Find a Studio with Filters</SkewButton>
          </div>
        </div>
      </div>
    </section>

    <FreeTrialCta />
  </div>
</template>
