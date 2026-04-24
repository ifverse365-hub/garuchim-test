/**
 * 가르침에듀 코딩학원 레벨 테스트 문항 데이터
 *
 * 구조:
 *   - 레벨별 20문항 × 5개 레벨 = 총 100문항
 *   - 레벨별 영역 비중:
 *       L1: 사고력 50% / 블록 50%
 *       L2: 사고력 30% / 블록 60% / 텍스트 10%
 *       L3: 사고력 20% / 블록 40% / 텍스트 30% / 알고리즘 10%
 *       L4: 사고력 10% / 블록 15% / 텍스트 45% / 알고리즘 30%
 *       L5: 사고력 10% / 텍스트 40% / 알고리즘 50%
 *
 * 각 문항은 난이도(1~5)·배점(1~5)을 가집니다.
 * imageUrl: 엔트리 스크린샷 등 이미지가 필요한 문항만 지정.
 *           원장님이 캡처한 이미지를 public/quiz-images/ 에 저장 후 경로 지정.
 *
 * Python 관련 문항은 작성 전 실제 실행으로 출력값을 검증했습니다.
 */

export type QuestionLevel = 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
export type QuestionCategory = 'thinking' | 'block' | 'text' | 'algorithm';

export type Question = {
  id: string;            // 'L1-01', 'L2-15' 형식
  level: QuestionLevel;
  category: QuestionCategory;
  difficulty: 1 | 2 | 3 | 4 | 5;
  question: string;
  imageUrl?: string;     // 선택: 엔트리 스크린샷 등
  imageAlt?: string;     // 선택: 이미지 설명 (접근성)
  choices: string[];
  correctIndex: number;
  points: number;
  explanation?: string;  // 선택: 관리자 페이지에서 참고용 해설
};

export const CATEGORY_LABEL: Record<QuestionCategory, string> = {
  thinking: '사고력',
  block: '블록 코딩',
  text: '텍스트 코딩',
  algorithm: '알고리즘',
};

export const LEVEL_LABEL: Record<QuestionLevel, string> = {
  L1: 'L1 · CT 입문',
  L2: 'L2 · 창작',
  L3: 'L3 · 전환',
  L4: 'L4 · 교과·응용',
  L5: 'L5 · 입시 심화',
};

export const LEVEL_DESCRIPTION: Record<QuestionLevel, string> = {
  L1: '코딩 경험이 거의 없는 초등 저학년용. 사고력과 블록 코딩 기초를 측정합니다.',
  L2: '엔트리 기초 경험이 있는 초등 중학년용. 블록 코딩 실전 능력을 측정합니다.',
  L3: '엔트리 심화 및 Python 입문 단계용. 두 언어 전환 능력을 측정합니다.',
  L4: '텍스트 코딩·자료구조·알고리즘 기초를 갖춘 중등용. 심화 능력을 측정합니다.',
  L5: '알고리즘·자료구조 고급 실력을 갖춘 중고등용. 입시·경시 수준을 측정합니다.',
};

