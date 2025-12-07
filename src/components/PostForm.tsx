"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CreatePostFormProps {
  onCreatePost: (data: {
    title: string;
    content: string;
    author: string;
    tags: string;
  }) => Promise<boolean>;
}

export default function CreatePostForm({ onCreatePost }: CreatePostFormProps) { // кокашки
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await onCreatePost({
      title,
      content,
      author: author || "Аноним",
      tags,
    });

    if (success) {
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Имя автора</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Ваше имя"
        />
      </div>

      <div>
        <label>Заголовок</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите заголовок"
          required
        />
      </div>

      <div>
        <label>Текст</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Поделитесь своими мыслями"
          required
        />
      </div>

      <div>
        <label>Теги (через запятую)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Введите теги через запятую"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Сохранение..." : "Создать пост"}
      </button>
    </form>
  );
}
