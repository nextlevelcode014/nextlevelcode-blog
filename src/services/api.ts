import axios from 'axios'
import {
  LoginData,
  Post,
  RegisterData,
  User,
  UsernameUpdate,
  UserPasswordUpdate,
} from '../types/index'

export const api_url = process.env.NEXT_PUBLIC_API_URL

export async function fetchPosts(): Promise<Post[]> {
  try {
    return (await axios.get<Post[]>(`${api_url}/posts/get_posts`)).data
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error}`)
  }
}

export async function fetchPostImage(post_id: string): Promise<string[]> {
  try {
    const res = await axios.get(`${api_url}/post/${post_id}/images`)
    return res.data
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error}}`)
  }
}

export async function fetchPostVideo(post_id: string): Promise<string[]> {
  try {
    const res = await axios.get(`${api_url}/${post_id}/videos`)
    return res.data
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error}}`)
  }
}

export const loginUser = async (data: LoginData) => {
  try {
    const response = await axios.post(`${api_url}/auth/login`, data)
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw error.response.data
    } else if (error.request) {
      throw new Error('Sem resposta do servidor')
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
    })
    return response.data
  } catch (error: any) {
    if (error) {
      throw error.response.data
    } else if (error.request) {
      throw new Error('Sem resposta do servidor')
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
      },
    })
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw error.response.data
    } else if (error.request) {
      throw new Error('Sem resposta do servidor')
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
      },
    })
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw error.response.data
    } else if (error.request) {
      throw new Error('Sem resposta do servidor')
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
      },
    })

    return response.data
  } catch (error: any) {
    if (error.response) {
      throw error.response.data
    } else if (error.request) {
      throw new Error('Sem resposta do servidor')
    } else {
      throw new Error(error.message)
    }
  }
}

export const updateUsername = async (data: UsernameUpdate) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token não encontrado')

    const response = await axios.put(
      `${api_url}/users/update-username`,
      { name: data.name, password: data.password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw error.response.data
    } else if (error.request) {
      throw new Error('Sem resposta do servidor')
    } else {
      throw new Error(error.message)
    }
  }
}

export const forgotPassword = async (email: string) => {
  try {
    let response = await axios.post(`${api_url}/auth/forgot-password`, {
      email,
    })
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw error.response.data
    } else if (error.request) {
      throw new Error('Sem resposta do servidor')
    } else {
      throw new Error(error.message)
    }
  }
}
