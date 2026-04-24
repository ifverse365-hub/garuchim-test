'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteButton({
  attemptId,
  studentName,
}: {
  attemptId: string;
  studentName: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const ok = window.confirm(
      `"${studentName}" 학생의 응시 기록을 삭제하시겠습니까?\n\n삭제된 기록은 복구할 수 없습니다.`
    );
    if (!ok) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId }),
      });
      const json = await res.json();
      if (!res.ok) {
        alert(json.error ?? '삭제 실패');
        setLoading(false);
        return;
      }
      router.refresh();
    } catch (err) {
      alert('네트워크 오류');
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      style={{
        background: 'transparent',
        border: '1px solid #D33',
        color: '#D33',
        padding: '4px 10px',
        fontSize: 12,
        fontFamily: 'var(--mono)',
        letterSpacing: '0.08em',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.5 : 1,
      }}
    >
      {loading ? '삭제중...' : '삭제'}
    </button>
  );
}
