// Ticking countdown to an ISO deadline. Renders zeros on the server and starts
// ticking once mounted, so SSR and hydration output match.
export function useCountdown(deadlineIso: string) {
  const target = new Date(deadlineIso).getTime()
  const now = ref<number | null>(null)
  let timer: ReturnType<typeof setInterval> | undefined

  onMounted(() => {
    now.value = Date.now()
    timer = setInterval(() => { now.value = Date.now() }, 1000)
  })
  onBeforeUnmount(() => clearInterval(timer))

  const remaining = computed(() => now.value === null ? null : Math.max(0, target - now.value))
  const expired = computed(() => remaining.value === 0)
  const parts = computed(() => {
    const ms = remaining.value ?? 0
    return {
      days: Math.floor(ms / 86_400_000),
      hours: Math.floor(ms / 3_600_000) % 24,
      minutes: Math.floor(ms / 60_000) % 60,
      seconds: Math.floor(ms / 1000) % 60,
    }
  })

  // Deadline shown in JST, e.g. Thu, Dec 24 23:59
  const label = computed(() => {
    const fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tokyo', month: 'short', day: 'numeric', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    const p = Object.fromEntries(fmt.formatToParts(new Date(target)).map(x => [x.type, x.value]))
    return { date: `${p.month} ${p.day}`, weekday: p.weekday, time: `${p.hour}:${p.minute}` }
  })

  return { remaining, expired, parts, label }
}
