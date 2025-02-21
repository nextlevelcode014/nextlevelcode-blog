// types/index.ts
export interface NewsPost {
  id: string
  url: string
  description: string
  authorId: string
  createdAt: string
}

export interface UpdateNewsPost {
  post_id: string
  url: string
  description: string
}

export interface PostCommentWithComments {
  id: string
  url: string
  description: string
  authorId: string
  authorName: string
  comments: PostCommentWithAuthor[]
  createdAt: string
}

export interface PostCommentWithAuthor {
  id: string
  content: string
  authorId: string
  authorName: string
  createdAt: string
}

export interface Author {
  id: string
  name: string
}

export interface CreatePostData {
  id: string
  url: string
  description: string
  authorName: string
}

export interface CommentData {
  authorId: string
  post_id: string
  comment: string
  authorName: string
}

export interface UpdateComment {
  comment: string
  commentId: string
}

export interface Videos {
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

export interface Videos {
  id: string
  title: string
  duration: string
  youtube_id: string
  views: number
  categories: string[]
}

export interface GetVideo {
  title: string
  duration: string
  views: number
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
