// src/app/create-post/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header/Header'
import CreatePostForm from '@/components/PostForm'
import { createPost } from '@/lib/posts'

export default function CreatePostPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (!savedUser) {
      router.push('/login')
    } else {
      setUser(JSON.parse(savedUser))
    }
  }, [router])

  const handleCreatePost = async (data: { title: string; content: string; tags: string }) => {
    const postData = {
      ...data,
      author: user.username // берем username из авторизации
    }
    const result = await createPost(postData)
    return !!result
  }

  if (!user) return <div>Проверка доступа...</div>

  return (
    <div>
      <Header />
      <CreatePostForm 
        onCreatePost={handleCreatePost} 
        username={user.username} // передаем username
      />
    </div>
  )
}