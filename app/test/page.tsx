'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const GRADES = [
  '초등 1학년','초등 2학년','초등 3학년','초등 4학년','초등 5학년','초등 6학년',
  '중학 1학년','중학 2학년','중학 3학년',
  '고등 1학년','고등 2학년','고등 3학년',
];

export default function TestStart() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');

  function handleStart(e: React.FormEvent) {
    e.preventDefault();
    // 응시자 정보를 세션에 저장하고 문항 페이지로
    sessionStorage.setItem(
      'testTaker',
      JSON.stringify({ name, grade, parentName, parentPhone })
    );
    router.push('/test/quiz');
  }

  const valid = name.trim().length > 0 && grade.length > 0;

  return (
    <main style={{ maxWidth: 560, margin: '0 auto', padding: '120px 24px 80px' }}>
      <div className="h-eyebrow" style={{ marginBottom: 20 }}>Step 1 / 3 · 응시자 정보</div>
      <h1 className="h-serif" style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.2, marginBottom: 20 }}>
        먼저 응시자 정보를<br /><em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>알려주세요</em>.
      </h1>
      <p style={{ fontSize: 15, color: 'var(--ink-soft)', marginBottom: 32 }}>
        이름과 학년만 있으면 테스트를 시작할 수 있습니다.
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

        <button type="submit" className="btn btn-primary" disabled={!valid} style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
          테스트 시작 <span style={{ fontFamily: 'var(--mono)' }}>→</span>
        </button>
      </form>
    </main>
  );
}
