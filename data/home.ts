// Content for the top page (Panel / About / Lesson / Why EYS-Kids / Karte / Popular Classes)

export interface AgeGroup {
  id: string
  stage: string
  grade: string
  color: string
  image?: string
  alt?: string
  to: string
}

export const ageGroups: AgeGroup[] = [
  { id: 'nensho', stage: 'Preschool', grade: 'Nursery', color: '#8DC21F', to: '/courses' },
  { id: 'nenchu', stage: 'Preschool', grade: 'Pre-K', color: '#FF9300', to: '/courses' },
  { id: 'nencho', stage: 'Preschool', grade: 'Kindergarten', color: '#FF5860', image: '/images/home/age-nencho.webp', alt: 'A kindergarten girl dancing with a big smile', to: '/courses' },
  { id: 'low', stage: 'Elementary', grade: 'Grades 1–3', color: '#23AADD', image: '/images/home/age-low.webp', alt: 'A lower-elementary girl jumping with both arms up', to: '/courses' },
  { id: 'mid', stage: 'Elementary', grade: 'Grades 3–4', color: '#13B5B1', image: '/images/home/age-mid.webp', alt: 'A middle-elementary girl dancing with her arms spread wide', to: '/courses' },
  { id: 'high', stage: 'Elementary', grade: 'Grades 4–6', color: '#A66BF0', to: '/courses' },
]

export interface Reason {
  no: number
  en: string
  color: string
  text: string
  to: string
}

// "7 reasons families choose EYS-Kids Dance Academy"
export const reasons: Reason[] = [
  { no: 1, en: 'VISION', color: '#0FA8E0', text: 'We teach through dance, not just train performers', to: '/vision' },
  { no: 2, en: 'CURRICULUM', color: '#FF5860', text: 'Nine genres, from core styles to fun extras', to: '/curriculum' },
  { no: 3, en: 'PRICE SYSTEM', color: '#A66BF0', text: 'Great-value plans with free make-up lessons', to: '/pricing' },
  { no: 4, en: 'Karte', color: '#0FA8E0', text: 'Karte progress reports keep kids motivated after every lesson', to: '#karte' },
  { no: 5, en: 'INSTRUCTORS', color: '#FF9300', text: 'Dancers who are true educators', to: '/instructors' },
  { no: 6, en: 'ACCESS', color: '#13B5B1', text: 'Easy-to-reach studios near the station', to: '/access' },
  { no: 7, en: 'EVENT', color: '#8DC21F', text: 'Plenty of recitals, workshops and more', to: '/events' },
]

export interface Region {
  name: string
  studios: string
}

export const regions: Region[] = [
  { name: 'Kanto', studios: 'Daikanyama, Shibuya, Yokohama & more' },
  { name: 'Kansai', studios: 'Umeda, Namba, Kyoto & more' },
  { name: 'Hokkaido & Tokai', studios: 'Sapporo, Nagoya, Shizuoka & more' },
]

export interface StelamItem {
  letter: string
  en: string
  ja: string
  color: string
}

// Clockwise from the top, as laid out in the ring diagram
export const stelam: StelamItem[] = [
  { letter: 'S', en: 'Science', ja: 'Discover', color: '#3DB4CB' },
  { letter: 'T', en: 'Technology', ja: 'Code & create', color: '#13B58A' },
  { letter: 'E', en: 'Engineering', ja: 'Build & make', color: '#A67CF0' },
  { letter: 'L', en: 'Language', ja: 'Communicate', color: '#0B96D2' },
  { letter: 'A', en: 'Art', ja: 'Express', color: '#F79152' },
  { letter: 'M', en: 'Mathematics', ja: 'Think logically', color: '#E36CB9' },
]

export const stelamPills = [
  { label: 'STEM Education', color: '#1AA3EE' },
  { label: 'Language', color: '#C084F5' },
  { label: 'Art', color: '#FF6379' },
]

export interface KarteSample {
  title: string
  date: string
  instructor: string
  comment: string
  skills: { label: string, value: number }[]
}

export const karteSamples: KarteSample[] = [
  {
    title: 'Kids Hip-Hop Basics',
    date: 'Sep 19, 2026',
    instructor: 'MIKU',
    comment: 'Your up-and-down rhythm is really steady now! Next time, let\'s make those arm moves bigger.',
    skills: [{ label: 'Rhythm', value: 80 }, { label: 'Expression', value: 64 }, { label: 'Flexibility', value: 52 }],
  },
  {
    title: 'Jazz Dance Beginner',
    date: 'Sep 12, 2026',
    instructor: 'AYA',
    comment: 'Your turns are getting nice and straight. Try practicing in front of a mirror at home, too.',
    skills: [{ label: 'Turns', value: 70 }, { label: 'Posture', value: 76 }, { label: 'Memory', value: 58 }],
  },
  {
    title: 'Cheer Dance Intro',
    date: 'Sep 5, 2026',
    instructor: 'SAKI',
    comment: 'You danced all the way through with a big smile and a loud voice! Next goal: landing your jumps together.',
    skills: [{ label: 'Jumps', value: 66 }, { label: 'Smile', value: 92 }, { label: 'Teamwork', value: 74 }],
  },
]
