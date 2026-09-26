// Safety & peace of mind (Firstaid.png + hygiene / supervision / entry-exit sections)

export type SafetyIcon =
  | 'ambulance' | 'aed'
  | 'wind' | 'spray' | 'thermo' | 'sparkle'
  | 'team' | 'glass' | 'camera' | 'badge'
  | 'card' | 'bell' | 'door' | 'phone'

export interface SafetyItem {
  icon: SafetyIcon
  title: string
  text: string
}

export interface SafetySection {
  id: string
  en: string
  title: string
  lead: string
  color: string
  items: SafetyItem[]
}

export const safetyIntro = {
  title: 'So you can trust us with your child',
  lead: 'At EYS-Kids Dance Academy, safety matters as much as fun.\nFrom emergency preparedness to daily hygiene and check-in alerts, every studio follows the same standards.',
}

export const firstAid: SafetySection = {
  id: 'emergency',
  en: 'EMERGENCY',
  title: 'Ready for the unexpected',
  lead: '',
  color: '#FF5860',
  items: [
    { icon: 'ambulance', title: 'Accident insurance', text: 'We take great care every day, and for your peace of mind and your child\'s safety, our studios are also covered by accident insurance in case the unexpected happens.' },
    { icon: 'aed', title: 'AEDs and first-aid training', text: 'Every studio has an AED on site, and all our instructors complete first-aid and life-saving training so they are ready to act in an emergency.' },
  ],
}

export const safetySections: SafetySection[] = [
  {
    id: 'hygiene',
    en: 'HYGIENE',
    title: 'Clean, healthy studios',
    lead: 'Lots of kids spend time in our studios barefoot or in indoor shoes, so we keep things thoroughly clean every day.',
    color: '#13B5B1',
    items: [
      { icon: 'wind', title: 'Constant ventilation', text: 'On top of commercial ventilation systems, we open windows and doors between lessons to let fresh air in. CO2 monitors help us keep an eye on air quality.' },
      { icon: 'spray', title: 'Hand and surface sanitizing', text: 'Hand sanitizer is available at the entrance, and we wipe down barres, handrails, doorknobs and other high-touch spots with alcohol after every lesson.' },
      { icon: 'thermo', title: 'Health checks', text: 'Instructors check on each child as they arrive. If a child has a fever or feels unwell, we\'ll arrange a make-up lesson.' },
      { icon: 'sparkle', title: 'Daily floor cleaning', text: 'We clean the dance floor with a dedicated cleaner before opening and after closing, and check changing rooms and restrooms at least three times a day.' },
    ],
  },
  {
    id: 'supervision',
    en: 'SUPERVISION',
    title: 'Always under a watchful eye',
    lead: 'During lessons, while waiting, and before and after pick-up, we make sure your child is never left alone.',
    color: '#0079E4',
    items: [
      { icon: 'team', title: 'Instructor plus assistant', text: 'Preschool classes have an assistant alongside the lead instructor, ready to help with bathroom trips or if a child feels unwell.' },
      { icon: 'glass', title: 'Glass-walled studios', text: 'Our studios are designed so you can watch lessons through the glass at any time. There\'s also a waiting area for parents.' },
      { icon: 'camera', title: 'Security cameras and auto-lock', text: 'Entrances have security cameras and auto-locking doors. Outside lesson times, staff always check visitors before letting them in.' },
      { icon: 'badge', title: 'Staff training and background checks', text: 'All instructors and staff pass background checks when hired and take child safety and care training twice a year.' },
    ],
  },
]

export const entryExit = {
  id: 'notification',
  en: 'NOTIFICATION',
  title: 'Check-in alerts in the app',
  lead: 'When your child arrives at the studio and when they head home after the lesson, you\'ll get an automatic notification on your phone.',
  color: '#FF9300',
  steps: [
    { icon: 'card' as SafetyIcon, title: 'Tap the IC card', text: 'Kids tap their member card on the reader at the entrance' },
    { icon: 'bell' as SafetyIcon, title: 'Arrival alert', text: 'You\'ll see their arrival time in the parent app' },
    { icon: 'door' as SafetyIcon, title: 'Tap again to leave', text: 'Kids leave once we\'ve confirmed who\'s picking them up' },
    { icon: 'phone' as SafetyIcon, title: 'Departure alert + Karte', text: 'Get the departure time and the lesson\'s Karte (progress report)' },
  ],
  messages: [
    { time: '16:52', text: 'Hana has arrived at Daikanyama Studio.' },
    { time: '18:04', text: 'Hana has left the studio. Today\'s lesson Karte is ready.' },
  ],
  notes: [
    'If someone different is picking up your child, please let us know in advance through the app or by phone.',
    'If your child forgets their card, staff will log their arrival and departure by hand and send you the same notifications.',
  ],
}

export const weatherPolicy = {
  title: 'Weather warnings and emergencies',
  items: [
    'If a storm, heavy rain or similar warning is in effect for the studio\'s area at 2:00 p.m., all lessons from that evening onward are canceled.',
    'We\'ll notify all families of cancellations and restarts through the parent app and by email.',
    'If an earthquake or other emergency happens during a lesson, instructors guide the kids to a safe place and look after them at the studio until a parent arrives.',
    'Every studio reviews its evacuation routes and holds an evacuation drill once a year.',
  ],
}
