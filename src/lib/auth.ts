import { supabase } from "./provider";

export async function login(username: string, password: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("password", password)
    .single();

  if (error) return null;
  return data;
}

export async function register(username: string, password: string) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ username, password }])
    .select()
    .single();

  if (error) return null;
  return data;
}

export function logout() {
  // Просто удаляем из localStorage
  localStorage.removeItem("user");
}
