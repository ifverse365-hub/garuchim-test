import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  questionsByLevel,
  getMaxScore,
  interpretResult,
  type QuestionLevel,
} from '@/data/questions';

const VALID_LEVELS: QuestionLevel[] = ['L1', 'L2', 'L3', 'L4', 'L5'];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { taker, testLevel, answers, durationSec } = body as {
      taker: { name: string; grade: string; parentName?: string; parentPhone?: string };
      testLevel: QuestionLevel;
      answers: Record<string, number>;
      durationSec: number;
    };

    if (!taker?.name || !taker?.grade) {
      return NextResponse.json({ error: '응시자 정보가 누락되었습니다' }, { status: 400 });
    }

    if (!VALID_LEVELS.includes(testLevel)) {
      return NextResponse.json({ error: '잘못된 레벨입니다' }, { status: 400 });
    }

    const levelQuestions = questionsByLevel[testLevel];
    const maxScore = getMaxScore(testLevel);

    let score = 0;
    const detail = levelQuestions.map((q) => {
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

    const result = interpretResult(testLevel, score);

    const categoryScores: Record<string, { got: number; max: number }> = {};
    for (const q of levelQuestions) {
      const key = q.category;
      if (!categoryScores[key]) categoryScores[key] = { got: 0, max: 0 };
      categoryScores[key].max += q.points;
      if (answers[q.id] === q.correctIndex) categoryScores[key].got += q.points;
    }

    const supabase = createClient();

    // id 를 미리 생성한다. 익명 응시자는 students 를 SELECT 할 권한이 없으므로
    // .select() 로 방금 넣은 행을 읽어오면 RLS 에 막힌다(학생 개인정보 보호 정책).
    // 따라서 read-back 없이 INSERT 만 수행한다.
    const studentId = crypto.randomUUID();

    const { error: studentErr } = await supabase
      .from('students')
      .insert({
        id: studentId,
        name: taker.name,
        grade: taker.grade,
        parent_name: taker.parentName || null,
        parent_phone: taker.parentPhone || null,
      });

    if (studentErr) {
      console.error('student insert error', studentErr);
      return NextResponse.json({ error: 'DB 오류: 학생 저장 실패' }, { status: 500 });
    }

    const { data: attemptRow, error: attemptErr } = await supabase
      .from('test_attempts')
      .insert({
        student_id: studentId,
        test_level: testLevel,
        total_score: score,
        max_score: maxScore,
        level_recommended: result.recommendedLevel,
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
      maxScore,
      result,
    });
  } catch (err) {
    console.error('submit error', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : '알 수 없는 오류' },
      { status: 500 }
    );
  }
}
