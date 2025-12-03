import Post from "../Post/Post";
import { Post as PostType } from "@/lib/types";

interface PostListProps {
  posts: PostType[];
  onTagClick: (tagName: string) => void;
}

export default function PostList({ posts, onTagClick }: PostListProps) {
  if (posts.length === 0) {
    return <p>Нет постов</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} onTagClick={onTagClick} />
      ))}
    </div>
  );
}
