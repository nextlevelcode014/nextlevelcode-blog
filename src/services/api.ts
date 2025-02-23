// src/services/api.ts
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

// Validar variáveis de ambiente
const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY

interface ApiErrorResponse {
  message: string
  // Adicione outros campos comuns de erro aqui
}
type CustomAxiosError = AxiosError<ApiErrorResponse>
if (!API_URL || !API_KEY) {
  throw new Error(
    'Missing required environment variables: API_URL and API_KEY must be set',
  )
}

// Configurar instância Axios com defaults
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
})

// Request interceptor para injetar token
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
  // Caso 1: Erro de rede/sem resposta
  if (!error.response) {
    return error.message || 'Network error - please check your connection'
  }

  // Caso 2: Resposta HTTP com dados estruturados
  const responseData = error.response.data

  // Verificação de tipo segura
  if (typeof responseData === 'object' && responseData !== null) {
    // Type guard para mensagem de erro
    if ('message' in responseData && typeof responseData.message === 'string') {
      return responseData.message
    }

    // Adicione outros formatos de erro conhecidos aqui
    if ('error' in responseData && typeof responseData.error === 'string') {
      return responseData.error
    }
  }

  // Caso 3: Resposta inesperada/não estruturada
  return `Unexpected error: ${error.response.status} ${error.response.statusText}`
}

// Tipos auxiliares
type ApiResponse<T> = Promise<T>
type ApiError = Error

// Funções auxiliares
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

// Serviços API
export const apiService = {
  // Posts
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

  // Comentários
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

  // Vídeos
  getVideos: (): ApiResponse<Videos[]> =>
    handleRequest(apiClient.get('/posts/videos')),

  getVideo: (youtubeId: string): ApiResponse<GetVideo> =>
    handleRequest(apiClient.get(`/posts/get-video/${youtubeId}`)),

  // Autenticação
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
        token: localStorage.getItem('token'),
      }),
    ),

  forgotPassword: (email: string): ApiResponse<void> =>
    handleRequest(apiClient.post('/auth/forgot-password', { email })),

  // Usuários
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
