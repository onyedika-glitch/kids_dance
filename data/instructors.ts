export type InstructorRank = 'S' | 'A' | 'B' | 'C' | 'D'

export interface StyleMeter {
  left: string
  right: string
  /** 0–100, position of the knob from the left label */
  value: number
}

export interface RatingSummary {
  rank: InstructorRank
  score: number
  count: number
  axes: { label: string, value: number }[]
}

export interface Instructor {
  id: string
  name: string
  en: string
  rank: InstructorRank
  genres: string[]
  /** full-body cutout on transparent bg */
  cutout: string
  cutoutSize: [number, number]
  /** rank star position over the cutout, in % of the cutout box (center x/y, width) */
  badge: { x: number, y: number, size: number }
  avatar: string
  /** "very satisfied" share, % */
  satisfaction: number
  /** "satisfied" share, % (the rest is "other") */
  satisfied: number
  catchcopy: string
  bio: string
  career: string[]
  studios: string[]
  courses: string[]
  /** 0 = Mon … 6 = Sun */
  days: number[]
  styleMedia: { image: string, title: string, flip?: boolean }[]
  meters: StyleMeter[]
  ratings: { trial: RatingSummary, regular: RatingSummary }
}

export interface StaffMember {
  id: string
  name: string
  role: string
  org?: string
  photo: string
  photoSize: [number, number]
  text: string
}

export interface CriteriaScore {
  label: string
  score: number
}

export interface InstructorReview {
  id: string
  instructorId: string
  name: string
  profile: string
  avatar: string
  genre: string
  course: string
  trialDate: string
  joinDate: string
  trial: { text: string, total: number, items: CriteriaScore[] }
  regular: { text: string, total: number, items: CriteriaScore[] }
}

export const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const
export const weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const

export const rankColors: Record<InstructorRank, string> = {
  S: '#FF5860',
  A: '#FF9300',
  B: '#23AADD',
  C: '#13B5B1',
  D: '#AAAAAA',
}

export const courseOptions = ['Kids Hip-Hop', 'Kids Jazz', 'Breakin\'', 'Lock Dance', 'K-Pop', 'Kinder Rhythm']
export const studioOptions = ['Ginza', 'Shinjuku', 'Shibuya', 'Kawasaki', 'Ueno', 'Jiyugaoka', 'Daikanyama']

const styleMedia = [
  { image: '/images/instructors/style-1.webp', title: 'Freeze basics' },
  { image: '/images/instructors/style-2.webp', title: 'Building footwork' },
  { image: '/images/instructors/style-1.webp', title: 'Rhythm training', flip: true },
]

const trialAxes = ['Facilities', 'Booking system', 'Instructor', 'Curriculum', 'Value']
const regularAxes = ['Events', 'Support', 'Instructor', 'Curriculum', 'Value']
const axes = (labels: string[], values: number[]) => labels.map((label, i) => ({ label, value: values[i] }))

