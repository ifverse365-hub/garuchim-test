import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import LogoutButton from './LogoutButton';

export const dynamic = 'force-dynamic';

type AttemptRow = {
  id: string;
  created_at: string;
  total_score: number;
  max_score: number;
  level_recommended: string;
  duration_sec: number;
  student: { name: string; grade: string; parent_phone: string | null } | null;
};

export default async function AdminDashboard() {
  const supabase = createClient();

  const { data: attempts, error } = await supabase
    .from('test_attempts')
    .select('id, created_at, total_score, max_score, level_recommended, duration_sec, student:students(name, grade, parent_phone)')
    .order('created_at', { ascending: false })
    .limit(200);

  const rows = (attempts ?? []) as unknown as AttemptRow[];

  return (
    <main style={{ padding: '100px 32px 80px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="h-eyebrow" style={{ marginBottom: 12 }}>관리자 대시보드</div>
          <h1 className="h-serif" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15 }}>
            최근 응시 <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>기록</em>
          </h1>
        </div>
        <LogoutButton />
      </div>

      {error && (
        <div style={{ padding: 16, background: '#FEE', border: '1px solid #F99', color: '#B00', marginBottom: 24 }}>
          데이터 조회 오류: {error.message}
        </div>
      )}

      <div style={{ marginBottom: 16, fontSize: 13, color: 'var(--muted)' }}>
        총 <strong>{rows.length}</strong>건 · 최근 200건까지 표시
      </div>

      {rows.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '80px 32px' }}>
          <p style={{ fontSize: 16, color: 'var(--ink-soft)' }}>아직 응시 기록이 없습니다.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>응시 일시</th>
                <th>학생</th>
                <th>학년</th>
                <th>점수</th>
                <th>추천 레벨</th>
                <th>응시 시간</th>
                <th>보호자 연락처</th>
                <th>상세</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => {
                const d = new Date(a.created_at);
                const dateStr = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
                const min = Math.floor(a.duration_sec / 60);
                const sec = a.duration_sec % 60;
                return (
                  <tr key={a.id}>
                    <td style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>{dateStr}</td>
                    <td><strong>{a.student?.name ?? '—'}</strong></td>
                    <td>{a.student?.grade ?? '—'}</td>
                    <td style={{ fontFamily: 'var(--mono)' }}>{a.total_score} / {a.max_score}</td>
                    <td><span className="lvl-badge">{a.level_recommended}</span></td>
                    <td style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>{min}:{String(sec).padStart(2, '0')}</td>
                    <td style={{ fontSize: 13 }}>{a.student?.parent_phone ?? '—'}</td>
                    <td>
                      <Link href={`/admin/${a.id}`} style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.1em' }}>
                        상세 →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