// ═════════════════════════════════════════════════════════════════════
//  L1 · CT 입문 (초1~초3) — 20문항
//  사고력 10 / 블록 10 / 텍스트 0 / 알고리즘 0
// ═════════════════════════════════════════════════════════════════════
const L1: Question[] = [
  // ── 사고력 10문항 ──
  {
    id: 'L1-01', level: 'L1', category: 'thinking', difficulty: 1,
    question: '다음 중 "순서대로 하는 일"의 예로 가장 알맞은 것은 무엇일까요?',
    choices: [
      '아침에 일어나서 세수를 한 번 한다',
      '라면을 끓일 때 물 끓이기 → 면 넣기 → 스프 넣기 순서로 한다',
      '하늘에 구름이 떠 있다',
      '오늘 날씨가 맑다',
    ],
    correctIndex: 1, points: 1,
    explanation: '순서대로 정해진 단계를 따르는 것이 "순차"입니다.',
  },
  {
    id: 'L1-02', level: 'L1', category: 'thinking', difficulty: 1,
    question: '"만약 비가 오면 우산을 쓰고, 그렇지 않으면 모자를 쓴다"는 어떤 개념일까요?',
    choices: ['반복', '조건', '순서', '입력'],
    correctIndex: 1, points: 1,
    explanation: '상황에 따라 다르게 행동하는 것 = 조건.',
  },
  {
    id: 'L1-03', level: 'L1', category: 'thinking', difficulty: 1,
    question: '"교실 청소를 위해 책상 10개에 모두 걸레질을 한다"는 어떤 개념일까요?',
    choices: ['반복', '조건', '입력', '출력'],
    correctIndex: 0, points: 1,
    explanation: '같은 일을 여러 번 = 반복.',
  },
  {
    id: 'L1-04', level: 'L1', category: 'thinking', difficulty: 2,
    question: '아래 패턴의 빈칸에 들어갈 것은?\n\n  🔴 🔵 🔴 🔵 🔴 ( ? )',
    choices: ['🟢', '🔴', '🔵', '⚪'],
    correctIndex: 2, points: 2,
    explanation: '🔴과 🔵가 번갈아 반복되는 패턴.',
  },
  {
    id: 'L1-05', level: 'L1', category: 'thinking', difficulty: 2,
    question: '친구에게 학교에서 집까지 가는 길을 알려주려고 합니다. 가장 좋은 방법은?',
    choices: [
      '"그냥 감으로 오면 돼" 라고 말한다',
      '출발 → 방향 → 거리 → 꺾는 곳 → 도착, 이렇게 단계별로 알려준다',
      '"집에 가면 나한테 전화해" 라고 말한다',
      '지도 없이 직접 같이 가준다',
    ],
    correctIndex: 1, points: 2,
    explanation: '알고리즘은 "명확한 단계를 순서대로" 전달하는 것입니다.',
  },
  {
    id: 'L1-06', level: 'L1', category: 'thinking', difficulty: 2,
    question: '"피자 만들기"를 작은 일로 나누려고 합니다. 적절한 분해는?',
    choices: [
      '피자 만들기 (한 단어)',
      '도우 만들기 → 소스 바르기 → 토핑 올리기 → 오븐에 굽기',
      '맛있게 먹기',
      '주방에 가기',
    ],
    correctIndex: 1, points: 2,
    explanation: '큰 일을 작은 단계로 나누는 것이 "분해"입니다.',
  },
  {
    id: 'L1-07', level: 'L1', category: 'thinking', difficulty: 2,
    question: '다음 중 "컴퓨터에게 일을 시키는 말(명령)"이 아닌 것은?',
    choices: [
      '"왼쪽으로 5칸 움직여"',
      '"1번부터 10번까지 반복해"',
      '"오늘 기분이 어때?"',
      '"만약 점수가 100이면 멈춰"',
    ],
    correctIndex: 2, points: 2,
    explanation: '컴퓨터는 정확한 명령만 이해합니다. 감정이나 막연한 질문은 명령이 될 수 없습니다.',
  },
  {
    id: 'L1-08', level: 'L1', category: 'thinking', difficulty: 3,
    question: '다음 규칙을 보고 ?에 들어갈 숫자를 고르세요.\n\n  2, 4, 6, 8, ( ? ), 12',
    choices: ['9', '10', '11', '13'],
    correctIndex: 1, points: 2,
    explanation: '2씩 커지는 규칙.',
  },
  {
    id: 'L1-09', level: 'L1', category: 'thinking', difficulty: 3,
    question: '로봇이 "앞으로 1칸 → 오른쪽으로 돌기 → 앞으로 2칸"을 했습니다. 로봇이 처음 북쪽을 보고 있었다면 지금 어느 방향을 보고 있을까요?',
    choices: ['북쪽', '남쪽', '동쪽', '서쪽'],
    correctIndex: 2, points: 3,
    explanation: '북쪽에서 오른쪽으로 한 번 돌면 동쪽을 향합니다.',
  },
  {
    id: 'L1-10', level: 'L1', category: 'thinking', difficulty: 3,
    question: '다음 중 컴퓨터가 가장 잘하는 일은?',
    choices: [
      '친구의 기분을 눈치채는 일',
      '같은 계산을 아주 빠르고 정확하게 여러 번 하는 일',
      '맛있는 음식을 상상하는 일',
      '꿈을 꾸는 일',
    ],
    correctIndex: 1, points: 2,
    explanation: '컴퓨터의 강점은 반복적인 계산을 빠르고 정확하게 처리하는 것입니다.',
  },

  // ── 블록 코딩 (엔트리) 10문항 ──
  {
    id: 'L1-11', level: 'L1', category: 'block', difficulty: 1,
    question: '엔트리에서 오브젝트를 움직이게 만들려면 어떤 블록을 사용해야 할까요?',
    choices: ['모양 블록', '움직임 블록', '소리 블록', '생김새 블록'],
    correctIndex: 1, points: 1,
    explanation: '움직임 블록 카테고리에 이동·회전 관련 블록이 있습니다.',
  },
  {
    id: 'L1-12', level: 'L1', category: 'block', difficulty: 1,
    question: '엔트리 프로그램을 시작하려면 어떤 버튼을 눌러야 할까요?',
    choices: ['정지 버튼 (빨간 네모)', '시작 버튼 (초록 깃발)', '일시정지 버튼', '저장 버튼'],
    correctIndex: 1, points: 1,
    explanation: '초록 깃발이 엔트리의 시작 버튼입니다.',
  },
  {
    id: 'L1-13', level: 'L1', category: 'block', difficulty: 2,
    question: '엔트리에서 "10번 반복하기" 블록 안에 "앞으로 10 움직이기" 블록을 넣으면 어떻게 될까요?',
    choices: [
      '오브젝트가 한 번만 움직인다',
      '오브젝트가 앞으로 총 100만큼 움직인다',
      '오브젝트가 제자리에서 회전한다',
      '오브젝트가 10번 깜빡인다',
    ],
    correctIndex: 1, points: 2,
    explanation: '10 × 10 = 100만큼 앞으로 이동.',
  },
  {
    id: 'L1-14', level: 'L1', category: 'block', difficulty: 2,
    question: '엔트리에서 "오른쪽 화살표 키를 누르면 x좌표를 10만큼 바꾸기"를 만들었습니다. 오른쪽 화살표를 3번 누르면 오브젝트는 어떻게 될까요?',
    choices: [
      '아무 변화 없음',
      '오른쪽으로 10만큼 이동',
      '오른쪽으로 30만큼 이동',
      '왼쪽으로 30만큼 이동',
    ],
    correctIndex: 2, points: 2,
    explanation: '한 번 누를 때마다 10씩 이동하므로 3번이면 30.',
  },
  {
    id: 'L1-15', level: 'L1', category: 'block', difficulty: 2,
    question: '엔트리에서 오브젝트가 "안녕!"이라고 말풍선을 띄우게 하려면 어떤 카테고리 블록을 써야 할까요?',
    choices: ['움직임', '생김새', '계산', '판단'],
    correctIndex: 1, points: 2,
    explanation: '말하기·모양 바꾸기 등은 생김새 블록에 있습니다.',
  },
  {
    id: 'L1-16', level: 'L1', category: 'block', difficulty: 2,
    question: '엔트리에서 "모든 코드 멈추기" 블록은 어떤 상황에서 쓰면 좋을까요?',
    choices: [
      '프로그램을 시작할 때',
      '오브젝트 색을 바꿀 때',
      '게임이 끝나서 모든 동작을 멈추고 싶을 때',
      '소리를 크게 하고 싶을 때',
    ],
    correctIndex: 2, points: 2,
    explanation: '정지 블록은 게임 종료·패배 처리 등에서 사용.',
  },
  {
    id: 'L1-17', level: 'L1', category: 'block', difficulty: 3,
    question: '다음 엔트리 코드가 실행되면 어떻게 될까요?\n\n  [시작하기 버튼을 클릭했을 때]\n  [안녕! 을 2초 동안 말하기]\n  [y좌표를 -50만큼 바꾸기]',
    choices: [
      '"안녕!"을 계속 반복해서 말한다',
      '"안녕!"을 2초 말한 뒤 아래로 50만큼 이동한다',
      '"안녕!"을 2초 말한 뒤 위로 50만큼 이동한다',
      '이동부터 하고 "안녕!"을 말한다',
    ],
    correctIndex: 1, points: 3,
    explanation: '엔트리에서 y좌표를 -50만큼 바꾸면 아래쪽으로 이동합니다.',
  },
  {
    id: 'L1-18', level: 'L1', category: 'block', difficulty: 3,
    question: '엔트리에서 오브젝트가 벽에 닿았는지 확인하려면 어떤 블록이 필요할까요?',
    choices: [
      '[x좌표를 10만큼 바꾸기] 블록',
      '[벽에 닿았는가?] 판단 블록',
      '[소리 재생하기] 블록',
      '[크기를 10만큼 바꾸기] 블록',
    ],
    correctIndex: 1, points: 2,
    explanation: '"판단" 카테고리에서 벽 감지 블록을 찾을 수 있습니다.',
  },
  {
    id: 'L1-19', level: 'L1', category: 'block', difficulty: 3,
    question: '엔트리에서 "만약 <스페이스 키가 눌러져 있는가?> 라면 [소리 재생하기]"를 만들었습니다. 이 코드를 계속 동작하게 하려면 어떻게 해야 할까요?',
    choices: [
      '한 번만 실행하면 된다',
      '계속 반복하기 블록 안에 이 코드를 넣는다',
      '소리 크기를 키운다',
      '배경을 바꾼다',
    ],
    correctIndex: 1, points: 3,
    explanation: '키 입력을 계속 감지하려면 "계속 반복하기" 안에 조건 블록을 넣어야 합니다.',
  },
  {
    id: 'L1-20', level: 'L1', category: 'block', difficulty: 3,
    question: '엔트리에서 다음 코드를 실행하면 오브젝트가 몇 번 움직일까요?\n\n  [5번 반복하기]\n    [앞으로 10 움직이기]\n    [2번 반복하기]\n      [x좌표를 5만큼 바꾸기]',
    choices: ['5번', '7번', '10번', '15번'],
    correctIndex: 3, points: 3,
    explanation: '바깥 반복 5회 동안 안쪽 블록이 (1+2)=3번씩 실행 → 5×3=15회 이동.',
  },
];

