import type { ImageMetadata } from 'astro'

// For the example site, we use a single placeholder avatar.
// Replace this with your own avatar images in src/content/avatar/
// and add more imports as needed.
import avatar1 from '../assets/avatar/avatar.svg'

export interface AvatarConfig {
  avatarList: ImageMetadata[]
  homeAvatar: ImageMetadata
  animationInterval: number
}

export const avatarConfig: AvatarConfig = {
  avatarList: [avatar1],
  homeAvatar: avatar1,
  animationInterval: 7500
}

export function getAvatarIndexFromSlug(slug: string = '', avatarCount: number): number {
  if (!slug) return 0
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash) + slug.charCodeAt(i)
    hash = hash & hash
  }
  return Math.abs(hash) % avatarCount
}
