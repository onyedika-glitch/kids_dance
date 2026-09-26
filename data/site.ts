export const site = {
  name: 'EYS-Kids Dance Academy',
  tagline: 'Growing kids\' hearts and bodies',
  phone: '0120-978-900',
  phoneHref: 'tel:0120978900',
  hours: '8:00 a.m.–1:00 a.m.',
}

export interface NavItem {
  label: string
  to: string
}

// Primary nav, in the order shown in Font.png
export const primaryNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'New to Dance?', to: '/freetrial' },
  { label: 'Plans & Pricing', to: '/pricing' },
  { label: 'Genres & Courses', to: '/courses' },
  { label: 'Locations', to: '/access' },
  { label: 'Instructors', to: '/instructors' },
]

// Collapsed under "More"
export const moreNav: NavItem[] = [
  { label: 'Our Vision', to: '/vision' },
  { label: 'Curriculum', to: '/curriculum' },
  { label: 'Events', to: '/events' },
  { label: 'Why Families Choose Us', to: '/ranking' },
  { label: 'Community', to: '/community' },
  { label: 'Parent Voices', to: '/usersvoice' },
  { label: 'Activities', to: '/activity' },
  { label: 'Safety', to: '/safety' },
  { label: 'News', to: '/news' },
]

// Sister services in the lilac top bar
export const sisterBrands = [
  { label: 'Kids Art College', note: 'EYS-Kids' },
  { label: 'Kids STE-LAM Lab', note: 'EYS-Kids' },
  { label: 'MY COMPASS', note: 'EYS-Kids My Compass' },
  { label: 'Kids Olympia', note: 'Coming Soon', soon: true },
  { label: 'Business College', note: 'Coming Soon', soon: true },
]
