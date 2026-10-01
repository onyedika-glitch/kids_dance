// "Support Us" and "Work With Us": one-off gifts via Paystack, sponsorship packages and offers for brands & schools.

export const giftAmounts = [1000, 2000, 5000, 10000] // naira

export const MIN_GIFT = 100
export const MAX_GIFT = 5_000_000

export const naira = (n: number) => `₦${n.toLocaleString('en-US')}`

export interface SponsorPackage {
  id: string
  name: string
  /** Placeholder starting price in naira */
  from: number
  /** Human label, always "Starting from ₦…" */
  price: string
  blurb: string
  includes: string[]
  popular?: boolean
}

// Placeholder starting prices: set the real ones with the page owner. Final quotes depend on the brief.
const pkg = (p: Omit<SponsorPackage, 'price'>): SponsorPackage => ({ ...p, price: `Starting from ${naira(p.from)}` })

export const sponsorPackages: SponsorPackage[] = [
  pkg({
    id: 'shout-out',
    name: 'Friendly Shout-out',
    from: 15000,
    blurb: 'A cheerful mention of your brand at the end of one of our learning videos.',
    includes: ['Mention in one new video', 'Tag and link in the Facebook post', 'Listed as a friend of the hub on this site'],
  }),
  pkg({
    id: 'sponsored-letter',
    name: 'Sponsored Letter',
    from: 40000,
    blurb: 'Your brand presents a whole letter of our ABC Adventure, on Facebook, YouTube and this website.',
    includes: ['"This letter is brought to you by…" intro', 'Logo on the letter page of our ABC Adventure', 'Posted on Facebook and YouTube', 'Pinned for one week'],
    popular: true,
  }),
  pkg({
    id: 'series',
    name: 'Learning Series Partner',
    from: 120000,
    blurb: 'A short series made with you: numbers, colours, healthy habits or a topic that fits your brand.',
    includes: ['3–5 custom videos', 'Your brand across the series', 'Series page on this website', 'Content you can share on your own channels'],
  }),
]

// Why a gift matters (Support Us)
export const supportReasons = [
  { title: 'Keeps every video free', text: 'No paywalls and no ads aimed at children. Every family can learn along, wherever they are.', icon: 'heart', color: '#E53935' },
  { title: 'New letters every week', text: 'Your gift pays for the time, music and animation behind each new letter of our ABC Adventure.', icon: 'book', color: '#1E88E5' },
  { title: 'A numbers series is next', text: 'Help us start 123s & Counting: short videos to count, add and play with numbers.', icon: 'spark', color: '#8E5CD9' },
] as const

// Other ways to help, no money needed
export const otherWays = [
  { title: 'Follow on Facebook', text: 'New videos land there first.', icon: 'facebook', key: 'facebook' },
  { title: 'Subscribe on YouTube', text: 'Helps other families find us.', icon: 'youtube', key: 'youtube' },
  { title: 'Share on WhatsApp', text: 'Send us to your family or class group.', icon: 'whatsapp', key: 'whatsapp' },
] as const

// Work With Us: what brands and schools can do with us
export const offers = [
  { id: 'shout-out', title: 'Brand shout-out', text: 'A warm, clearly labelled thank-you to your brand at the end of a new learning video, with a tag in the post.', icon: 'megaphone', color: '#EE6D0C' },
  { id: 'sponsored-letter', title: 'Sponsored letter', text: 'Present a whole letter of our ABC Adventure: "This letter is brought to you by…", on Facebook, YouTube and this site.', icon: 'book', color: '#1E88E5' },
  { id: 'series', title: 'Learning series', text: 'A short series made together, on numbers, colours, healthy habits or a topic that fits your brand.', icon: 'play', color: '#3DAA3C' },
  { id: 'school', title: 'School partnerships', text: 'Nurseries and primary schools can use the videos in class, suggest topics for their curriculum or plan a learning series with us.', icon: 'home', color: '#8E5CD9' },
] as const

// Honest audience description, no follower counts
export const audience = [
  'Families with toddlers and preschoolers (ages 2–6)',
  'Parents, carers and nursery teachers looking for short, positive screen time',
  'New posts every week on Facebook and YouTube',
  'Made for little explorers everywhere',
]

export const brandPromises = [
  'Sponsored content is always labelled, so parents know who helped make a video.',
  'Brand-safe only: we work with brands that are right for young children and their families, and we can say no.',
  'No ads that ask children to buy, click or share anything.',
  'We never collect data from children, for you or anyone else.',
]
