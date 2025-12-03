// src/components/Post.tsx
import Link from "next/link";
import { Post as PostType } from "@/lib/types";

interface PostProps {
  post: PostType;
  showFull?: boolean;
  onTagClick?: (tagName: string) => void;
}

export default function Post({
  post,
  showFull = false,
  onTagClick,
}: PostProps) {
  const content = showFull
    ? post.content
    : post.content.substring(0, 150) + (post.content.length > 150 ? "..." : "");

  return (
    <article>
      {showFull ? (
        <h1>{post.title}</h1>
      ) : (
        <Link href={`/${post.id}`}>
          <h2>{post.title}</h2>
        </Link>
      )}

      <p>@{post.author}</p>

      <div>
        {content.split("\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div>
        {post.tags.map((tag, i) =>
          onTagClick ? (
            <button key={i} onClick={() => onTagClick(tag)}>
              #{tag}
            </button>
          ) : (
            <span key={i}>#{tag}</span>
          )
        )}
      </div>

      {!showFull && <Link href={`/${post.id}`}>Читать далее →</Link>}
    </article>
  );
}
