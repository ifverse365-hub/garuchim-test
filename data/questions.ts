/**
 * 레벨 테스트 문항 데이터.
 *
 * 각 문항은 아래 구조를 따릅니다:
 *   - id: 문항 고유 번호 (문항 순서·결과 저장 용도)
 *   - category: 분류 (사고력 / 블록코딩 / 텍스트코딩 / 알고리즘)
 *   - difficulty: 난이도 1~5 (1 초등저, 2 초등중, 3 초등고, 4 중등, 5 고등)
 *   - question: 질문 텍스트
 *   - choices: 선택지 배열 (최소 2, 최대 5)
 *   - correctIndex: 정답 인덱스 (0부터)
 *   - points: 이 문항 정답 시 점수 (기본 1, 난이도별 조정 가능)
 *
 * 문항을 추가·수정하려면 이 파일만 수정하면 됩니다.
 * 이후 `npm run build` 또는 개발 서버 재시작.
 */

export type Question = {
  id: number;
  category: 'thinking' | 'block' | 'text' | 'algorithm';
  difficulty: 1 | 2 | 3 | 4 | 5;
  question: string;
  choices: string[];
  correctIndex: number;
  points: number;
};

export const CATEGORY_LABEL: Record<Question['category'], string> = {
  thinking: '사고력',
  block: '블록 코딩',
  text: '텍스트 코딩',
  algorithm: '알고리즘',
};

export const questions: Question[] = [
  // ─── 사고력 (난이도 1~2, 초등 저학년도 풀 수 있음) ──────
  {
    id: 1,
    category: 'thinking',
    difficulty: 1,
    question:
      '다음 중 "반복"의 예로 가장 알맞은 것은 무엇일까요?',
    choices: [
      '아침에 일어나서 세수를 한 번 한다',
      '교실에 있는 책상 10개에 모두 이름표를 붙인다',
      '오늘 날씨가 맑다',
      '가장 좋아하는 과일을 고른다',
    ],
    correctIndex: 1,
    points: 1,
  },
  {
    id: 2,
    category: 'thinking',
    difficulty: 1,
    question:
      '"만약 비가 오면 우산을 쓰고, 그렇지 않으면 모자를 쓴다"는 것은 어떤 개념일까요?',
    choices: ['반복', '조건', '순서', '변수'],
    correctIndex: 1,
    points: 1,
  },
  {
    id: 3,
    category: 'thinking',
    difficulty: 2,
    question:
      '큰 문제를 작은 문제 여러 개로 나누어 해결하는 방법을 뭐라고 할까요?',
    choices: ['추상화', '분해', '패턴 인식', '알고리즘'],
    correctIndex: 1,
    points: 2,
  },

  // ─── 블록 코딩 (엔트리) ─────────────────────────────
  {
    id: 4,
    category: 'block',
    difficulty: 2,
    question:
      '엔트리에서 "10번 반복하기" 블록 안에 "앞으로 10 움직이기" 블록을 넣으면 어떻게 될까요?',
    choices: [
      '오브젝트가 한 번만 움직인다',
      '오브젝트가 앞으로 총 100만큼 움직인다',
      '오브젝트가 제자리에서 회전한다',
      '오브젝트가 크기만 커진다',
    ],
    correctIndex: 1,
    points: 2,
  },
  {
    id: 5,
    category: 'block',
    difficulty: 3,
    question:
      '게임에서 점수를 기억하기 위해 사용하는 엔트리 기능은 무엇일까요?',
    choices: ['모양', '신호', '변수', '배경'],
    correctIndex: 2,
    points: 2,
  },
  {
    id: 6,
    category: 'block',
    difficulty: 3,
    question:
      '엔트리의 "신호 보내기"는 어떤 상황에서 사용하기 가장 좋을까요?',
    choices: [
      '같은 동작을 100번 반복하고 싶을 때',
      '한 오브젝트가 다른 오브젝트에게 "이제 움직여!" 라고 알리고 싶을 때',
      '점수를 화면에 보여주고 싶을 때',
      '배경 음악을 바꾸고 싶을 때',
    ],
    correctIndex: 1,
    points: 2,
  },

  // ─── 텍스트 코딩 (Python) ──────────────────────────
  {
    id: 7,
    category: 'text',
    difficulty: 3,
    question:
      '다음 Python 코드의 결과는 무엇일까요?\n\n    x = 5\n    y = 3\n    print(x + y)',
    choices: ['8', '53', 'x + y', '오류'],
    correctIndex: 0,
    points: 3,
  },
  {
    id: 8,
    category: 'text',
    difficulty: 4,
    question:
      '다음 Python 코드가 출력하는 것은?\n\n    for i in range(3):\n        print("안녕")',
    choices: [
      '"안녕" 한 줄만 출력',
      '"안녕" 이 세 줄 출력',
      '"안녕" 이 네 줄 출력',
      '숫자 0, 1, 2 출력',
    ],
    correctIndex: 1,
    points: 3,
  },
  {
    id: 9,
    category: 'text',
    difficulty: 4,
    question:
      'Python 리스트 nums = [4, 1, 8, 2] 에서 nums[2] 의 값은?',
    choices: ['4', '1', '8', '2'],
    correctIndex: 2,
    points: 3,
  },

  // ─── 알고리즘 (중등~고등) ──────────────────────────
  {
    id: 10,
    category: 'algorithm',
    difficulty: 5,
    question:
      '다음 중 이진 탐색(binary search) 을 사용할 수 있는 조건은?',
    choices: [
      '데이터가 무작위로 섞여 있어야 한다',
      '데이터가 정렬되어 있어야 한다',
      '데이터 개수가 짝수여야 한다',
      '데이터가 숫자가 아니어야 한다',
    ],
    correctIndex: 1,
    points: 4,
  },
];

/**
 * 점수 총합 기반 레벨 추천 규칙.
 * 문항이 늘어나면 이 임계값도 조정하세요.
 * 현재 10문항 · 최대 23점 기준.
 */
export function recommendLevel(totalScore: number, totalPossible: number): {
  level: 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
  levelName: string;
  description: string;
} {
  const ratio = totalScore / totalPossible;

  if (ratio < 0.20) {
    return {
      level: 'L1',
      levelName: 'CT 입문',
      description: '컴퓨터와 친해지는 첫 과정부터 탄탄히 시작합니다.',
    };
  }
  if (ratio < 0.45) {
    return {
      level: 'L2',
      levelName: '창작',
      description: '엔트리로 본격 게임·AI·피지컬 작품을 만드는 단계입니다.',
    };
  }
  if (ratio < 0.65) {
    return {
      level: 'L3',
      levelName: '전환',
      description: '엔트리 최상위 자격증을 취득하고 Python으로 넘어가는 분기점입니다.',
    };
  }
  if (ratio < 0.85) {
    return {
      level: 'L4',
      levelName: '교과·응용',
      description: 'Python 자료구조·알고리즘 기초를 다지고 내신을 장악합니다.',
    };
  }
  return {
    level: 'L5',
    levelName: '입시 심화',
    description: '2028 대입 개편에 정면 대응하는 심화 트랙입니다.',
  };
}

export const TOTAL_POINTS = questions.reduce((sum, q) => sum + q.points, 0);
