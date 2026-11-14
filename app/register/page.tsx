"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [result, setResult] = useState("Tekshirilmoqda...");

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createClient();
        
        // Supabase'ga eng oddiy so'rov yuboramiz
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          setResult(`SUPABASE XATOSI: ${error.message}`);
        } else {
          setResult(`SUPABASE ISHLAYAPTI. URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
        }
      } catch (err: any) {
        setResult(`TIZIM XATOSI: ${err.message}`);
      }
    }
    testConnection();
  }, []);

  return (
    <main style={{ padding: '50px', fontFamily: 'monospace', background: '#f0f0f0', minHeight: '100vh' }}>
      <h1>Supabase Ulanish Testi</h1>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px', border: '2px solid #333' }}>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{result}</p>
      </div>
      <p style={{ marginTop: '20px', color: '#666' }}>
        Agar bu yerda "SUPABASE ISHLAYAPTI" deb chiqsa, demak kalitlar joyida. Agar xato chiqsa, Vercel'dagi Environment Variables noto'g'ri.
      </p>
    </main>
  );
}
