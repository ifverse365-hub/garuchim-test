import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { attemptId } = (await request.json()) as { attemptId?: string };

    if (!attemptId) {
      return NextResponse.json({ error: 'attemptId 누락' }, { status: 400 });
    }

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
    }

    const { data: attempt, error: fetchErr } = await supabase
      .from('test_attempts')
      .select('student_id')
      .eq('id', attemptId)
      .single();

    if (fetchErr || !attempt) {
      return NextResponse.json({ error: '기록을 찾을 수 없습니다' }, { status: 404 });
    }

    // student 를 지우면 test_attempts 는 on delete cascade 로 같이 삭제됨
    const { error: delErr } = await supabase
      .from('students')
      .delete()
      .eq('id', attempt.student_id);

    if (delErr) {
      console.error('delete error', delErr);
      return NextResponse.json({ error: '삭제 실패: ' + delErr.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('delete route error', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : '알 수 없는 오류' },
      { status: 500 }
    );
  }
}
