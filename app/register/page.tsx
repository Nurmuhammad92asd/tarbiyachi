"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [result, setResult] = useState("Tekshirilmoqda...");

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createClient();
        // Ro'yxatdan o'tishga majburan urinamiz, xatoni ko'rish uchun
        const { error } = await supabase.auth.signInWithPassword({
          email: "test@test.com",
          password: "12345678",
        });
        
        if (error) {
          setResult(`Supabase javobi: ${error.message}`);
        } else {
          setResult(`Muvaffaqiyatli`);
        }
      } catch (err: any) {
        setResult(`TIZIM XATOSI: ${err.message}`);
      }
    }
    testConnection();
  }, []);

  return (
    <main style={{ padding: '50px', fontFamily: 'monospace', background: '#f0f0f0', minHeight: '100vh' }}>
      <h1>Supabase Xatoni Aniqlash Testi</h1>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px', border: '2px solid #333' }}>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{result}</p>
      </div>
    </main>
  );
}
