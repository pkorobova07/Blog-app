// src/components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Проверяем есть ли пользователь в localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header>
      <div className="site-header">
        <h1 className="site-title">SwagaBlog</h1>
      </div>

      <nav className="header-nav">
        {user ? (
          <>
            <span className="user-greeting">Привет, {user.username}!</span>
            <Link href="/create-post" className="nav-button">
              + Новый пост
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="nav-button">
              Войти
            </Link>
            <Link href="/register" className="nav-button secondary">
              Регистрация
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
