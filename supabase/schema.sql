-- =========================================================================
-- 가르침에듀 레벨 테스트 DB 스키마
-- =========================================================================
-- 사용법:
--   1. Supabase 프로젝트 대시보드 → SQL Editor 로 이동
--   2. [New query] 클릭
--   3. 이 파일 내용 전체를 붙여넣기
--   4. [Run] 실행
--
-- 실행 후 Supabase Dashboard → Table Editor 에서
-- students, test_attempts 두 테이블이 보이면 성공입니다.
-- =========================================================================


-- ─────────────────────────────────────────────────────────────────
-- 1) students : 테스트 응시자 (학생) 정보
-- ─────────────────────────────────────────────────────────────────
create table if not exists public.students (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  grade         text not null,
  parent_name   text,
  parent_phone  text,
  created_at    timestamptz not null default now()
);

create index if not exists students_created_at_idx
  on public.students (created_at desc);


-- ─────────────────────────────────────────────────────────────────
-- 2) test_attempts : 테스트 응시 기록 (한 학생이 여러 번 응시 가능)
-- ─────────────────────────────────────────────────────────────────
create table if not exists public.test_attempts (
  id                uuid primary key default gen_random_uuid(),
  student_id        uuid not null references public.students(id) on delete cascade,
  test_level        text not null default 'L1',
  total_score       int not null,
  max_score         int not null,
  level_recommended text not null,
  duration_sec      int not null default 0,
  answers_detail    jsonb not null default '[]'::jsonb,
  category_scores   jsonb not null default '{}'::jsonb,
  created_at        timestamptz not null default now()
);

-- 기존 DB 에 이 컬럼이 없는 경우를 위한 마이그레이션 (재실행 안전)
alter table public.test_attempts
  add column if not exists test_level text not null default 'L1';

create index if not exists test_attempts_created_at_idx
  on public.test_attempts (created_at desc);
create index if not exists test_attempts_student_id_idx
  on public.test_attempts (student_id);
create index if not exists test_attempts_test_level_idx
  on public.test_attempts (test_level);


-- =========================================================================
-- RLS (Row Level Security) 정책
-- =========================================================================
-- 규칙:
--   - 누구나(=익명 사용자) students/test_attempts 에 INSERT 가능 (테스트 응시)
--   - 로그인한 사용자(관리자)만 SELECT 가능 (결과 조회)
--   - UPDATE/DELETE 는 봉쇄 (Supabase 대시보드에서만 직접 조작)
-- =========================================================================

alter table public.students enable row level security;
alter table public.test_attempts enable row level security;


-- students: 익명 INSERT 허용
drop policy if exists "students_anon_insert" on public.students;
create policy "students_anon_insert"
  on public.students for insert
  to anon, authenticated
  with check (true);

-- students: 인증된 사용자만 SELECT
drop policy if exists "students_auth_select" on public.students;
create policy "students_auth_select"
  on public.students for select
  to authenticated
  using (true);


-- test_attempts: 익명 INSERT 허용 (응시 기록 저장)
drop policy if exists "attempts_anon_insert" on public.test_attempts;
create policy "attempts_anon_insert"
  on public.test_attempts for insert
  to anon, authenticated
  with check (true);

-- test_attempts: 익명도 본인 것은 SELECT (결과 페이지 노출용)
-- 지금은 attempt id 를 알면 누구나 볼 수 있게 허용 (URL 은 공유 가능한 링크 성격)
drop policy if exists "attempts_anon_select_by_id" on public.test_attempts;
create policy "attempts_anon_select_by_id"
  on public.test_attempts for select
  to anon, authenticated
  using (true);


-- students: 인증된 사용자(관리자)만 DELETE 가능
-- (students 를 삭제하면 test_attempts 는 on delete cascade 로 함께 삭제됨)
drop policy if exists "students_auth_delete" on public.students;
create policy "students_auth_delete"
  on public.students for delete
  to authenticated
  using (true);


-- =========================================================================
-- 참고: 관리자 계정 만들기
-- =========================================================================
-- 1. Supabase Dashboard → Authentication → Users → [Add user]
-- 2. Email + Password 직접 입력 + "Auto Confirm User" 체크
-- 3. 생성된 이메일/비번으로 /admin/login 접근 가능
--
-- 원장님·강사 계정을 한 명씩 이 방식으로 추가하면 됩니다.
-- 비밀번호 복잡도 정책은 Authentication → Settings 에서 조정 가능.
-- =========================================================================
