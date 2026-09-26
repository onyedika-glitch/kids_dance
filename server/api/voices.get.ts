import { interestBubbles, likeRanking, voicePosts } from '../../data/voices'

export default defineEventHandler(() => ({ posts: voicePosts, likeRanking, bubbles: interestBubbles }))
