// VISION page (Vision.png) and the STE-LAM system (sted.png).

export interface VisionPillar {
  label: string
  body: string
  color: string
  image: string
  alt: string
}

export const visionIntro = {
  title: 'At EYS-Kids, street dance isn\'t about training performers.\nWe see it as “education through dance.”',
  lead: 'Our dance lessons help your child grow up healthy and happy.',
}

export const visionPillars: VisionPillar[] = [
  {
    label: 'Learning Good Manners',
    body: 'Every lesson begins with Kids Communication time. Here, instructors teach courtesy and etiquette, so kids learn good manners along with dance.',
    color: '#8DC21F',
    image: '/images/vision/manner.webp',
    alt: 'Kids dancing energetically in the studio',
  },
  {
    label: 'Valuing Independence',
    body: 'For recital performances and YouTube projects, kids don\'t just follow a plan we hand them. They take part from planning and preparation onward, because independence matters most to us.',
    color: '#FF5860',
    image: '/images/vision/autonomy.webp',
    alt: 'Kids smiling and striking a pose',
  },
  {
    label: 'Teamwork & Reaching Goals',
    body: 'By creating a dance performance with friends for the recital stage, kids learn the value of teamwork and the drive to reach their goals.',
    color: '#23AADD',
    image: '/images/vision/teamwork.webp',
    alt: 'Kids practicing together with friends',
  },
]

export interface StelamPillar {
  label: string
  color: string
}

export const stelamIntro = {
  bubble: 'At EYS-Kids, there\'s so much more\nto enjoy than dance!',
  title: 'In children\'s education, our original “STE‑LAM” approach,\nSTEM plus languages and the arts, has a proven track record',
  body: 'STEM education is being adopted around the world as a new model for the 21st century. We add the two things Japanese education has long been missing, Language and Art, to create our own unique learning system.',
}

export const stelamPillars: StelamPillar[] = [
  { label: 'STEM Education', color: '#23AADD' },
  { label: 'Language', color: '#A66BF0' },
  { label: 'Art', color: '#FF5860' },
]

export interface StelamField {
  letter: string
  name: string
  /** short English gloss shown under the name */
  ja: string
  color: string
  image: string
  alt: string
}

// Clockwise from the top, as laid out in sted.png
export const stelamFields: StelamField[] = [
  { letter: 'S', name: 'Science', ja: 'discovery', color: '#5FB4C9', image: '/images/vision/stelam-science.webp', alt: 'Kids enjoying an experiment with their teacher' },
  { letter: 'T', name: 'Technology', ja: 'digital skills', color: '#3DBB95', image: '/images/vision/stelam-technology.webp', alt: 'Girl working at a computer' },
  { letter: 'E', name: 'Engineering', ja: 'making things', color: '#A985EC', image: '/images/vision/stelam-engineering.webp', alt: 'Kids building with blocks' },
  { letter: 'L', name: 'Language', ja: 'languages', color: '#3F97CC', image: '/images/vision/stelam-language.webp', alt: 'Boy holding English word blocks' },
  { letter: 'A', name: 'Art', ja: 'creativity', color: '#EC9563', image: '/images/vision/stelam-art.webp', alt: 'Kids playing with building blocks' },
  { letter: 'M', name: 'Mathematics', ja: 'numbers & logic', color: '#DA72B9', image: '/images/vision/stelam-mathematics.webp', alt: 'Kids writing equations on a blackboard' },
]
