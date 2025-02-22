import axios from 'axios'
import {
  CommentData,
  CreatePostData,
  GetVideo,
  LoginData,
  PostCommentWithComments,
  RegisterData,
  UpdateComment,
  UpdateNewsPost,
  User,
  UsernameUpdate,
  UserPasswordUpdate,
  Videos,
} from '../types/index'

export const api_url = process.env.NEXT_PUBLIC_API_URL

export async function fetchPosts() {
  try {
    const token = localStorage.getItem('token')
    return (
      await axios.get<PostCommentWithComments[]>(
        `${api_url}/posts/get-all-posts-with-comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
          },
        },
      )
    ).data
  } catch (error: any) {
    if (error.response) {
      throw error.response.data
    } else if (error.request) {
      throw new Error('Service unavailable, try again later.')
    } else {
      throw new Error(error.message)
    }
  }
}

export async function createPost(data: CreatePostData) {
  try {
    const token = localStorage.getItem('token')

    return (
      await axios.post(
        `${api_url}/posts/create-post/${data.id}`,
        {
          description: data.description,
          url: data.url,
          authorName: data.authorName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,

            'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
          },
        },
      )
    ).data
  } catch (error) {
    throw new Error(`Failed to create post: ${error}`)
  }
}

export async function updatePost(data: UpdateNewsPost) {
  console.log(data.post_id)
  try {
    const token = localStorage.getItem('token')

    if (!token) {
      throw new Error('Token not found. Please log in again.')
    }

    const response = await axios.put(
      `${api_url}/posts/update-post/${data.post_id}`,
      { description: data.description, url: data.url },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
        },
      },
    )

    console.log(await response.data)
    return response.data
  } catch (error) {
    throw new Error(`Failed to update post: ${error}`)
  }
}

export async function getVideos() {
  try {
    const token = localStorage.getItem('token')

    if (!token) {
      throw new Error('Token not found. Please log in again.')
    }

    const response = await axios.get<Videos[]>(`${api_url}/posts/videos`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
      },
    })

    return response.data
  } catch (error) {
    throw new Error(`Failed to update post: ${error}`)
  }
}

export async function getVideo(youtube_id: string) {
  try {
    const token = localStorage.getItem('token')

    if (!token) {
      throw new Error('Token not found. Please log in again.')
    }

    const response = await axios.get<GetVideo>(
      `${api_url}/posts/get-video/${youtube_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
        },
      },
    )

    return response.data
  } catch (error) {
    throw new Error(`Failed to update post: ${error}`)
  }
}

export async function updateComment(data: UpdateComment) {
  try {
    const token = localStorage.getItem('token')

    return (
      await axios.put(
        `${api_url}/posts/update-comment/${data.commentId}`,
        {
          content: data.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
          },
        },
      )
    ).data
  } catch (error) {
    throw new Error(`Failed to create post: ${error}`)
  }
}

export async function deletePost(post_id: string) {
  try {
    const token = localStorage.getItem('token')

    return (
      await axios.delete(`${api_url}/posts/delete-post/${post_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
        },
      })
    ).data
  } catch (error) {
    throw new Error(`Failed to create post: ${error}`)
  }
}

export async function deleteComment(commentId: string) {
  try {
    const token = localStorage.getItem('token')

    return (
      await axios.delete(`${api_url}/posts/delete-comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
        },
      })
    ).data
  } catch (error) {
    throw new Error(`Failed to create post: ${error}`)
  }
}

export async function postComment(data: CommentData) {
  try {
    const token = localStorage.getItem('token')

    return (
      await axios.post(
        `${api_url}/posts/create-comment/${data.authorId}`,
        {
          id: data.post_id,
          content: data.comment,
          authorName: data.authorName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
          },
        },
      )
    ).data
  } catch (error) {
    throw new Error(`Failed to create post: ${error}`)
  }
}

export async function fetchPostVideo(): Promise<string[]> {
  try {
    const res = await axios.get(`${api_url}/posts/videos`)
    return res.data
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error}}`)
  }
}

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axios.post(`${api_url}/auth/login`, data, {
      headers: {
        'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
      },
    })
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw error.response.data
    } else if (error.request) {
      throw new Error('Service unavailable, try again later.')
    } else {
      throw new Error(error.message)
    }
  }
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${api_url}/auth/register`, {
      ...data,
      passwordConfirm: data.confirmPassword,

      headers: {
        'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
      },
    })
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw error.response.data
    } else if (error.request) {
      throw new Error('Service unavailable, try again later.')
    } else {
      throw new Error(error.message)
    }
  }
}

export const verifyEmail = async (token: string) => {
  try {
    const response = await axios.get(
      `${api_url}/auth/verify-email?token=${token}`,

      {
        headers: {
          'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
        },
      },
    )
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw error.response.data
    } else if (error.request) {
      throw new Error('Service unavailable, try again later.')
    } else {
      throw new Error(error.message)
    }
  }
}

export const getMe = async (token: string) => {
  try {
    const response = await axios.get<User>(`${api_url}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
      },
    })
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw error.response.data
    } else if (error.request) {
      throw new Error('Service unavailable, try again later.')
    } else {
      throw new Error(error.message)
    }
  }
}

export const deleteUser = async (user_id: string) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.delete(`${api_url}/users/delete/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
      },
    })
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw error.response.data
    } else if (error.request) {
      throw new Error('Service unavailable, try again later.')
    } else {
      throw new Error(error.message)
    }
  }
}

export const updateUserPassword = async (data: UserPasswordUpdate) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token não encontrado')

    const response = await axios.put(`${api_url}/users/update-password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
      },
    })

    return response.data
  } catch (error: any) {
    if (error.response) {
      throw error.response.data
    } else if (error.request) {
      throw new Error('Service unavailable, try again later.')
    } else {
      throw new Error(error.message)
    }
  }
}

export const updateUsername = async (data: UsernameUpdate) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token not found. Please log in again.')

    const response = await axios.put(
      `${api_url}/users/update-username`,
      { name: data.name, password: data.password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
        },
      },
    )
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw error.response.data
    } else if (error.request) {
      throw new Error('Service unavailable, try again later.')
    } else {
      throw new Error(error.message)
    }
  }
}

export const forgotPassword = async (email: string) => {
  try {
    let response = await axios.post(`${api_url}/auth/forgot-password`, {
      email,

      headers: {
        'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
      },
    })
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw error.response.data
    } else if (error.request) {
      throw new Error('Service unavailable, try again later.')
    } else {
      throw new Error(error.message)
    }
  }
}
