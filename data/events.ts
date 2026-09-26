// Events, recitals and workshops (Event-lists.png, Plans.png, event.png, even.png,
// Celebration.png, Comment.png, Video.png, const.png, Comm.png).
// Add / edit events here; the list, filters and /events/[id] pages read from /api/events.

export type EventType = 'recital' | 'workshop' | 'event'

export interface EventItem {
  id: string
  type: EventType
  title: string
  /** Small label above the key visual / on the photo (e.g. Maker Workshop) */
  category: string
  /** ISO dates (JST). end is set for multi-day events. */
  start: string
  end?: string
  time: string
  studio: string
  venue: string
  target: string
  price: string
  capacity: number
  remaining: number
  /** Grade tag shown on the photo (Kids / Junior …) */
  tag: string
  image?: string
  summary: string
  body: string[]
  highlights?: string[]
  instructor?: string
  featured?: boolean
  /** Visual for featured cards */
  theme?: 'craft' | 'halloween'
}

export const eventTypes: { value: EventType, label: string, color: string }[] = [
  { value: 'recital', label: 'Recitals', color: '#0079E4' },
  { value: 'workshop', label: 'Workshops', color: '#13B5B1' },
  { value: 'event', label: 'Events', color: '#FF5860' },
]

export const events: EventItem[] = [
  {
    id: 'korogaru-ou-no-mahou',
    type: 'workshop',
    title: 'The Rolling King\'s Magic',
    category: 'Maker Workshop',
    start: '2026-11-21',
    end: '2026-11-22',
    time: '10:00–12:00 / 14:00–16:00',
    studio: 'Daikanyama Studio',
    venue: 'EYS-Kids Daikanyama Studio, 3F Lab Room',
    target: 'Kindergarten (age 5–6) to Grade 6',
    price: 'Grade 3 and under ¥3,000 / Grade 4 and up ¥5,000',
    capacity: 16,
    remaining: 2,
    tag: 'Kids',
    instructor: 'Instructor: Koki Hoshi (former learning-content creator at Benesse Corporation)',
    summary: 'Kids learn how to think by exploring the everyday things and hidden mechanisms around them. Instead of being told the answers, they discover the laws of physics for themselves.',
    body: [
      'In this hands-on maker workshop, kids build marble runs out of everyday materials like cardboard and paper cups.',
      '"How can I make it roll farther?" "Why did it stop?" Through trial and error, they naturally discover physics ideas like slope angles and friction.',
      'At the end, everyone links their runs together into one giant "King\'s Road" that fills the studio. Just like dance, it\'s two hours of using both body and brain.',
    ],
    highlights: ['All materials provided', 'Kids take their creations home', 'Parents are welcome to watch'],
    image: '/images/events/studio.webp',
    featured: true,
    theme: 'craft',
  },
  {
    id: 'halloween-autumn-school-2026',
    type: 'event',
    title: 'Autumn School 2026',
    category: 'Seasonal Special',
    start: '2026-10-26',
    end: '2026-10-30',
    time: 'Morning 9:00–13:00 / Afternoon 13:00–17:00',
    studio: 'Shibuya Studio',
    venue: 'EYS-Kids Shibuya Studio',
    target: 'Pre-K (age 4–5) to Grade 4',
    price: 'Morning (with lunch) or afternoon (with snack) ¥30,000 / Full day ¥45,000',
    capacity: 30,
    remaining: 0,
    tag: 'Kids',
    summary: 'Halloween is coming again! Five days of learning and play. Every child takes English, plus one subject of their choice: dance, art, coding or music.',
    body: [
      'A special autumn-break program run jointly by all the EYS-Kids schools.',
      'Along with a daily English session, each child picks one favorite subject (dance, art, coding or music) and dives into it for five days.',
      'On the last day, it\'s a Halloween costume party! Kids show their families what they created over the week.',
    ],
    highlights: ['English × Music × Art × Coding × Dance', 'Halloween costume party on the last day', 'Plans with lunch or snack available'],
    image: '/images/events/friends.webp',
    featured: true,
    theme: 'halloween',
  },
  {
    id: 'kids-dance-battle-autumn',
    type: 'event',
    title: 'Autumn Kids Dance Battle',
    category: 'Dance Battle',
    start: '2026-10-10',
    time: '13:00–16:30',
    studio: 'Shibuya Studio',
    venue: 'EYS-Kids Shibuya Studio, Main Floor',
    target: 'Grades 1–6 (current students)',
    price: 'Free',
    capacity: 40,
    remaining: 2,
    tag: 'Kids',
    image: '/images/events/duo.webp',
    summary: '1-on-1 freestyle battles by grade! Judged by pro dancers, kids go head-to-head to the DJ\'s beats, each in their own style.',
    body: [
      'A tournament-style dance battle, grouped by grade and open to current students only.',
      'Judges are EYS-Kids instructors and guest pro dancers. It\'s not just about winning: every dancer gets a feedback card.',
    ],
    highlights: ['Feedback card for every dancer', 'Parents welcome to watch'],
  },
  {
    id: 'hiphop-workshop-guest',
    type: 'workshop',
    title: 'Hip-Hop Workshop with a Guest Instructor',
    category: 'Hip-Hop',
    start: '2026-10-18',
    time: '15:00–16:30',
    studio: 'Daikanyama Studio',
    venue: 'EYS-Kids Daikanyama Studio',
    target: 'Grades 1–6',
    price: 'Students ¥2,000 / Non-students ¥3,000',
    capacity: 20,
    remaining: 6,
    tag: 'Kids',
    image: '/images/events/lesson.webp',
    summary: 'A special lesson with a pro dancer seen on TV and in music videos. Kids take on choreography they won\'t find in their regular class.',
    body: [
      'A 90-minute special workshop led by a top professional dancer.',
      'We start with basic rhythm training, so kids who are new to hip-hop can join with confidence.',
    ],
  },
  {
    id: 'halloween-dance-party',
    type: 'event',
    title: 'Halloween Costume Dance Party',
    category: 'Seasonal Party',
    start: '2026-10-31',
    time: '16:00–18:00',
    studio: 'Ikebukuro Studio',
    venue: 'EYS-Kids Ikebukuro Studio',
    target: 'Age 3 to Grade 6',
    price: 'Students free / Siblings ¥500',
    capacity: 50,
    remaining: 0,
    tag: 'Kids',
    image: '/images/events/friends.webp',
    summary: 'Come in your favorite costume and let\'s dance together! Includes a mini lesson to Halloween songs and a treat for everyone.',
    body: [
      'Our annual Halloween party, planned by the EYS-Kids event team.',
      'With a costume contest, a mini lesson to Halloween songs and more, it\'s a great chance for kids of all ages to make friends.',
    ],
  },
  {
    id: 'parade-dance-workshop',
    type: 'workshop',
    title: 'Parade Dance Workshop',
    category: 'Theme Park Dance',
    start: '2026-11-15',
    time: '10:30–12:00',
    studio: 'Yokohama Studio',
    venue: 'EYS-Kids Yokohama Studio',
    target: 'Nursery (age 3–4) to Grade 3',
    price: 'Students ¥1,500 / Non-students ¥2,500',
    capacity: 24,
    remaining: 9,
    tag: 'Kids',
    image: '/images/events/stage-class.webp',
    summary: 'Dance to that famous theme park parade song! Kids discover the joy of performing with big smiles and gestures.',
    body: [
      'An instructor with real theme park parade experience gently teaches sparkling choreography.',
      'At the end, kids put on a mini parade for their families. Filming is welcome.',
    ],
  },
  {
    id: 'yubifes-2026-part1',
    type: 'recital',
    title: 'Yubi Fest 2026, Part 1',
    category: 'Yubi Fest',
    start: '2026-11-23',
    time: 'Starts 11:00 (doors 10:30)',
    studio: 'All studios',
    venue: 'Sakura Hall, Shibuya Culture Center Owada',
    target: 'Pre-Kids, Nursery to Kindergarten classes',
    price: 'Performer fee ¥12,000 (incl. costume rental) / Free to watch',
    capacity: 120,
    remaining: 2,
    tag: 'Kids',
    image: '/images/events/lesson.webp',
    summary: 'The big stage, once a year. Our preschool classes show off everything they\'ve practiced on a real concert hall stage.',
    body: [
      'Yubi Fest is EYS-Kids\' biggest recital, where kids show family and friends what they\'ve been working on.',
      'Each class performs its piece in a real hall with professional lighting and sound crews. Classes rehearse little by little during regular lessons, so even first-timers feel at ease.',
    ],
    highlights: ['Photo album by a professional photographer', 'Video of the performance'],
  },
  {
    id: 'yubifes-2026-part2',
    type: 'recital',
    title: 'Yubi Fest 2026, Part 2',
    category: 'Yubi Fest',
    start: '2026-11-23',
    time: 'Starts 14:00 (doors 13:30)',
    studio: 'All studios',
    venue: 'Sakura Hall, Shibuya Culture Center Owada',
    target: 'Grade 1–6 classes',
    price: 'Performer fee ¥15,000 (incl. costume rental) / Free to watch',
    capacity: 160,
    remaining: 14,
    tag: 'Junior',
    image: '/images/events/duo.webp',
    summary: 'Elementary classes from every genre, including Hip-Hop, Jazz and Lock, perform the pieces they created together as a team.',
    body: [
      'Part 2 features our elementary school classes, with creative pieces from every genre.',
      'Before the show, we hold a full rehearsal in the hall to check positions and lighting.',
    ],
    highlights: ['Photo album by a professional photographer', 'Video of the performance'],
  },
  {
    id: 'yubifes-2026-selection',
    type: 'recital',
    title: 'Yubi Fest 2026, Select Team Showcase',
    category: 'Yubi Fest',
    start: '2026-11-23',
    time: 'Starts 17:30 (doors 17:00)',
    studio: 'All studios',
    venue: 'Sakura Hall, Shibuya Culture Center Owada',
    target: 'Select team members',
    price: 'Free to watch (numbered tickets)',
    capacity: 200,
    remaining: 0,
    tag: 'Junior',
    image: '/images/events/friends.webp',
    summary: 'A special stage by our select teams, who train for dance competitions. The finale features every performer.',
    body: [
      'The final stage of Yubi Fest, bringing together the select teams from every studio.',
      'Seating is by numbered ticket. All tickets have now been handed out.',
    ],
  },
  {
    id: 'ballet-backstage-tour',
    type: 'workshop',
    title: 'Ballet Performance & Backstage Tour',
    category: 'STE-LAM',
    start: '2026-11-28',
    time: '13:00–17:00',
    studio: 'Meet at Daikanyama Studio',
    venue: 'A theater in Tokyo (details sent after booking)',
    target: 'Grades 1–6',
    price: '¥6,500 (incl. performance ticket)',
    capacity: 15,
    remaining: 4,
    tag: 'Kids',
    image: '/images/events/studio.webp',
    summary: 'A STE-LAM workshop with EYS-Kids Ballet Academy. Kids watch a professional performance and go backstage where the public never goes.',
    body: [
      'One of our STE-LAM workshops, where kids explore music, ballet and art as well as dance.',
      'Theater staff show kids the lighting and stage machinery, so they can learn about the people who make a show happen.',
    ],
  },
  {
    id: 'christmas-dance-party',
    type: 'event',
    title: 'Christmas Dance Party',
    category: 'Seasonal Party',
    start: '2026-12-20',
    time: '15:00–17:30',
    studio: 'Shibuya Studio',
    venue: 'EYS-Kids Shibuya Studio',
    target: 'Age 3 to Grade 6',
    price: 'Students free / Siblings ¥500',
    capacity: 60,
    remaining: 22,
    tag: 'Kids',
    image: '/images/events/stage-class.webp',
    summary: 'Let\'s all dance to Christmas songs! There\'s also bingo and a special show by our instructors.',
    body: [
      'Our annual year-end party, with the studio decorated for Christmas.',
      'Two and a half packed hours, with an instructor showcase and free dance time where kids of all ages dance together.',
    ],
  },
  {
    id: 'jazz-workshop-winter',
    type: 'workshop',
    title: 'Intro to Jazz Dance Workshop',
    category: 'Jazz',
    start: '2027-01-11',
    time: '10:00–11:30',
    studio: 'Ikebukuro Studio',
    venue: 'EYS-Kids Ikebukuro Studio',
    target: 'Kindergarten (age 5–6) to Grade 4',
    price: 'Students ¥1,500 / Non-students ¥2,500',
    capacity: 18,
    remaining: 12,
    tag: 'Kids',
    image: '/images/events/duo.webp',
    summary: 'Turns, jumps and other jazz dance basics, taught through games. Perfect for kids who want to try a new genre.',
    body: [
      'An intro workshop, great for anyone thinking about joining a jazz dance class.',
      'In 90 minutes, kids go from ballet-based basics to a short piece of choreography.',
    ],
  },
]