export const instructors: Instructor[] = [
  {
    id: 'miho',
    name: 'Miho Miyashita',
    en: 'MIHO',
    rank: 'S',
    genres: ['Kids Hip-Hop', 'K-Pop'],
    cutout: '/images/instructors/cut-s.webp',
    cutoutSize: [150, 433],
    badge: { x: 80.7, y: 44.3, size: 40 },
    avatar: '/images/instructors/avatar-s.webp',
    satisfaction: 80.9,
    satisfied: 15.6,
    catchcopy: 'Right beside them for every "I did it!" smile.',
    bio: 'Miho started dancing at age 5 and won a national championship in high school. After working as a backup dancer for recording artists and appearing in music videos, she has taught at EYS-Kids since day one. First-timers learn the joy of moving to the beat; experienced dancers polish their stage presence and expression, all at their own pace.',
    career: ['National High School Dance Championship winner', 'Backup dancer on an artist tour', 'EYS-Kids founding member'],
    studios: ['Ginza', 'Shibuya', 'Kawasaki', 'Ueno', 'Jiyugaoka', 'Daikanyama'],
    courses: ['Kids Hip-Hop', 'K-Pop'],
    days: [0, 2, 4],
    styleMedia,
    meters: [
      { left: 'Gentle', right: 'Strict', value: 20 },
      { left: 'For beginners', right: 'For experienced', value: 42 },
      { left: 'Theory', right: 'Feel', value: 78 },
    ],
    ratings: {
      trial: { rank: 'S', score: 5.0, count: 6, axes: axes(trialAxes, [4.4, 4.6, 4.2, 4.3, 3.8]) },
      regular: { rank: 'A', score: 4.0, count: 293, axes: axes(regularAxes, [3.4, 4.8, 4.4, 4.2, 4.3]) },
    },
  },
  {
    id: 'ren',
    name: 'Ren Kuroda',
    en: 'REN',
    rank: 'A',
    genres: ['Lock Dance', 'Kids Hip-Hop'],
    cutout: '/images/instructors/cut-a.webp',
    cutoutSize: [148, 344],
    badge: { x: 81.8, y: 44.2, size: 38 },
    avatar: '/images/instructors/avatar-a.webp',
    satisfaction: 76.4,
    satisfied: 18.2,
    catchcopy: 'Feel the groove with your whole body.',
    bio: 'Ren has battled on the lock dance scene for over 10 years, placing in many contests in Japan and abroad. His motto is "listen to the music and play with your body" – he clearly explains what each step means and how to really hear the music. His class is a popular first activity for boys.',
    career: ['Japan lock dance battle champion', 'Guest judge at international dance events', '8 years teaching kids classes'],
    studios: ['Shinjuku', 'Shibuya', 'Ueno'],
    courses: ['Lock Dance', 'Kids Hip-Hop'],
    days: [1, 3, 5],
    styleMedia,
    meters: [
      { left: 'Gentle', right: 'Strict', value: 55 },
      { left: 'For beginners', right: 'For experienced', value: 60 },
      { left: 'Theory', right: 'Feel', value: 35 },
    ],
    ratings: {
      trial: { rank: 'A', score: 4.4, count: 12, axes: axes(trialAxes, [4.0, 4.2, 4.8, 4.1, 3.9]) },
      regular: { rank: 'A', score: 4.2, count: 148, axes: axes(regularAxes, [4.0, 4.1, 4.7, 4.3, 3.8]) },
    },
  },
  {
    id: 'akagi',
    name: 'Shunsuke Akagi',
    en: 'SHUNSUKE',
    rank: 'B',
    genres: ['Breakin\''],
    cutout: '/images/instructors/cut-b.webp',
    cutoutSize: [129, 304],
    badge: { x: 80.6, y: 43.1, size: 38 },
    avatar: '/images/instructors/avatar-b.webp',
    satisfaction: 72.5,
    satisfied: 20.1,
    catchcopy: 'Handstands and windmills, one step at a time.',
    bio: 'Shunsuke began gymnastics at 4 and discovered breakin\' at 12. Using safe mats and step-by-step drills, he teaches acrobatic moves like handstands and freezes from scratch. Kids naturally build core strength and flexibility, so his class is great for young athletes in other sports, too.',
    career: ['Top 8 at the national breakin\' championship', 'Prefectural gymnastics medalist', 'Personal core-strength trainer'],
    studios: ['Ginza', 'Shibuya', 'Kawasaki', 'Ueno', 'Jiyugaoka', 'Daikanyama'],
    courses: ['Breakin\'', 'Kinder Rhythm'],
    days: [0, 2, 4],
    styleMedia,
    meters: [
      { left: 'Gentle', right: 'Strict', value: 30 },
      { left: 'For beginners', right: 'For experienced', value: 25 },
      { left: 'Theory', right: 'Feel', value: 50 },
    ],
    ratings: {
      trial: { rank: 'A', score: 4.3, count: 9, axes: axes(trialAxes, [4.1, 3.9, 4.6, 4.4, 4.0]) },
      regular: { rank: 'B', score: 3.9, count: 87, axes: axes(regularAxes, [3.6, 4.0, 4.3, 3.9, 3.7]) },
    },
  },
  {
    id: 'yuna',
    name: 'Yuna Shiraishi',
    en: 'YUNA',
    rank: 'C',
    genres: ['Kids Jazz', 'K-Pop'],
    cutout: '/images/instructors/cut-c.webp',
    cutoutSize: [102, 234],
    badge: { x: 76.5, y: 41.9, size: 42 },
    avatar: '/images/instructors/avatar-c.webp',
    satisfaction: 68.3,
    satisfied: 24.0,
    catchcopy: 'Move gracefully and express the real you.',
    bio: 'Trained in classical ballet, Yuna performed as a theme park dancer before teaching Kids Jazz and K-Pop. She focuses on fundamentals like flexibility and isolations while sharing the joy of expressing feelings through music.',
    career: ['5 years as a theme park dancer', '15 years of classical ballet', 'Many stage and musical performances'],
    studios: ['Shinjuku', 'Jiyugaoka', 'Daikanyama'],
    courses: ['Kids Jazz', 'K-Pop'],
    days: [1, 4, 5],
    styleMedia,
    meters: [
      { left: 'Gentle', right: 'Strict', value: 15 },
      { left: 'For beginners', right: 'For experienced', value: 35 },
      { left: 'Theory', right: 'Feel', value: 62 },
    ],
    ratings: {
      trial: { rank: 'B', score: 4.1, count: 5, axes: axes(trialAxes, [4.2, 4.0, 4.3, 4.0, 3.6]) },
      regular: { rank: 'B', score: 4.0, count: 64, axes: axes(regularAxes, [3.8, 4.2, 4.2, 4.0, 3.8]) },
    },
  },
  {
    id: 'kai',
    name: 'Kai Kazama',
    en: 'KAI',
    rank: 'D',
    genres: ['Kids Hip-Hop'],
    cutout: '/images/instructors/cut-d.webp',
    cutoutSize: [89, 160],
    badge: { x: 76, y: 35, size: 38 },
    avatar: '/images/instructors/avatar-d.webp',
    satisfaction: 61.2,
    satisfied: 27.5,
    catchcopy: 'Let\'s make one awesome routine together!',
    bio: 'Kai choreographed for his university dance club and placed in student contests. He joined EYS-Kids this year, teaching kinder through junior classes. Like a fun big brother, he\'s great at creating a friendly vibe – even during breaks.',
    career: ['Student dance contest finalist', 'Choreographer for a university dance club'],
    studios: ['Kawasaki', 'Ueno'],
    courses: ['Kids Hip-Hop', 'Kinder Rhythm'],
    days: [3, 5, 6],
    styleMedia,
    meters: [
      { left: 'Gentle', right: 'Strict', value: 22 },
      { left: 'For beginners', right: 'For experienced', value: 18 },
      { left: 'Theory', right: 'Feel', value: 70 },
    ],
    ratings: {
      trial: { rank: 'B', score: 4.0, count: 3, axes: axes(trialAxes, [3.8, 4.0, 4.1, 3.7, 4.2]) },
      regular: { rank: 'C', score: 3.7, count: 21, axes: axes(regularAxes, [3.5, 3.8, 4.0, 3.6, 3.9]) },
    },
  },
]

