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
export type LoginData = {
  email: string
  password: string
}
export interface User {
  status: string
  data: {
    user: {
      id: string
      name: string
      email: string
      role: string
      verified: boolean
      created_at: string
      updated_at: string
    }
  }
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}
export interface ResetPasswordData {
  newPassword: string
  confirmPassword: string
}

export interface UserLoginResponse {
  status: string
  token: string
}

export interface UserPasswordUpdate {
  oldPassword: string
  newPassword: string
  newPasswordConfirm: string
}

export interface UsernameUpdate {
  name: String
  password: String
}
