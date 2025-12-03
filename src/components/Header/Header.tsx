import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/">DevBlog</Link>

      <nav>
        <Link href="/create-post">+ Новый пост</Link>
      </nav>
    </header>
  );
}
