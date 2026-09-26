// Genres (Cont.png / flan.png / haxagon.png) and the classes offered in each (choice.png / class.png).

export type AgeGroupId = 'preschool' | 'lower' | 'upper'

export interface AgeGroup {
  id: AgeGroupId
  label: string
  note: string
}

export const ageGroups: AgeGroup[] = [
  { id: 'preschool', label: 'Preschool', note: 'ages 3–6' },
  { id: 'lower', label: 'Lower elementary', note: 'grades 1–3' },
  { id: 'upper', label: 'Upper elementary', note: 'grades 4–6' },
]

export interface Genre {
  id: string
  name: string
  /** English display name (key kept as is; data/trial.ts lists genres from it) */
  nameJa: string
  color: string
  /** 152x98 thumbnail and 84x84 square thumbnail */
  image: string
  square: string
  /** Core genres (HIP-HOP / Jazz) vs optional genres */
  core: boolean
  catch: string
  description: string
  ages: AgeGroupId[]
  points: string[]
  music: string
  wear: string
}

export const genres: Genre[] = [
  {
    id: 'hiphop',
    name: 'HIP-HOP',
    nameJa: 'Hip-Hop',
    color: '#FF9300',
    image: '/images/courses/hiphop.webp',
    square: '/images/courses/hiphop-sq.webp',
    core: true,
    catch: 'Feel the fun of rhythm with your whole body.',
    description: 'The foundation of street dance. Kids start by finding the beat with up-and-down bounces, then gradually combine steps and isolations. They build a strong sense of rhythm and the confidence to express themselves freely to the music.',
    ages: ['preschool', 'lower', 'upper'],
    points: ['Up-and-down rhythm training', 'Basic steps and isolations', 'Choreography practice for the recital'],
    music: 'Kid-friendly hip-hop and J-pop',
    wear: 'Comfortable T-shirt and pants, indoor shoes',
  },
  {
    id: 'jazz',
    name: 'Jazz',
    nameJa: 'Jazz',
    color: '#FF5860',
    image: '/images/courses/jazz.webp',
    square: '/images/courses/jazz-sq.webp',
    core: true,
    catch: 'The classic dance style for grace and expression.',
    description: 'An elegant, graceful style with elements of ballet. Turns, jumps and flexibility-building stretches help kids develop beautiful posture and expression right down to their fingertips. Jazz is also a great foundation for every other genre.',
    ages: ['preschool', 'lower', 'upper'],
    points: ['Posture and stretching', 'Turn and jump basics', 'Choreography that brings the music to life'],
    music: 'J-pop, musicals and Western pop',
    wear: 'Leggings or other fitted clothes, jazz shoes (indoor shoes are fine)',
  },
  {
    id: 'kids-rhythm',
    name: 'Kids Rhythm Dance',
    nameJa: 'Kids Rhythm Dance',
    color: '#8DC21F',
    image: '/images/courses/kids-rhythm.webp',
    square: '/images/courses/kids-rhythm-sq.webp',
    core: false,
    catch: 'A first dance class that starts with playing with sound.',
    description: 'A class for first-timers, open from age 3. Through clapping, sound games and follow-the-leader dances, kids discover how fun it is to move to music, and naturally learn group rules like taking turns.',
    ages: ['preschool'],
    points: ['Sound and rhythm games', 'Full-body follow-the-leader dances', 'Group manners like greetings and taking turns'],
    music: 'Nursery rhyme remixes and kids\' songs',
    wear: 'Comfortable clothes, indoor shoes',
  },
  {
    id: 'theme-park',
    name: 'Theme Park Dance',
    nameJa: 'Theme Park Dance',
    color: '#13B5B1',
    image: '/images/courses/theme-park.webp',
    square: '/images/courses/theme-park-sq.webp',
    core: false,
    catch: 'Dance that shines with a smile, straight from a dream stage.',
    description: 'Just like a theme park show, this style entertains the audience with smiles and expressions. On top of jazz basics, kids polish the acting skills to become a character and learn to reach everyone watching.',
    ages: ['preschool', 'lower', 'upper'],
    points: ['Smile and facial expression training', 'Character acting and mime', 'Show-style choreography'],
    music: 'Musical and movie soundtracks',
    wear: 'Comfortable clothes, indoor shoes',
  },
  {
    id: 'lock',
    name: 'Lock',
    nameJa: 'Lock',
    color: '#A66BF0',
    image: '/images/courses/lock.webp',
    square: '/images/courses/lock-sq.webp',
    core: false,
    catch: 'Sharp moves that stop right on the beat.',
    description: 'Danced to funk music, this style is known for "locking," or freezing, in place mid-move. With lots of fun, upbeat moves like points and wrist rolls, it\'s perfect for kids bursting with energy.',
    ages: ['lower', 'upper'],
    points: ['Core moves like locks and points', 'Rhythm practice for sharp contrasts', 'Partner routines'],
    music: 'Funk and soul',
    wear: 'Comfortable clothes, indoor shoes',
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    nameJa: 'Contemporary',
    color: '#0079E4',
    image: '/images/courses/contemporary.webp',
    square: '/images/courses/contemporary-sq.webp',
    core: false,
    catch: 'Free expression, not bound by set forms.',
    description: 'Built on ballet and jazz, this style lets kids express feelings and images freely with their bodies. Floor work and improvisation help them find a style all their own and nurture a rich sensitivity.',
    ages: ['lower', 'upper'],
    points: ['Flexibility and core training', 'Floor work', 'Improvising movement from a theme'],
    music: 'Piano pieces and movie soundtracks',
    wear: 'Fitted clothes, bare feet or indoor shoes',
  },
  {
    id: 'house',
    name: 'House',
    nameJa: 'House',
    color: '#0FA8E0',
    image: '/images/courses/house.webp',
    square: '/images/courses/house-sq.webp',
    core: false,
    catch: 'Light, bouncy steps that make you one with the music.',
    description: 'Kids enjoy nimble footwork to fast-paced house music. Because practice centers on steps, their footwork, stamina and balance grow by leaps and bounds.',
    ages: ['lower', 'upper'],
    points: ['Basic steps and footwork', 'The jack (bouncing your weight up and down)', 'Combinations that link steps together'],
    music: 'House music',
    wear: 'Comfortable clothes, indoor shoes with smooth soles',
  },
  {
    id: 'cheer',
    name: 'Cheer Dance',
    nameJa: 'Cheer Dance',
    color: '#23AADD',
    image: '/images/courses/cheer.webp',
    square: '/images/courses/cheer-sq.webp',
    core: false,
    catch: 'Move in sync with friends and lift everyone\'s spirits.',
    description: 'A bright, energetic style danced with pom-poms. Synchronized moves and formations are the highlight, so kids build teamwork, learn to move as one and discover the joy of cheering others on.',
    ages: ['preschool', 'lower', 'upper'],
    points: ['Pom-pom motion basics', 'Jumps and turns', 'Formations and teamwork'],
    music: 'J-pop and Western pop',
    wear: 'Comfortable clothes, indoor shoes (pom-poms available to borrow)',
  },
  {
    id: 'breakin',
    name: 'Breakin\' / Acrobatics',
    nameJa: 'Breakin\' / Acrobatics',
    color: '#F2C230',
    image: '/images/courses/breakin.webp',
    square: '/images/courses/breakin-sq.webp',
    core: false,
    catch: 'Every "I did it!" leads to the next trick.',
    description: 'Kids take on floor footwork, freezes and acrobatics like cartwheels and handstands. Practice goes step by step on safety mats, so first-timers can join with peace of mind. Builds strength and focus.',
    ages: ['lower', 'upper'],
    points: ['Mat exercises and safe falling', 'Footwork and freezes', 'Acrobatics like cartwheels and handstands'],
    music: 'Breakbeats and hip-hop',
    wear: 'Comfortable long sleeves and long pants, indoor shoes',
  },
]

