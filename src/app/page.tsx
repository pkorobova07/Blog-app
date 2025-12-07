"use client";

import { useState, useEffect } from "react";
import { getPosts, getTags } from "@/lib/posts";
import Header from "@/components/Header/Header";
import TagFilter from "@/components/TagFileter";
import PostList from "@/components/PostList/PostList";
import { Post, Tag } from "@/lib/types";

export default function HomePage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    const [postsData, tagsData] = await Promise.all([getPosts(), getTags()]);
    setPosts(postsData);
    setTags(tagsData);
    setLoading(false);
  }

  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag)) // было .some()
    : posts;


if (loading) return (
  <div style={{
    textAlign: 'center',
    padding: '100px',
    background: 'var(--background)',
    minHeight: '100vh'
  }}>
    <p style={{
      color: 'var(--foreground)',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      animation: 'blink 1s infinite'
    }}>
      ⏳ Загружаем посты...
    </p>
  </div>
);

  return (  // редакт с боковыми тегами
    <div>
      <Header />
      <div className="page-with-sidebar">
        <div className="posts-column">
          <PostList posts={filteredPosts} onTagClick={setActiveTag} />
        </div>
        <div className="tags-sidebar-wrapper">
          <div className="tags-box">
            <h3>Теги</h3>
            <TagFilter tags={tags} activeTag={activeTag} onTagClick={setActiveTag} />
            {activeTag && (
              <div className="current-filter">
                <p>Выбран: <span className="filter-tag">#{activeTag}</span></p>
                <button onClick={() => setActiveTag(null)}>× Сбросить</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
