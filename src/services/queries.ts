import { useQuery } from "@tanstack/react-query";
import { fetchPostImage, fetchPosts, fetchPostVideo } from "./api";

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => {
      let posts = fetchPosts();
      return posts
    },
  })
}

export function usePostImage(post_id: string) {
  return useQuery({
    queryKey: ['post_images', post_id],
    queryFn: () => fetchPostImage(post_id)
  })
}

export function usePostVideo(post_id: string) {
  return useQuery({
    queryKey: ['post_videos', post_id],
    queryFn: () => fetchPostVideo(post_id)
  })
}