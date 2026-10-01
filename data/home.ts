// Home page content that isn't already in data/site.ts or the video library

// Poster frame shown inside each pillar's hexagon (order matches `pillars` in data/site.ts)
export const pillarImages: Record<string, { image: string, alt: string }> = {
  'Fun Learning': { image: '/images/posters/letter-a-sm.webp', alt: 'A teacher holding up a big letter A and a red apple for a group of children' },
  'Curious Minds': { image: '/images/posters/octopus-three-hearts-sm.webp', alt: 'A smiling cartoon octopus with a glowing heart under the sea' },
  'Creative Play': { image: '/images/posters/culture-dance-sm.webp', alt: 'Children in bright embroidered skirts dancing to traditional songs' },
  'Big Adventures': { image: '/images/posters/hidden-chameleon-sm.webp', alt: 'A green chameleon hiding among jungle leaves' },
}

export const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']

// Logo colors, cycled across letter tiles and small accents
export const tileColors = ['#1E88E5', '#FFB800', '#3DAA3C', '#E53935', '#EE6D0C', '#8E5CD9', '#13A89E']

export const earnCards = [
  {
    title: 'Brands & schools: sponsor a letter',
    text: 'Put your name on a letter of the ABC Adventure, a video series or a whole week of learning. Family-friendly partners only.',
    cta: 'Work with us',
    to: '/work-with-us',
    color: '#1E88E5',
    icon: 'megaphone',
  },
  {
    title: 'Support the hub',
    text: 'Every gift helps us make more free videos for little learners: new letters, 123s, animal facts and songs.',
    cta: 'Support us',
    to: '/support',
    color: '#E53935',
    icon: 'heart',
  },
] as const
