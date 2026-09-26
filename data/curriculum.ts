// Curriculum page: lesson flow, learning environment (curricle.png) and trial reports (dance-feature1.jpg).

export interface LessonStep {
  title: string
  minutes: number
  body: string
  color: string
}

export const lessonFlow: LessonStep[] = [
  { title: 'Greetings & Kids Communication', minutes: 5, body: 'A cheerful hello and a quick look at today\'s goal. This is also where kids learn good manners.', color: '#8DC21F' },
  { title: 'Stretching & Core Training', minutes: 10, body: 'Flexibility exercises to prevent injuries, plus core training for a strong, steady body.', color: '#13B5B1' },
  { title: 'Rhythm Training', minutes: 10, body: 'Clapping and up-and-down bounces help kids feel the beat with their whole body.', color: '#23AADD' },
  { title: 'Basic Steps', minutes: 15, body: 'Kids practice the basic steps of their genre, matched to each child\'s level.', color: '#A66BF0' },
  { title: 'Choreography & Group Work', minutes: 15, body: 'Kids combine the steps they\'ve learned and finish a piece together with their friends.', color: '#FF5860' },
  { title: 'Show & Reflect', minutes: 5, body: 'Kids perform for the group. After class, the instructor sends parents a Karte (progress report).', color: '#FF9300' },
]

export interface EnvItem {
  no: number
  title: string
  body: string
  color: string
  /** pastel tint behind the photo */
  tint: [string, string]
  image?: string
  alt?: string
}

export const environmentIntro = {
  title: 'A learning environment you can truly trust',
  lead: 'For children to grow and let their talents bloom, we believe it\'s essential to offer a space where both kids and parents feel comfortable and safe.',
}

export const environment: EnvItem[] = [
  { no: 1, title: 'Air-conditioned studios', body: 'Every studio has commercial-grade air conditioning, so lessons are comfortable all year round.', color: '#8DC21F', tint: ['#C8F2EE', '#E3F2C4'], image: '/images/curriculum/env-1.webp', alt: 'Commercial air conditioner installed in a studio' },
  { no: 2, title: 'High-performance air purifiers', body: 'Air purifiers with sterilization keep the air clean at all times.', color: '#F2B400', tint: ['#FFB3B3', '#FFE08A'], image: '/images/curriculum/env-2.webp', alt: 'Air purifier with sterilization function' },
  { no: 3, title: 'Infection prevention', body: 'Our staff and instructors follow thorough infection prevention measures.', color: '#23AADD', tint: ['#E2D3FA', '#C8E8F7'] },
  { no: 4, title: 'Kid-sized interiors', body: 'Colorful furniture and interiors sized just right for little ones.', color: '#34C3CF', tint: ['#E6E6E6', '#F2F2F2'], image: '/images/curriculum/env-4.webp', alt: 'Waiting area with furniture sized for children' },
  { no: 5, title: 'Cushioned floors', body: 'Soft, cushioned floors and walls that are gentle on energetic kids.', color: '#FF5860', tint: ['#F2F2F2', '#FFFFFF'], image: '/images/curriculum/env-5.webp', alt: 'Cross-section of the cushioned studio floor' },
  { no: 6, title: 'Convenient locations', body: 'Close to the station, so getting there with kids in tow is easy.', color: '#A66BF0', tint: ['#E6E6E6', '#F2F2F2'], image: '/images/curriculum/env-6.webp', alt: 'Studio entrance near the station' },
  { no: 7, title: 'Smart locks', body: 'Every room is secured for peace of mind.', color: '#13B5B1', tint: ['#E6E6E6', '#F2F2F2'], image: '/images/curriculum/env-7.webp', alt: 'Smart lock on a studio door' },
  { no: 8, title: 'Temperature & face-recognition entry', body: 'Double security with temperature checks and face recognition.', color: '#8DC21F', tint: ['#C8F2EE', '#E3F2C4'], image: '/images/curriculum/env-8.webp', alt: 'Entry terminal with temperature check and face recognition' },
  { no: 9, title: 'Security cameras', body: 'Our studios are monitored by Nest security cameras.', color: '#F2B400', tint: ['#C8F2EE', '#E2D3FA'], image: '/images/curriculum/env-9.webp', alt: 'Security camera installed in a studio' },
  { no: 10, title: 'Diaper-changing tables', body: 'Some changing rooms have diaper-changing tables. Feel free to use them before or after lessons.', color: '#FF9300', tint: ['#FFB3B3', '#FFE08A'], image: '/images/curriculum/env-10.webp', alt: 'Diaper-changing table in a changing room' },
]

