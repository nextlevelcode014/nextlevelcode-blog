import axios from 'axios'
import { Post } from '../types/index'

export async function fetchPosts(): Promise<Post[]> {
  try {
    return (
      await axios.get<Post[]>(`http://localhost:8080/api/posts/get_posts`, {
        // headers: {
        //   'Content-Type': 'application/json',
        //   Accept: '*/*',
        //   'Access-Control-Allow-Credentials': 'true',
        //   'X-Api-Key': 'my_ultra_secure_jwt_secret_key',
        //   'Access-Control-Allow-Origin': 'http://localhost:3000',
        // },
      })
    ).data
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error}`)
  }
}

export async function fetchPostImage(post_id: string): Promise<string[]> {
  try {
    const res = await axios.get(`http://localhost/api/post/${post_id}/images`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Credentials': 'true',
        'X-Api-Key': 'bread',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
    })
    return res.data
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error}}`)
  }
}

export async function fetchPostVideo(post_id: string): Promise<string[]> {
  try {
    const res = await axios.get(`http://192.168.0.108/post/${post_id}/videos`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Credentials': 'true',
        'X-Api-Key': 'bread',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
    })
    return res.data
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error}}`)
  }
}
