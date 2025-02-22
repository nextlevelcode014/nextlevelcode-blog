import { useQuery } from '@tanstack/react-query'
import { fetchPosts, getMe, getVideo, getVideos } from './api'

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => {
      let posts = fetchPosts()
      return posts
    },
  })
}

export function useUser(token: string) {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => {
      let user = getMe(token)
      return user
    },
  })
}

export function useVideos() {
  return useQuery({
    queryKey: ['videos'],
    queryFn: getVideos,
    staleTime: 1000 * 60,
  })
}

export function useVideo(youtube_id: string) {
  return useQuery({
    queryKey: ['video'],
    queryFn: () => getVideo(youtube_id),
  })
}
