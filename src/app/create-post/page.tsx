"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/posts";
import CreatePostForm from "@/components/PostForm";
import Header from "@/components/Header/Header";

export default function CreatePostPage() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    const result = await createPost(data);
    return !!result;
  };

  return (
    <div>
      <Header />
      <CreatePostForm onCreatePost={handleCreate} />
    </div>
  );
}
