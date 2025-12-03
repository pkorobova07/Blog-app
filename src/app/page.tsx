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

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <Header />
      <TagFilter tags={tags} activeTag={activeTag} onTagClick={setActiveTag} />
      <PostList posts={filteredPosts} onTagClick={setActiveTag} />
    </div>
  );
}
