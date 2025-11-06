'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else router.push('/admin');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12">
      <div className="bg-gray-900 p-8 rounded-xl border border-neon/20 max-w-md w-full mx-auto">
        <h1 className="text-3xl font-black text-neon text-center mb-6">ADMIN LOGIN</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 bg-black border border-neon/50 rounded text-white"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 bg-black border border-neon/50 rounded text-white"
            required
          />
          <button type="submit" disabled={loading} className="w-full bg-neon text-black py-3 rounded font-bold hover:bg-white transition">
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}