// ═════════════════════════════════════════════════════════════════════
//  L2 · 창작 (초3~초5) — 20문항
//  사고력 6 / 블록 12 / 텍스트 2 / 알고리즘 0
// ═════════════════════════════════════════════════════════════════════
const L2: Question[] = [
  // ── 사고력 6문항 ──
  {
    id: 'L2-01', level: 'L2', category: 'thinking', difficulty: 2,
    question: '큰 문제를 여러 개의 작은 문제로 나누어 해결하는 방법을 무엇이라 할까요?',
    choices: ['추상화', '분해', '반복', '입력'],
    correctIndex: 1, points: 2,
  },
  {
    id: 'L2-02', level: 'L2', category: 'thinking', difficulty: 2,
    question: '여러 문제에서 공통된 규칙이나 특징을 찾아내는 것을 무엇이라 할까요?',
    choices: ['패턴 인식', '디버깅', '출력', '저장'],
    correctIndex: 0, points: 2,
  },
  {
    id: 'L2-03', level: 'L2', category: 'thinking', difficulty: 3,
    question: '친구에게 게임 규칙을 설명할 때 가장 좋은 방법은?',
    choices: [
      '"알아서 해" 라고 말한다',
      '규칙을 빠짐없이 순서대로 하나씩 설명한다',
      '게임하는 모습을 멀리서 보여준다',
      '게임 이름만 알려준다',
    ],
    correctIndex: 1, points: 2,
  },
  {
    id: 'L2-04', level: 'L2', category: 'thinking', difficulty: 3,
    question: '다음 중 "변수"가 가장 필요한 상황은?',
    choices: [
      '화면에 고정된 글자 "Hello"를 한 번 보여줄 때',
      '게임에서 점수를 기억하고 보여줘야 할 때',
      '배경색을 한 번 바꿀 때',
      '프로그램을 끝낼 때',
    ],
    correctIndex: 1, points: 2,
    explanation: '점수처럼 변하는 값을 저장하려면 변수가 필요합니다.',
  },
  {
    id: 'L2-05', level: 'L2', category: 'thinking', difficulty: 3,
    question: '"자판기에 돈을 넣고 버튼을 누르면 음료수가 나온다"에서 입력과 출력은 각각 무엇일까요?',
    choices: [
      '입력=음료수, 출력=돈',
      '입력=돈과 버튼, 출력=음료수',
      '입력=자판기, 출력=버튼',
      '모두 출력이다',
    ],
    correctIndex: 1, points: 3,
  },
  {
    id: 'L2-06', level: 'L2', category: 'thinking', difficulty: 3,
    question: '프로그램에 문제가 생겨서 원하는 대로 동작하지 않을 때, 문제를 찾아 고치는 과정을 무엇이라 할까요?',
    choices: ['디버깅', '코딩', '컴파일', '실행'],
    correctIndex: 0, points: 2,
  },

  // ── 블록 코딩 (엔트리) 12문항 ──
  {
    id: 'L2-07', level: 'L2', category: 'block', difficulty: 2,
    question: '엔트리에서 "변수"는 언제 사용하나요?',
    choices: [
      '오브젝트의 모양을 바꿀 때',
      '숫자나 값을 저장하고 기억해야 할 때',
      '소리를 재생할 때',
      '프로그램을 종료할 때',
    ],
    correctIndex: 1, points: 2,
  },
  {
    id: 'L2-08', level: 'L2', category: 'block', difficulty: 3,
    question: '엔트리에서 "점수" 변수에 1을 더하는 블록을 사용합니다. 처음 점수가 5였다면 이 블록을 3번 실행한 후 점수는?',
    choices: ['3', '5', '8', '15'],
    correctIndex: 2, points: 3,
    explanation: '5 + 1×3 = 8.',
  },
  {
    id: 'L2-09', level: 'L2', category: 'block', difficulty: 3,
    question: '엔트리의 "신호 보내기"는 어떤 상황에서 사용하면 가장 좋을까요?',
    choices: [
      '오브젝트의 색깔만 바꾸고 싶을 때',
      '한 오브젝트가 다른 오브젝트에게 "이제 움직여!" 라고 알리고 싶을 때',
      '반복 횟수를 정하고 싶을 때',
      '배경 음악을 재생할 때',
    ],
    correctIndex: 1, points: 3,
    explanation: '신호는 오브젝트 간 이벤트 전달 수단입니다.',
  },
  {
    id: 'L2-10', level: 'L2', category: 'block', difficulty: 3,
    question: '엔트리에서 난수 블록 "1부터 10 사이의 무작위 수"를 사용하면 어떤 값이 나올 수 있나요?',
    choices: [
      '항상 5가 나온다',
      '0부터 10까지의 숫자 중 하나가 나온다',
      '1부터 10까지의 숫자 중 하나가 나온다',
      '1, 10만 나온다',
    ],
    correctIndex: 2, points: 2,
    explanation: '"1부터 10 사이"는 1과 10을 포함합니다.',
  },
  {
    id: 'L2-11', level: 'L2', category: 'block', difficulty: 3,
    question: '엔트리에서 "리스트"는 어떤 기능을 할까요?',
    choices: [
      '한 오브젝트의 색을 저장한다',
      '여러 개의 값(예: 점수, 이름, 숫자)을 하나로 묶어서 저장한다',
      '이미지를 저장한다',
      '오디오를 저장한다',
    ],
    correctIndex: 1, points: 3,
    explanation: '리스트는 여러 값을 한꺼번에 관리할 때 사용합니다.',
  },
  {
    id: 'L2-12', level: 'L2', category: 'block', difficulty: 4,
    question: '엔트리에서 다음 코드가 실행되면 변수 a의 최종 값은?\n\n  [a를 0으로 정하기]\n  [5번 반복하기]\n    [a에 2만큼 더하기]',
    choices: ['0', '5', '10', '25'],
    correctIndex: 2, points: 3,
    explanation: '0에서 시작해 2를 5번 더하면 10.',
  },
  {
    id: 'L2-13', level: 'L2', category: 'block', difficulty: 4,
    question: '엔트리 AI 블록 중 "음성 인식"은 어떤 기능을 할까요?',
    choices: [
      '음악을 자동 작곡한다',
      '사람이 말한 소리를 글자로 바꾼다',
      '사진 속 사람을 알아본다',
      '배경을 자동으로 바꾼다',
    ],
    correctIndex: 1, points: 3,
  },
  {
    id: 'L2-14', level: 'L2', category: 'block', difficulty: 4,
    question: '엔트리-아두이노 연동에서 LED를 켜려면 어떻게 해야 할까요?',
    choices: [
      '오브젝트를 움직이는 블록만 사용한다',
      '아두이노 하드웨어 블록에서 "디지털 OO번 핀을 켜기"를 사용한다',
      '소리 블록을 사용한다',
      '배경을 바꾸는 블록을 사용한다',
    ],
    correctIndex: 1, points: 3,
    explanation: '하드웨어 연동 메뉴의 디지털 핀 제어 블록이 필요합니다.',
  },
  {
    id: 'L2-15', level: 'L2', category: 'block', difficulty: 4,
    question: '엔트리에서 다음 코드가 실행되면 몇 번 "야호!"를 말할까요?\n\n  [5번 반복하기]\n    [만약 <5번 반복 중 현재 카운트가 짝수> 라면]\n      ["야호!" 말하기]',
    choices: ['0번', '2번', '3번', '5번'],
    correctIndex: 1, points: 4,
    explanation: '1~5 중 짝수는 2, 4 → 2번 말함.',
  },
  {
    id: 'L2-16', level: 'L2', category: 'block', difficulty: 4,
    question: '아래 엔트리 코드를 실행하면 오브젝트 최종 위치의 x좌표는? (처음 x=0)\n\n  [앞으로 x좌표를 20만큼 바꾸기]\n  [3번 반복하기]\n    [x좌표를 10만큼 바꾸기]\n  [x좌표를 -15만큼 바꾸기]',
    choices: ['15', '35', '50', '65'],
    correctIndex: 1, points: 4,
    explanation: '0 + 20 + (10×3) + (-15) = 35.',
  },
  {
    id: 'L2-17', level: 'L2', category: 'block', difficulty: 3,
    question: '엔트리에서 하나의 오브젝트에 여러 "모양"을 등록해두면 무엇을 할 수 있나요?',
    choices: [
      '오브젝트가 움직이게만 만들 수 있다',
      '모양 바꾸기 블록으로 애니메이션(걷기·뛰기 등) 효과를 낼 수 있다',
      '소리만 바꿀 수 있다',
      '아무 의미가 없다',
    ],
    correctIndex: 1, points: 2,
    explanation: '여러 모양을 순차로 바꾸면 애니메이션이 됩니다.',
  },
  {
    id: 'L2-18', level: 'L2', category: 'block', difficulty: 5,
    question: '엔트리에서 "복제본 만들기"를 사용하면 어떤 이점이 있을까요?',
    choices: [
      '오브젝트가 움직이지 않게 된다',
      '하나의 오브젝트 코드를 복사해 여러 개가 동시에 각자 움직일 수 있다',
      '프로그램이 느려진다',
      '오브젝트가 사라진다',
    ],
    correctIndex: 1, points: 4,
    explanation: '복제본은 게임에서 적·총알·과일 등을 여러 개 만들 때 핵심 기법입니다.',
  },

  // ── 텍스트 코딩 (Python 입문) 2문항 ──
  {
    id: 'L2-19', level: 'L2', category: 'text', difficulty: 3,
    question: '다음 중 Python에서 화면에 글자를 보여줄 때 쓰는 명령어는?',
    choices: ['show', 'print', 'display', 'write'],
    correctIndex: 1, points: 2,
  },
  {
    id: 'L2-20', level: 'L2', category: 'text', difficulty: 3,
    question: '다음 Python 코드의 결과는?\n\n  a = 5\n  b = 3\n  print(a + b)',
    choices: ['8', '53', 'a + b', '오류'],
    correctIndex: 0, points: 3,
    explanation: '5 + 3 = 8 이 출력됩니다.',
  },
];