/* ---------- Page content ---------- */

export interface TypeBlock {
  type: EventType
  title: string
  bubble: string
  lead: string
  catch: string
}

export const typeBlocks: TypeBlock[] = [
  {
    type: 'recital',
    title: 'Recitals',
    bubble: 'Our big day on stage',
    lead: 'Yubi Fest is the perfect chance for kids to show family and friends everything they\'ve practiced!',
    catch: 'Their big moment on stage, with great perks for performers',
  },
  {
    type: 'workshop',
    title: 'Workshops',
    bubble: 'Keep on learning',
    lead: 'Go beyond regular lessons and take your dance further! Our workshops explore new ways to enjoy and express dance.',
    catch: 'Dance to that famous parade song!',
  },
  {
    type: 'event',
    title: 'Events',
    bubble: 'Let\'s have fun!',
    lead: 'We\'re the EYS-Kids event team, and we plan fun events all year round',
    catch: 'Halloween, Christmas and more: seasonal parties every month!',
  },
]

export const recitalNotes = [
  { side: 'left', text: 'Show family and friends how far you\'ve come!' },
  { side: 'right', text: 'Builds confidence and a sense of achievement' },
] as const

export const recitalPhotos = [
  { src: '/images/events/lesson.webp', alt: 'Kids practicing choreography in the studio' },
  { src: '/images/events/duo.webp', alt: 'Kid dancers striking a pose' },
  { src: '/images/events/stage-class.webp', alt: 'Girls dancing energetically in front of the mirror' },
  { src: '/images/events/friends.webp', alt: 'Classmates gathered together with big smiles' },
]

