"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brand } from "@/components/Brand";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Mail, Lock } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
      });

      if (error) throw error;

      if (data.session) {
        router.push("/dashboard");
        router.refresh();
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });
        if (signInError) throw signInError;
        router.push("/dashboard");
        router.refresh();
      }
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Ro'yxatdan o'tishda xatolik yuz berdi.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream px-5 py-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Link href="/login" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-black">
          <ArrowLeft size={16} /> Kirish sahifasiga qaytish
        </Link>
        <div className="card p-7 sm:p-9">
          <Brand />
          <h1 className="mt-8 text-3xl font-black">Ro'yxatdan o'tish</h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Yangi hisob yaratish uchun quyidagi ma'lumotlarni to'ldiring.
          </p>

          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <label className="block text-sm font-bold">
              Email
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#e6e2d9] bg-[#fffefa] pl-10 pr-4 py-3 outline-none focus:border-[#85b39d]"
                  placeholder="email@example.com"
                />
              </div>
            </label>
            
            <label className="block text-sm font-bold">
              Parol
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  required
                  minLength={6}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-[#e6e2d9] bg-[#fffefa] pl-10 pr-4 py-3 outline-none focus:border-[#85b39d]"
                  placeholder="Kamida 6 belgi"
                />
              </div>
            </label>

            <button type="submit" disabled={busy} className="btn-primary w-full mt-2 disabled:opacity-50">
              {busy ? "Kutilmoqda..." : "Hisob yaratish va kirish"}
            </button>
          </form>

          {message && (
            <p role="status" className="mt-4 rounded-xl bg-[#fff3dd] p-3 text-sm text-[#72572b]">
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