// ═════════════════════════════════════════════════════════════════════
//  L3 · 전환 (초5~중1) — 20문항
//  사고력 4 / 블록 8 / 텍스트 6 / 알고리즘 2
// ═════════════════════════════════════════════════════════════════════
const L3: Question[] = [
  // ── 사고력 4문항 ──
  {
    id: 'L3-01', level: 'L3', category: 'thinking', difficulty: 3,
    question: '"추상화"의 가장 좋은 예는?',
    choices: [
      '공장의 복잡한 기계를 있는 그대로 모두 그리는 것',
      '지하철 노선도처럼 실제 지리를 단순화해서 필요한 정보만 보여주는 것',
      '모든 세부 정보를 빠짐없이 나열하는 것',
      '아무 계획 없이 코드를 작성하는 것',
    ],
    correctIndex: 1, points: 3,
    explanation: '추상화는 복잡한 것에서 중요한 것만 추려내는 과정.',
  },
  {
    id: 'L3-02', level: 'L3', category: 'thinking', difficulty: 3,
    question: '학교에서 학생 30명의 점수 평균을 구해야 합니다. 컴퓨터를 활용할 때 가장 효율적인 방법은?',
    choices: [
      '한 명씩 손으로 계산해서 공책에 쓴다',
      '30개의 점수를 변수에 각각 저장해 일일이 더한다',
      '리스트에 점수를 저장하고 반복문으로 합계·평균을 계산한다',
      '계산하지 않고 눈으로만 본다',
    ],
    correctIndex: 2, points: 3,
    explanation: '리스트 + 반복문이 다량의 데이터 처리에 효율적.',
  },
  {
    id: 'L3-03', level: 'L3', category: 'thinking', difficulty: 4,
    question: '"함수"를 사용하면 좋은 이유는?',
    choices: [
      '프로그램이 느려진다',
      '같은 일을 여러 번 해야 할 때 코드를 한 번만 작성하고 여러 번 재사용할 수 있다',
      '코드가 길어진다',
      '아무 이유가 없다',
    ],
    correctIndex: 1, points: 3,
    explanation: '함수의 핵심 가치는 재사용성과 유지보수성.',
  },
  {
    id: 'L3-04', level: 'L3', category: 'thinking', difficulty: 4,
    question: '숫자 맞추기 게임에서 1~100 중 숨겨진 수를 가장 적은 횟수로 맞추는 전략은?',
    choices: [
      '1부터 차례로 모두 해본다',
      '무작위로 아무 숫자나 계속 말한다',
      '절반씩 범위를 줄여 나간다 (50 → 25 또는 75 → …)',
      '100부터 거꾸로 1씩 줄여 본다',
    ],
    correctIndex: 2, points: 4,
    explanation: '이진 탐색(Binary Search)의 직관적 예시.',
  },

  // ── 블록 코딩 8문항 ──
  {
    id: 'L3-05', level: 'L3', category: 'block', difficulty: 3,
    question: '엔트리에서 "나만의 블록"(함수)을 만드는 이유로 가장 적절한 것은?',
    choices: [
      '코드를 더 복잡하게 만들기 위해',
      '자주 쓰는 동작을 묶어 재사용하고 코드를 깔끔하게 유지하려고',
      '오브젝트를 늘리기 위해',
      '배경을 바꾸기 위해',
    ],
    correctIndex: 1, points: 3,
  },
  {
    id: 'L3-06', level: 'L3', category: 'block', difficulty: 4,
    question: '엔트리 리스트 "과일"에 ["사과", "바나나", "포도"]가 순서대로 저장되어 있습니다. "과일의 2번째 항목"을 가져오면 무엇이 나올까요?',
    choices: ['사과', '바나나', '포도', '오류가 난다'],
    correctIndex: 1, points: 3,
    explanation: '엔트리 리스트는 1부터 시작. 2번째 = "바나나".',
  },
  {
    id: 'L3-07', level: 'L3', category: 'block', difficulty: 4,
    question: '엔트리에서 "만약 <A> 라면 ~ 아니면 ~" 구조를 사용하는 경우로 적절한 것은?',
    choices: [
      '같은 동작을 계속 반복할 때',
      '조건에 따라 두 가지 다른 동작 중 하나를 골라 실행할 때',
      '변수를 새로 만들 때',
      '소리를 재생할 때',
    ],
    correctIndex: 1, points: 3,
  },
  {
    id: 'L3-08', level: 'L3', category: 'block', difficulty: 4,
    question: '엔트리 코드를 실행했을 때 변수 total의 최종 값은?\n\n  [total을 0으로 정하기]\n  [i를 1로 정하기]\n  [5번 반복하기]\n    [total에 i만큼 더하기]\n    [i에 1만큼 더하기]',
    choices: ['5', '10', '15', '21'],
    correctIndex: 2, points: 4,
    explanation: 'i가 1→5까지 증가하며 total에 더해지므로 1+2+3+4+5=15.',
  },
  {
    id: 'L3-09', level: 'L3', category: 'block', difficulty: 4,
    question: '엔트리에서 복제본을 활용할 때 주의할 점은?',
    choices: [
      '복제본은 원본과 전혀 다른 코드를 실행한다',
      '너무 많이 만들면 프로그램이 느려질 수 있으므로 적절한 시점에 삭제해야 한다',
      '복제본은 움직일 수 없다',
      '복제본은 화면에 보이지 않는다',
    ],
    correctIndex: 1, points: 4,
  },
  {
    id: 'L3-10', level: 'L3', category: 'block', difficulty: 5,
    question: '엔트리에서 "묻고 답 기다리기" 블록을 사용하면?',
    choices: [
      '오브젝트가 자동으로 움직인다',
      '사용자가 키보드로 답을 입력할 때까지 코드가 멈춰 있다가, 입력이 끝나면 그 값을 "대답" 변수에 저장한다',
      '프로그램이 종료된다',
      '오브젝트 색이 변한다',
    ],
    correctIndex: 1, points: 4,
  },
  {
    id: 'L3-11', level: 'L3', category: 'block', difficulty: 4,
    question: '엔트리 AI 블록 중 "이미지 인식"을 활용할 수 있는 예로 가장 적절한 것은?',
    choices: [
      '배경 음악을 재생하는 기능',
      '카메라로 찍은 손 모양이 가위·바위·보 중 어느 것인지 알아맞히는 기능',
      '오브젝트의 크기를 키우는 기능',
      '좌표를 바꾸는 기능',
    ],
    correctIndex: 1, points: 3,
  },
  {
    id: 'L3-12', level: 'L3', category: 'block', difficulty: 5,
    question: '엔트리에서 "신호"를 활용한 설계로 가장 적합한 상황은?',
    choices: [
      '점수가 100이 되면 모든 오브젝트가 동시에 축하 동작을 시작하게 만들고 싶을 때',
      '오브젝트 하나의 좌표를 바꾸고 싶을 때',
      '프로그램을 처음 시작할 때',
      '색깔만 한 번 바꿀 때',
    ],
    correctIndex: 0, points: 4,
    explanation: '신호는 여러 오브젝트가 동시에 반응해야 할 때 핵심.',
  },

  // ── 텍스트 코딩 (Python) 6문항 ──
  {
    id: 'L3-13', level: 'L3', category: 'text', difficulty: 3,
    question: '다음 Python 코드의 결과는?\n\n  for i in range(5):\n      print(i, end=" ")',
    choices: ['1 2 3 4 5', '0 1 2 3 4', '0 1 2 3 4 5', '1 2 3 4'],
    correctIndex: 1, points: 3,
    explanation: 'range(5)는 0부터 4까지.',
  },
  {
    id: 'L3-14', level: 'L3', category: 'text', difficulty: 3,
    question: '다음 Python 코드의 결과는?\n\n  nums = [10, 20, 30, 40]\n  print(nums[1])',
    choices: ['10', '20', '30', '40'],
    correctIndex: 1, points: 3,
    explanation: 'Python 리스트는 0부터 시작. nums[1] = 20.',
  },
  {
    id: 'L3-15', level: 'L3', category: 'text', difficulty: 4,
    question: '다음 Python 코드의 결과는?\n\n  x = 7\n  if x > 5:\n      print("A")\n  elif x > 3:\n      print("B")\n  else:\n      print("C")',
    choices: ['A', 'B', 'C', 'A B'],
    correctIndex: 0, points: 3,
    explanation: 'if 조건 만족 → A만 출력.',
  },
  {
    id: 'L3-16', level: 'L3', category: 'text', difficulty: 4,
    question: '다음 Python 코드의 결과는?\n\n  total = 0\n  for i in range(1, 6):\n      total += i\n  print(total)',
    choices: ['10', '15', '21', '25'],
    correctIndex: 1, points: 4,
    explanation: '1+2+3+4+5 = 15.',
  },
  {
    id: 'L3-17', level: 'L3', category: 'text', difficulty: 4,
    question: '다음 Python 코드의 결과는?\n\n  name = "Python"\n  print(len(name))',
    choices: ['5', '6', '7', '"Python"'],
    correctIndex: 1, points: 3,
    explanation: '"Python"은 6글자.',
  },
  {
    id: 'L3-18', level: 'L3', category: 'text', difficulty: 5,
    question: '다음 Python 코드의 결과는?\n\n  items = [3, 1, 4]\n  items.append(9)\n  print(items)',
    choices: [
      '[3, 1, 4]',
      '[3, 1, 4, 9]',
      '[9, 3, 1, 4]',
      '[1, 3, 4, 9]',
    ],
    correctIndex: 1, points: 4,
    explanation: 'append는 리스트 끝에 추가.',
  },

  // ── 알고리즘 2문항 ──
  {
    id: 'L3-19', level: 'L3', category: 'algorithm', difficulty: 4,
    question: '1부터 100까지의 숫자 중 특정한 수를 찾는 가장 빠른 방법은? (단, 숫자는 작은 순서로 정렬되어 있다)',
    choices: [
      '1부터 차례로 하나씩 확인한다 (선형 탐색)',
      '절반씩 범위를 좁혀가며 찾는다 (이진 탐색)',
      '무작위로 골라 확인한다',
      '100에서 1로 역순 확인한다',
    ],
    correctIndex: 1, points: 4,
  },
  {
    id: 'L3-20', level: 'L3', category: 'algorithm', difficulty: 4,
    question: '정렬 알고리즘은 무엇을 하는 알고리즘일까요?',
    choices: [
      '데이터를 암호화한다',
      '데이터를 일정한 기준(작은 순, 큰 순 등)에 따라 순서대로 나열한다',
      '데이터를 삭제한다',
      '데이터를 두 배로 복사한다',
    ],
    correctIndex: 1, points: 3,
  },
];

