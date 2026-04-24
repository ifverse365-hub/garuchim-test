# 가르침에듀 레벨 테스트

Next.js 14 (App Router) + Supabase + Vercel 로 구축된 레벨 테스트 MVP.

---

## 📦 구조

```
.
├── app/
│   ├── page.tsx                 / · 테스트 시작 랜딩
│   ├── test/
│   │   ├── page.tsx             /test · 응시자 정보 입력
│   │   ├── quiz/page.tsx        /test/quiz · 문항 풀이
│   │   └── result/[id]/page.tsx /test/result/xxx · 학생용 결과 (간략)
│   ├── api/
│   │   └── submit/route.ts      POST /api/submit · 답안 제출
│   └── admin/
│       ├── login/page.tsx       /admin/login · 관리자 로그인
│       ├── page.tsx             /admin · 응시 기록 목록
│       ├── [id]/page.tsx        /admin/xxx · 응시 상세 (문항별)
│       └── LogoutButton.tsx
├── data/
│   └── questions.ts             문항 데이터 + 채점 로직 + 레벨 추천 규칙
├── lib/
│   └── supabase/
│       ├── client.ts            브라우저용 Supabase 클라이언트
│       └── server.ts            서버용 Supabase 클라이언트
├── supabase/
│   └── schema.sql               Supabase 초기 스키마 (복붙 실행용)
├── middleware.ts                /admin 인증 미들웨어
├── .env.local.example           환경변수 템플릿
└── ...
```

---

## 🚀 셋업 가이드 (순서대로 진행)

### 1) 패키지 설치
```bash
npm install
```

### 2) Supabase 프로젝트 생성
1. https://supabase.com → [New project]
2. 이름·지역 선택 (Seoul 권장) · 비밀번호 설정
3. 프로젝트 생성 완료 후 **Project Settings → API** 열어 두기

### 3) Supabase 스키마 적용
1. 좌측 메뉴 **SQL Editor → [New query]**
2. `supabase/schema.sql` 파일 내용 **전체 복사 → 붙여넣기**
3. **[Run]** 클릭
4. **Table Editor** 에서 `students`, `test_attempts` 두 테이블이 생성됐는지 확인

### 4) 환경변수 설정
```bash
cp .env.local.example .env.local
```
`.env.local` 을 열어 두 값을 채워 넣으세요:

- `NEXT_PUBLIC_SUPABASE_URL` ← Supabase Dashboard → **Settings → API → Project URL**
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` ← 같은 화면의 **anon public** 키

### 5) 관리자 계정 생성
Supabase Dashboard → **Authentication → Users → [Add user]**
- Email: 원장님·강사 이메일
- Password: 로그인에 쓸 비밀번호
- **"Auto Confirm User" 반드시 체크**
- 여러 명이면 각각 추가

### 6) 개발 서버 실행
```bash
npm run dev
```
→ http://localhost:3000 접속

---

## 🧪 첫 테스트 흐름 확인

1. http://localhost:3000 → "테스트 시작하기"
2. 이름·학년 입력 → "테스트 시작"
3. 문항을 풀고 마지막에 "제출하기"
4. 결과 페이지 (추천 레벨만 표시됨) 확인
5. http://localhost:3000/admin/login 에서 5번에서 만든 계정으로 로그인
6. 대시보드에서 방금 제출한 기록 확인 → "상세" 클릭해서 문항별 분석 확인

문제 없이 보이면 MVP 완성입니다.

---

## 📝 문항 추가·수정

`data/questions.ts` 파일만 수정하면 됩니다.

```ts
{
  id: 11,                      // 중복 안 되게 다음 번호
  category: 'text',            // 'thinking' | 'block' | 'text' | 'algorithm'
  difficulty: 3,               // 1~5
  question: '질문 텍스트',
  choices: ['A', 'B', 'C', 'D'],
  correctIndex: 2,             // 정답 인덱스 (0부터)
  points: 3,                   // 이 문항 정답 시 점수
}
```

**주의**:
- `id` 는 한번 배포한 뒤엔 중간에 변경 금지 (기존 응시 기록과 꼬임)
- 문항을 삭제해도 기존 응시 기록에는 영향 없음 (JSONB 에 스냅샷 저장됨)
- 새 문항 추가는 언제든 안전

---

## 🚢 Vercel 배포

### 단일 도메인에서 `/test` 경로로 서빙하려면

메인 홈페이지(`garuchim-edu.co`)는 그대로 두고, 이 프로젝트를 **하위 경로**로 붙이는 방법:

**방법 A. 홈페이지 프로젝트의 `vercel.json`에 Rewrite 추가**
```json
{
  "rewrites": [
    { "source": "/test/:path*", "destination": "https://garuchim-test.vercel.app/test/:path*" },
    { "source": "/admin/:path*", "destination": "https://garuchim-test.vercel.app/admin/:path*" },
    { "source": "/api/submit", "destination": "https://garuchim-test.vercel.app/api/submit" }
  ]
}
```

이렇게 하면 학부모는 `garuchim-edu.co/test` 로 접속해도 이 프로젝트로 연결됩니다.

**방법 B. 서브도메인 사용 (더 간단)**
Vercel 프로젝트 설정에서 `test.garuchim-edu.co` 를 도메인으로 추가.

### Vercel 배포 기본 절차
1. 이 폴더를 GitHub 저장소에 push
2. Vercel → **New Project → Import** → 저장소 선택
3. Framework: **Next.js** (자동 감지됨)
4. **Environment Variables** 섹션에서 아래 두 개 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. **[Deploy]**

### 배포 후 해야 할 것
Supabase → **Authentication → URL Configuration**:
- **Site URL** 에 배포된 URL 입력 (예: `https://garuchim-test.vercel.app`)
- **Redirect URLs** 에 `https://garuchim-test.vercel.app/**` 추가

