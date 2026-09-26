// Studios, areas and dance genres for /access, /access/[area] and /studios/[id]
// (list.png, jer.png, explor.png, explo.png, areir.png, down.png, roll.png, explore.png,
// interior.png, jed.png, ved.png, loge.png, calender.png, last.png).
// Add a studio here and it appears in the search, its area pages and gets its own detail page.

export type GenreId = 'hiphop' | 'jazz' | 'kids' | 'theme' | 'lock' | 'contemporary' | 'house' | 'cheer' | 'breakin'

export interface Genre {
  id: GenreId
  /** Label as printed on the course tile (may contain \n) */
  label: string
  image: string
}

export const genres: Genre[] = [
  { id: 'hiphop', label: 'HIP-HOP', image: '/images/access/genre-hiphop.webp' },
  { id: 'jazz', label: 'Jazz', image: '/images/access/genre-jazz.webp' },
  { id: 'kids', label: 'Kids\nRhythm Dance', image: '/images/access/genre-kids.webp' },
  { id: 'theme', label: 'Theme\nPark Dance', image: '/images/access/genre-theme.webp' },
  { id: 'lock', label: 'Lock', image: '/images/access/genre-lock.webp' },
  { id: 'contemporary', label: 'Contemporary', image: '/images/access/genre-contemporary.webp' },
  { id: 'house', label: 'House', image: '/images/access/genre-house.webp' },
  { id: 'cheer', label: 'Cheer Dance', image: '/images/access/genre-cheer.webp' },
  { id: 'breakin', label: 'Breakin\' /\nAcrobatics', image: '/images/access/genre-breakin.webp' },
]

export const genreLabel = (id: GenreId) => genres.find(g => g.id === id)?.label.replace('\n', ' ') ?? id

export interface Area {
  slug: string
  /** Full name used in headings: Tokyo / Shibuya, Tokyo */
  name: string
  /** Short name for chips: Tokyo / Shibuya */
  label: string
  /** Prefecture slug for city-level areas */
  parent?: string
  image?: string
  /** Static map picture shown above the results (no map API) */
}

export const areas: Area[] = [
  { slug: 'tokyo', name: 'Tokyo', label: 'Tokyo', image: '/images/access/area-tokyo.webp' },
  { slug: 'shibuya', name: 'Shibuya, Tokyo', label: 'Shibuya', parent: 'tokyo', image: '/images/access/area-shibuya.webp' },
  { slug: 'chuo', name: 'Chuo, Tokyo', label: 'Chuo', parent: 'tokyo', image: '/images/access/area-tokyo.webp' },
  { slug: 'shinjuku', name: 'Shinjuku, Tokyo', label: 'Shinjuku', parent: 'tokyo', image: '/images/access/area-shibuya.webp' },
  { slug: 'toshima', name: 'Toshima, Tokyo', label: 'Toshima', parent: 'tokyo', image: '/images/access/area-tokyo.webp' },
  { slug: 'kanagawa', name: 'Kanagawa', label: 'Kanagawa', image: '/images/access/hero.webp' },
  { slug: 'yokohama', name: 'Yokohama, Kanagawa', label: 'Yokohama', parent: 'kanagawa', image: '/images/access/hero.webp' },
  { slug: 'kawasaki', name: 'Kawasaki, Kanagawa', label: 'Kawasaki', parent: 'kanagawa', image: '/images/access/hero.webp' },
  { slug: 'saitama', name: 'Saitama', label: 'Saitama', image: '/images/access/hero.webp' },
  { slug: 'saitama-city', name: 'Saitama City, Saitama', label: 'Saitama City', parent: 'saitama', image: '/images/access/hero.webp' },
]

export const prefectures = areas.filter(a => !a.parent)
export const citiesOf = (pref: string) => areas.filter(a => a.parent === pref)

// "Growing nationwide! What makes EYS-Kids studios special" (list.png)
export interface AccessFeature {
  icon: 'train' | 'shoes' | 'shower' | 'lobby' | 'insurance'
  title: string
  text: string
}

export const accessFeatures: AccessFeature[] = [
  { icon: 'train', title: 'Near Stations', text: 'Every studio is within a 5-min walk of the nearest station!' },
  { icon: 'shoes', title: 'Safe Floors', text: 'Cushioned unit flooring helps prevent injuries.' },
  { icon: 'shower', title: 'Shower Rooms', text: 'Every studio has changing rooms and showers.' },
  { icon: 'lobby', title: 'Lobby', text: 'A clean, comfy lobby to relax in before and after class.' },
  { icon: 'insurance', title: 'Insurance', text: 'All students are covered by accident insurance, just in case.' },
]

