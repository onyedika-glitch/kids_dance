// Updates from Tiny Explorers Hub (/news, home page "Latest updates")

export type NewsCategory = 'Milestone' | 'New Series' | 'Announcement'

export const newsCategories: { id: NewsCategory, color: string }[] = [
  { id: 'Milestone', color: '#EE6D0C' },
  { id: 'New Series', color: '#1E88E5' },
  { id: 'Announcement', color: '#3DAA3C' },
]

export interface NewsItem {
  id: string
  category: NewsCategory
  date: string // YYYY-MM-DD
  title: string
  excerpt: string
  image: string
  alt: string
  /** Related video: /videos/<slug> */
  video?: string
  /** Extra call-to-action link */
  link?: { label: string, to: string }
  body: { heading?: string, text: string }[]
}

export type NewsSummary = Omit<NewsItem, 'body'>

export const news: NewsItem[] = [
  {
    id: 'website-launch',
    category: 'Announcement',
    date: '2026-10-01',
    title: 'Welcome to our brand-new website!',
    excerpt: 'Tiny Explorers Hub now has a home of its own on the web: every video in one place, sorted by topic, with simple ideas to try at home.',
    image: '/images/posters/making-learning-fun.webp',
    alt: 'Smiling children sitting together on a classroom rug',
    link: { label: 'Browse all videos', to: '/videos' },
    body: [
      { text: 'Until now you could find our short learning videos on Facebook and YouTube. Today we are opening a website where every video lives together, so parents and teachers can find the right one in seconds.' },
      { heading: 'What you will find here', text: 'Videos sorted into ABCs & Phonics, Amazing Animals, Songs & Culture, Faith & Values and Family Fun. The ABC Adventure page shows every letter we have filmed so far, and many videos come with a simple "try this at home" idea.' },
      { heading: 'Made for families', text: 'The site has no ads and no trackers, and nothing on it asks children for information. Grown-ups can like their favourite videos, and the most-loved ones show up on our Most Loved page.' },
      { text: 'Have a look around, tell us what you think, and keep an eye out for new letters every week.' },
    ],
  },
  {
    id: 'animal-facts-series',
    category: 'New Series',
    date: '2026-09-29',
    title: 'New series: amazing animal facts',
    excerpt: 'Our newest series brings wow-facts about the creatures we share the world with, starting with the octopus and a very sneaky chameleon.',
    image: '/images/posters/hidden-chameleon.webp',
    alt: 'A green chameleon hiding among jungle leaves',
    video: 'hidden-chameleon',
    body: [
      { text: 'Little explorers love a surprising fact, so we started a new series all about animals. Each video is just a few seconds long and ends with a question to talk about together.' },
      { heading: 'The animal with three hearts', text: 'Our first episode meets the octopus, the ocean\'s smartest magician. Did you know it has three hearts, and that its blood is blue?' },
      { heading: 'Spot the hidden chameleon', text: 'In episode two, chameleons change colour to hide in the leaves. Can your child spot one in under five seconds? Pause the video, zoom in and test your family\'s detective skills.' },
    ],
  },
  {
    id: 'first-50-followers',
    category: 'Milestone',
    date: '2026-09-24',
    title: 'Thank you for our first 50 followers!',
    excerpt: 'Our little Facebook page reached 50 followers. Thank you to every parent, teacher and friend who is learning along with us.',
    image: '/images/posters/happy-new-week.webp',
    alt: 'Three happy children running across a sunny park',
    link: { label: 'Follow on Facebook', to: 'https://www.facebook.com/profile.php?id=61593398853461' },
    body: [
      { text: 'Tiny Explorers Hub started with one simple idea: short, cheerful videos that help toddlers and preschoolers learn. Our Facebook page has now celebrated its first 50 followers, and we are so grateful.' },
      { heading: 'Big dreams start small', text: 'Every like, share and comment helps another family find us. Thank you for watching, for learning the letters with your little ones, and for cheering us on.' },
      { text: 'More letters, animal facts and songs are on the way. Invite a friend to follow along!' },
    ],
  },
  {
    id: 'youtube-channel',
    category: 'Announcement',
    date: '2026-09-15',
    title: 'We are on YouTube now!',
    excerpt: 'Tiny Explorers Hub has a new YouTube channel with three videos so far, including our first phonics lesson for the letter A.',
    image: '/images/posters/letter-a.webp',
    alt: 'A teacher holding up a big letter A and a red apple for a group of children',
    link: { label: 'Subscribe on YouTube', to: 'https://www.youtube.com/@tinyexplorershub9?sub_confirmation=1' },
    body: [
      { text: 'Lots of families watch on a TV or tablet, so we opened a YouTube channel. It started with a little hello, "Let\'s Learn Together, Little Ones!"' },
      { heading: 'Three videos so far', text: 'Along with the hello video you will find "Learn Letter A with Fun!", a phonics lesson for toddlers and preschoolers, and "Bet You Didn\'t Know This Animal Has THREE Hearts!" about the octopus.' },
      { text: 'Subscribe so you never miss a new one. You can also watch all three right here on our website.' },
    ],
  },
  {
    id: 'alphabet-series',
    category: 'New Series',
    date: '2026-08-24',
    title: 'The ABC Adventure begins!',
    excerpt: 'Our alphabet series is here! Meet a letter, hear its sound and find words that start with it. Letters A to L are ready to watch.',
    image: '/images/posters/letter-k.webp',
    alt: 'A big green letter K next to a cartoon kangaroo',
    link: { label: 'Open the ABC Adventure', to: '/abc' },
    video: 'letter-a',
    body: [
      { text: 'Learning the alphabet does not have to be boring. Our ABC Adventure started with "A is for Apple" and new letters have kept arriving ever since.' },
      { heading: 'Letters A to L so far', text: 'From B for ball and bear to I for igloo, J for jump and jellyfish, K for kite and kangaroo, and L for lions and lemons. Every video is about ten seconds long, just right for little attention spans.' },
      { heading: 'Learn with the whole body', text: 'Most letters come with a simple idea to try at home, like hopping like a kangaroo while saying the "k" sound. The rest of the alphabet is on its way.' },
    ],
  },
  {
    id: 'alphabet-trailer',
    category: 'New Series',
    date: '2026-08-22',
    title: 'Sneak peek: our animated alphabet trailer',
    excerpt: 'Turn screen time into learning time! Our animated trailer gives a first look at the alphabet adventures to come.',
    image: '/images/posters/alphabet-trailer.webp',
    alt: 'A cartoon boy smiling at a glowing letter A surrounded by floating letters',
    video: 'alphabet-trailer',
    body: [
      { text: 'Before the first letter arrived, we shared a short animated trailer to show what the ABC Adventure would look like: bright colours, happy faces and letters that come to life.' },
      { heading: 'Why animation?', text: 'Movement and colour help little ones notice the shape of each letter and remember its sound. It is the same idea behind every video we make: learning should feel like play.' },
    ],
  },
]

export const categoryColor = (c: NewsCategory) => newsCategories.find(x => x.id === c)?.color ?? '#1E88E5'

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