// ═════════════════════════════════════════════════════════════════════
//  L4 · 교과·응용 (중1~중3) — 20문항
//  사고력 2 / 블록 3 / 텍스트 9 / 알고리즘 6
// ═════════════════════════════════════════════════════════════════════
const L4: Question[] = [
  // ── 사고력 2문항 ──
  {
    id: 'L4-01', level: 'L4', category: 'thinking', difficulty: 4,
    question: '프로그램이 커질수록 중요해지는 것은?',
    choices: [
      '코드를 짧게 쓰는 것만',
      '코드의 실행 속도뿐',
      '기능 분리(모듈화)·가독성·재사용성 같은 설계 요소',
      '변수 이름의 길이',
    ],
    correctIndex: 2, points: 3,
  },
  {
    id: 'L4-02', level: 'L4', category: 'thinking', difficulty: 4,
    question: '"객체 지향 프로그래밍(OOP)"에서 클래스와 객체의 관계는?',
    choices: [
      '클래스는 단순히 변수 이름이다',
      '클래스는 "설계도"이고, 객체는 그 설계도로 실제 만든 "인스턴스"다',
      '객체는 클래스보다 먼저 정의된다',
      '둘은 아무 관련이 없다',
    ],
    correctIndex: 1, points: 4,
  },

  // ── 블록 코딩 3문항 (고급만) ──
  {
    id: 'L4-03', level: 'L4', category: 'block', difficulty: 4,
    question: '엔트리에서 2차원 좌표 정보를 리스트로 표현할 때 가장 좋은 방법은?',
    choices: [
      '하나의 리스트에 x좌표만 저장한다',
      'x좌표 리스트와 y좌표 리스트를 같은 길이로 두 개 만들어 같은 인덱스끼리 쌍으로 사용한다',
      '변수 하나만 사용한다',
      '좌표는 리스트로 만들 수 없다',
    ],
    correctIndex: 1, points: 4,
    explanation: '엔트리는 2차원 리스트를 직접 지원하지 않으므로 두 리스트를 병렬 관리하는 방식을 씁니다.',
  },
  {
    id: 'L4-04', level: 'L4', category: 'block', difficulty: 5,
    question: '엔트리에서 복제본 100개를 만들고 각각 다른 위치에 배치하려 합니다. 가장 효율적인 방법은?',
    choices: [
      '복제본마다 하드코딩으로 x,y 지정 블록을 100개 만든다',
      '반복문 안에서 복제본을 만들고 반복 변수나 난수를 사용해 동적으로 좌표를 지정한다',
      '복제본 기능을 사용하지 않는다',
      '오브젝트를 100개 따로 만든다',
    ],
    correctIndex: 1, points: 5,
  },
  {
    id: 'L4-05', level: 'L4', category: 'block', difficulty: 5,
    question: '엔트리에서 아두이노와 연동한 프로젝트의 최종 성과물로 적절한 것은?',
    choices: [
      '오브젝트가 화면에서만 움직이는 게임',
      '실제 LED·버저·센서로 반응하는 피지컬 장치 (자동 신호등, 거리 알림기 등)',
      '단순히 말풍선을 띄우는 작품',
      '음악을 재생하는 프로그램',
    ],
    correctIndex: 1, points: 4,
  },

  // ── 텍스트 코딩 (Python 심화) 9문항 ──
  {
    id: 'L4-06', level: 'L4', category: 'text', difficulty: 4,
    question: '다음 Python 코드의 결과는?\n\n  def square(n):\n      return n * n\n  print(square(5))',
    choices: ['10', '25', '55', '오류'],
    correctIndex: 1, points: 3,
    explanation: '5 * 5 = 25.',
  },
  {
    id: 'L4-07', level: 'L4', category: 'text', difficulty: 4,
    question: '다음 Python 코드의 결과는?\n\n  nums = [1, 2, 3, 4, 5]\n  evens = [n for n in nums if n % 2 == 0]\n  print(evens)',
    choices: ['[1, 3, 5]', '[2, 4]', '[1, 2, 3, 4, 5]', '[]'],
    correctIndex: 1, points: 4,
    explanation: '짝수만 필터: 2, 4.',
  },
  {
    id: 'L4-08', level: 'L4', category: 'text', difficulty: 4,
    question: '다음 Python 코드의 결과는?\n\n  scores = {"수학": 85, "영어": 92, "과학": 78}\n  print(scores["영어"])',
    choices: ['85', '92', '78', 'KeyError'],
    correctIndex: 1, points: 3,
  },
  {
    id: 'L4-09', level: 'L4', category: 'text', difficulty: 4,
    question: '다음 Python 코드의 결과는?\n\n  s = "Hello, Python"\n  print(s[7:])',
    choices: ['Hello,', 'Python', 'Hello, Python', 'ython'],
    correctIndex: 1, points: 4,
    explanation: '인덱스 7부터 끝까지 = "Python".',
  },
  {
    id: 'L4-10', level: 'L4', category: 'text', difficulty: 4,
    question: '다음 Python 코드의 결과는?\n\n  lst = [42, 17, 89, 23, 56]\n  print(max(lst))',
    choices: ['17', '42', '56', '89'],
    correctIndex: 3, points: 3,
  },
  {
    id: 'L4-11', level: 'L4', category: 'text', difficulty: 4,
    question: '다음 Python 코드의 결과는?\n\n  for i in range(3):\n      for j in range(2):\n          print(f"({i},{j})", end=" ")',
    choices: [
      '(0,0) (0,1) (1,0) (1,1) (2,0) (2,1)',
      '(0,0) (1,1) (2,2)',
      '(0,1) (1,2) (2,3)',
      '(0,0) (0,1)',
    ],
    correctIndex: 0, points: 4,
    explanation: '중첩 반복 전개 결과 검증됨.',
  },
  {
    id: 'L4-12', level: 'L4', category: 'text', difficulty: 5,
    question: '다음 Python 코드에서 잘못된 부분은?\n\n  def add(a, b):\n  return a + b\n\n  print(add(3, 5))',
    choices: [
      '함수 이름이 잘못됐다',
      'return 앞에 들여쓰기(indent)가 없어서 오류가 난다',
      'print에 괄호가 빠졌다',
      '문제 없음',
    ],
    correctIndex: 1, points: 4,
    explanation: 'Python은 들여쓰기로 블록을 구분. def 다음 줄은 들여쓰기 필수.',
  },
  {
    id: 'L4-13', level: 'L4', category: 'text', difficulty: 5,
    question: '다음 Python 코드의 결과는?\n\n  class Counter:\n      def __init__(self):\n          self.count = 0\n      def inc(self):\n          self.count += 1\n\n  c = Counter()\n  c.inc()\n  c.inc()\n  c.inc()\n  print(c.count)',
    choices: ['0', '1', '2', '3'],
    correctIndex: 3, points: 4,
    explanation: 'inc 호출 3번 = count 3.',
  },
  {
    id: 'L4-14', level: 'L4', category: 'text', difficulty: 5,
    question: '다음 Python 코드의 결과는?\n\n  text = "banana"\n  freq = {}\n  for ch in text:\n      freq[ch] = freq.get(ch, 0) + 1\n  print(freq)',
    choices: [
      "{'b': 1, 'a': 3, 'n': 2}",
      "{'b': 2, 'a': 2, 'n': 2}",
      "{'a': 3, 'b': 1, 'n': 2}",
      'TypeError',
    ],
    correctIndex: 0, points: 5,
    explanation: 'b 1회, a 3회, n 2회. Python 3.7+ 에서 삽입 순서 유지.',
  },

  // ── 알고리즘 6문항 ──
  {
    id: 'L4-15', level: 'L4', category: 'algorithm', difficulty: 4,
    question: '이진 탐색을 사용할 수 있는 조건은?',
    choices: [
      '데이터가 무작위로 섞여 있어야 한다',
      '데이터가 정렬되어 있어야 한다',
      '데이터 개수가 짝수여야 한다',
      '데이터가 숫자만 있어야 한다',
    ],
    correctIndex: 1, points: 3,
  },
  {
    id: 'L4-16', level: 'L4', category: 'algorithm', difficulty: 5,
    question: '리스트 [5, 2, 8, 1, 9]에 대해 버블 정렬 한 번의 순회(pass)를 실행했을 때 결과는?\n\n(인접한 쌍을 비교해 큰 값을 뒤로 보내는 방식)',
    choices: [
      '[1, 2, 5, 8, 9]',
      '[2, 5, 1, 8, 9]',
      '[5, 2, 8, 1, 9]',
      '[9, 8, 5, 2, 1]',
    ],
    correctIndex: 1, points: 5,
    explanation: '(5,2)교환→(5,8)유지→(8,1)교환→(8,9)유지 = [2,5,1,8,9]. 실행 검증됨.',
  },
  {
    id: 'L4-17', level: 'L4', category: 'algorithm', difficulty: 4,
    question: '다음 Python 함수가 하는 일은?\n\n  def f(arr, target):\n      for i, v in enumerate(arr):\n          if v == target:\n              return i\n      return -1',
    choices: [
      '배열의 합을 구한다',
      '배열에서 target 값을 선형 탐색해 인덱스를 반환한다 (없으면 -1)',
      '배열을 정렬한다',
      '배열을 뒤집는다',
    ],
    correctIndex: 1, points: 4,
  },
  {
    id: 'L4-18', level: 'L4', category: 'algorithm', difficulty: 5,
    question: '다음 재귀 함수의 f(5) 결과는?\n\n  def f(n):\n      if n <= 1:\n          return 1\n      return n * f(n - 1)',
    choices: ['5', '15', '25', '120'],
    correctIndex: 3, points: 4,
    explanation: '5! = 5×4×3×2×1 = 120 (팩토리얼).',
  },
  {
    id: 'L4-19', level: 'L4', category: 'algorithm', difficulty: 5,
    question: '다음 코드의 총 반복 횟수는?\n\n  count = 0\n  n = 5\n  for i in range(n):\n      for j in range(n):\n          count += 1',
    choices: ['5', '10', '25', '50'],
    correctIndex: 2, points: 4,
    explanation: '중첩 반복 O(n²). 5×5 = 25.',
  },
  {
    id: 'L4-20', level: 'L4', category: 'algorithm', difficulty: 5,
    question: '1000개의 원소가 있는 정렬된 배열에서 이진 탐색을 하면 최악의 경우 몇 번 비교해야 할까요?',
    choices: ['약 10번', '약 100번', '약 500번', '약 1000번'],
    correctIndex: 0, points: 5,
    explanation: 'log₂(1000) ≈ 10. 이진 탐색의 O(log n).',
  },
];

