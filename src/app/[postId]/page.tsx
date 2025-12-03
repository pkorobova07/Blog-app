import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost} from "@/lib/posts";
import Header from "@/components/Header/Header";
import Post from "@/components/Post/Post";

interface PostPageProps {
  params: Promise<{ postId: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { postId } = await params;
  const post = await getPost(postId);
  if (!post) notFound();

  return (
    <div>
      <Header />
      <Link href="/">← Назад</Link>
      <Post post={post} showFull={true} />
    </div>
  );
}
