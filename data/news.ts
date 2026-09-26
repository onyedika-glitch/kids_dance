// News / topics / column articles (News.png, New.png, /news)

export type NewsCategory = 'New Studio' | 'Recital' | 'Event' | 'Campaign' | 'Notice' | 'Column'

export const newsCategories: { id: NewsCategory, color: string }[] = [
  { id: 'New Studio', color: '#F2629B' },
  { id: 'Recital', color: '#13B5B1' },
  { id: 'Event', color: '#0FA8E0' },
  { id: 'Campaign', color: '#FF9300' },
  { id: 'Notice', color: '#0079E4' },
  { id: 'Column', color: '#A66BF0' },
]

export interface NewsAuthor {
  name: string
  role: string
}

export interface NewsItem {
  id: string
  category: NewsCategory
  date: string // YYYY-MM-DD
  title: string
  excerpt: string
  image: string
  alt: string
  video?: boolean
  author: NewsAuthor
  comment: string
  body: { heading?: string, text: string }[]
}

export type NewsSummary = Omit<NewsItem, 'body'>

const staff = {
  uetsuka: { name: 'Eri Uetsuka', role: 'PR Staff' },
  miku: { name: 'MIKU', role: 'Hip-Hop Instructor' },
  sato: { name: 'Hinata Sato', role: 'Studio Manager' },
}

