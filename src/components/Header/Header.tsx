import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <h1 className="site-title">
        <Link href="/">SwagaBlog</Link>
      </h1>
      
      <nav className="site-nav">
        <Link href="/create-post">+ Новый пост</Link>
      </nav>
    </header>
  );
}
