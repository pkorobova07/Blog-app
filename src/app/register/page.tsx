// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/auth";
import Header from "@/components/Header/Header";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const user = await register(username, password);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    } else {
      setError("Пользователь уже существует");
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="auth-page">
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Логин</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>
      </div>
    </div>
  );
}
