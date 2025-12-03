
import { Post, Tag } from '@/lib/types'
import { supabase } from './prvider'

// 1. Получить посты
export async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('id', { ascending: false })
  
  if (error || !data) return []
  
  return data.map(post => ({
    id: post.id,
    title: post.title || '',
    content: post.content || '',
    author: post.author || '',
    tags: post.tags || []
  })) as Post[]
}

// 2. Получить пост
export async function getPost(id: string) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error || !post) return null
  
  return {
    id: post.id,
    title: post.title || '',
    content: post.content || '',
    author: post.author || '',
    tags: post.tags || []
  } as Post
}

// 3. Получить теги
export async function getTags() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('tags')
  
  if (error || !posts) return []
  
  const tagSet = new Set<string>()
  
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach((tag: string) => {
        if (tag.trim()) {
          tagSet.add(tag.toLowerCase())
        }
      })
    }
  })
  
  return Array.from(tagSet) // массив строк
}

// 4. Создать пост
export async function createPost(data: {
  title: string
  content: string
  author: string
  tags: string
}) {
  const tagsArray = data.tags
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0)
  
  const { data: post, error } = await supabase
    .from('posts')
    .insert([{
      title: data.title,
      content: data.content,
      author: data.author,
      tags: tagsArray
    }])
    .select()
    .single()
  
  if (error) return null
  return post as Post
}