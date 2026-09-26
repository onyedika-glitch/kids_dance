<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import type { Map as LeafletMap, LayerGroup } from 'leaflet'

export interface MapPoint {
  id: string
  name: string
  lat: number
  lng: number
  address?: string
  access?: string
}

// Interactive OpenStreetMap (Leaflet) with a marker per studio. Leaflet is loaded
// on the client only; the box keeps its size during SSR so nothing jumps.
const props = withDefaults(defineProps<{
  points: MapPoint[]
  label: string
  /** link markers to the studio pages */
  link?: boolean
  zoom?: number
}>(), { link: true, zoom: 16 })

const config = useRuntimeConfig().public
const el = ref<HTMLElement | null>(null)
const ready = ref(false)
const active = ref(false)
let map: LeafletMap | null = null
let layer: LayerGroup | null = null
let L: typeof import('leaflet') | null = null

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' })[c]!)

function render() {
  if (!map || !L || !layer) return
  layer.clearLayers()
  const icon = L.divIcon({
    className: '',
    iconSize: [30, 38],
    iconAnchor: [15, 37],
    popupAnchor: [0, -34],
    html: '<svg viewBox="0 0 30 38" width="30" height="38" aria-hidden="true"><path d="M15 37C15 37 2 22 2 14a13 13 0 0 1 26 0c0 8-13 23-13 23Z" fill="#FF5860" stroke="#fff" stroke-width="2"/><path d="M11 9h8l4 5-4 5h-8l-4-5Z" fill="#fff"/></svg>',
  })
  for (const p of props.points) {
    const html = `<p style="margin:0;font-weight:700;font-size:13px">${esc(p.name)}</p>`
      + (p.address ? `<p style="margin:4px 0 0;font-size:12px">${esc(p.address)}</p>` : '')
      + (p.access ? `<p style="margin:2px 0 0;font-size:11px;color:#666">${esc(p.access)}</p>` : '')
      + (props.link ? `<a href="/studios/${encodeURIComponent(p.id)}" data-studio="${esc(p.id)}" style="display:inline-block;margin-top:6px;font-size:12px;color:#23AADD">View studio page ›</a>` : '')
    L.marker([p.lat, p.lng], { icon, title: p.name, alt: p.name, keyboard: true }).bindPopup(html).addTo(layer)
  }
  if (props.points.length === 1) {
    map.setView([props.points[0].lat, props.points[0].lng], props.zoom)
  } else if (props.points.length > 1) {
    map.fitBounds(L.latLngBounds(props.points.map(p => [p.lat, p.lng] as [number, number])), { padding: [36, 36], maxZoom: 15 })
  }
}

// Client-side navigation for popup links
function onPopupClick(e: MouseEvent) {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-studio]')
  if (!a || e.metaKey || e.ctrlKey) return
  e.preventDefault()
  navigateTo(`/studios/${a.dataset.studio}`)
}

function activate() {
  if (active.value || !map) return
  active.value = true
  map.scrollWheelZoom.enable()
}

onMounted(async () => {
  L = await import('leaflet')
  if (!el.value) return
  map = L.map(el.value, { scrollWheelZoom: false, zoomControl: true, attributionControl: true })
  L.tileLayer(config.mapTileUrl, { attribution: config.mapAttribution, maxZoom: 19, maxNativeZoom: Number(config.mapMaxNativeZoom) || 19 }).addTo(map)
  layer = L.layerGroup().addTo(map)
  map.setView([35.68, 139.76], 11)
  render()
  el.value.addEventListener('click', onPopupClick)
  ready.value = true
})

watch(() => props.points, render, { deep: true })

onBeforeUnmount(() => {
  el.value?.removeEventListener('click', onPopupClick)
  map?.remove()
  map = null
})
</script>

<template>
  <div class="relative isolate overflow-hidden bg-paper" role="region" :aria-label="label" @click="activate">
    <div ref="el" class="absolute inset-0" />
    <p v-if="!ready" class="absolute inset-0 grid place-items-center text-xs text-ink-mute">Loading map…</p>
    <p v-else-if="!active" class="pointer-events-none absolute bottom-7 left-1/2 z-[500] -translate-x-1/2 whitespace-nowrap bg-ink/70 px-3 py-1 text-[11px] text-white">Click to use the map</p>
  </div>
</template>
