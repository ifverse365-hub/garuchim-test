import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { questions, recommendLevel, TOTAL_POINTS } from '@/data/questions';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { taker, answers, durationSec } = body as {
      taker: { name: string; grade: string; parentName?: string; parentPhone?: string };
      answers: Record<number, number>;
      durationSec: number;
    };

    // 최소 유효성 검사
    if (!taker?.name || !taker?.grade) {
      return NextResponse.json({ error: '응시자 정보가 누락되었습니다' }, { status: 400 });
    }

    // 서버 측에서 직접 채점 (클라이언트 점수 믿지 않기)
    let score = 0;
    const detail = questions.map((q) => {
      const picked = answers[q.id];
      const isCorrect = picked === q.correctIndex;
      if (isCorrect) score += q.points;
      return {
        id: q.id,
        category: q.category,
        pickedIndex: picked ?? null,
        correctIndex: q.correctIndex,
        isCorrect,
        points: q.points,
      };
    });

    const recommended = recommendLevel(score, TOTAL_POINTS);

    // 카테고리별 점수 분석
    const categoryScores: Record<string, { got: number; max: number }> = {};
    for (const q of questions) {
      const key = q.category;
      if (!categoryScores[key]) categoryScores[key] = { got: 0, max: 0 };
      categoryScores[key].max += q.points;
      if (answers[q.id] === q.correctIndex) categoryScores[key].got += q.points;
    }

    const supabase = createClient();

    // 1) 학생 레코드 저장
    const { data: studentRow, error: studentErr } = await supabase
      .from('students')
      .insert({
        name: taker.name,
        grade: taker.grade,
        parent_name: taker.parentName || null,
        parent_phone: taker.parentPhone || null,
      })
      .select('id')
      .single();

    if (studentErr || !studentRow) {
      console.error('student insert error', studentErr);
      return NextResponse.json({ error: 'DB 오류: 학생 저장 실패' }, { status: 500 });
    }

    // 2) 응시 기록 저장
    const { data: attemptRow, error: attemptErr } = await supabase
      .from('test_attempts')
      .insert({
        student_id: studentRow.id,
        total_score: score,
        max_score: TOTAL_POINTS,
        level_recommended: recommended.level,
        duration_sec: durationSec,
        answers_detail: detail,
        category_scores: categoryScores,
      })
      .select('id')
      .single();

    if (attemptErr || !attemptRow) {
      console.error('attempt insert error', attemptErr);
      return NextResponse.json({ error: 'DB 오류: 응시 기록 저장 실패' }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      attemptId: attemptRow.id,
      score,
      maxScore: TOTAL_POINTS,
      recommended,
    });
  } catch (err) {
    console.error('submit error', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : '알 수 없는 오류' },
      { status: 500 }
    );
  }
}
