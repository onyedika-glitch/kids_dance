// Free trial page content + booking form options (stat.png, card.png, sample.png, info.png)
import { classes, findGenre, genres } from './courses'
import { plans } from './pricing'
import { studios } from './studios'

export const trialPhotos = [
  { src: '/images/trial/duo.webp', alt: 'Two kid dancers striking a pose' },
  { src: '/images/trial/lesson.webp', alt: 'Kids taking a lesson in the studio' },
  { src: '/images/trial/shoes.webp', alt: 'Indoor dance shoes' },
  { src: '/images/trial/girl.webp', alt: 'A girl dancing with a focused look' },
]

export const trialSteps = [
  { no: 1, text: 'Book with the form below' },
  { no: 2, text: 'We confirm your trial date' },
  { no: 3, text: 'Visit the studio' },
  { no: 4, text: 'Enjoy your trial lesson!' },
]

export const trialBring = ['T-shirt', 'Comfy pants', 'Hair ties', 'Towel', 'Indoor sneakers', 'Drink (with a lid)']

export interface FirstTimerCard {
  title: string
  text: string
  to: string
  image: string
  alt: string
}

export const firstTimerCards: FirstTimerCard[] = [
  { title: 'Start from age 3', text: 'Classes are grouped by age, so even first-timers can start at their own pace.', to: '/courses', image: '/images/trial/lesson.webp', alt: 'Kids in the middle of a lesson' },
  { title: 'Not sporty? No problem', text: 'We start with rhythm games, and every "I did it!" builds confidence.', to: '/curriculum', image: '/images/trial/friends.webp', alt: 'Smiling girls' },
  { title: 'Karte after every lesson', text: 'Get each lesson\'s content and your instructor\'s comments in the app.', to: '/vision', image: '/images/trial/girl.webp', alt: 'A girl with a focused look' },
  { title: 'Near the station, easy drop-off', text: 'Every studio is within a 5-min walk of a station, with a waiting area for parents.', to: '/access', image: '/images/trial/duo.webp', alt: 'Two kids dancing in the studio' },
]

export interface ServiceClass { name: string, target: string, day: string }
export interface Service { id: string, name: string, label: string, color: string, classes: ServiceClass[] }

// "Take a peek at our classes!" — EYS service panels (info.png)
export const services: Service[] = [
  { id: 'dance', name: 'DANCE ACADEMY', label: 'Dance for kids', color: '#23AADD', classes: [
    { name: 'Pre-Kids (rhythm play)', target: 'Age 3 to Nursery', day: 'Tue & Sat 16:00–16:45' },
    { name: 'Kids Hip-Hop', target: 'Pre-K to Grade 2', day: 'Mon, Wed & Sat 17:00–18:00' },
    { name: 'Junior Jazz', target: 'Grades 3–6', day: 'Thu & Sun 17:30–18:30' },
    { name: 'Select Team', target: 'Grades 3–6', day: 'Sat 18:30–20:00' },
  ] },
  { id: 'music', name: 'EYS-Kids Music School', label: 'Music for kids', color: '#6F8CF2', classes: [
    { name: 'First Piano', target: 'Age 4 to Grade 6', day: 'Mon–Sat 15:00–20:00' },
    { name: 'Kids Drums', target: 'Grades 1–6', day: 'Wed & Sat 16:00–19:00' },
  ] },
  { id: 'ballet', name: 'Ballet Academy', label: 'Ballet for kids', color: '#9C7A55', classes: [
    { name: 'Pre-Ballet', target: 'Age 3 to Kindergarten', day: 'Tue & Fri 16:00–16:50' },
    { name: 'Junior Ballet', target: 'Grades 1–6', day: 'Tue & Fri 17:00–18:15' },
  ] },
  { id: 'art', name: 'EYS-Kids Art & Design', label: 'Art for kids', color: '#8DC21F', classes: [
    { name: 'Atelier Class', target: 'Pre-K to Grade 3', day: 'Sat 10:00–11:30' },
    { name: 'Digital Design', target: 'Grades 4–6', day: 'Sun 13:00–14:30' },
  ] },
  { id: 'english', name: 'EGRO', label: 'English for kids', color: '#13B5B1', classes: [
    { name: 'English Kids', target: 'Age 3 to Kindergarten', day: 'Mon & Thu 16:00–16:50' },
    { name: 'English Dojo', target: 'Grades 1–6', day: 'Mon & Thu 17:00–18:00' },
  ] },
]

/* ---------- Booking form options ---------- */

export const gradeOptions = [
  'Age 3', 'Nursery (age 3–4)', 'Pre-K (age 4–5)', 'Kindergarten (age 5–6)',
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
]

export const studioOptions = studios.map(s => s.name)

export const genreOptions = ['No preference (we\'ll suggest one)', ...genres.map(g => g.nameJa)]

/** ?class=<id> from /courses → the class plus the form fields it implies */
export function trialClass(id: unknown) {
  const c = typeof id === 'string' ? classes.find(x => x.id === id) : undefined
  if (!c) return null
  return {
    id: c.id,
    title: c.title,
    detail: `${c.schedule}, ${c.studio}`,
    genre: findGenre(c.genreId)?.nameJa,
    studio: studioOptions.find(n => n === c.studio),
  }
}