export const news: NewsItem[] = [
  {
    id: 'daikanyama-grand-open',
    category: 'New Studio',
    date: '2026-09-18',
    title: 'Daikanyama Studio grand opening',
    excerpt: 'EYS has opened a brand-new studio in Daikanyama, one of Tokyo\'s most popular areas for kids\' classes! Our stylish glass-walled studio gives kids plenty of room to dance freely.',
    image: '/images/news/studio-1.webp',
    alt: 'Daikanyama Studio at dusk',
    author: staff.uetsuka,
    comment: 'The studio is easy to reach, so it\'s simple to drop by on your way home from work. There are stylish cafés and boutiques nearby, too.',
    body: [
      { text: 'EYS-Kids Dance Academy is proud to announce the opening of Daikanyama Studio in Shibuya, Tokyo. Just a 3-min walk from Daikanyama Station, this bright, glass-walled studio offers lessons for kids from Nursery (age 3–4) through Upper elementary (grades 4–6).' },
      { heading: 'Studio features', text: 'A shock-absorbing dance floor keeps even our youngest dancers safe and comfortable. We also have a lounge where parents can watch lessons.' },
      { heading: 'Grand opening trial days', text: 'To celebrate, we\'re holding free trial lessons every weekend through the end of October. Try popular genres like Hip-Hop, Jazz and Cheer Dance. Book anytime!' },
    ],
  },
  {
    id: 'recital-2026-autumn',
    category: 'Recital',
    date: '2026-09-10',
    title: 'Fall recital "EYS Fest 2026" announced',
    excerpt: 'This fall, all our studios are coming together again for a joint recital. Let\'s show off everything we\'ve learned on the big stage!',
    image: '/images/home/class-4.webp',
    alt: 'A studio set up like a stage',
    video: true,
    author: staff.sato,
    comment: 'Stage costumes are available to rent. Our instructors will fully support first-time performers, too.',
    body: [
      { text: 'Our joint recital for all studios, "EYS Fest 2026," will be held on Mon, Nov 23 (public holiday). About 400 kid dancers are scheduled to perform at a concert hall in Tokyo.' },
      { heading: 'Taking part', text: 'Participation is optional. To perform, sign up at your studio\'s front desk or on the members\' page. Rehearsals take place during regular lessons.' },
      { heading: 'Watching the show', text: 'Tickets for family and friends go on sale in mid-October. We\'ll share details as soon as they\'re confirmed.' },
    ],
  },
  {
    id: 'halloween-workshop',
    category: 'Event',
    date: '2026-09-02',
    title: 'Sign up now for our Halloween dance workshop',
    excerpt: 'Join our special costume-friendly workshop and dance along to Halloween songs together! Friends who aren\'t members are welcome, too.',
    image: '/images/news/dancer-jump.webp',
    alt: 'A girl jumping with both arms raised',
    author: staff.miku,
    comment: 'Kids dance bigger and bolder in costume! Bring your friends and come have fun with us!',
    body: [
      { text: 'On Sun, Oct 25, every studio will host a Halloween dance workshop. Costumes are more than welcome! We\'ll finish with a group photo.' },
      { heading: 'Who can join & fees', text: 'Open to kids from Nursery (age 3–4) through Upper elementary (grades 4–6). Free for members; non-member friends can join for ¥500.' },
    ],
  },
  {
    id: 'autumn-campaign',
    category: 'Campaign',
    date: '2026-08-28',
    title: 'Try Something New campaign now on',
    excerpt: 'Join now and get two months of free monthly fees, plus an original EYS-Kids tote bag!',
    image: '/images/home/karte-kids.webp',
    alt: 'EYS-Kids students laughing with their arms around each other',
    author: staff.uetsuka,
    comment: 'Enroll on the day of your free trial lesson and your enrollment fee is half off, too. Don\'t miss out!',
    body: [
      { text: 'Everyone who enrolls during the campaign period gets two months of monthly fees free, plus an original EYS-Kids tote bag.' },
      { heading: 'Eligibility', text: 'Available to families who take a free trial lesson and complete enrollment during the campaign period. Cannot be combined with other offers.' },
    ],
  },
  {
    id: 'karte-app-update',
    category: 'Notice',
    date: '2026-08-20',
    title: 'New "Skill Map" feature added to the Karte app',
    excerpt: 'Along with feedback after every lesson, you can now see your child\'s progress in areas like rhythm and expression on a chart.',
    image: '/images/home/karte-photo.webp',
    alt: 'A parent and child looking at the Karte app on a smartphone',
    author: staff.sato,
    comment: 'We hope it gives you a fun way to look back on your child\'s progress together at home.',
    body: [
      { text: 'We\'ve added a new "Skill Map" feature to the EYS-Kids Karte (progress report) app. Based on instructor assessments, it charts skills such as rhythm, expression and flexibility.' },
      { heading: 'How to use it', text: 'Update the app to the latest version and open the "Skill Map" tab on the Karte screen. You can also see progress over the past three months.' },
    ],
  },
  {
    id: 'shibuya-renewal',
    category: 'New Studio',
    date: '2026-08-05',
    title: 'Shibuya Studio reopens after renovation',
    excerpt: 'Shibuya Studio has reopened at 1.5 times its former size, with new changing rooms and a new viewing area.',
    image: '/images/news/studio-2.webp',
    alt: 'A glass-walled studio surrounded by greenery',
    author: staff.uetsuka,
    comment: 'The route from the station is easy to follow, so it\'s a convenient studio even on rainy days.',
    body: [
      { text: 'Shibuya Studio reopened in August after renovation. The lesson floor is now 1.5 times larger, so we can run more classes at the same time.' },
      { heading: 'New facilities', text: 'We\'ve added a kids-only changing room, a viewing area for parents and new hand-washing stations.' },
    ],
  },
  {
    id: 'summer-intensive-report',
    category: 'Event',
    date: '2026-07-30',
    title: 'Our summer intensive lessons are a wrap',
    excerpt: 'Lots of kids joined our three-day intensive lessons. On the final day, they performed what they learned for their parents!',
    image: '/images/home/class-2.webp',
    alt: 'A bright lesson studio',
    author: staff.miku,
    comment: 'Everyone improved amazingly in just three days. All of us instructors were so moved by how hard the kids worked.',
    body: [
      { text: 'From July 27 to 29, we held three days of summer intensive lessons. With two hours of lessons each day, the kids took on the challenge of learning a full routine.' },
      { text: 'At the final-day showcase, the kids earned a huge round of applause from their parents. Thank you to everyone who took part!' },
    ],
  },
  {
    id: 'column-daikanyama-spots',
    category: 'Column',
    date: '2026-07-22',
    title: 'Our favorite spots near Daikanyama Studio',
    excerpt: 'Perfect for while you wait during lessons! Our staff share cafés and parks within walking distance of Daikanyama Studio.',
    image: '/images/news/studio-3.webp',
    alt: 'A leafy Daikanyama street',
    author: staff.uetsuka,
    comment: 'On sunny days, we recommend a café with terrace seating.',
    body: [
      { text: 'Not sure where to spend your time during lessons? The Daikanyama Studio team picked their favorite spots within a 5-min walk.' },
      { heading: 'A café with a terrace', text: 'Just a 2-min walk to the right from the studio. Relax with a coffee on a terrace surrounded by greenery. There\'s a kids\' menu, too, so it\'s perfect for a post-lesson break.' },
      { heading: 'Saigoyama Park', text: 'A park with a wide lawn and an observation deck. Great for playing with siblings before lessons.' },
    ],
  },
  {
    id: 'column-stretch-at-home',
    category: 'Column',
    date: '2026-07-10',
    title: '5 easy stretches for kids to do at home',
    excerpt: 'Our instructor explains simple stretches that help prevent injuries and improve flexibility.',
    image: '/images/home/class-6.webp',
    alt: 'Inside a lesson studio',
    author: staff.miku,
    comment: 'The best time to stretch is after a bath, when the body is nice and warm.',
    body: [
      { text: 'Flexibility is key to becoming a better dancer. Here are five simple stretches parents and kids can do together at home.' },
      { heading: 'Never push too hard', text: 'Stop just before it starts to hurt, and hold each stretch for 20 seconds while breathing deeply. A little every day is the fastest way to improve.' },
    ],
  },
  {
    id: 'column-first-lesson',
    category: 'Column',
    date: '2026-06-28',
    title: 'Your first dance lesson: what to bring and wear',
    excerpt: 'Everything you need to know before your trial lesson, from comfortable clothes to what to pack.',
    image: '/images/news/studio-1.webp',
    alt: 'The outside of the studio',
    author: staff.sato,
    comment: 'No dance shoes? No problem. You can borrow a pair at the studio.',
    body: [
      { text: 'A first lesson can be exciting and a little nerve-racking for kids and parents alike. Here\'s a quick checklist of what to bring and wear.' },
      { heading: 'What to bring', text: 'Comfortable clothes, indoor shoes, a drink and a towel. If your child has long hair, please bring a hair tie, too.' },
    ],
  },
  {
    id: 'instructor-audition',
    category: 'Notice',
    date: '2026-06-15',
    title: 'We\'re hiring instructors for 2026',
    excerpt: 'Want to grow alongside kids at EYS-Kids? We\'re looking for dancers with a passion for education.',
    image: '/images/home/class-5.webp',
    alt: 'Inside the studio',
    author: staff.sato,
    comment: 'We offer thorough training, so you\'re in good hands even if you\'ve never taught kids before.',
    body: [
      { text: 'EYS-Kids Dance Academy is looking for instructors to teach at our studios in the Tokyo area and Kansai.' },
      { heading: 'How to apply', text: 'Send us your profile and a dance video through the application form. After reviewing your application, we\'ll invite you to an audition.' },
    ],
  },
  {
    id: 'recital-2026-spring-report',
    category: 'Recital',
    date: '2026-05-20',
    title: 'Spring recital report: thank you for coming!',
    excerpt: 'Our spring recital was a huge success. Here\'s a look back at the big day in photos.',
    image: '/images/home/class-3.webp',
    alt: 'A lesson room',
    video: true,
    author: staff.uetsuka,
    comment: 'Video of the day is now on the members\' page. Enjoy watching it with your family!',
    body: [
      { text: 'About 1,200 guests came to our spring recital in May. To all the kid dancers who performed: amazing job!' },
      { text: 'Our next recital is planned for November. Thank you for your continued support!' },
    ],
  },
]

export const categoryColor = (c: NewsCategory) => newsCategories.find(x => x.id === c)?.color ?? '#0079E4'

export function summarize(item: NewsItem): NewsSummary {
  const { body: _body, ...rest } = item
  return rest
}

// 2026-09-18 → Sep 18, 2026 (parsed from the string, so it never shifts with the time zone)
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}