export type LessonType = 'Group lesson' | 'Small-group lesson'
export type Delivery = 'Studio' | 'On-demand video'

export type RadarScores = {
  community: number
  fun: number
  instructor: number
  curriculum: number
  value: number
}

export interface DanceClass {
  id: string
  genreId: string
  title: string
  ageGroup: AgeGroupId
  lessonType: LessonType
  price: number
  schedule: string
  frequency: string
  studio: string
  start: string
  delivery: Delivery[]
  capacity: number
  remaining: number
  instructors: string[]
  instructorCount: number
  catch: string
  image: string
  scores: RadarScores
}

export const radarAxes: { key: keyof RadarScores, label: string }[] = [
  { key: 'community', label: 'Class\nenergy' },
  { key: 'fun', label: 'Fun &\ndepth' },
  { key: 'instructor', label: 'Instructors' },
  { key: 'curriculum', label: 'Curriculum' },
  { key: 'value', label: 'Value' },
]

export const classes: DanceClass[] = [
  { id: 'hiphop-kinder', genreId: 'hiphop', title: 'HIP-HOP First Steps', ageGroup: 'preschool', lessonType: 'Group lesson', price: 12800, schedule: 'Saturdays 10:00–10:50', frequency: '4 lessons/month, fixed day', studio: 'Shibuya Studio', start: 'From the 1st of any month', delivery: ['Studio', 'On-demand video'], capacity: 10, remaining: 3, instructors: ['MIKU', 'SHOTA', 'AYA', 'REN', 'NANA'], instructorCount: 12, catch: 'Discover the joy of rhythm', image: '/images/curriculum/report-main.webp', scores: { community: 4, fun: 5, instructor: 4, curriculum: 4, value: 4 } },
  { id: 'hiphop-lower', genreId: 'hiphop', title: 'HIP-HOP Basics', ageGroup: 'lower', lessonType: 'Group lesson', price: 12800, schedule: 'Wednesdays 17:00–18:00', frequency: '4 lessons/month, fixed day', studio: 'Shibuya Studio', start: 'From the 1st of any month', delivery: ['Studio', 'On-demand video'], capacity: 12, remaining: 4, instructors: ['SHOTA', 'REN', 'KAITO', 'MIKU', 'YUNA'], instructorCount: 12, catch: 'Put steps together and dance', image: '/images/courses/photo-1.webp', scores: { community: 5, fun: 5, instructor: 4, curriculum: 4, value: 4 } },
  { id: 'hiphop-upper', genreId: 'hiphop', title: 'HIP-HOP Skill-Up', ageGroup: 'upper', lessonType: 'Group lesson', price: 12800, schedule: 'Fridays 18:00–19:00', frequency: '4 lessons/month, fixed day', studio: 'Shinjuku Studio', start: 'From the 1st of any month', delivery: ['Studio', 'On-demand video'], capacity: 12, remaining: 2, instructors: ['KAITO', 'SHOTA', 'REN'], instructorCount: 8, catch: 'Shine at the recital', image: '/images/curriculum/report-2.webp', scores: { community: 4, fun: 4, instructor: 5, curriculum: 5, value: 4 } },
  { id: 'jazz-kinder', genreId: 'jazz', title: 'Jazz Princess Class', ageGroup: 'preschool', lessonType: 'Group lesson', price: 12800, schedule: 'Sundays 10:00–10:50', frequency: '4 lessons/month, fixed day', studio: 'Shinjuku Studio', start: 'From the 1st of any month', delivery: ['Studio', 'On-demand video'], capacity: 10, remaining: 5, instructors: ['AYA', 'NANA', 'MIKU'], instructorCount: 9, catch: 'Dance with grace and charm', image: '/images/courses/photo-5.webp', scores: { community: 4, fun: 5, instructor: 5, curriculum: 4, value: 4 } },
  { id: 'jazz-lower', genreId: 'jazz', title: 'Jazz Basics', ageGroup: 'lower', lessonType: 'Group lesson', price: 12800, schedule: 'Tuesdays 17:00–18:00', frequency: '4 lessons/month, fixed day', studio: 'Shibuya Studio', start: 'From the 1st of any month', delivery: ['Studio', 'On-demand video'], capacity: 12, remaining: 3, instructors: ['NANA', 'AYA', 'YUNA', 'MIKU'], instructorCount: 9, catch: 'Take on turns and jumps', image: '/images/curriculum/report-1.webp', scores: { community: 4, fun: 4, instructor: 5, curriculum: 5, value: 4 } },
  { id: 'jazz-upper', genreId: 'jazz', title: 'Jazz Advanced', ageGroup: 'upper', lessonType: 'Small-group lesson', price: 14800, schedule: 'Thursdays 18:00–19:15', frequency: '4 lessons/month, fixed day', studio: 'Shibuya Studio', start: 'From the 1st of any month', delivery: ['Studio'], capacity: 8, remaining: 2, instructors: ['AYA', 'NANA'], instructorCount: 4, catch: 'Small class, big expression', image: '/images/courses/photo-2.webp', scores: { community: 4, fun: 5, instructor: 5, curriculum: 5, value: 3 } },
  { id: 'kids-rhythm-3', genreId: 'kids-rhythm', title: 'Rhythm Play Class', ageGroup: 'preschool', lessonType: 'Group lesson', price: 9800, schedule: 'Saturdays 9:00–9:45', frequency: '4 lessons/month, fixed day', studio: 'Shibuya Studio', start: 'From the 1st of any month', delivery: ['Studio'], capacity: 10, remaining: 4, instructors: ['MIKU', 'YUNA', 'NANA'], instructorCount: 6, catch: 'First steps through sound play', image: '/images/courses/photo-3.webp', scores: { community: 5, fun: 5, instructor: 5, curriculum: 4, value: 5 } },
  { id: 'theme-park-kinder', genreId: 'theme-park', title: 'Theme Park Kids', ageGroup: 'preschool', lessonType: 'Group lesson', price: 12800, schedule: 'Sundays 11:00–11:50', frequency: '4 lessons/month, fixed day', studio: 'Shinjuku Studio', start: 'From the 1st of any month', delivery: ['Studio', 'On-demand video'], capacity: 10, remaining: 3, instructors: ['NANA', 'AYA'], instructorCount: 5, catch: 'Smile and enjoy the show', image: '/images/curriculum/report-main.webp', scores: { community: 5, fun: 5, instructor: 4, curriculum: 4, value: 4 } },
  { id: 'theme-park-lower', genreId: 'theme-park', title: 'Theme Park Show Class', ageGroup: 'lower', lessonType: 'Group lesson', price: 12800, schedule: 'Mondays 17:00–18:00', frequency: '4 lessons/month, fixed day', studio: 'Shinjuku Studio', start: 'From the 1st of any month', delivery: ['Studio', 'On-demand video'], capacity: 12, remaining: 6, instructors: ['NANA', 'AYA', 'MIKU'], instructorCount: 5, catch: 'Play the part, wow the crowd', image: '/images/courses/photo-1.webp', scores: { community: 5, fun: 5, instructor: 4, curriculum: 4, value: 4 } },
  { id: 'lock-lower', genreId: 'lock', title: 'Lock Basics', ageGroup: 'lower', lessonType: 'Group lesson', price: 12800, schedule: 'Thursdays 17:00–18:00', frequency: '4 lessons/month, fixed day', studio: 'Shibuya Studio', start: 'From the 1st of any month', delivery: ['Studio', 'On-demand video'], capacity: 12, remaining: 5, instructors: ['REN', 'KAITO'], instructorCount: 4, catch: 'Freeze and strike a pose!', image: '/images/curriculum/report-2.webp', scores: { community: 4, fun: 5, instructor: 4, curriculum: 4, value: 4 } },
  { id: 'lock-upper', genreId: 'lock', title: 'Lock Skill-Up', ageGroup: 'upper', lessonType: 'Small-group lesson', price: 14800, schedule: 'Saturdays 15:00–16:15', frequency: '4 lessons/month, fixed day', studio: 'Shibuya Studio', start: 'From the 1st of any month', delivery: ['Studio'], capacity: 8, remaining: 1, instructors: ['REN'], instructorCount: 2, catch: 'Master a partner routine', image: '/images/courses/photo-5.webp', scores: { community: 4, fun: 4, instructor: 5, curriculum: 5, value: 3 } },
  { id: 'contemporary-lower', genreId: 'contemporary', title: 'Contemporary Intro', ageGroup: 'lower', lessonType: 'Small-group lesson', price: 14800, schedule: 'Wednesdays 18:15–19:15', frequency: '4 lessons/month, fixed day', studio: 'Shinjuku Studio', start: 'From the 1st of any month', delivery: ['Studio'], capacity: 8, remaining: 4, instructors: ['AYA', 'YUNA'], instructorCount: 3, catch: 'Express yourself freely', image: '/images/curriculum/report-1.webp', scores: { community: 3, fun: 4, instructor: 5, curriculum: 5, value: 3 } },
  { id: 'contemporary-upper', genreId: 'contemporary', title: 'Contemporary Expression', ageGroup: 'upper', lessonType: 'Small-group lesson', price: 14800, schedule: 'Fridays 18:00–19:15', frequency: '4 lessons/month, fixed day', studio: 'Shinjuku Studio', start: 'From the 1st of any month', delivery: ['Studio'], capacity: 8, remaining: 3, instructors: ['YUNA', 'AYA'], instructorCount: 3, catch: 'Turn a theme into a piece', image: '/images/courses/photo-2.webp', scores: { community: 3, fun: 5, instructor: 5, curriculum: 5, value: 3 } },
  { id: 'house-lower', genreId: 'house', title: 'House Steps', ageGroup: 'lower', lessonType: 'Group lesson', price: 12800, schedule: 'Tuesdays 18:00–19:00', frequency: '4 lessons/month, fixed day', studio: 'Shibuya Studio', start: 'From the 1st of any month', delivery: ['Studio', 'On-demand video'], capacity: 12, remaining: 7, instructors: ['KAITO', 'SHOTA'], instructorCount: 3, catch: 'Build light, quick footwork', image: '/images/courses/photo-3.webp', scores: { community: 4, fun: 4, instructor: 4, curriculum: 4, value: 5 } },
  { id: 'house-upper', genreId: 'house', title: 'House Combinations', ageGroup: 'upper', lessonType: 'Group lesson', price: 12800, schedule: 'Mondays 18:15–19:15', frequency: '4 lessons/month, fixed day', studio: 'Shibuya Studio', start: 'From the 1st of any month', delivery: ['Studio', 'On-demand video'], capacity: 12, remaining: 5, instructors: ['KAITO'], instructorCount: 3, catch: 'Link steps into a full dance', image: '/images/curriculum/report-main.webp', scores: { community: 4, fun: 5, instructor: 4, curriculum: 4, value: 5 } },
  { id: 'cheer-kinder', genreId: 'cheer', title: 'Cheer Kids', ageGroup: 'preschool', lessonType: 'Group lesson', price: 12800, schedule: 'Saturdays 11:00–11:50', frequency: '4 lessons/month, fixed day', studio: 'Shinjuku Studio', start: 'From the 1st of any month', delivery: ['Studio', 'On-demand video'], capacity: 12, remaining: 4, instructors: ['YUNA', 'MIKU', 'NANA'], instructorCount: 6, catch: 'Lift everyone up with pom-poms', image: '/images/courses/photo-1.webp', scores: { community: 5, fun: 5, instructor: 4, curriculum: 4, value: 4 } },
  { id: 'cheer-lower', genreId: 'cheer', title: 'Cheer Basics', ageGroup: 'lower', lessonType: 'Group lesson', price: 12800, schedule: 'Fridays 17:00–18:00', frequency: '4 lessons/month, fixed day', studio: 'Shinjuku Studio', start: 'From the 1st of any month', delivery: ['Studio', 'On-demand video'], capacity: 14, remaining: 6, instructors: ['YUNA', 'NANA'], instructorCount: 6, catch: 'Wow them in perfect sync', image: '/images/curriculum/report-2.webp', scores: { community: 5, fun: 5, instructor: 4, curriculum: 4, value: 4 } },
  { id: 'cheer-upper', genreId: 'cheer', title: 'Cheer Performance', ageGroup: 'upper', lessonType: 'Group lesson', price: 12800, schedule: 'Sundays 13:00–14:15', frequency: '4 lessons/month, fixed day', studio: 'Shinjuku Studio', start: 'From the 1st of any month', delivery: ['Studio'], capacity: 14, remaining: 3, instructors: ['YUNA'], instructorCount: 4, catch: 'Aim for competitions as a team', image: '/images/courses/photo-5.webp', scores: { community: 5, fun: 4, instructor: 4, curriculum: 5, value: 4 } },
  { id: 'breakin-lower', genreId: 'breakin', title: 'Breakin\' & Acro Intro', ageGroup: 'lower', lessonType: 'Small-group lesson', price: 14800, schedule: 'Wednesdays 17:00–18:00', frequency: '4 lessons/month, fixed day', studio: 'Shibuya Studio', start: 'From the 1st of any month', delivery: ['Studio'], capacity: 8, remaining: 2, instructors: ['SHOTA', 'KAITO'], instructorCount: 3, catch: 'Try tricks safely on mats', image: '/images/curriculum/report-1.webp', scores: { community: 4, fun: 5, instructor: 4, curriculum: 5, value: 3 } },
  { id: 'breakin-upper', genreId: 'breakin', title: 'Breakin\' Skill-Up', ageGroup: 'upper', lessonType: 'Small-group lesson', price: 14800, schedule: 'Saturdays 16:30–17:45', frequency: '4 lessons/month, fixed day', studio: 'Shibuya Studio', start: 'From the 1st of any month', delivery: ['Studio'], capacity: 8, remaining: 3, instructors: ['SHOTA'], instructorCount: 3, catch: 'On to freezes and power moves', image: '/images/courses/photo-2.webp', scores: { community: 4, fun: 5, instructor: 5, curriculum: 5, value: 3 } },
]

export function findGenre(id: string) {
  return genres.find(g => g.id === id)
}
