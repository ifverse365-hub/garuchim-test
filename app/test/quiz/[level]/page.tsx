'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  questionsByLevel,
  CATEGORY_LABEL,
  LEVEL_LABEL,
  type QuestionLevel,
} from '@/data/questions';

type TestTaker = {
  name: string;
  grade: string;
  parentName: string;
  parentPhone: string;
};

const VALID_LEVELS: QuestionLevel[] = ['L1', 'L2', 'L3', 'L4', 'L5'];

export default function Quiz() {
  const router = useRouter();
  const params = useParams<{ level: string }>();
  const levelParam = params?.level as QuestionLevel | undefined;

  const [taker, setTaker] = useState<TestTaker | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [startedAt] = useState<number>(Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isValidLevel = !!levelParam && VALID_LEVELS.includes(levelParam);
  const questions = useMemo(
    () => (isValidLevel ? questionsByLevel[levelParam!] : []),
    [levelParam, isValidLevel]
  );

  useEffect(() => {
    if (!isValidLevel) {
      router.replace('/test');
      return;
    }
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
  }, [router, isValidLevel]);

  if (!taker || !isValidLevel) {
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
          testLevel: levelParam,
          answers,
          durationSec,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '제출에 실패했습니다');

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
        {taker.name} · {taker.grade} · {LEVEL_LABEL[levelParam!]} · 문항 {currentIdx + 1} / {questions.length}
      </div>

      <div className="progress">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="card">
        <div className="question-num">
          {q.id} · {CATEGORY_LABEL[q.category]}
        </div>

        <div className="question-text" style={{ whiteSpace: 'pre-wrap' }}>
          {q.question}
        </div>

        {q.imageUrl && (
          <div style={{ margin: '16px 0', textAlign: 'center' }}>
            <img
              src={q.imageUrl}
              alt={q.imageAlt ?? ''}
              style={{ maxWidth: '100%', height: 'auto', border: '1px solid var(--paper-line)' }}
            />
          </div>
        )}

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
