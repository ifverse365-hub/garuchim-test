'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LEVEL_LABEL, LEVEL_DESCRIPTION, type QuestionLevel } from '@/data/questions';

const GRADES = [
  '초등 1학년','초등 2학년','초등 3학년','초등 4학년','초등 5학년','초등 6학년',
  '중학 1학년','중학 2학년','중학 3학년',
  '고등 1학년','고등 2학년','고등 3학년',
];

const LEVELS: QuestionLevel[] = ['L1', 'L2', 'L3', 'L4', 'L5'];

export default function TestStart() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [level, setLevel] = useState<QuestionLevel | ''>('');

  function handleStart(e: React.FormEvent) {
    e.preventDefault();
    if (!level) return;
    sessionStorage.setItem(
      'testTaker',
      JSON.stringify({ name, grade, parentName, parentPhone })
    );
    router.push(`/test/quiz/${level}`);
  }

  const valid = name.trim().length > 0 && grade.length > 0 && level.length > 0;

  return (
    <main style={{ maxWidth: 640, margin: '0 auto', padding: '120px 24px 80px' }}>
      <div className="h-eyebrow" style={{ marginBottom: 20 }}>Step 1 / 3 · 응시자 정보</div>
      <h1 className="h-serif" style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.2, marginBottom: 20 }}>
        먼저 응시자 정보를<br /><em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>알려주세요</em>.
      </h1>
      <p style={{ fontSize: 15, color: 'var(--ink-soft)', marginBottom: 32 }}>
        이름·학년과 응시할 레벨을 선택해주세요.
        보호자 정보는 선택 사항이며, 남겨주시면 결과 안내에 도움이 됩니다.
      </p>

      <form onSubmit={handleStart} className="card">
        <div className="field">
          <label htmlFor="name">학생 이름 <span style={{ color: 'var(--accent)' }}>*</span></label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: 홍길동"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="grade">학년 <span style={{ color: 'var(--accent)' }}>*</span></label>
          <select id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} required>
            <option value="">선택해주세요</option>
            {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div className="field">
          <label htmlFor="parentName">보호자 이름 (선택)</label>
          <input
            id="parentName"
            type="text"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="parentPhone">보호자 연락처 (선택)</label>
          <input
            id="parentPhone"
            type="tel"
            value={parentPhone}
            onChange={(e) => setParentPhone(e.target.value)}
            placeholder="010-0000-0000"
          />
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: '0.15em',
            color: 'var(--muted)',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}>
            응시 레벨 <span style={{ color: 'var(--accent)' }}>*</span>
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {LEVELS.map((lv) => {
              const selected = level === lv;
              return (
                <label
                  key={lv}
                  style={{
                    display: 'flex',
                    gap: 14,
                    alignItems: 'flex-start',
                    padding: '14px 16px',
                    border: `1px solid ${selected ? 'var(--accent)' : 'var(--paper-line)'}`,
                    background: selected ? 'rgba(184,68,31,0.06)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <input
                    type="radio"
                    name="level"
                    value={lv}
                    checked={selected}
                    onChange={() => setLevel(lv)}
                    style={{ width: 'auto', margin: '4px 0 0', padding: 0, flex: 'none' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 700, marginBottom: 4 }}>
                      {LEVEL_LABEL[lv]}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5 }}>
                      {LEVEL_DESCRIPTION[lv]}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={!valid} style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
          테스트 시작 <span style={{ fontFamily: 'var(--mono)' }}>→</span>
        </button>
      </form>
    </main>
  );
}
