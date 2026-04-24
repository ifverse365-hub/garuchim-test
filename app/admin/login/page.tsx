'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLogin() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: err } = await supabase.auth.signInWithPassword({ email, password });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    // 미들웨어가 /admin 으로 리다이렉트해 주도록, 새 경로로 밀어넣기
    router.replace('/admin');
    router.refresh();
  }

  return (
    <main style={{ maxWidth: 420, margin: '0 auto', padding: '140px 24px 80px' }}>
      <div className="h-eyebrow" style={{ marginBottom: 20 }}>관리자 로그인</div>
      <h1 className="h-serif" style={{ fontSize: 36, lineHeight: 1.2, marginBottom: 32 }}>
        가르침에듀<br />
        <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>관리자</em>
      </h1>

      <form onSubmit={handleLogin} className="card">
        <div className="field">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="field">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
          {loading ? <><span className="spinner" /> 로그인 중...</> : '로그인'}
        </button>

        {error && (
          <div style={{ marginTop: 16, padding: 12, background: '#FEE', border: '1px solid #F99', color: '#B00', fontSize: 13 }}>
            {error}
          </div>
        )}
      </form>

      <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 20, textAlign: 'center' }}>
        계정은 Supabase 대시보드 → Authentication 에서 관리합니다.
      </p>
    </main>
  );
}
