// types/index.ts
export interface Post {
  id: string
  name: string
  title: string
  description: string
  cover_image: string
}

export interface PostImages {
  images: string[]
}

export interface PostVideos {
  videos: string[]
}
