import { clusters, communityIntro, eventers, friendsSection } from '../../data/community'
import { likeRanking } from '../../data/voices'

export default defineEventHandler(() => ({
  intro: communityIntro,
  clusters,
  friends: friendsSection,
  eventers,
  likes: likeRanking.slice(0, 3),
}))
