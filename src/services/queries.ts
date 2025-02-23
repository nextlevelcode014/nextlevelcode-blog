import { useQuery } from '@tanstack/react-query'
import { apiService } from './api'

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => {
      let posts = apiService.fetchPosts()
      return posts
    },
  })
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => apiService.getMe,
  })
}

export function useVideos() {
  return useQuery({
    queryKey: ['videos'],
    queryFn: apiService.getVideos,
    staleTime: 1000 * 60,
  })
}

export function useVideo(youtube_id: string) {
  return useQuery({
    queryKey: ['video'],
    queryFn: () => apiService.getVideo(youtube_id),
  })
}
