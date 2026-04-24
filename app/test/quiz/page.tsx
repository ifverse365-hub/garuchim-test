'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions, CATEGORY_LABEL } from '@/data/questions';

type TestTaker = {
  name: string;
  grade: string;
  parentName: string;
  parentPhone: string;
};

export default function Quiz() {
  const router = useRouter();
  const [taker, setTaker] = useState<TestTaker | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [startedAt] = useState<number>(Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('testTaker');
    if (!raw) {
      router.replace('/test');
      return;
    }
    try {
      setTaker(JSON.parse(raw));
    } catch {
      router.replace('/test');
    }
  }, [router]);

  if (!taker) {
    return (
      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div className="spinner" />
      </main>
    );
  }

  const q = questions[currentIdx];
  const picked = answers[q.id];
  const progress = ((currentIdx + 1) / questions.length) * 100;
  const isLast = currentIdx === questions.length - 1;

  function selectChoice(choiceIdx: number) {
    setAnswers({ ...answers, [q.id]: choiceIdx });
  }

  function goPrev() {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  }
  function goNext() {
    if (!isLast) setCurrentIdx(currentIdx + 1);
  }

  async function submit() {
    setSubmitting(true);
    setSubmitError(null);
    const durationSec = Math.round((Date.now() - startedAt) / 1000);

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taker,
          answers,
          durationSec,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '제출에 실패했습니다');

      // 성공 시 결과 페이지로 이동 — attempt id 사용
      sessionStorage.removeItem('testTaker');
      router.replace(`/test/result/${data.attemptId}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : '알 수 없는 오류');
      setSubmitting(false);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '100px 24px 80px' }}>
      <div style={{ marginBottom: 8, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase' }}>
        {taker.name} · {taker.grade} · 문항 {currentIdx + 1} / {questions.length}
      </div>

      <div className="progress">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="card">
        <div className="question-num">
          Q{q.id.toString().padStart(2, '0')} · {CATEGORY_LABEL[q.category]}
        </div>

        <div className="question-text" style={{ whiteSpace: 'pre-wrap' }}>
          {q.question}
        </div>

        <div>
          {q.choices.map((choice, idx) => (
            <button
              key={idx}
              type="button"
              className={`choice ${picked === idx ? 'selected' : ''}`}
              onClick={() => selectChoice(idx)}
            >
              <span className="choice-key">{String.fromCharCode(65 + idx)}.</span>
              {choice}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'space-between' }}>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={goPrev}
          disabled={currentIdx === 0}
        >
          ← 이전
        </button>

        {!isLast ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={goNext}
            disabled={picked === undefined}
          >
            다음 →
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-accent"
            onClick={submit}
            disabled={picked === undefined || submitting}
          >
            {submitting ? (<><span className="spinner" /> 제출 중...</>) : '제출하기 →'}
          </button>
        )}
      </div>

      {submitError && (
        <div style={{ marginTop: 16, padding: 14, background: '#FEE', border: '1px solid #F99', color: '#B00', fontSize: 14 }}>
          제출 오류: {submitError}
        </div>
      )}
    </main>
  );
}
