export type SocialPlatform = 'facebook' | 'instagram' | 'twitter'

export interface SocialPost {
  id: string
  platform: SocialPlatform
  name: string
  className: string
  avatar?: string
  time: string
  text: string
  likes: number
  comments: number
  shares: number
}

export interface LikeEntry {
  id: string
  child: string
  honorific: string
  age: number
  points: number
  message: string
  post: SocialPost
}

export interface InterestBubble {
  text: string
  color: string
}

export const voicePosts: SocialPost[] = [
  {
    id: 'v1',
    platform: 'facebook',
    name: 'Sota Takaya',
    className: 'Kinder Class',
    avatar: '/images/voice/takaya.webp',
    time: '18 min ago',
    text: 'Six months into the Kinder Class at Daikanyama Studio. At first my little one hid shyly at the back – now it\'s all smiles and moves in front of the mirror! The instructor calls every child by name and praises them each lesson, and you can tell how much that means.',
    likes: 92,
    comments: 12,
    shares: 52,
  },
  {
    id: 'v2',
    platform: 'instagram',
    name: 'Minato Yamamoto',
    className: 'Hip-Hop Class',
    avatar: '/images/voice/member-2.webp',
    time: '1 hour ago',
    text: 'First recital – the whole team nailed the formations and looked so cool! All that practice really paid off.',
    likes: 128,
    comments: 18,
    shares: 9,
  },
  {
    id: 'v3',
    platform: 'twitter',
    name: 'Hinata Sato',
    className: 'Kids Jazz Class',
    avatar: '/images/voice/member-3.webp',
    time: '3 hours ago',
    text: 'Jazz class at Shinjuku Studio. My daughter used to struggle with flexibility, and now she stretches after her bath every night. The instructor\'s tips are so clear that practicing at home is easy.',
    likes: 92,
    comments: 12,
    shares: 12,
  },
  {
    id: 'v4',
    platform: 'facebook',
    name: 'Yui Nakamura',
    className: 'K-Pop Class',
    time: 'Yesterday',
    text: 'Over the moon about learning the choreography to a favorite group\'s song. We go to class in matching T-shirts with friends!',
    likes: 64,
    comments: 7,
    shares: 3,
  },
  {
    id: 'v5',
    platform: 'instagram',
    name: 'Haruto Ito',
    className: 'Breakin\' Class',
    time: '2 days ago',
    text: 'Finally held a freeze for 3 seconds! The mats make it easy to practice without worry.',
    likes: 210,
    comments: 25,
    shares: 14,
  },
  {
    id: 'v6',
    platform: 'twitter',
    name: 'Sakura Kobayashi',
    className: 'Kinder Class',
    time: '3 days ago',
    text: 'Booking make-up lessons in the app takes seconds, which makes juggling siblings\' schedules so much easier. Being close to the station is a big plus, too!',
    likes: 45,
    comments: 4,
    shares: 6,
  },
]

export const interestBubbles: InterestBubble[] = [
  { text: 'Curious about\nart & design too!', color: '#62B5C8' },
  { text: 'Seems to love\nmusic too', color: '#AB8BEF' },
  { text: 'Ballet looks\ncool too!', color: '#DE78BC' },
]

// honorific: Japanese name suffixes (-chan / -kun) are dropped in English
const names = [
  ['Akiko Masuda', '', 5],
  ['Yuto Ogawa', '', 7],
  ['Rin Morimoto', '', 6],
  ['Sora Ishii', '', 8],
  ['Mahiro Hasegawa', '', 4],
  ['Koharu Fujita', '', 9],
] as const

const messages = [
  'I smiled all the way through my first recital!',
  'I finally landed the turn I\'ve been practicing forever!',
  'We cheered each other on and got our formation just right.',
  'I tried a solo! I was nervous, but it was so much fun!',
  'Made my dance debut with everyone in the Kinder Class.',
  'I got to dance in the center! Thanks for cheering me on!',
]

const platforms: SocialPlatform[] = ['facebook', 'instagram', 'twitter']
const posters = voicePosts.slice(0, 3)

export const likeRanking: LikeEntry[] = names.map(([child, honorific, age], i) => ({
  id: `like-${i + 1}`,
  child,
  honorific,
  age,
  points: 108 - i * 7,
  message: messages[i],
  post: {
    ...posters[i % 3],
    id: `like-post-${i + 1}`,
    platform: platforms[i % 3],
    likes: 92 - i * 5,
    text: `${child.split(' ')[0]}'s recital! Took the stage with friends from Daikanyama Studio, and all that practice paid off. The whole family was so moved!`,
  },
}))
