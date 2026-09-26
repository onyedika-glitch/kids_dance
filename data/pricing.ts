// Plans & Pricing page: fixed-slot + free make-up concept (Lesson.png card 3), plans (choice.png), fees, FAQ.

export interface SystemPoint {
  key: string
  title: string
  lead: string
  body: string
}

export const systemPoints: SystemPoint[] = [
  {
    key: 'Fixed Schedule',
    title: 'A fixed weekly schedule: same day, same time, every week',
    lead: 'Easy to keep up, because it fits your routine',
    body: 'When you enroll, you choose a day and time slot, and your child attends the same class every week. Dancing with the same friends and the same instructor lets the instructor follow your child\'s progress closely, and lessons become a natural part of your family\'s routine.',
  },
  {
    key: 'Free Make-ups',
    title: 'Free make-up lessons, so missing a class is no problem',
    lead: 'Sick days and school events won\'t cost you',
    body: 'Any lesson you miss can be swapped for free into another class of the same genre and level. Just let us know by 9:00 p.m. the day before, and you can book as many make-up lessons as you need within two months of the missed class. Your monthly fee never goes to waste, and your child never falls behind.',
  },
]

export interface MakeupStep {
  title: string
  body: string
}

export const makeupSteps: MakeupStep[] = [
  { title: 'Report the absence in the app', body: 'Send an absence notice from the parent app by 9:00 p.m. the day before the lesson.' },
  { title: 'Choose a make-up class', body: 'Pick an open date and time in a class of the same genre and level, and book it in the app.' },
  { title: 'Join the make-up lesson', body: 'Just come to the class you booked. You\'ll get a Karte afterward, as always.' },
]

export interface Plan {
  id: string
  name: string
  tag: string
  color: string
  price: number
  perLesson: string
  frequency: string
  duration: string
  genres: string
  makeup: string
  recommended?: boolean
  note: string
}

export const plans: Plan[] = [
  {
    id: 'light',
    name: 'Light Plan',
    tag: '2×/month',
    color: '#8DC21F',
    price: 7800,
    perLesson: '¥3,900 per lesson',
    frequency: '2 lessons/month (every other week, fixed schedule)',
    duration: '50–60 min per lesson',
    genres: '1 genre',
    makeup: 'Up to 1 free make-up lesson/month',
    note: 'Great for busy kids or first-time dancers',
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    tag: 'Weekly',
    color: '#23AADD',
    price: 12800,
    perLesson: '¥3,200 per lesson',
    frequency: '4 lessons/month (weekly, fixed schedule)',
    duration: '50–60 min per lesson',
    genres: '1 genre',
    makeup: 'Unlimited free make-up lessons',
    recommended: true,
    note: 'Our most popular plan, chosen by about 70% of students',
  },
  {
    id: 'double',
    name: 'Double Plan',
    tag: '2×/week',
    color: '#A66BF0',
    price: 21800,
    perLesson: '¥2,725 per lesson',
    frequency: '8 lessons/month (twice a week, fixed schedule)',
    duration: '50–75 min per lesson',
    genres: 'Up to 2 genres',
    makeup: 'Unlimited free make-up lessons',
    note: 'For kids who want to learn two genres at once',
  },
]

export interface Fee {
  item: string
  price: string
  note: string
  highlight?: boolean
}

export const fees: Fee[] = [
  { item: 'Trial lesson', price: 'Free', note: 'One 60-minute lesson. No need to bring anything.', highlight: true },
  { item: 'Enrollment fee', price: '¥11,000', note: 'Free during campaign periods', highlight: true },
  { item: 'Monthly fee', price: '¥7,800–¥21,800', note: 'Varies by plan (see above)' },
  { item: 'Facility fee', price: '¥1,100/month', note: 'Upkeep of air conditioning, air purifiers and security systems' },
  { item: 'Annual fee', price: '¥3,300/year', note: 'Includes sports safety insurance. Renews every April.' },
  { item: 'Recital fee', price: 'From ¥8,800', note: 'Once a year, optional. Costumes are extra (at cost).' },
  { item: 'Free make-up lessons', price: '¥0', note: 'Can be booked within two months of the missed lesson', highlight: true },
]

export interface Discount {
  title: string
  body: string
}

export const discounts: Discount[] = [
  { title: 'Sibling Discount', body: '10% off the monthly fee for every additional child, every month' },
  { title: 'Two-Genre Savings', body: 'The Double Plan lowers the price per lesson' },
  { title: 'Refer a Friend', body: 'Both your family and the new family get half off one month\'s fee' },
]

export interface Faq {
  q: string
  a: string
}

export const faqs: Faq[] = [
  { q: 'Are there any costs besides the monthly fee?', a: 'There is a facility fee (¥1,100/month) and an annual fee (¥3,300/year, including sports safety insurance). The recital is optional; the participation fee and costume costs apply only if your child takes part.' },
  { q: 'Is the monthly fee refunded if my child misses a lesson?', a: 'We don\'t offer refunds, but you can use free make-up lessons instead. Within two months of the missed lesson, your child can join another class of the same genre and level at no charge.' },
  { q: 'Can we change plans or genres later?', a: 'Yes. Complete the change by the 20th of the month and it takes effect the following month. There is no fee for changes.' },
  { q: 'How do I pay?', a: 'The monthly fee for the following month is paid on the 27th by bank transfer or credit card. For the initial fees at enrollment only, we also accept credit card or cash at the studio.' },
  { q: 'Can we take a break or cancel?', a: 'You can pause for one to three months, in one-month steps, for ¥1,100/month. To cancel, complete the process in the parent app or at the studio by the 20th of the previous month.' },
  { q: 'What should we bring to the trial lesson?', a: 'Please bring comfortable clothes, indoor shoes, a drink and a towel. Indoor shoes are also available to borrow for free.' },
]