export const staff: StaffMember[] = [
  {
    id: 'nakajima',
    name: 'Chihiro Nakajima',
    role: 'Former EYS Curriculum Lead',
    photo: '/images/instructors/staff-nakajima.webp',
    photoSize: [100, 200],
    text: 'Chihiro led curriculum development at EYS-Kids. Working side by side with our instructors, she built lessons that teach not only dance skills but also greetings and caring for friends.',
  },
  {
    id: 'tanaka',
    name: 'Yujiro Tanaka',
    role: 'Former EYS Systems Engineer',
    photo: '/images/instructors/staff-tanaka.webp',
    photoSize: [152, 205],
    text: 'Yujiro designed our online booking and Karte (progress report) systems, building easy-to-use tools that let parents check in on lessons and progress anytime.',
  },
  {
    id: 'yuki',
    name: 'Chinatsu Yuki',
    role: 'Studio Operations Director',
    photo: '/images/instructors/staff-yuki.webp',
    photoSize: [171, 197],
    text: 'Chinatsu oversees studio operations and event planning nationwide. From recitals to local festivals, she produces stages all year round where kids can feel the joy of dancing.',
  },
  {
    id: 'sugimoto',
    name: 'Koichi Sugimoto',
    role: 'Dance School Lead',
    org: 'InspiartZ',
    photo: '/images/instructors/staff-sugimoto.webp',
    photoSize: [136, 186],
    text: 'Koichi hires and trains our instructors. He scouts for people with real skill and a warm way with kids, and runs regular training to keep our teaching quality high.',
  },
]

