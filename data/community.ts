export interface CommunityPhoto {
  image: string
  alt: string
  /** position/size inside the cluster box, in % */
  x: number
  y: number
  w: number
}

export interface CommunityCluster {
  id: string
  label: string
  color: string
  text: string
  /** cluster box aspect ratio (w / h) */
  ratio: number
  photos: CommunityPhoto[]
  /** label position, in % of the cluster box */
  labelAt: { x: number, y: number, w: number }
}

export interface EventerPhoto {
  image: string
  alt: string
  caption: string
}

export const communityIntro = {
  title: 'EYS: a community connected to the neighborhood',
  lead: 'We want to share the joy of dance beyond the studio walls. Through local festivals and events, EYS-Kids brings kids and their communities together.',
}

export const clusters: CommunityCluster[] = [
  {
    id: 'matsuri',
    label: 'Hosting Festivals',
    color: '#FF9300',
    text: 'As a studio the neighborhood can trust – a fun place where everyone gathers with a smile – each of our studios across Japan hosts festivals throughout the year.',
    ratio: 844 / 386,
    photos: [
      { image: '/images/community/matsuri-1.webp', alt: 'Kids\' feet dancing at a festival', x: 0, y: 0, w: 48.5 },
      { image: '/images/community/matsuri-2.webp', alt: 'Playing Japanese taiko drums at a festival', x: 45.8, y: 0, w: 34.8 },
      { image: '/images/community/matsuri-3.webp', alt: 'A smiling girl in a yukata', x: 70.4, y: 43, w: 29.6 },
    ],
    labelAt: { x: 4, y: 86, w: 41 },
  },
  {
    id: 'local',
    label: 'Joining Local Events',
    color: '#FF5860',
    text: 'To help build a strong local community, we join in and liven up neighborhood events whenever we can.',
    ratio: 844 / 386,
    photos: [
      { image: '/images/community/local-3.webp', alt: 'A girl dancing at a local event', x: 0, y: 44.4, w: 29.8 },
      { image: '/images/community/local-1.webp', alt: 'A dance team performing on a sports field', x: 19.2, y: 0, w: 34.8 },
      { image: '/images/community/local-2.webp', alt: 'A girl in a yukata dancing energetically', x: 50.4, y: 0, w: 49.6 },
    ],
    labelAt: { x: 54.7, y: 85.3, w: 40.8 },
  },
]

export const friendsSection = {
  title: 'Events are a great way\nto make lots of dance friends!',
  badge: 'Dancing together\nis more fun!',
  photos: [
    { image: '/images/community/friends-1.webp', alt: 'Kids dancing and smiling in the studio' },
    { image: '/images/community/friends-2.webp', alt: 'Two kids striking a pose in front of an orange wall' },
    { image: '/images/community/friends-3.webp', alt: 'Girls dancing with their arms spread wide' },
    { image: '/images/community/friends-4.webp', alt: 'Kids taking a lesson in a spacious studio' },
  ],
  text: 'Some local governments don\'t have the budget to set up an event stage. No problem! The EYS Eventers volunteer to roll in – stage and all!',
}

export const eventers = {
  shout: 'Go, EYS Eventers!',
  photos: [
    { image: '/images/community/eventers-truck.webp', alt: 'The EYS-wrapped truck', caption: 'Here comes the EYS truck!' },
    { image: '/images/community/eventers-stage.webp', alt: 'A truck bed opened up into a stage', caption: 'The stage truck shines!' },
    { image: '/images/community/eventers-pa.webp', alt: 'PA staff working the sound desk', caption: 'Our PA crew hard at work!' },
  ] as EventerPhoto[],
}
