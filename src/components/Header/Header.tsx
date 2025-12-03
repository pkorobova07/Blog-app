import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div>
        <h1 className="site-title">
          <Link href="/">DevBlog</Link>
        </h1>
        <p className="site-subtitle">Пиши. Читай. Делись.</p>
      </div>
      <nav>
        <button>
          <Link href="/create-post" className="post-button">
            + Новый пост
          </Link>
        </button>
      </nav>
    </header>
  );
}
