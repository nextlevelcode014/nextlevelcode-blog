import { useState } from 'react'

export default function CommentBox({ postId }: { postId: string }) {
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (comment.trim()) {
      postCommentMutation.mutate(
        {
          post_id: postId,
          comment: comment,
        },
        {
          onSuccess: () => setComment(''),
        },
      )
    }
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-800">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Escreva seu comentário..."
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 text-gray-200 placeholder-gray-500 transition-all min-h-[100px]"
        />
        <div className="flex gap-3 mt-4 justify-end">
          <button
            onClick={() => setActiveCommentId(null)}
            className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
            disabled={postCommentMutation.isPending}
          >
            {postCommentMutation.isPending ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </div>
    </div>
  )
}
