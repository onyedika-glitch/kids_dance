export const site = {
  name: 'Tiny Explorers Hub',
  tagline: 'Learn • Discover • Grow • Adventure',
  motto: 'Big dreams start small!',
  intro: 'Inspiring young minds through cheerful songs, ABCs, 123s and animated adventures.',
  email: 'franklinomogo67@gmail.com',
  facebook: 'https://www.facebook.com/profile.php?id=61593398853461',
  youtube: 'https://www.youtube.com/@tinyexplorershub9',
  youtubeSubscribe: 'https://www.youtube.com/@tinyexplorershub9?sub_confirmation=1',
}

export interface NavItem {
  label: string
  to: string
}

export const primaryNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Videos', to: '/videos' },
  { label: 'ABC Adventure', to: '/abc' },
  { label: 'Most Loved', to: '/ranking' },
  { label: 'For Parents', to: '/parents' },
  { label: 'Support Us', to: '/support' },
]

// Collapsed under "More"
export const moreNav: NavItem[] = [
  { label: 'Work With Us', to: '/work-with-us' },
  { label: 'Updates', to: '/news' },
  { label: 'About', to: '/about' },
  { label: 'Privacy', to: '/privacy' },
]

// Social links in the top bar
export const socials = [
  { label: 'YouTube', href: site.youtube, icon: 'youtube' },
  { label: 'Facebook', href: site.facebook, icon: 'facebook' },
  { label: 'Email', href: `mailto:${site.email}`, icon: 'mail' },
] as const

// The four promises printed on the channel banner
export const pillars = [
  { title: 'Fun Learning', text: 'Bite-sized lessons that feel like play, so little ones keep coming back.', color: '#1E88E5', icon: 'bulb' },
  { title: 'Curious Minds', text: 'Amazing facts and gentle questions that spark "why?" and "how?"', color: '#3DAA3C', icon: 'book' },
  { title: 'Creative Play', text: 'Songs, dance and at-home activities to learn with the whole body.', color: '#FFB800', icon: 'spark' },
  { title: 'Big Adventures', text: 'From the ocean floor to the jungle, every video is a tiny expedition.', color: '#E53935', icon: 'globe' },
] as const
