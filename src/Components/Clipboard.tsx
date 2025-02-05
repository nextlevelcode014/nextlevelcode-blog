'use client'
// components/CopyToClipboardButton.js
import { useState } from 'react'
import copy from 'clipboard-copy'

const CopyToClipboardButton = ({
  text,
  className
}: {
  text: string
  className?: string
}) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClick = async () => {
    try {
      await copy(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000) // Redefine após 2 segundos
    } catch (error) {
      console.error('Failed to copy text to clipboard', error)
    }
  }

  return (
    <div
      className={`relative bg-gray-800 text-white p-4 overflow-auto rounded ${className || 'mt-2 mb-4'}`}
    >
      <button
        onClick={handleCopyClick}
        aria-label="Copy to clipboard"
        className={`absolute top-2 right-2 ${
          isCopied ? 'bg-green-500' : 'bg-blue-500'
        } hover:bg-blue-700 text-white font-bold py-1 px-2 rounded transition-colors`}
      >
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
      <pre className="whitespace-pre-wrap">
        <code>{text}</code>
      </pre>
    </div>
  )
}

export default CopyToClipboardButton
