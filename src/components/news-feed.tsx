'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  createPost,
  deleteComment,
  deletePost,
  postComment,
  updateComment,
  updatePost,
} from '@/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import {
  CreatePostData,
  PostCommentWithAuthor,
  PostCommentWithComments,
} from '@/types'
import { usePosts } from '@/services/queries'
import { useAuth } from '@/context/auth-context'
import { ArrowLeft } from 'lucide-react'
import Loading from './loading'

export function NewsFeed() {
  const queryClient = useQueryClient()
  const { data: posts, isLoading, error } = usePosts()
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null)
  const { query } = useAuth()
  const currentUserId = query.data?.data.user.id || ''
  const currentUsername = query.data?.data.user.name || ''

  const { register, handleSubmit, reset } = useForm<CreatePostData>()

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  const postCommentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      setActiveCommentId(null)
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  })

  const handleSubmitCreate = (data: CreatePostData) => {
    createPostMutation.mutate({
      url: data.url,
      description: data.description,
      id: currentUserId,
      authorName: currentUsername,
    })
    reset()
  }

  const handleCommentSubmit = (postId: string, comment: string) => {
    postCommentMutation.mutate({
      post_id: postId,
      comment,
      authorName: currentUsername,
      authorId: currentUserId,
    })
  }

  const handleEditComment = (commentId: string, newContent: string) => {
    updateCommentMutation.mutate({ commentId, comment: newContent })
  }

  const handleDeleteComment = (commentId: string) => {
    deleteCommentMutation.mutate(commentId)
  }

  const handleEditPost = (
    postId: string,
    newDescription: string,
    url: string,
  ) => {
    updatePostMutation.mutate({
      post_id: postId,
      description: newDescription,
      url,
    })
  }

  const handleDeletePost = (postId: string) => {
    deletePostMutation.mutate(postId)
  }

  if (isLoading) return <Loading />
  if (error) return <div>Service unavailable.</div>

  return (
    <section className="max-w-full mx-auto px-6 py-12 bg-[#1a1a1a] shadow-lg border-gray-800">
      <div className="mb-8 border-b border-gray-800 pb-8">
        <form onSubmit={handleSubmit(handleSubmitCreate)} className="space-y-4">
          <div className="space-y-4">
            <input
              {...register('url', { required: true })}
              placeholder="Paste the news link here"
              className="w-full p-4 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-gray-200 placeholder-gray-500 transition-all"
            />
            <textarea
              {...register('description', { required: true })}
              placeholder="Add a description or comment about the news"
              className="w-full p-4 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-gray-200 placeholder-gray-500 transition-all min-h-[100px]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            disabled={createPostMutation.isPending}
          >
            {createPostMutation.isPending ? 'Publishing...' : 'Share news'}
          </button>
        </form>
      </div>

      <div className="space-y-8">
        {posts?.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            activeCommentId={activeCommentId}
            onCommentToggle={setActiveCommentId}
            onCommentSubmit={handleCommentSubmit}
            isCommenting={postCommentMutation.isPending}
            onEditPost={handleEditPost}
            onDeletePost={handleDeletePost}
            onEditComment={handleEditComment}
            onDeleteComment={handleDeleteComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </section>
  )
}

const PostItem = ({
  post,
  activeCommentId,
  onCommentToggle,
  onCommentSubmit,
  isCommenting,
  onEditPost,
  onDeletePost,
  onEditComment,
  onDeleteComment,
  currentUserId,
}: {
  post: PostCommentWithComments
  activeCommentId: string | null
  onCommentToggle: (id: string | null) => void
  onCommentSubmit: (postId: string, comment: string) => void
  isCommenting: boolean
  onEditPost: (postId: string, newDescription: string, url: string) => void
  onDeletePost: (postId: string) => void
  onEditComment: (commentId: string, newContent: string) => void
  onDeleteComment: (commentId: string) => void
  currentUserId: string | undefined
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUrl, setEditedUrl] = useState(post.url)
  const [editedDescription, setEditedDescription] = useState(post.description)

  const handleEdit = () => {
    if (editedDescription.trim()) {
      onEditPost(post.id, editedDescription.trim(), editedUrl.trim())
      setIsEditing(false)
    }
  }

  return (
    <article className="p-6 rounded-xl bg-gray-900/40 border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="flex items-start gap-4 justify-between">
        <div className="flex-1">
          <div className="mb-4 space-y-2">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  value={editedUrl}
                  onChange={(e) => setEditedUrl(e.target.value)}
                  required
                  placeholder="Past the news link here!"
                  className="w-full p-4 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-gray-200 placeholder-gray-500 transition-all"
                />
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full p-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-gray-200 placeholder-gray-500 transition-all"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-700/20 text-gray-400 rounded-lg hover:bg-gray-700/30 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-blue-400 hover:text-blue-300 transition-colors break-all"
                >
                  {post.url}
                </Link>
                <p className="text-gray-300">{post.description}</p>
              </>
            )}

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">
                Posted by {post.authorName} •{' '}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>

              {currentUserId === post.authorId && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeletePost(post.id)}
                    className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() =>
                onCommentToggle(post.id === activeCommentId ? null : post.id)
              }
              className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"
            >
              <span>💬</span>
              {post.id === activeCommentId ? 'Close comments' : 'See comments'}
            </button>

            {post.id === activeCommentId && (
              <CommentBox
                onSubmit={(comment) => onCommentSubmit(post.id, comment)}
                isLoading={isCommenting}
              />
            )}

            {post.comments?.length > 0 && activeCommentId === post.id && (
              <div className="mt-4 space-y-4">
                {post.comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onEdit={onEditComment}
                    onDelete={onDeleteComment}
                    currentUserId={currentUserId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <Link
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-sm bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2 h-fit"
        >
          <span>
            <ArrowLeft />
          </span>
          See news
        </Link>
      </div>
    </article>
  )
}

const CommentBox = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (comment: string) => void
  isLoading: boolean
}) => {
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment.trim())
      setComment('')
    }
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-800">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-gray-200 placeholder-gray-500 transition-all min-h-[100px]"
        />
        <div className="flex gap-3 mt-4 justify-end">
          <button
            onClick={() => setComment('')}
            className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            Clean
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  )
}

const CommentItem = ({
  comment,
  onEdit,
  onDelete,
  currentUserId,
}: {
  comment: PostCommentWithAuthor
  onEdit: (commentId: string, newContent: string) => void
  onDelete: (commentId: string) => void
  currentUserId: string | undefined
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)

  const handleEdit = () => {
    if (editedContent.trim()) {
      onEdit(comment.id, editedContent.trim())
      setIsEditing(false)
    }
  }

  return (
    <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-800">
      <div className="flex items-center gap-3 mb-2 justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>
          <div>
            <span className="text-sm text-gray-400">{comment.authorName}</span>
            <span className="text-xs text-gray-500 ml-2">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {currentUserId === comment.authorId && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            <button
              onClick={() => onDelete(comment.id)}
              className="text-sm text-gray-400 hover:text-red-400 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-gray-200 placeholder-gray-500 transition-all"
          />
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors w-full"
          >
            Save changes
          </button>
        </div>
      ) : (
        <p className="text-gray-300">{comment.content}</p>
      )}
    </div>
  )
}
