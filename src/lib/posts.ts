
import { Post } from '@/lib/types'
import { supabase } from './provider'


export async function getPosts() { // 1. все посты по id
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('id', { ascending: false }) //сорт по убыванию id
  
  if (error || !data) return []
  
  return data.map(post => ({
    id: post.id,
    title: post.title || '',
    content: post.content || '',
    author: post.author || '',
    tags: post.tags || []
  })) as Post[]
}

// 2. получение одного поста по id
export async function getPost(id: string) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id) // id равен переданному и выводит одну запись
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

// 3. уникальные теги сбор
export async function getTags() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('tags')
  
  if (error || !posts) return []
  
  const tagSet = new Set<string>() // уник значение
  
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