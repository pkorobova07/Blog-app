import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ylqqujhnlijdntagwjlg.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_API_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseKey);