export interface Report {
  title: string
  parent: string
  child: string
  meta: string
  image: string
  tags?: string[]
}

export const reportIntro = {
  lead: 'Our official reporters try out\nEYS-Kids Dance Academy ♪',
}

export const featuredReport: Report = {
  title: 'Wait, you can use that?! A rhythm game with everyday objects!',
  parent: 'Nao Yoshioka',
  child: 'Zen Yoshioka (5)',
  meta: 'Shop clerk / 2 kids / Class: Kids Rhythm Dance',
  image: '/images/curriculum/report-main.webp',
  tags: ['Tried a trial lesson', 'New to dance'],
}

export const reports: Report[] = [
  { title: 'First time at HIP-HOP, dancing a whole song in just 60 minutes!', parent: 'Misaki Sato', child: 'Hina Sato (7)', meta: 'Office worker / Age 24 / Class: HIP-HOP', image: '/images/curriculum/report-1.webp' },
  { title: 'My shy daughter is now all smiles, hooked on cheer dance with friends', parent: 'Yumi Takahashi', child: 'Yui Takahashi (8)', meta: 'Nurse / 1 child / Class: Cheer Dance', image: '/images/curriculum/report-2.webp' },
]

export interface Article {
  date: string
  author: string
  title: string
  excerpt: string
  image: string
}

export const popularArticles: Article[] = [
  { date: '2026/08/06', author: 'Kazuho Ishida', title: 'Part 1: What a trial lesson taught me about the real magic of kids\' dance', excerpt: 'Just moving to the beat changed my child\'s face completely. Here\'s how our very first lesson went.', image: '/images/curriculum/article-1.webp' },
  { date: '2026/08/20', author: 'Kazuho Ishida', title: 'Part 2: Fixed schedule + free make-ups: really that easy?', excerpt: 'Could our busy family keep it up? After a month, here\'s how we plan our week.', image: '/images/curriculum/article-2.webp' },
  { date: '2026/09/03', author: 'Kazuho Ishida', title: 'Part 3: First choreography practice for the recital', excerpt: 'Creating a piece with friends helped my daughter find the drive to see things through. We went behind the scenes at practice.', image: '/images/curriculum/article-3.webp' },
  { date: '2026/09/17', author: 'Kazuho Ishida', title: 'Part 4: How the post-lesson Karte got us talking more at home', excerpt: 'The instructor sends a Karte after every class. Knowing what she mastered and what\'s next makes practice at home easier.', image: '/images/curriculum/article-4.webp' },
  { date: '2026/10/01', author: 'Kazuho Ishida', title: 'Part 5: Which plan works best for siblings?', excerpt: 'We asked the studio manager how to combine the sibling discount and free make-up lessons to make drop-offs easier.', image: '/images/curriculum/article-1.webp' },
  { date: '2026/10/15', author: 'Kazuho Ishida', title: 'Part 6: Recital day! Backstage with the kids', excerpt: 'The nerves right before the show and the smiles after the last move. A day packed with three months of growth.', image: '/images/curriculum/article-3.webp' },
]

export interface Family {
  name: string
  meta: string
  image: string
}

export const families: Family[] = [
  { name: 'The Ishidas', meta: 'Shop clerk / Class: HIP-HOP', image: '/images/curriculum/family-1.webp' },
  { name: 'The Nakamuras', meta: 'Office worker / Class: Jazz', image: '/images/curriculum/family-2.webp' },
  { name: 'The Kobayashis', meta: 'Self-employed / Class: Kids Rhythm', image: '/images/curriculum/family-3.webp' },
  { name: 'The Yamamotos', meta: 'Civil servant / Class: Cheer Dance', image: '/images/curriculum/family-4.webp' },
  { name: 'The Katos', meta: 'Office worker / Class: Theme Park', image: '/images/curriculum/family-2.webp' },
  { name: 'The Yoshidas', meta: 'Homemaker / Class: House', image: '/images/curriculum/family-1.webp' },
]
