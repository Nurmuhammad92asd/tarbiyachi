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

    // Agar Confirm email o'chirilgan bo'lsa, session avtomatik keladi
    if (data.session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      // Agar session kelmagan bo'lsa (Confirm email hali yoniq bo'lsa),
      // signInWithPassword bilan majburan kirishga harakat qilamiz
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