export const perks = {
  lead: 'A professional photographer captures everything from rehearsal to the big show, and we turn every moment of your child\'s day on stage into an original keepsake album.',
  items: ['Free photo album!', 'Free video of the performance!'],
}

export interface SteLamGenre {
  name: string
  school: string
  color: string
  shape: 'diamond' | 'circle' | 'pentagon' | 'triangle'
  programs: string[]
}

export const steLam = {
  lead: 'Because EYS-Kids runs many different schools, we host one-off "STE-LAM workshops" in music, ballet, art and design, not just dance.\nYour child might just discover a new talent!',
  genres: [
    { name: 'Music', school: 'EYS-Kids Music School', color: '#6F8CF2', shape: 'diamond', programs: ['Rock & pop band', 'Jazz session', 'Guest musicians from abroad', 'Concerto workshop'] },
    { name: 'Ballet', school: 'Ballet Academy', color: '#9C7A55', shape: 'circle', programs: ['Pro performance & backstage tour'] },
    { name: 'English', school: 'EYS-Kids English Dojo', color: '#2DB9A0', shape: 'pentagon', programs: ['Halloween in English'] },
    { name: 'Art & Design', school: 'Art & Design', color: '#8DC21F', shape: 'triangle', programs: ['Mural workshop', 'Hands-on with computers'] },
  ] as SteLamGenre[],
  bubbles: [
    { text: 'Art and design sound fun too!', color: '#5FB4C6' },
    { text: 'Looks like she loves music', color: '#A884EE' },
    { text: 'Classical ballet is so cool!', color: '#E071B6' },
  ],
  message: 'Only for EYS-Kids students! Join workshops run by our other schools, too!',
}