const items = (scores: number[]) => ['Facilities & vibe', 'Value', 'Booking system', 'Curriculum', 'Instructor'].map((label, i) => ({ label, score: scores[i] }))

const reviewTexts = [
  'It was my child\'s first time dancing and they were nervous, but the instructor demonstrated each move one by one, and by the end they were dancing on their own. Hearing "I want to go again!" after class made my day.',
  'My child made friends in class and looks forward to lessons every week. Practicing for the recital built real confidence – now they dance proudly in front of an audience.',
  'The instructor explains the meaning and tricks behind each move, so my child can practice alone at home. It\'s reassuring that progress is closely tracked, and we can see how they\'re growing in the Karte.',
  'The studio is bright and clean, and I love that we can watch from the waiting area. Booking make-up lessons in the app is easy, so it\'s simple to stick with.',
]

export const instructorReviews: InstructorReview[] = instructors.flatMap((inst, n) => [
  {
    id: `${inst.id}-1`,
    instructorId: inst.id,
    name: 'Sota Takaya',
    profile: 'Grade 2 / Boy / Parent',
    avatar: '/images/voice/takaya.webp',
    genre: inst.genres[0],
    course: inst.courses[0],
    trialDate: 'August 20, 2025',
    joinDate: 'August 27, 2025',
    trial: { text: reviewTexts[n % 4], total: 4.0, items: items([4.0, 4.0, 4.0, 4.0, 4.0]) },
    regular: { text: reviewTexts[(n + 1) % 4], total: 4.0, items: items([4.0, 3.8, 4.2, 4.0, 4.5]) },
  },
  {
    id: `${inst.id}-2`,
    instructorId: inst.id,
    name: 'Hinata Sato',
    profile: 'Kindergarten / Girl / Parent',
    avatar: '/images/voice/member-3.webp',
    genre: inst.genres[inst.genres.length - 1],
    course: inst.courses[inst.courses.length - 1],
    trialDate: 'April 6, 2025',
    joinDate: 'April 13, 2025',
    trial: { text: reviewTexts[(n + 2) % 4], total: 4.5, items: items([4.5, 4.0, 4.5, 4.0, 5.0]) },
    regular: { text: reviewTexts[(n + 3) % 4], total: 4.2, items: items([4.5, 4.0, 4.0, 4.0, 4.5]) },
  },
  {
    id: `${inst.id}-3`,
    instructorId: inst.id,
    name: 'Minato Yamamoto',
    profile: 'Grade 4 / Boy / Parent',
    avatar: '/images/voice/member-2.webp',
    genre: inst.genres[0],
    course: inst.courses[0],
    trialDate: 'November 2, 2024',
    joinDate: 'November 9, 2024',
    trial: { text: reviewTexts[(n + 1) % 4], total: 3.8, items: items([3.5, 4.0, 3.5, 4.0, 4.0]) },
    regular: { text: reviewTexts[n % 4], total: 4.1, items: items([4.0, 4.0, 4.0, 4.0, 4.5]) },
  },
])
