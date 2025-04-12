import { useState } from 'react';

const suspects = [
  { code: "D", name: "데스먼드 던컨" },
  { code: "E", name: "에밀리 에크하트" },
  { code: "Q", name: "퀸튼 퀼스" },
  { code: "R", name: "레메디오스 델 리얼" },
  { code: "Y", name: "요리코 야가미" },
  { code: "Z", name: "자카리아 질버" },
];

const weapons = {
  Blunt: "샹들리에 파편",
  Blade: "은식칼",
  Poison: "차에 탄 독",
  Firearm: "권총",
  Suffocating: "베개",
  Signs: "벽난로 도구",
};

const motives = {
  1: "조상 모욕에 대한 복수",
  2: "직업적 경쟁 관계",
  5: "금전적 분쟁",
  6: "숨겨진 불륜",
  12: "질투심에 의한 살인",
  13: "정치적 동기",
  14: "유산 상속 문제",
  17: "공공 망신에 대한 보복",
};

const rooms = ["서재", "찻방", "욕실", "식당", "갤러리", "게스트 하우스", "현관 홀", "침실"];
const traces = [
  "과다 출혈",
  "방어 흔적",
  "찢어진 옷",
  "시반 또는 멍",
  "화상 흔적",
  "화약 잔여물",
];

function getRandomItems(arr, count) {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}

function generateCase() {
  const suspect = suspects[Math.floor(Math.random() * suspects.length)];
  const motiveKeys = Object.keys(motives).map(Number);
  const motive = getRandomItems(motiveKeys, 1)[0];
  const weaponType = getRandomItems(Object.keys(weapons), 1)[0];
  const weaponName = weapons[weaponType];
  const path = getRandomItems(rooms, 5);
  const weaponRoom = path[Math.floor(Math.random() * 3) + 1];
  const traceRemoved = getRandomItems(traces, 2);
  const fakeMotives = getRandomItems(motiveKeys.filter(m => m !== motive), 5);
  const fakeEvidenceRooms = getRandomItems(rooms, 3);

  return {
    "용의자": `${suspect.name} (${suspect.code})`,
    "범행 동기": `#${motive} – ${motives[motive]}`,
    "살해 도구": `${weaponName} (${weaponType})`,
    "이동 경로": path.join(" → "),
    "무기 발견 장소": weaponRoom,
    "제거된 포렌식 흔적": traceRemoved,
    "가짜 동기 번호": fakeMotives.map(m => `#${m}`),
    "가짜 증거 위치": fakeEvidenceRooms,
  };
}

function App() {
  const [caseData, setCaseData] = useState(null);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🕵️ 버윅 미스터리 사건 생성기 🔍</h1>
      <button onClick={() => setCaseData(generateCase())}>사건 생성하기</button>

      {caseData && (
        <div style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
          {Object.entries(caseData).map(([key, value]) => (
            <p key={key}><strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

