// src/components/CreatePostForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CreatePostFormProps {
  onCreatePost: (data: { title: string; content: string; tags: string }) => Promise<boolean>
  username: string // добавляем username
}

export default function CreatePostForm({ onCreatePost, username }: CreatePostFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const data = {
      title,
      content,
      tags
    }

    const success = await onCreatePost(data)
    if (success) router.push('/')

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Автор: {username}</label>
      </div>

      <div>
        <label>Заголовок</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Текст</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Теги</label>
        <input
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="javascript, react"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Сохранение...' : 'Создать пост'}
      </button>
    </form>
  )
}