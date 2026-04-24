import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { recommendLevel } from '@/data/questions';

export const dynamic = 'force-dynamic';

export default async function ResultPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: attempt, error } = await supabase
    .from('test_attempts')
    .select('id, total_score, max_score, level_recommended, duration_sec, student_id')
    .eq('id', params.id)
    .single();

  if (error || !attempt) {
    notFound();
  }

  const { data: student } = await supabase
    .from('students')
    .select('name, grade')
    .eq('id', attempt.student_id)
    .single();

  const info = recommendLevel(attempt.total_score, attempt.max_score);
  const minutes = Math.floor(attempt.duration_sec / 60);
  const seconds = attempt.duration_sec % 60;

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '120px 24px 80px' }}>
      <div className="h-eyebrow" style={{ marginBottom: 20 }}>Step 3 / 3 · 테스트 결과</div>

      <h1 className="h-serif" style={{ fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.15, marginBottom: 16 }}>
        {student?.name} 학생에게<br />
        <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>추천</em>드리는 레벨입니다.
      </h1>

      <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 40 }}>
        {student?.grade} · 응시 시간 {minutes > 0 ? `${minutes}분 ` : ''}{seconds}초
      </p>

      {/* 추천 레벨 카드 */}
      <div className="card" style={{ textAlign: 'center', padding: '60px 32px', marginBottom: 32 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.3em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 16 }}>
          Recommended Level
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 96, fontWeight: 900, color: 'var(--accent)', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 8 }}>
          {info.level}
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
          {info.levelName}
        </div>
        <p style={{ fontSize: 15, color: 'var(--ink-soft)', maxWidth: 480, margin: '0 auto', lineHeight: 1.8 }}>
          {info.description}
        </p>
      </div>

      {/* 안내 메시지 */}
      <div className="card-deep" style={{ marginBottom: 32 }}>
        <h3 className="h-serif" style={{ fontSize: 17, marginBottom: 12 }}>
          상세 결과는 담당 강사에게 전달되었습니다.
        </h3>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.85 }}>
          문항별 정오답과 영역별 점수, 학습 진단 코멘트 등 상세 분석은 학원 측에 전송되었습니다.
          상담 예약 후 방문 시 담당 강사와 함께 자세한 결과를 확인하실 수 있습니다.
        </p>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <p style={{ fontSize: 15, color: 'var(--ink-soft)', marginBottom: 20 }}>
          상담을 원하시면 학원으로 연락 주세요.
        </p>
        <a href="tel:050714480134" className="btn btn-primary" style={{ marginRight: 12 }}>
          학원 전화 0507-1448-0134
        </a>
        <Link href="/" className="btn btn-ghost">
          처음으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