// ═════════════════════════════════════════════════════════════════════
//  L5 · 입시 심화 (중3~고2) — 20문항
//  사고력 2 / 블록 0 / 텍스트 8 / 알고리즘 10
// ═════════════════════════════════════════════════════════════════════
const L5: Question[] = [
  // ── 사고력 2문항 ──
  {
    id: 'L5-01', level: 'L5', category: 'thinking', difficulty: 5,
    question: '"시간 복잡도"가 의미하는 것은?',
    choices: [
      '프로그램을 작성하는 데 걸리는 시간',
      '입력 크기가 커질 때 알고리즘의 실행 시간이 어떻게 증가하는지를 수학적으로 표현한 것',
      '컴퓨터의 CPU 속도',
      '프로그램의 파일 크기',
    ],
    correctIndex: 1, points: 4,
  },
  {
    id: 'L5-02', level: 'L5', category: 'thinking', difficulty: 5,
    question: '"동적 계획법(DP)"의 핵심 아이디어는?',
    choices: [
      '무작위로 경우의 수를 시도한다',
      '큰 문제를 작은 하위 문제로 나누고, 각 하위 문제의 결과를 저장해 중복 계산을 피한다',
      '모든 경우를 다 계산한다',
      '재귀를 피한다',
    ],
    correctIndex: 1, points: 4,
  },

  // ── 텍스트 코딩 (Python 고급) 8문항 ──
  {
    id: 'L5-03', level: 'L5', category: 'text', difficulty: 5,
    question: '다음 Python 코드의 결과는?\n\n  students = [("Alice", 85), ("Bob", 72), ("Charlie", 91)]\n  result = sorted(students, key=lambda x: x[1], reverse=True)\n  print(result[0])',
    choices: [
      "('Alice', 85)",
      "('Bob', 72)",
      "('Charlie', 91)",
      'TypeError',
    ],
    correctIndex: 2, points: 5,
    explanation: '점수 내림차순 정렬 → 첫 번째는 91점 Charlie.',
  },
  {
    id: 'L5-04', level: 'L5', category: 'text', difficulty: 5,
    question: '다음 코드에서 list comprehension 으로 바꾼 올바른 표현은?\n\n  result = []\n  for x in range(10):\n      if x % 3 == 0:\n          result.append(x * x)',
    choices: [
      '[x * x for x in range(10) if x % 3 == 0]',
      '[x for x in range(10)]',
      '[x % 3 == 0 for x in range(10)]',
      '[x * x if x % 3 == 0]',
    ],
    correctIndex: 0, points: 4,
  },
  {
    id: 'L5-05', level: 'L5', category: 'text', difficulty: 5,
    question: '다음 Python 코드의 결과는?\n\n  memo = {}\n  def fib(n):\n      if n < 2:\n          return n\n      if n in memo:\n          return memo[n]\n      memo[n] = fib(n - 1) + fib(n - 2)\n      return memo[n]\n\n  print(fib(10))',
    choices: ['21', '34', '55', '89'],
    correctIndex: 2, points: 5,
    explanation: '메모이제이션 피보나치. F(10) = 55. 실행 검증.',
  },
  {
    id: 'L5-06', level: 'L5', category: 'text', difficulty: 4,
    question: '다음 중 Python에서 "변경 불가능한(immutable)" 자료형은?',
    choices: ['list', 'dict', 'tuple', 'set'],
    correctIndex: 2, points: 3,
  },
  {
    id: 'L5-07', level: 'L5', category: 'text', difficulty: 5,
    question: '다음 코드에서 예외 처리 구조로 가장 적절한 것은?\n\n  # 사용자 입력 x 로 10 / x 를 계산하는데,\n  # 0이 들어와도 프로그램이 죽지 않게 처리',
    choices: [
      'if x == 0 만 사용',
      'try: ~ except ZeroDivisionError: 구조 사용',
      'print 로 경고만 출력',
      'x = 1 로 강제 변경',
    ],
    correctIndex: 1, points: 4,
  },
  {
    id: 'L5-08', level: 'L5', category: 'text', difficulty: 5,
    question: '다음 Python 코드의 결과는?\n\n  a = [1, 2, 3]\n  b = a\n  b.append(4)\n  print(a)',
    choices: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4]', '오류'],
    correctIndex: 1, points: 5,
    explanation: 'b = a 는 같은 리스트를 참조. b 변경이 a 에도 반영.',
  },
  {
    id: 'L5-09', level: 'L5', category: 'text', difficulty: 5,
    question: '다음 중 Python에서 "제너레이터(generator)"의 특징으로 옳은 것은?',
    choices: [
      '모든 값을 한 번에 메모리에 올린다',
      '값을 필요할 때마다 하나씩 생성(yield)해 메모리 효율이 높다',
      '리스트보다 항상 느리다',
      '반복할 수 없다',
    ],
    correctIndex: 1, points: 4,
  },
  {
    id: 'L5-10', level: 'L5', category: 'text', difficulty: 5,
    question: 'Python 딕셔너리에서 key가 존재하지 않을 때 기본값을 반환받는 가장 적절한 메서드는?',
    choices: ['d[key]', 'd.get(key, default)', 'd.find(key)', 'd.has(key)'],
    correctIndex: 1, points: 4,
    explanation: 'd[key]는 KeyError; get 이 안전.',
  },

  // ── 알고리즘 10문항 ──
  {
    id: 'L5-11', level: 'L5', category: 'algorithm', difficulty: 5,
    question: '다음 정렬 알고리즘 중 "평균·최악 시간복잡도가 모두 O(n log n)"인 것은?',
    choices: [
      '버블 정렬',
      '삽입 정렬',
      '퀵 정렬',
      '병합 정렬(Merge Sort)',
    ],
    correctIndex: 3, points: 4,
    explanation: '퀵 정렬은 최악 O(n²). 병합 정렬은 안정적으로 O(n log n).',
  },
  {
    id: 'L5-12', level: 'L5', category: 'algorithm', difficulty: 5,
    question: '그래프 탐색에서 "가장 짧은 경로(최단 거리)"를 무조건 보장하는 알고리즘은? (가중치 없는 그래프 기준)',
    choices: ['DFS (깊이 우선 탐색)', 'BFS (너비 우선 탐색)', '백트래킹', '분할 정복'],
    correctIndex: 1, points: 4,
    explanation: '가중치 없는 그래프에서 BFS가 최단 거리 보장.',
  },
  {
    id: 'L5-13', level: 'L5', category: 'algorithm', difficulty: 5,
    question: '스택(Stack) 자료구조의 특징은?',
    choices: [
      '먼저 들어온 것이 먼저 나간다 (FIFO)',
      '나중에 들어온 것이 먼저 나간다 (LIFO)',
      '순서가 무작위다',
      '중간에서만 꺼낼 수 있다',
    ],
    correctIndex: 1, points: 3,
  },
  {
    id: 'L5-14', level: 'L5', category: 'algorithm', difficulty: 5,
    question: '큐(Queue) 자료구조에서 가장 적절하게 사용되는 알고리즘은?',
    choices: ['DFS', 'BFS', '이진 탐색', '퀵 정렬'],
    correctIndex: 1, points: 3,
  },
  {
    id: 'L5-15', level: 'L5', category: 'algorithm', difficulty: 5,
    question: '다음 알고리즘 중 시간복잡도가 가장 좋은(빠른) 것은?',
    choices: [
      'O(n²)',
      'O(n log n)',
      'O(n)',
      'O(log n)',
    ],
    correctIndex: 3, points: 4,
  },
  {
    id: 'L5-16', level: 'L5', category: 'algorithm', difficulty: 5,
    question: '"탐욕 알고리즘(Greedy)"으로 최적해를 보장할 수 없는 예는?',
    choices: [
      '동전 거스름돈 (한국 화폐 단위 500, 100, 50, 10)',
      '최소 신장 트리 (크루스칼, 프림)',
      '0-1 배낭 문제 (Knapsack)',
      '허프만 코딩',
    ],
    correctIndex: 2, points: 5,
    explanation: '0-1 배낭은 그리디로 최적해 보장 X (DP 필요).',
  },
  {
    id: 'L5-17', level: 'L5', category: 'algorithm', difficulty: 5,
    question: '다음 중 "분할 정복(Divide and Conquer)" 전략을 사용하는 알고리즘은?',
    choices: [
      '버블 정렬',
      '선형 탐색',
      '병합 정렬(Merge Sort)',
      '삽입 정렬',
    ],
    correctIndex: 2, points: 4,
  },
  {
    id: 'L5-18', level: 'L5', category: 'algorithm', difficulty: 5,
    question: '해시 테이블(Hash Table)의 평균 시간복잡도 중, 값 검색은?',
    choices: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctIndex: 0, points: 4,
    explanation: '해시 테이블 검색은 평균 O(1).',
  },
  {
    id: 'L5-19', level: 'L5', category: 'algorithm', difficulty: 5,
    question: '다익스트라(Dijkstra) 알고리즘이 동작하지 않는(또는 잘못된 결과를 내는) 그래프는?',
    choices: [
      '가중치가 모두 양수인 그래프',
      '가중치가 0인 간선이 있는 그래프',
      '음수 가중치 간선이 있는 그래프',
      '정점이 매우 많은 그래프',
    ],
    correctIndex: 2, points: 5,
    explanation: '다익스트라는 음수 간선에서 오답. 음수 간선 있으면 벨만-포드 사용.',
  },
  {
    id: 'L5-20', level: 'L5', category: 'algorithm', difficulty: 5,
    question: '배열 [1, 3, 5, 7, 9, 11, 13, 15]에서 이진 탐색으로 11을 찾으려고 합니다. 중간값을 확인하는 횟수(비교 횟수)는?',
    choices: ['1번', '2번', '3번', '4번'],
    correctIndex: 1, points: 5,
    explanation: '[1,3,5,7,9,11,13,15] mid=7(인덱스3) 값=7<11 → [11,13,15] mid=13>11 → 왼쪽 [11] 발견. 비교 3번이지만, (lo+hi)//2 중앙값 7 비교→11 비교 해서 2번에 찾음. 실행 검증 인덱스 = 5 반환, 비교 2번 소요.',
  },
];

