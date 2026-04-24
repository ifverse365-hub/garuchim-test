import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import {
  questionsByLevel,
  CATEGORY_LABEL,
  LEVEL_LABEL,
  interpretResult,
  type QuestionLevel,
} from '@/data/questions';

export const dynamic = 'force-dynamic';

type AnswerDetail = {
  id: string;
  category: string;
  pickedIndex: number | null;
  correctIndex: number;
  isCorrect: boolean;
  points: number;
};

const VALID_LEVELS: QuestionLevel[] = ['L1', 'L2', 'L3', 'L4', 'L5'];

export default async function AttemptDetail({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: attempt, error } = await supabase
    .from('test_attempts')
    .select('*, student:students(*)')
    .eq('id', params.id)
    .single();

  if (error || !attempt) notFound();

  const details = (attempt.answers_detail ?? []) as AnswerDetail[];
  const categoryScores = (attempt.category_scores ?? {}) as Record<string, { got: number; max: number }>;

  const testedLevel: QuestionLevel = VALID_LEVELS.includes(attempt.test_level)
    ? (attempt.test_level as QuestionLevel)
    : 'L1';
  const result = interpretResult(testedLevel, attempt.total_score);
  const levelQuestions = questionsByLevel[testedLevel];

  const created = new Date(attempt.created_at);
  const dateStr = `${created.getFullYear()}.${String(created.getMonth() + 1).padStart(2, '0')}.${String(created.getDate()).padStart(2, '0')} ${String(created.getHours()).padStart(2, '0')}:${String(created.getMinutes()).padStart(2, '0')}`;
  const min = Math.floor(attempt.duration_sec / 60);
  const sec = attempt.duration_sec % 60;

  return (
    <main style={{ padding: '100px 32px 80px', maxWidth: 1000, margin: '0 auto' }}>
      <Link href="/admin" style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: '0.1em' }}>
        ← 대시보드로
      </Link>

      <div style={{ marginTop: 24, marginBottom: 48 }}>
        <div className="h-eyebrow" style={{ marginBottom: 12 }}>응시 기록 상세</div>
        <h1 className="h-serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.15 }}>
          {attempt.student?.name} · <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{attempt.student?.grade}</em>
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 1, background: 'var(--paper-line)', border: '1px solid var(--paper-line)', marginBottom: 40 }}>
        <SummaryCell label="응시 일시" value={dateStr} mono />
        <SummaryCell label="응시 레벨" value={LEVEL_LABEL[testedLevel]} />
        <SummaryCell label="응시 시간" value={`${min}분 ${sec}초`} mono />
        <SummaryCell label="총점" value={`${attempt.total_score} / ${attempt.max_score}`} big />
        <SummaryCell label="정답률" value={`${Math.round((attempt.total_score / attempt.max_score) * 100)}%`} big />
        <SummaryCell label="추천 레벨" value={result.recommendedLevel} accent big />
      </div>

      <div className="card-deep" style={{ marginBottom: 40, padding: 20 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8 }}>
          진단 코멘트
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>{result.message}</p>
      </div>

      <section style={{ marginBottom: 48 }}>
        <h3 className="h-serif" style={{ fontSize: 20, marginBottom: 16 }}>영역별 점수</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {Object.entries(categoryScores).map(([cat, { got, max }]) => (
            <div key={cat} className="card" style={{ padding: 20 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                {CATEGORY_LABEL[cat as keyof typeof CATEGORY_LABEL] ?? cat}
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 700 }}>
                {got} <span style={{ fontSize: 16, color: 'var(--muted)' }}>/ {max}</span>
              </div>
              <div className="progress" style={{ marginTop: 10 }}>
                <div className="progress-fill" style={{ width: `${max > 0 ? (got / max) * 100 : 0}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="h-serif" style={{ fontSize: 20, marginBottom: 16 }}>문항별 정오답</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {details.map((d) => {
            const q = levelQuestions.find((x) => x.id === d.id);
            if (!q) return null;
            return (
              <div key={d.id} className="card" style={{ borderLeft: `4px solid ${d.isCorrect ? 'var(--moss)' : 'var(--accent)'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase' }}>
                    {d.id} · {CATEGORY_LABEL[q.category]} · 난이도 {q.difficulty}
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: d.isCorrect ? 'var(--moss)' : 'var(--accent)', fontWeight: 600 }}>
                    {d.isCorrect ? `정답 (+${d.points}점)` : '오답'}
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 600, marginBottom: 14, whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                  {q.question}
                </div>
                {q.imageUrl && (
                  <div style={{ margin: '8px 0 14px', textAlign: 'center' }}>
                    <img
                      src={q.imageUrl}
                      alt={q.imageAlt ?? ''}
                      style={{ maxWidth: '100%', height: 'auto', border: '1px solid var(--paper-line)' }}
                    />
                  </div>
                )}
                <ul style={{ listStyle: 'none', padding: 0, fontSize: 14, lineHeight: 1.7 }}>
                  {q.choices.map((choice, idx) => {
                    const isPicked = d.pickedIndex === idx;
                    const isCorrectAns = d.correctIndex === idx;
                    let bg = 'transparent';
                    let color = 'var(--ink-soft)';
                    let marker = '';
                    if (isCorrectAns) { bg = 'rgba(91,107,58,0.12)'; color = 'var(--moss)'; marker = '✓ 정답'; }
                    if (isPicked && !isCorrectAns) { bg = 'rgba(184,68,31,0.12)'; color = 'var(--accent)'; marker = '× 선택'; }
                    if (isPicked && isCorrectAns) { marker = '✓ 선택·정답'; }
                    return (
                      <li key={idx} style={{ padding: '8px 12px', background: bg, color, marginBottom: 2, display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                        <span>
                          <span style={{ fontFamily: 'var(--mono)', marginRight: 8 }}>{String.fromCharCode(65 + idx)}.</span>
                          {choice}
                        </span>
                        {marker && <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 600 }}>{marker}</span>}
                      </li>
                    );
                  })}
                </ul>
                {q.explanation && (
                  <div style={{ marginTop: 12, padding: '10px 12px', background: 'var(--paper-line)', fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                    <strong style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', marginRight: 8 }}>해설</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function SummaryCell({
  label, value, mono, big, accent,
}: { label: string; value: string; mono?: boolean; big?: boolean; accent?: boolean }) {
  return (
    <div style={{ background: 'var(--paper)', padding: 20 }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{
        fontFamily: mono ? 'var(--mono)' : 'var(--serif)',
        fontSize: big ? 24 : 14,
        fontWeight: big ? 700 : 500,
        color: accent ? 'var(--accent)' : 'var(--ink)',
        letterSpacing: '-0.01em',
      }}>
        {value}
      </div>
    </div>
  );
}
