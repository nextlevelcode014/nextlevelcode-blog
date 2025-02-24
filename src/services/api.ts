import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import {
  CommentData,
  CreatePostData,
  GetVideo,
  LoginData,
  LoginRespomse,
  PostCommentWithComments,
  RegisterData,
  ResetPasswordData,
  UpdateComment,
  UpdateNewsPost,
  User,
  UsernameUpdate,
  UserPasswordUpdate,
  Videos,
} from '../types'

const API_URL = process.env.NEXT_PUBLICTAPI_URL
const API_KEY = process.env.API_KEY

interface ApiErrorResponse {
  message: string
}
type CustomAxiosError = AxiosError<ApiErrorResponse>
if (!API_URL || !API_KEY) {
  throw new Error(
    'Missing required environment variables: API_URL and API_KEY must be set',
  )
}

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: CustomAxiosError) => {
    const errorMessage = getErrorMessage(error)
    return Promise.reject(new Error(errorMessage))
  },
)

function getErrorMessage(error: CustomAxiosError): string {
  if (!error.response) {
    return error.message || 'Network error - please check your connection'
  }

  const responseData = error.response.data

  if (typeof responseData === 'object' && responseData !== null) {
    if ('message' in responseData && typeof responseData.message === 'string') {
      return responseData.message
    }

    if ('error' in responseData && typeof responseData.error === 'string') {
      return responseData.error
    }
  }

  return `Unexpected error: ${error.response.status} ${error.response.statusText}`
}

type ApiResponse<T> = Promise<T>
type ApiError = Error

const handleRequest = async <T>(
  request: Promise<AxiosResponse<T>>,
): ApiResponse<T> => {
  try {
    const response = await request
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const apiService = {
  fetchPosts: (): ApiResponse<PostCommentWithComments[]> =>
    handleRequest(apiClient.get('/posts/get-all-posts-with-comments')),

  createPost: (data: CreatePostData): ApiResponse<void> =>
    handleRequest(
      apiClient.post(`/posts/create-post/${data.id}`, {
        description: data.description,
        url: data.url,
        authorName: data.authorName,
      }),
    ),

  updatePost: (data: UpdateNewsPost): ApiResponse<void> =>
    handleRequest(
      apiClient.put(`/posts/update-post/${data.post_id}`, {
        description: data.description,
        url: data.url,
      }),
    ),

  deletePost: (postId: string): ApiResponse<void> =>
    handleRequest(apiClient.delete(`/posts/delete-post/${postId}`)),

  postComment: (data: CommentData): ApiResponse<void> =>
    handleRequest(
      apiClient.post(`/posts/create-comment/${data.authorId}`, {
        id: data.post_id,
        content: data.comment,
        authorName: data.authorName,
      }),
    ),

  updateComment: (data: UpdateComment): ApiResponse<void> =>
    handleRequest(
      apiClient.put(`/posts/update-comment/${data.commentId}`, {
        content: data.comment,
      }),
    ),

  deleteComment: (commentId: string): ApiResponse<void> =>
    handleRequest(apiClient.delete(`/posts/delete-comment/${commentId}`)),

  getVideos: (): ApiResponse<Videos[]> =>
    handleRequest(apiClient.get('/posts/videos')),

  getVideo: (youtubeId: string): ApiResponse<GetVideo> =>
    handleRequest(apiClient.get(`/posts/get-video/${youtubeId}`)),

  loginUser: (data: LoginData): ApiResponse<LoginRespomse> =>
    handleRequest(apiClient.post('/auth/login', data)),
  registerUser: (data: RegisterData): ApiResponse<void> =>
    handleRequest(
      apiClient.post('/auth/register', {
        ...data,
        passwordConfirm: data.confirmPassword,
      }),
    ),

  verifyEmail: (token: string): ApiResponse<void> =>
    handleRequest(apiClient.get(`/auth/verify-email?token=${token}`)),

  resetPassword: (data: ResetPasswordData): ApiResponse<void> =>
    handleRequest(
      apiClient.post('/auth/reset-password', {
        ...data,
      }),
    ),

  forgotPassword: (email: string): ApiResponse<void> =>
    handleRequest(apiClient.post('/auth/forgot-password', { email })),

  getMe: (): ApiResponse<User> => handleRequest(apiClient.get('/users/me')),

  deleteUser: (userId: string): ApiResponse<void> =>
    handleRequest(apiClient.delete(`/users/delete/${userId}`)),

  updateUserPassword: (data: UserPasswordUpdate): ApiResponse<void> =>
    handleRequest(apiClient.put('/users/update-password', data)),

  updateUsername: (data: UsernameUpdate): ApiResponse<void> =>
    handleRequest(
      apiClient.put('/users/update-username', {
        name: data.name,
        password: data.password,
      }),
    ),
}