export const applySteps = [
  { no: 1, text: 'Choose an event', color: '#A66BF0' },
  { no: 2, text: 'Check the date and who it\'s for', color: '#13B5B1' },
  { no: 3, text: 'Apply with the booking button', color: '#FF5860' },
  { no: 4, text: 'Get a confirmation email, and you\'re set!', color: '#FF9300' },
]

/* ---------- Activity page ---------- */

export interface ActivityHighlight {
  title: string
  bubble: string
  lead: string
  image: string
  alt: string
  points: string[]
}

export const activityHighlights: ActivityHighlight[] = [
  {
    title: 'Recitals & Stage',
    bubble: 'The big stage, once a year',
    lead: 'At our yearly Yubi Fest, kids perform on a real concert hall stage. After weeks of practice, show day is when they grow the most.',
    image: '/images/activity/class.webp',
    alt: 'Kids dancing energetically in front of the mirror',
    points: ['Full rehearsal in the hall', 'Professional photographer', 'A finale where everyone shines'],
  },
  {
    title: 'Workshops',
    bubble: 'Try something new',
    lead: 'Through lessons with guest instructors and STE-LAM workshops in music, ballet and art, kids find new passions beyond dance.',
    image: '/images/activity/duo.webp',
    alt: 'Two kid dancers striking a pose',
    points: ['Special lessons with pro dancers', 'Taster classes at our other schools', 'Parent-and-child programs'],
  },
  {
    title: 'Seasonal Events',
    bubble: 'Let\'s have fun!',
    lead: 'Our event team plans a party every month, from Halloween to Christmas. Kids make friends across grades and studios.',
    image: '/images/activity/friends.webp',
    alt: 'Classmates gathered together with big smiles',
    points: ['Costume dance parties', 'Dance battles', 'Summer camp'],
  },
  {
    title: 'In the Community',
    bubble: 'Out on local stages',
    lead: 'Our dancers love performing locally, from shopping street festivals and community culture fairs to visits at care facilities.',
    image: '/images/activity/studio.webp',
    alt: 'Kids rehearsing choreography together in the studio',
    points: ['Local festival performances', 'Visiting performances at care facilities', 'Charity events'],
  },
]