// ═════════════════════════════════════════════════════════════════════
//  전체 모음 + 유틸
// ═════════════════════════════════════════════════════════════════════

export const questionsByLevel: Record<QuestionLevel, Question[]> = {
  L1, L2, L3, L4, L5,
};

/** 특정 레벨의 총점 만점을 계산 */
export function getMaxScore(level: QuestionLevel): number {
  return questionsByLevel[level].reduce((sum, q) => sum + q.points, 0);
}

/** 카테고리별 최대 점수 (관리자 페이지에서 영역별 점수 분석용) */
export function getCategoryMaxScores(level: QuestionLevel): Record<string, number> {
  const result: Record<string, number> = {};
  for (const q of questionsByLevel[level]) {
    result[q.category] = (result[q.category] || 0) + q.points;
  }
  return result;
}

/**
 * 레벨별 응시 결과 해석.
 * 70% 이상 = 해당 레벨 승급 가능
 * 40~70%  = 해당 레벨 적정
 * 40% 미만 = 하위 레벨 권장
 */
export function interpretResult(level: QuestionLevel, score: number): {
  verdict: 'promote' | 'fit' | 'demote';
  message: string;
  recommendedLevel: QuestionLevel;
} {
  const maxScore = getMaxScore(level);
  const ratio = score / maxScore;

  const nextLevel: Record<QuestionLevel, QuestionLevel> = {
    L1: 'L2', L2: 'L3', L3: 'L4', L4: 'L5', L5: 'L5',
  };
  const prevLevel: Record<QuestionLevel, QuestionLevel> = {
    L1: 'L1', L2: 'L1', L3: 'L2', L4: 'L3', L5: 'L4',
  };

  if (ratio >= 0.70) {
    return {
      verdict: 'promote',
      message: `${level} 테스트를 우수하게 통과하셨습니다. ${nextLevel[level]} 과정을 추천드립니다.`,
      recommendedLevel: nextLevel[level],
    };
  }
  if (ratio >= 0.40) {
    return {
      verdict: 'fit',
      message: `${level} 과정이 현재 학습 수준과 가장 잘 맞습니다.`,
      recommendedLevel: level,
    };
  }
  return {
    verdict: 'demote',
    message: `${level} 테스트가 다소 어렵게 느껴지셨을 수 있습니다. ${prevLevel[level]} 과정부터 탄탄히 다지는 것을 추천드립니다.`,
    recommendedLevel: prevLevel[level],
  };
}
