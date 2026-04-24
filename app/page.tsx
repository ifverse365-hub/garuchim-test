import Link from 'next/link';
import { questionsByLevel } from '@/data/questions';

const LEVEL_COUNT = Object.keys(questionsByLevel).length;
const PER_LEVEL = questionsByLevel.L1.length;

export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '120px 24px 80px' }}>
      <div className="h-eyebrow" style={{ marginBottom: 20 }}>
        가르침에듀 코딩학원 · 레벨 테스트
      </div>
      <h1 className="h-serif" style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.15, marginBottom: 24 }}>
        우리 아이의 <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>시작점</em>을 찾아봅시다.
      </h1>
      <p style={{ fontSize: 17, color: 'var(--ink-soft)', lineHeight: 1.8, marginBottom: 40 }}>
        <strong>{LEVEL_COUNT}개 레벨 · 각 {PER_LEVEL}문항</strong>의 테스트로 우리 아이에게 맞는 코딩 학습 레벨을 진단합니다.
        사고력·블록 코딩·텍스트 코딩·알고리즘 네 영역을 균형 있게 측정하며,
        응시한 레벨의 결과에 따라 <strong>승급·적정·하위</strong> 과정을 추천해 드립니다.
      </p>

      <div className="card-deep" style={{ marginBottom: 32 }}>
        <h3 className="h-serif" style={{ fontSize: 18, marginBottom: 14 }}>안내 사항</h3>
        <ul style={{ fontSize: 14, lineHeight: 1.95, color: 'var(--ink-soft)', paddingLeft: 18 }}>
          <li>응시 시간은 제한되지 않지만, 대개 10~20분 내외입니다.</li>
          <li>한 문항당 정답은 하나입니다. 중간에 답을 바꾸실 수 있습니다.</li>
          <li>제출 직후 간단한 결과가 화면에 표시됩니다.</li>
          <li>상세 분석 결과는 원장·담당 강사에게 전달됩니다.</li>
        </ul>
      </div>

      <Link href="/test" className="btn btn-primary">
        테스트 시작하기 <span style={{ fontFamily: 'var(--mono)' }}>→</span>
      </Link>

      <div style={{ marginTop: 60, paddingTop: 24, borderTop: '1px solid var(--paper-line)', fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
        문의 <a href="tel:050714480134" style={{ color: 'var(--accent)' }}>0507-1448-0134</a> ·
        가르침에듀 코딩학원
      </div>
    </main>
  );
}