export const activityStats = [
  { value: '12', unit: '/yr', label: 'Events' },
  { value: '800', unit: '', label: 'Recital performers' },
  { value: '30', unit: '', label: 'Community shows' },
]

export const activityPhotos = [
  { src: '/images/activity/class.webp', alt: 'Kids in the middle of a lesson', caption: 'Everyday lessons', wide: true },
  { src: '/images/activity/snap1.webp', alt: 'Girls posing together for a photo', caption: 'Classmates' },
  { src: '/images/activity/girl.webp', alt: 'A girl dancing with a focused look', caption: 'Recital rehearsal' },
  { src: '/images/activity/snap4.webp', alt: 'Kids making peace signs', caption: 'Halloween party' },
  { src: '/images/activity/studio.webp', alt: 'Kids dancing in the studio', caption: 'Workshop' },
  { src: '/images/activity/snap3.webp', alt: 'Kids dancing with an instructor', caption: 'Guest lesson' },
  { src: '/images/activity/friends.webp', alt: 'Smiling girls', caption: 'Dance battle' },
  { src: '/images/activity/snap2.webp', alt: 'A girl looking straight ahead', caption: 'Before the show' },
  { src: '/images/activity/duo.webp', alt: 'Two kid dancers striking a pose', caption: 'Showcase' },
]

export const activityVoices = [
  { text: 'My first time on stage! I was nervous, but it was so much fun!', who: 'Yui, Kindergarten', color: '#5FB4C6' },
  { text: 'I made it to the semifinals in the battle!', who: 'Sota, Grade 3', color: '#A884EE' },
  { text: 'I made friends with kids from other studios', who: 'Mio, Grade 5', color: '#E071B6' },
]

/* ---------- Helpers ---------- */

const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTH_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function parts(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  const day = new Date(Date.UTC(y, m - 1, d)).getUTCDay()
  return { y, m, d, day }
}

/** Nov 21–22  +  Sat–Sun  (Event-lists.png date header) */
export function eventDate(e: Pick<EventItem, 'start' | 'end'>) {
  const s = parts(e.start)
  if (!e.end) return { date: `${MONTH[s.m - 1]} ${s.d}`, week: WEEK[s.day] }
  const t = parts(e.end)
  const endLabel = t.m === s.m ? `${t.d}` : `${MONTH[t.m - 1]} ${t.d}`
  return {
    date: `${MONTH[s.m - 1]} ${s.d}–${endLabel}`,
    week: `${WEEK[s.day]}–${WEEK[t.day]}`,
  }
}

/** Sat, November 21 – Sun, November 22, 2026 */
export function eventDateLong(e: Pick<EventItem, 'start' | 'end'>) {
  const s = parts(e.start)
  const head = `${WEEK[s.day]}, ${MONTH_LONG[s.m - 1]} ${s.d}`
  if (!e.end) return `${head}, ${s.y}`
  const t = parts(e.end)
  const tail = `${WEEK[t.day]}, ${MONTH_LONG[t.m - 1]} ${t.d}, ${t.y}`
  return t.y === s.y ? `${head} – ${tail}` : `${head}, ${s.y} – ${tail}`
}

export function eventStatus(e: Pick<EventItem, 'remaining'>) {
  if (e.remaining <= 0) return { full: true, few: false, label: 'Fully booked' }
  return { full: false, few: e.remaining <= 3, label: 'Open for booking' }
}

export function eventTypeLabel(t: EventType) {
  return eventTypes.find(x => x.value === t)!
}