/** ?plan=<id> from /pricing */
export function trialPlan(id: unknown) {
  const p = typeof id === 'string' ? plans.find(x => x.id === id) : undefined
  return p ? { id: p.id, name: p.name, detail: `¥${p.price.toLocaleString('en-US')}/month, ${p.frequency}` } : null
}

export const timeOptions = ['Weekdays 16:00–18:00', 'Weekdays 18:00–20:00', 'Saturday morning', 'Saturday afternoon', 'Sunday morning', 'Sunday afternoon']

export interface TrialForm {
  childName: string
  /** Stored in child_kana; in English it holds the child's nickname ("What should we call your child?") */
  childKana: string
  grade: string
  parentName: string
  phone: string
  email: string
  studio: string
  genre: string
  date1: string
  time1: string
  date2: string
  time2: string
  notes: string
  privacy: boolean
  classId?: string
  planId?: string
}

export type TrialErrors = Partial<Record<keyof TrialForm, string>>

const PHONE = /^0\d{1,4}-?\d{1,4}-?\d{3,4}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DATE = /^\d{4}-\d{2}-\d{2}$/
// Hyphen look-alikes (full-width hyphen, minus signs, long vowel mark) typed from Japanese keyboards
const DASHES = /[\u2010\uFF0D\u30FC\u2212]/g

/** Shared by the page (inline errors) and /api/trial (server validation). */
export function validateTrial(f: Partial<TrialForm>, today = new Date()): TrialErrors {
  const e: TrialErrors = {}
  const s = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
  const todayIso = new Date(today.getTime() + 9 * 3600_000).toISOString().slice(0, 10) // JST

  if (!s(f.childName)) e.childName = 'Please enter your child\'s name'
  else if (s(f.childName).length > 40) e.childName = 'Please use 40 characters or fewer'
  if (!s(f.childKana)) e.childKana = 'Please tell us what to call your child'
  else if (s(f.childKana).length > 40) e.childKana = 'Please use 40 characters or fewer'
  if (!gradeOptions.includes(s(f.grade))) e.grade = 'Please select your child\'s age or grade'
  if (!s(f.parentName)) e.parentName = 'Please enter your name'
  const phone = s(f.phone).replace(DASHES, '-')
  if (!phone) e.phone = 'Please enter your phone number'
  else if (!PHONE.test(phone) || phone.replace(/-/g, '').length < 10 || phone.replace(/-/g, '').length > 11) e.phone = 'Please enter a valid phone number (e.g. 090-1234-5678)'
  if (!s(f.email)) e.email = 'Please enter your email address'
  else if (!EMAIL.test(s(f.email))) e.email = 'Please enter a valid email address'
  if (!studioOptions.includes(s(f.studio))) e.studio = 'Please select a studio'
  if (s(f.genre) && !genreOptions.includes(s(f.genre))) e.genre = 'Please select a genre'
  if (!DATE.test(s(f.date1))) e.date1 = 'Please choose your first-choice date'
  else if (s(f.date1) <= todayIso) e.date1 = 'Please choose a date from tomorrow onward'
  if (!timeOptions.includes(s(f.time1))) e.time1 = 'Please choose a time for your first choice'
  if (!DATE.test(s(f.date2))) e.date2 = 'Please choose your second-choice date'
  else if (s(f.date2) <= todayIso) e.date2 = 'Please choose a date from tomorrow onward'
  else if (s(f.date2) === s(f.date1) && s(f.time2) === s(f.time1)) e.date2 = 'Please choose a different date or time from your first choice'
  if (!timeOptions.includes(s(f.time2))) e.time2 = 'Please choose a time for your second choice'
  if (s(f.notes).length > 1000) e.notes = 'Please use 1,000 characters or fewer'
  if (f.privacy !== true) e.privacy = 'Please agree to our privacy policy to continue'
  if (f.classId && !trialClass(f.classId)) e.classId = 'We couldn\'t find the selected class'
  if (f.planId && !trialPlan(f.planId)) e.planId = 'We couldn\'t find the selected plan'
  return e
}

export const trialFaqs = [
  { q: 'Is the trial lesson really free?', a: 'Yes, your first trial lesson is completely free. We never pressure anyone to join, so please feel free to come and try.' },
  { q: 'What ages can join?', a: 'We have classes for kids from age 3 through Grade 6. We\'ll recommend the best class for your child\'s age and experience.' },
  { q: 'Is it OK if my child has never danced before?', a: 'Most kids who come for a trial have never danced before. We start with rhythm games and stretching, so they can join with confidence.' },
  { q: 'Can parents watch?', a: 'Yes, you can watch the lesson through the glass or from inside the studio. Afterward, the instructor will tell you how your child did.' },
  { q: 'Can siblings try a lesson together?', a: 'Of course. Just add your other children\'s names and grades in the Notes field of the booking form. If their ages are far apart, we may suggest separate classes.' },
  { q: 'Can I change or cancel my booking?', a: 'Please call us (0120-978-900) by the day before your trial. If your child suddenly feels unwell on the day, just let us know.' },
]