export type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
export const weekdays: Weekday[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export interface Lesson {
  day: Weekday
  start: string
  end: string
  genre: GenreId
  /** Target grade: Nursery–K / Grades 1–3 … (K = kindergarten; Grade 9 = junior high year 3) */
  level: string
}

export interface Photo {
  src: string
  alt: string
}

export interface FloorRoom {
  id: string
  en: string
  label: string
  image: string
  /** Hotspot on the floor-plan picture in % (left, top, width, height) */
  box: [number, number, number, number]
}

export interface Studio {
  id: string
  /** Daikanyama Studio */
  name: string
  /** Building / studio brand shown on search cards: WeArt Daikanyama */
  building: string
  /** Detail page variant: rich pages get the studio-specific voice heading, Q&A text and recruit banner */
  rich: boolean
  prefecture: string
  city: string
  postal: string
  address: string
  addressNote?: string
  /** Map position (geocoded from the address via OpenStreetMap Nominatim) */
  lat: number
  lng: number
  /** Nearest station (used for search) */
  station: string
  lines: string[]
  /** 3-min walk from the north exit of Daikanyama Station (Tokyu Toyoko Line) */
  access: string
  walkMinutes: number
  hours: { weekday: string, weekend: string, closed: string }
  phone: string
  genres: GenreId[]
  cardImage: string
  heroImage: string
  /** Hero catch copy + lead (areir.png) */
  catch: string
  lead: string
  /** Heading above the gallery (explore.png) */
  locationTitle: string
  locationLead: string
  intro: string[]
  bubbles: [string, string]
  gallery: Photo[]
  manager?: { name: string, role: string, message: string[], image: string }
  routeTitle?: string
  routes?: { image: string, text: string }[]
  parking?: { name: string, walk: string }[]
  facilitiesTitle?: string
  facilitiesLead?: string
  facilities?: { image: string, text: string }[]
  floorPlan?: { image: string, rooms: FloorRoom[] }
  rooms?: { en: string, label: string, image: string }[]
  interior?: { photos: Photo[], captions: [string, string] }
  schedule: Lesson[]
  faqs?: { q: string, a: string }[]
}

const I = '/images/studios/'

const week = (rows: [Weekday, string, string, GenreId, string][]): Lesson[] =>
  rows.map(([day, start, end, genre, level]) => ({ day, start, end, genre, level }))

const HOURS_CLOSED = 'Closed: 29th–31st of each month'
const FAC_FLOOR = 'Gentle, wood-grain cushioned unit flooring, plus ballet barres.'
const FAC_GLASS = 'Glass walls let you watch your child\'s lesson from outside the studio.'

export const studios: Studio[] = [
  {
    id: 'daikanyama',
    name: 'Daikanyama Studio',
    building: 'WeArt Daikanyama',
    rich: true,
    prefecture: 'tokyo',
    city: 'shibuya',
    postal: '150-0033',
    address: '11-6 Sarugakucho, Shibuya-ku, Tokyo',
    addressNote: 'A-FLAG Daikanyama West (Sun Rose Daikanyama)',
    lat: 35.6501019,
    lng: 139.7011319,
    station: 'Daikanyama',
    lines: ['Tokyu Toyoko Line'],
    access: '3-min walk from the north exit of Daikanyama Station (Tokyu Toyoko Line)',
    walkMinutes: 3,
    hours: { weekday: 'Weekdays: 12:30–22:00', weekend: 'Sat & Sun: 10:00–21:00', closed: HOURS_CLOSED },
    phone: '0120-978-900',
    genres: ['hiphop', 'jazz', 'kids', 'theme', 'lock', 'contemporary', 'house', 'cheer', 'breakin'],
    cardImage: I + 'card-weart.webp',
    heroImage: I + 'daikanyama-hero.webp',
    catch: 'Dance in a beautifully designed space',
    lead: 'A lobby that feels like a European street, Scandinavian lighting and furniture, soothing plants and a hint of aroma. Every detail creates a warm, welcoming space for your child\'s lessons.',
    locationTitle: 'A prime spot, just a 3-min walk from Daikanyama Station',
    locationLead: 'Easy to reach, even on your way home from work. Stylish cafés, boutiques and Daikanyama T-Site are just around the corner, so on weekends you can explore the neighborhood before class and make a day of it.',
    intro: ['Our newest dance studio, in Daikanyama,', 'one of Tokyo\'s most stylish neighborhoods.', '', 'A refined space that puts safety first,', 'full of fun and calm, where your child\'s', 'talent for dance can truly blossom.'],
    bubbles: ['I want to come\neven when I don\'t\nhave a lesson!', 'So many shops\nfor moms to\npop into!'],
    gallery: [
      { src: I + 'daikanyama-entrance.webp', alt: 'Entrance lobby of Daikanyama Studio' },
      { src: I + 'room-piano.webp', alt: 'Piano room' },
      { src: I + 'interior-5.webp', alt: 'Kids\' room' },
      { src: I + 'interior-6.webp', alt: 'Multipurpose room next to the lounge' },
      { src: I + 'facility-floor.webp', alt: 'Dance room with cushioned flooring' },
      { src: I + 'room-english.webp', alt: 'Language room' },
      { src: I + 'facility-glass.webp', alt: 'Glass-walled studio' },
      { src: I + 'room-art.webp', alt: 'Art room' },
    ],
    manager: {
      name: 'Miyuki Neba',
      role: 'Daikanyama Studio Manager',
      message: ['Hi, I\'m Neba, manager of Daikanyama Studio.', 'We just opened, and our studio is packed with EYS\'s very latest facilities!', 'You\'re welcome to drop by just to take a look. We can\'t wait to meet you!'],
      image: I + 'manager.webp',
    },
    routeTitle: 'Walking from Daikanyama Station, Tokyu Toyoko Line (3 min)',
    routes: [
      { image: I + 'route-1.webp', text: 'Leave Daikanyama Station by the north exit, turn left and go down the stairs.' },
      { image: I + 'route-2.webp', text: 'At the bottom, bear slightly right.' },
      { image: I + 'route-3.webp', text: 'Walk straight up the slope on your left.' },
      { image: I + 'route-4.webp', text: 'Turn right at the traffic light.' },
      { image: I + 'route-5.webp', text: 'Keep going straight. On your left you\'ll see a building with the ALQIPPO clothing store.' },
      { image: I + 'route-6.webp', text: 'Walk through the gate and head to the back of the 1st floor. Daikanyama Studio (WeArt) is there.' },
    ],
    parking: [
      { name: 'Daikanyama Sarugakucho Parking', walk: '2-min walk to the studio' },
      { name: 'Times Daikanyama Ekimae', walk: '2-min walk to the studio' },
      { name: 'Mitsui Repark Daikanyamacho', walk: '3-min walk to the studio' },
      { name: 'Ecolo Park Ebisu Nishi', walk: '4-min walk to the studio' },
      { name: 'NPC24H Daikanyama Parking', walk: '4-min walk to the studio' },
      { name: 'Times Yarigasaki Intersection', walk: '5-min walk to the studio' },
    ],
    facilitiesTitle: 'State-of-the-art facilities and equipment',
    facilitiesLead: 'Daikanyama Studio is about more than good looks: it is designed with your child\'s safety first. Enjoy every lesson in a clean, bright studio.',
    facilities: [
      { image: I + 'facility-floor.webp', text: FAC_FLOOR },
      { image: I + 'facility-glass.webp', text: FAC_GLASS },
    ],
    floorPlan: {
      image: I + 'floorplan.webp',
      rooms: [
        { id: 'lounge', en: 'LOUNGE', label: 'Parents\' lounge', image: I + 'lounge.webp', box: [30, 38, 26, 22] },
        { id: 'dance', en: 'DANCE ROOM', label: 'Main dance room', image: I + 'facility-floor.webp', box: [33, 5, 38, 27] },
        { id: 'english', en: 'ENGLISH ROOM', label: 'Language room', image: I + 'room-english.webp', box: [72, 34, 28, 16] },
        { id: 'kids', en: 'KIDS ROOM', label: 'Kids\' room', image: I + 'interior-5.webp', box: [45, 50, 20, 14] },
        { id: 'art', en: 'ART & DESIGN ROOM', label: 'Art room', image: I + 'room-art.webp', box: [10, 76, 26, 14] },
        { id: 'studio', en: 'STUDIO', label: 'Studios A–E', image: I + 'facility-glass.webp', box: [55, 62, 38, 32] },
      ],
    },
    rooms: [
      { en: 'ENTRANCE', label: 'Entrance lobby', image: I + 'room-entrance.webp' },
      { en: 'ENGLISH ROOM', label: 'Language room', image: I + 'room-english.webp' },
      { en: 'PIANO ROOM', label: 'Piano room', image: I + 'room-piano.webp' },
      { en: 'ART ROOM', label: 'Art room', image: I + 'room-art.webp' },
    ],
    interior: {
      photos: [
        { src: I + 'interior-1.webp', alt: 'Entrance in front of the glass-walled studios' },
        { src: I + 'interior-2.webp', alt: 'WeArt logo sign' },
        { src: I + 'interior-3.webp', alt: 'Counter seats in the lounge' },
        { src: I + 'interior-5.webp', alt: 'Kids\' room' },
        { src: I + 'interior-6.webp', alt: 'Multipurpose room' },
        { src: I + 'interior-4.webp', alt: 'Hallway to the powder room' },
      ],
      captions: ['Relax any way\nyou like in\nthe entrance.', 'Every detail,\ndown to the lighting,\nfeels just right.'],
    },
    schedule: week([
      ['Mon', '16:00', '16:50', 'kids', 'Nursery–K'], ['Mon', '17:00', '18:00', 'hiphop', 'Grades 1–3'], ['Mon', '18:10', '19:10', 'jazz', 'Grades 4–6'],
      ['Tue', '16:00', '16:50', 'theme', 'Pre-K–Grade 2'], ['Tue', '17:00', '18:00', 'cheer', 'Grades 1–4'], ['Tue', '18:10', '19:10', 'lock', 'Grades 3–6'],
      ['Wed', '16:00', '16:50', 'kids', 'Nursery–K'], ['Wed', '17:00', '18:00', 'contemporary', 'Grades 2–6'], ['Wed', '18:10', '19:10', 'house', 'Grades 4–9'],
      ['Thu', '16:00', '16:50', 'hiphop', 'K–Grade 2'], ['Thu', '17:00', '18:00', 'breakin', 'Grades 1–6'],
      ['Fri', '16:00', '16:50', 'jazz', 'Pre-K–Grade 1'], ['Fri', '17:00', '18:00', 'hiphop', 'Grades 3–6'], ['Fri', '18:10', '19:10', 'theme', 'Grades 1–6'],
      ['Sat', '10:00', '10:50', 'kids', 'Nursery–K'], ['Sat', '11:00', '12:00', 'hiphop', 'Grades 1–3'], ['Sat', '13:00', '14:00', 'cheer', 'Grades 1–6'], ['Sat', '14:10', '15:10', 'breakin', 'Grades 3–9'],
      ['Sun', '10:00', '10:50', 'theme', 'Pre-K–Grade 2'], ['Sun', '11:00', '12:00', 'jazz', 'Grades 1–6'], ['Sun', '13:00', '14:00', 'lock', 'Grades 2–6'],
    ]),
    faqs: [
      { q: 'Is there bicycle parking at Daikanyama Studio?', a: 'The building has no bicycle parking of its own. Please use one of the public bicycle lots near Daikanyama Station; there are several within walking distance.' },
      { q: 'Where can parents wait during lessons?', a: 'You can relax in the entrance lounge. The studios have glass walls, so you can watch the lesson while you wait.' },
      { q: 'Can siblings take different classes?', a: 'Of course. Language and art classes run at the same times, so many siblings come together.' },
    ],
  },
  {
    id: 'ginza',
    name: 'Ginza Studio',
    building: 'WeArt Ginza',
    rich: true,
    prefecture: 'tokyo',
    city: 'chuo',
    postal: '104-0061',
    address: '1-8-19 Ginza, Chuo-ku, Tokyo',
    addressNote: 'Kirarito Ginza 6F',
    lat: 35.6743314,
    lng: 139.7670241,
    station: 'Ginza-itchome',
    lines: ['Tokyo Metro Yurakucho Line', 'Tokyo Metro Ginza Line'],
    access: '1-min walk from Exit 9 of Ginza-itchome Station (Tokyo Metro)',
    walkMinutes: 1,
    hours: { weekday: 'Weekdays: 12:00–22:00', weekend: 'Sat & Sun: 10:00–20:00', closed: HOURS_CLOSED },
    phone: '0120-978-900',
    genres: ['hiphop', 'jazz', 'kids', 'theme', 'contemporary', 'cheer'],
    cardImage: I + 'lounge.webp',
    heroImage: '/images/access/hero.webp',
    catch: 'A real stage experience in the heart of the city',
    lead: 'Just a 1-min walk from Ginza-itchome Station. With high ceilings and a big mirrored dance floor, kids have all the room they need to move.',
    locationTitle: 'A prime spot, just a 1-min walk from Ginza-itchome Station',
    locationLead: 'The studio is inside a shopping complex connected to the station, so you stay dry even on rainy days. After class, relax with your family at the cafés and restaurants in the building.',
    intro: ['Our flagship studio, opened in', 'Kirarito Ginza, a Ginza landmark.', '', 'With a spacious floor and the latest', 'sound system, we bring your child', 'truly professional lessons.'],
    bubbles: ['Dancing in the\nbig mirror is\nso fun!', 'No getting wet\non rainy days.\nSo handy!'],
    gallery: [
      { src: I + 'lounge.webp', alt: 'Lounge at Ginza Studio' },
      { src: '/images/access/hero.webp', alt: 'Mirrored dance floor' },
      { src: I + 'facility-floor.webp', alt: 'Studio with cushioned flooring' },
      { src: I + 'interior-3.webp', alt: 'Counter seats in the lounge' },
    ],
    manager: {
      name: 'Saori Miyamoto',
      role: 'Ginza Studio Manager',
      message: ['Hi, I\'m Miyamoto, manager of Ginza Studio.', 'Our studio is right by the station, and we love celebrating every "I did it!" moment with your child.', 'Feel free to stop by for a visit on your way home from work!'],
      image: I + 'manager.webp',
    },
    facilitiesTitle: 'State-of-the-art facilities and equipment',
    facilitiesLead: 'Cushioned flooring throughout the studio. Enjoy every lesson in a clean, bright space.',
    facilities: [
      { image: I + 'facility-floor.webp', text: FAC_FLOOR },
      { image: I + 'facility-glass.webp', text: FAC_GLASS },
    ],
    schedule: week([
      ['Mon', '16:30', '17:20', 'kids', 'Nursery–K'], ['Mon', '17:30', '18:30', 'jazz', 'Grades 1–4'],
      ['Wed', '16:30', '17:20', 'theme', 'Pre-K–Grade 2'], ['Wed', '17:30', '18:30', 'hiphop', 'Grades 2–6'],
      ['Fri', '16:30', '17:20', 'cheer', 'Grades 1–4'], ['Fri', '17:30', '18:30', 'contemporary', 'Grades 3–9'],
      ['Sat', '10:00', '10:50', 'kids', 'Nursery–K'], ['Sat', '11:00', '12:00', 'hiphop', 'Grades 1–3'], ['Sat', '13:00', '14:00', 'jazz', 'Grades 4–9'],
    ]),
  },
  {
    id: 'shibuya',
    name: 'Shibuya Studio',
    building: 'WeArt Shibuya',
    rich: false,
    prefecture: 'tokyo',
    city: 'shibuya',
    postal: '150-0043',
    address: '1-12-5 Dogenzaka, Shibuya-ku, Tokyo',
    addressNote: 'Shibuya Mark City South 4F',
    lat: 35.6572608,
    lng: 139.6987943,
    station: 'Shibuya',
    lines: ['JR Yamanote Line', 'Tokyu Toyoko Line', 'Tokyo Metro Ginza Line', 'Keio Inokashira Line'],
    access: '4-min walk from the Hachiko exit of Shibuya Station (JR)',
    walkMinutes: 4,
    hours: { weekday: 'Weekdays: 13:00–22:00', weekend: 'Sat & Sun: 10:00–21:00', closed: HOURS_CLOSED },
    phone: '0120-978-900',
    genres: ['hiphop', 'lock', 'house', 'breakin', 'kids'],
    cardImage: I + 'facility-glass.webp',
    heroImage: '/images/access/area-shibuya.webp',
    catch: 'Find your groove in the home of street dance',
    lead: 'Shibuya is where dance culture is born. Our instructors, active at the top of the scene, share the pure joy of hip-hop and breakin\'.',
    locationTitle: 'A prime spot, just a 4-min walk from Shibuya Station',
    locationLead: 'Just 4 minutes on foot from Shibuya Station, served by all the major lines. Perfect for coming straight from school or between other activities.',
    intro: ['A studio right in the middle of Shibuya,', 'the heart of street dance.', '', 'Surrounded by friends who love music', 'and dance, discover a style', 'that\'s all your own.'],
    bubbles: ['You get to meet\nsuper cool\nteachers!', 'Kids can come\nstraight from\nschool!'],
    gallery: [
      { src: I + 'facility-glass.webp', alt: 'Glass-walled studio at Shibuya Studio' },
      { src: I + 'facility-floor.webp', alt: 'Studio with cushioned flooring' },
      { src: I + 'interior-3.webp', alt: 'Counter seats in the lounge' },
      { src: I + 'interior-4.webp', alt: 'Hallway to the powder room' },
    ],
    schedule: week([
      ['Tue', '16:30', '17:20', 'kids', 'Pre-K–K'], ['Tue', '17:30', '18:30', 'hiphop', 'Grades 1–3'], ['Tue', '18:40', '19:40', 'lock', 'Grades 4–9'],
      ['Thu', '16:30', '17:20', 'hiphop', 'K–Grade 2'], ['Thu', '17:30', '18:30', 'breakin', 'Grades 1–6'], ['Thu', '18:40', '19:40', 'house', 'Grades 4–9'],
      ['Sat', '10:00', '11:00', 'breakin', 'Grades 1–3'], ['Sat', '11:10', '12:10', 'hiphop', 'Grades 4–9'],
      ['Sun', '10:00', '10:50', 'kids', 'Nursery–K'], ['Sun', '11:00', '12:00', 'lock', 'Grades 1–6'],
    ]),
  },
  {
    id: 'shinjuku',
    name: 'Shinjuku Studio',
    building: 'WeArt Shinjuku',
    rich: false,
    prefecture: 'tokyo',
    city: 'shinjuku',
    postal: '160-0022',
    address: '3-1-24 Shinjuku, Shinjuku-ku, Tokyo',
    addressNote: 'Keio Shinjuku Sanchome Bldg. 5F',
    lat: 35.6912513,
    lng: 139.7041282,
    station: 'Shinjuku-sanchome',
    lines: ['Tokyo Metro Marunouchi Line', 'Tokyo Metro Fukutoshin Line', 'Toei Shinjuku Line'],
    access: '2-min walk from Exit C3 of Shinjuku-sanchome Station (Tokyo Metro)',
    walkMinutes: 2,
    hours: { weekday: 'Weekdays: 12:30–22:00', weekend: 'Sat & Sun: 10:00–21:00', closed: HOURS_CLOSED },
    phone: '0120-978-900',
    genres: ['jazz', 'kids', 'theme', 'contemporary', 'cheer'],
    cardImage: I + 'facility-floor.webp',
    heroImage: '/images/access/hero.webp',
    catch: 'Room to express yourself, freely',
    lead: 'Our main studio is about 80 m² with high ceilings and a wonderfully open feel. Perfect for full-body styles like jazz and contemporary.',
    locationTitle: 'A prime spot, just a 2-min walk from Shinjuku-sanchome Station',
    locationLead: 'Just 2 minutes on foot from Shinjuku-sanchome Station, served by several lines. Shinjuku Gyoen is nearby, too, for a stroll after class.',
    intro: ['An open, airy studio with high ceilings', 'in Shinjuku-sanchome.', '', 'We offer a full lineup of jazz and', 'contemporary classes that nurture', 'graceful, expressive dancers.'],
    bubbles: ['So much room\nto move in the\nbig studio!', 'A walk in the\npark is part\nof the fun!'],
    gallery: [
      { src: I + 'facility-floor.webp', alt: 'Main studio at Shinjuku Studio' },
      { src: I + 'facility-glass.webp', alt: 'Glass-walled studio' },
      { src: I + 'interior-5.webp', alt: 'Kids\' room' },
      { src: I + 'room-entrance.webp', alt: 'Entrance' },
    ],
    schedule: week([
      ['Mon', '16:30', '17:20', 'theme', 'Pre-K–Grade 2'], ['Mon', '17:30', '18:30', 'jazz', 'Grades 1–4'],
      ['Wed', '16:30', '17:20', 'kids', 'Nursery–K'], ['Wed', '17:30', '18:30', 'contemporary', 'Grades 3–9'],
      ['Fri', '16:30', '17:30', 'cheer', 'Grades 1–6'],
      ['Sat', '10:00', '10:50', 'kids', 'Nursery–K'], ['Sat', '11:00', '12:00', 'jazz', 'Grades 1–6'], ['Sat', '13:00', '14:00', 'theme', 'Grades 1–6'],
    ]),
  },
  {
    id: 'ikebukuro',
    name: 'Ikebukuro Studio',
    building: 'WeArt Ikebukuro',
    rich: false,
    prefecture: 'tokyo',
    city: 'toshima',
    postal: '171-0021',
    address: '1-11-1 Nishi-Ikebukuro, Toshima-ku, Tokyo',
    addressNote: 'Metropolitan Plaza Bldg. 7F',
    lat: 35.7301653,
    lng: 139.709385,
    station: 'Ikebukuro',
    lines: ['JR Yamanote Line', 'Tobu Tojo Line', 'Seibu Ikebukuro Line', 'Tokyo Metro Marunouchi Line'],
    access: '3-min walk from the west exit of Ikebukuro Station (JR)',
    walkMinutes: 3,
    hours: { weekday: 'Weekdays: 13:00–21:30', weekend: 'Sat & Sun: 9:30–20:00', closed: HOURS_CLOSED },
    phone: '0120-978-900',
    genres: ['hiphop', 'kids', 'theme', 'cheer', 'breakin'],
    cardImage: I + 'interior-3.webp',
    heroImage: '/images/access/hero.webp',
    catch: 'A fun first step into dance, together',
    lead: 'A full lineup of kids\' classes from age 3. A warm, friendly studio that\'s perfect for a child\'s very first activity.',
    locationTitle: 'A prime spot, just a 3-min walk from Ikebukuro Station',
    locationLead: 'Just 3 minutes on foot from the west exit of Ikebukuro Station, where JR, private and subway lines meet. Easy to reach from Saitama, too.',
    intro: ['A bright, clean studio just steps', 'from the west exit of Ikebukuro Station.', '', 'We give first-timers plenty of', 'caring support so they can relax', 'and enjoy dancing.'],
    bubbles: ['I made lots\nof new\nfriends!', 'Great kids\'\nclasses give us\npeace of mind!'],
    gallery: [
      { src: I + 'interior-3.webp', alt: 'Lounge at Ikebukuro Studio' },
      { src: I + 'facility-floor.webp', alt: 'Studio with cushioned flooring' },
      { src: I + 'interior-6.webp', alt: 'Multipurpose room' },
      { src: I + 'room-english.webp', alt: 'Kids\' space' },
    ],
    schedule: week([
      ['Tue', '15:30', '16:20', 'kids', 'Nursery–K'], ['Tue', '16:30', '17:30', 'hiphop', 'Grades 1–3'],
      ['Thu', '15:30', '16:20', 'theme', 'Pre-K–Grade 2'], ['Thu', '16:30', '17:30', 'cheer', 'Grades 1–4'],
      ['Sat', '9:30', '10:20', 'kids', 'Nursery–K'], ['Sat', '10:30', '11:30', 'breakin', 'Grades 1–6'], ['Sat', '11:40', '12:40', 'hiphop', 'Grades 4–9'],
    ]),
  },
  {
    id: 'yokohama',
    name: 'Yokohama Studio',
    building: 'WeArt Yokohama',
    rich: true,
    prefecture: 'kanagawa',
    city: 'yokohama',
    postal: '220-0011',
    address: '2-14-17 Takashima, Nishi-ku, Yokohama, Kanagawa',
    addressNote: 'Createur Yokohama 3F',
    lat: 35.4632822,
    lng: 139.6225744,
    station: 'Yokohama',
    lines: ['JR Tokaido Line', 'Keikyu Main Line', 'Tokyu Toyoko Line', 'Minatomirai Line'],
    access: '5-min walk from the east exit of Yokohama Station (JR)',
    walkMinutes: 5,
    hours: { weekday: 'Weekdays: 12:30–22:00', weekend: 'Sat & Sun: 10:00–21:00', closed: HOURS_CLOSED },
    phone: '0120-978-900',
    genres: ['hiphop', 'jazz', 'kids', 'theme', 'lock', 'house', 'cheer'],
    cardImage: I + 'room-entrance.webp',
    heroImage: '/images/access/hero.webp',
    catch: 'Dance freely in a harbor-city studio',
    lead: 'An open, airy studio overlooking Minato Mirai. Two dance rooms host lessons in a wide range of genres.',
    locationTitle: 'A prime spot, just a 5-min walk from Yokohama Station',
    locationLead: 'Just 5 minutes on foot from the east exit of Yokohama Station, and handy for trips to Minato Mirai. Enjoy a family stroll around the bay area before or after class.',
    intro: ['A new two-floor studio in the bay area,', 'by the east exit of Yokohama Station.', '', 'With two spacious dance rooms,', 'kids can choose from a wide', 'range of genres.'],
    bubbles: ['Two studios\nmean lots of\ndancing!', 'Shopping in\nMinato Mirai\non the way home!'],
    gallery: [
      { src: I + 'room-entrance.webp', alt: 'Entrance of Yokohama Studio' },
      { src: '/images/access/hero.webp', alt: 'Main dance room' },
      { src: I + 'facility-glass.webp', alt: 'Glass-walled studio' },
      { src: I + 'interior-3.webp', alt: 'Lounge' },
    ],
    manager: {
      name: 'Mariko Saeki',
      role: 'Yokohama Studio Manager',
      message: ['Hi, I\'m Saeki, manager of Yokohama Studio.', 'With two dance rooms, we offer lots of different genres.', 'Come to a trial lesson and feel the vibe for yourself!'],
      image: I + 'manager.webp',
    },
    facilitiesTitle: 'State-of-the-art facilities and equipment',
    facilitiesLead: 'Yokohama Studio has two full dance rooms. Enjoy every lesson in a clean, bright space.',
    facilities: [
      { image: I + 'facility-floor.webp', text: FAC_FLOOR },
      { image: I + 'facility-glass.webp', text: FAC_GLASS },
    ],
    schedule: week([
      ['Mon', '16:00', '16:50', 'kids', 'Nursery–K'], ['Mon', '17:00', '18:00', 'hiphop', 'Grades 1–3'],
      ['Tue', '16:00', '16:50', 'theme', 'Pre-K–Grade 2'], ['Tue', '17:00', '18:00', 'jazz', 'Grades 1–6'],
      ['Thu', '17:00', '18:00', 'lock', 'Grades 2–6'], ['Thu', '18:10', '19:10', 'house', 'Grades 4–9'],
      ['Sat', '10:00', '10:50', 'kids', 'Nursery–K'], ['Sat', '11:00', '12:00', 'cheer', 'Grades 1–6'], ['Sat', '13:00', '14:00', 'hiphop', 'Grades 4–9'],
      ['Sun', '10:00', '11:00', 'jazz', 'Grades 1–4'],
    ]),
  },
  {
    id: 'musashikosugi',
    name: 'Musashi-Kosugi Studio',
    building: 'WeArt Musashi-Kosugi',
    rich: false,
    prefecture: 'kanagawa',
    city: 'kawasaki',
    postal: '211-0063',
    address: '3-264-3 Kosugimachi, Nakahara-ku, Kawasaki, Kanagawa',
    addressNote: 'Union Bldg. 2F',
    lat: 35.574686,
    lng: 139.657252,
    station: 'Musashi-Kosugi',
    lines: ['JR Nambu Line', 'JR Yokosuka Line', 'Tokyu Toyoko Line'],
    access: '2-min walk from the south exit of Musashi-Kosugi Station (Tokyu Toyoko Line)',
    walkMinutes: 2,
    hours: { weekday: 'Weekdays: 13:00–21:30', weekend: 'Sat & Sun: 9:30–20:00', closed: HOURS_CLOSED },
    phone: '0120-978-900',
    genres: ['kids', 'theme', 'jazz', 'cheer'],
    cardImage: I + 'interior-6.webp',
    heroImage: '/images/access/hero.webp',
    catch: 'A warm studio in a family-friendly town',
    lead: 'Musashi-Kosugi is a favorite with young families. Our cozy studio focuses on kids\' classes, open to children from nursery age.',
    locationTitle: 'A prime spot, just a 2-min walk from Musashi-Kosugi Station',
    locationLead: 'Just 2 minutes on foot from Musashi-Kosugi Station, served by JR and Tokyu lines. Drop in while you shop at the malls by the station.',
    intro: ['A cozy, homey studio in Musashi-Kosugi,', 'a town loved by families.', '', 'Small classes mean we can', 'watch over each child\'s', 'growth closely.'],
    bubbles: ['My teacher is\nso kind. I love\nher!', 'Easy to drop by\nwhile we\'re out\nshopping!'],
    gallery: [
      { src: I + 'interior-6.webp', alt: 'Multipurpose room at Musashi-Kosugi Studio' },
      { src: I + 'facility-floor.webp', alt: 'Studio with cushioned flooring' },
      { src: I + 'interior-5.webp', alt: 'Kids\' room' },
      { src: I + 'room-art.webp', alt: 'Waiting area' },
    ],
    schedule: week([
      ['Wed', '15:30', '16:20', 'kids', 'Nursery–K'], ['Wed', '16:30', '17:30', 'theme', 'Grades 1–3'],
      ['Fri', '15:30', '16:20', 'kids', 'Pre-K–K'], ['Fri', '16:30', '17:30', 'cheer', 'Grades 1–6'],
      ['Sat', '10:00', '11:00', 'jazz', 'Grades 1–6'],
    ]),
  },
  {
    id: 'omiya',
    name: 'Omiya Studio',
    building: 'WeArt Omiya',
    rich: false,
    prefecture: 'saitama',
    city: 'saitama-city',
    postal: '330-0854',
    address: '1-10-16 Sakuragicho, Omiya-ku, Saitama City, Saitama',
    addressNote: 'Shino Omiya North Wing 4F',
    lat: 35.903019,
    lng: 139.619559,
    station: 'Omiya',
    lines: ['JR Keihin-Tohoku Line', 'JR Saikyo Line', 'Tobu Urban Park Line'],
    access: '3-min walk from the west exit of Omiya Station (JR)',
    walkMinutes: 3,
    hours: { weekday: 'Weekdays: 13:00–21:30', weekend: 'Sat & Sun: 9:30–20:00', closed: HOURS_CLOSED },
    phone: '0120-978-900',
    genres: ['hiphop', 'kids', 'breakin', 'lock', 'theme'],
    cardImage: I + 'interior-5.webp',
    heroImage: '/images/access/hero.webp',
    catch: 'Saitama\'s new home for dance',
    lead: 'Just steps from the west exit of Omiya Station, with a full lineup of street styles like breakin\' and lock.',
    locationTitle: 'A prime spot, just a 3-min walk from Omiya Station',
    locationLead: 'Just 3 minutes on foot from Omiya, a major hub where even the Shinkansen stops. Easy to reach from all over Saitama.',
    intro: ['A bright, spacious studio by', 'the west exit of Omiya Station.', '', 'From street dance to kids\' classes,', 'we offer a wide range', 'of genres.'],
    bubbles: ['I can do\nbreakin\'\nnow!', 'Right by the\nstation. Drop-off\nis a breeze!'],
    gallery: [
      { src: I + 'interior-5.webp', alt: 'Kids\' room at Omiya Studio' },
      { src: I + 'facility-floor.webp', alt: 'Studio with cushioned flooring' },
      { src: I + 'facility-glass.webp', alt: 'Glass-walled studio' },
      { src: I + 'interior-3.webp', alt: 'Lounge' },
    ],
    schedule: week([
      ['Mon', '16:00', '16:50', 'kids', 'Nursery–K'], ['Mon', '17:00', '18:00', 'breakin', 'Grades 1–6'],
      ['Thu', '16:00', '16:50', 'theme', 'Pre-K–Grade 2'], ['Thu', '17:00', '18:00', 'hiphop', 'Grades 1–6'],
      ['Sat', '10:00', '11:00', 'lock', 'Grades 2–6'], ['Sat', '11:10', '12:10', 'hiphop', 'Grades 4–9'],
    ]),
  },
]

// "Why families choose … : 9 reasons" cards on the band (calender.png)
export interface Reason {
  en: string
  color: string
  text: string
  to: string
  image?: string
}

export const reasons: Reason[] = [
  { en: 'VISION', color: '#23AADD', text: 'We teach through\ndance, not just\ntrain performers', to: '/vision', image: I + 'reason-vision.webp' },
  { en: 'CURRICULUM', color: '#FF5860', text: '9 genres, from\nclassic styles\nto extras', to: '/curriculum', image: I + 'reason-curriculum.webp' },
  { en: 'PRICE', color: '#A66BF0', text: 'Great-value plans\nwith free\nmake-up lessons', to: '/pricing' },
  { en: 'Karte', color: '#23AADD', text: 'Karte progress reports\nkeep kids motivated\nafter class', to: '/curriculum', image: I + 'reason-karte.webp' },
  { en: 'SAFETY', color: '#13B5B1', text: 'Safety and peace of mind\ncome first', to: '/safety', image: I + 'reason-safety.webp' },
  { en: 'INSTRUCTORS', color: '#FF9300', text: 'Dancers who are\ntrue educators', to: '/instructors', image: I + 'reason-instructors.webp' },
  { en: 'ACCESS', color: '#A66BF0', text: 'Easy-to-reach studios\nnear the station', to: '/access', image: I + 'reason-access.webp' },
  { en: 'COMMUNITY', color: '#8DC21F', text: 'Events that build\nfriendships beyond class', to: '/community', image: I + 'reason-community.webp' },
  { en: 'EVENT', color: '#FF5860', text: 'Plenty of recitals,\nworkshops and more', to: '/events', image: I + 'reason-event.webp' },
]

export interface Voice {
  name: string
  meta: string
  genre: GenreId
  text: string
}

export const voices: Voice[] = [
  { name: 'Parent of A (Kindergarten)', meta: 'Member for 1 year', genre: 'kids', text: 'My daughter used to be shy, but now she dances with a big smile alongside her teacher and friends. I love seeing her progress in the Karte after every lesson.' },
  { name: 'K (Grade 3)', meta: 'Member for 2 years', genre: 'hiphop', text: 'My teacher is so cool, and it\'s really fun when I finally land a move I couldn\'t do before! My goal right now is to dance at the recital.' },
  { name: 'Parent of M (Grade 1)', meta: 'Member for 6 months', genre: 'theme', text: 'It\'s close to the station and the studio is spotless, so I feel good sending her here. Being able to wait in the lounge is a big help, too.' },
]

export const commonFaqs: { q: string, a: string }[] = [
  { q: 'Can we visit or try a lesson?', a: 'Yes! Every studio offers a free trial lesson, and you\'re also welcome to just come and watch. Book by phone or through our online form.' },
  { q: 'Is it OK if my child has never danced before?', a: 'Most of our students start with no dance experience. Classes are grouped by age and level, and we teach carefully from the basics.' },
  { q: 'Do you offer make-up lessons?', a: 'If your child misses a class, they can take a make-up lesson for free in a class at the same level, at the same studio or another one (up to twice a month).' },
  { q: 'What should we bring to lessons?', a: 'Comfortable clothes, indoor sneakers, a towel and a drink. For trial lessons, we can lend indoor shoes.' },
]

// Search helpers shared by the page and /api/studios
export interface StudioQuery {
  area?: string
  genres?: GenreId[]
  q?: string
}

// Case-insensitive; ignores spaces, hyphens, punctuation and the words "station" / "studio"
const norm = (s: string) => s.toLowerCase().replace(/station|studio|[\s\-–'’.,()]/g, '')

type Searchable = Pick<Studio, 'name' | 'building' | 'station' | 'address' | 'access' | 'lines' | 'prefecture' | 'city' | 'genres'>

export function inArea(s: Searchable, area?: string) {
  return !area || s.prefecture === area || s.city === area
}

export function filterStudios<T extends Searchable>(list: T[], { area, genres: gs, q }: StudioQuery) {
  const needle = q ? norm(q) : ''
  return list.filter(s =>
    inArea(s, area)
    && (!gs?.length || gs.some(g => s.genres.includes(g)))
    && (!needle || [s.name, s.building, s.station, s.address, s.access, ...s.lines, areaName(s.city)]
      .some(v => norm(v).includes(needle))),
  )
}

export const areaName = (slug: string) => areas.find(a => a.slug === slug)?.name ?? ''
export const studioAddress = (s: Studio) => `${s.address}${s.addressNote ? ', ' + s.addressNote : ''}`
export const mapUrl = (s: Studio) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address + ' ' + (s.addressNote ?? ''))}`

/** Slim card payload for list endpoints */
export const toCard = (s: Studio) => ({
  id: s.id,
  name: s.name,
  building: s.building,
  prefecture: s.prefecture,
  city: s.city,
  address: s.address,
  addressNote: s.addressNote,
  lat: s.lat,
  lng: s.lng,
  station: s.station,
  lines: s.lines,
  access: s.access,
  genres: s.genres,
  cardImage: s.cardImage,
})
export type StudioCardData = ReturnType<typeof toCard>