---

## 🛡 보안 체크리스트

- [ ] `.env.local` 이 `.gitignore` 에 포함되어 있음 ✅ (기본 설정)
- [ ] Supabase anon key 만 사용 (service_role key 절대 금지)
- [ ] RLS 정책 활성화 ✅ (schema.sql 에 포함)
- [ ] 관리자 계정 비밀번호는 강력하게
- [ ] 채점 로직은 **서버**에서 실행됨 ✅ (클라이언트 조작 방지)

---

## 🔧 개발 팁

### DB 직접 조회
Supabase Dashboard → **Table Editor** 에서 GUI 로 조회/편집 가능.
복잡한 쿼리는 **SQL Editor** 에서 직접 SQL 실행.

### 로컬에서 스키마 재적용
스키마를 바꿔야 할 때는 `supabase/schema.sql` 을 수정한 뒤 Supabase SQL Editor 에 다시 붙여넣기. 기존 데이터를 지우고 싶으면 테이블 DROP 후 재생성.

### 에러 추적
```bash
npm run dev
```
브라우저 콘솔 + 터미널 양쪽을 확인하세요.
Vercel 배포 후 에러는 Vercel Dashboard → **Logs** 에서 실시간 조회.

---

## 📍 현재 MVP 포함 기능

- [x] 응시자 정보 입력 (이름·학년·보호자)
- [x] 객관식 10문항 풀이 (문항 수는 쉽게 확장 가능)
- [x] 서버 측 자동 채점
- [x] 응시 시간 측정
- [x] 영역별 점수 분석 (사고력·블록·텍스트·알고리즘)
- [x] 학생용 간략 결과 (추천 레벨만)
- [x] 관리자 로그인 (Supabase Auth)
- [x] 관리자 대시보드 (응시 기록 목록)
- [x] 문항별 정오답 상세 보기
- [x] 반응형 디자인

## 🛠 다음 단계 (선택)

- [ ] 이미지 문항 지원 (엔트리 코드 캡처 등)
- [ ] 문항 관리 CRUD UI (지금은 JSON 직접 수정)
- [ ] 강사 코멘트 입력·저장
- [ ] 이메일 알림 (신규 응시 시 원장에게 통보)
- [ ] CSV/엑셀 다운로드
- [ ] 학생 재응시 방지 / 기간 제한
- [ ] 고유 응시 코드 (원장이 발급한 코드로만 응시)
