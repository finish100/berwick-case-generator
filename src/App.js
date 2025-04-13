import { useState } from 'react';

const suspects = [
  { code: "D", name: "데스먼드 던컨", validMotives: [1, 2, 3] },
  { code: "E", name: "에밀리 에크하트", validMotives: [4, 5, 6] },
  { code: "Q", name: "퀸튼 퀼스", validMotives: [7, 8, 9] },
  { code: "R", name: "레메디오스 델 리얼", validMotives: [10, 11, 12] },
  { code: "Y", name: "요리코 야가미", validMotives: [13, 14, 15] },
  { code: "Z", name: "자카리아 질버", validMotives: [16, 17, 18] },
];

const weapons = {
  1: { type: "Blunt", signs: ["뒤에서 공격당한 흔적", "기름진 물질"] },
  2: { type: "Blunt", signs: ["일그러진 미소", "몸싸움의 징후"] },
  3: { type: "Blunt", signs: ["청색증 또는 타박상", "대량의 출혈"] },
  4: { type: "Blunt", signs: ["심한 냄새", "불에 탄 자국"] },
  5: { type: "Firearm", signs: ["청색증 또는 타박상", "심한 냄새"] },
  6: { type: "Firearm", signs: ["방어흔", "찢어진 옷"] },
  7: { type: "Firearm", signs: ["불에 탄 자국", "몸싸움의 징후"] },
  8: { type: "Firearm", signs: ["대량의 출혈", "일그러진 미소"] },
  9: { type: "Blade", signs: ["뒤에서 공격당한 흔적", "청색증 또는 타박상"] },
  10: { type: "Blade", signs: ["일그러진 미소", "찢어진 옷"] },
  11: { type: "Blade", signs: ["방어흔", "기름진 물질"] },
  12: { type: "Blade", signs: ["기름진 물질", "몸싸움의 징후"] },
  13: { type: "Poison", signs: ["청색증 또는 타박상", "기름진 물질"] },
  14: { type: "Poison", signs: ["뒤에서 공격당한 흔적", "심한 냄새"] },
  15: { type: "Poison", signs: ["불에 탄 자국", "찢어진 옷"] },
  16: { type: "Poison", signs: ["방어흔", "대량의 출혈"] },
  17: { type: "Suffocating", signs: ["몸싸움의 징후", "찢어진 옷"] },
  18: { type: "Suffocating", signs: ["일그러진 미소", "기름진 물질"] },
  19: { type: "Suffocating", signs: ["방어흔", "심한 냄새"] },
  20: { type: "Suffocating", signs: ["뒤에서 공격당한 흔적", "불에 탄 자국"] },
};

const weaponRooms = {
  욕실: [2, 9, 15, 19],
  식당: [4, 8, 11, 17],
  서재: [3, 7, 14, 18],
  갤러리: [1, 5, 10, 16],
  온실: [6, 12, 13, 20],
};

const motiveDict = {
  1: "모욕당한 선친", 2: "위태로워진 명예", 3: "환각성 편두통",
  4: "납치와 갈취", 5: "잘못된 증언", 6: "기부금 부족",
  7: "사라진 애완동물", 8: "미식가의 분노", 9: "상처받은 마음",
  10: "요리 스파이 활동", 11: "삐딱한 협박", 12: "치명적인 질투",
  13: "마약 경쟁", 14: "감당할 없는 빚", 15: "위태로워진 명상 그룹",
  16: "병적인 수집욕", 17: "무너진 자존심", 18: "치명적인 욕심"
};

const roomGraph = {
  "게스트 하우스": ["현관 홀", "갤러리", "온실"],
  "현관 홀": ["찻방", "갤러리", "게스트 하우스"],
  "찻방": ["식당", "대기실", "현관 홀"],
  "대기실": ["찻방", "식당", "욕실"],
  "식당": ["욕실", "대기실", "찻방", "갤러리"],
  "서재": ["침실", "욕실", "갤러리", "온실"],
  "갤러리": ["현관 홀", "게스트 하우스", "온실", "서재", "식당"],
  "욕실": ["침실", "서재", "식당", "대기실"],
  "온실": ["갤러리", "게스트 하우스", "서재", "침실"],
  "침실": ["욕실", "온실", "서재"]
};

// 사건 생성 함수
function generateCase({ includeFakeTestimonies = false, includeFakeEvidence = false }) {
  const startRooms = ["게스트 하우스", "현관 홀", "찻방", "대기실"];
  const start = startRooms[Math.floor(Math.random() * startRooms.length)];
  const allPaths = getPaths(start, "침실", roomGraph).filter(path =>
    path.slice(1, -1).some(room => Object.keys(weaponRooms).includes(room))
  );
  const path = allPaths[Math.floor(Math.random() * allPaths.length)];
  const validRooms = path.slice(1, -1).filter(room => weaponRooms[room]);
  const weaponRoom = validRooms[Math.floor(Math.random() * validRooms.length)];
  const weaponNum = weaponRooms[weaponRoom][Math.floor(Math.random() * weaponRooms[weaponRoom].length)];
  const weapon = weapons[weaponNum];

  const suspect = suspects[Math.floor(Math.random() * suspects.length)];
  const motiveNum = suspect.validMotives[Math.floor(Math.random() * suspect.validMotives.length)];

  const result = {
    "용의자": `${suspect.name} (${suspect.code})`,
    "범행 동기": `#${motiveNum} – ${motiveDict[motiveNum]}`,
    "시작 방": start,
    "이동 경로": path.join(" → "),
    "무기 획득 장소": weaponRoom,
    "살해 도구": `${weaponNum}번 – ${weapon.type}`,
    "포렌식 징후": weapon.signs.join(", ")
  };

  // 가짜 증언과 가짜 증거를 포함하려면, 그 데이터를 추가합니다.
  if (includeFakeTestimonies) {
    result["가짜 증언"] = generateFakeTestimonies();
  }
  if (includeFakeEvidence) {
    result["가짜 증거"] = generateFakeEvidence();
  }

  return result;
}

// 가짜 증언 생성
function generateFakeTestimonies() {
  const fakeTestimonies = [
    "가짜 증언 1",
    "가짜 증언 2",
    "가짜 증언 3",
    "가짜 증언 4",
    "가짜 증언 5",
  ];
  return fakeTestimonies[Math.floor(Math.random() * fakeTestimonies.length)];
}

// 가짜 증거 생성
function generateFakeEvidence() {
  const fakeEvidence = [
    "가짜 증거 1",
    "가짜 증거 2",
    "가짜 증거 3",
  ];
  return fakeEvidence[Math.floor(Math.random() * fakeEvidence.length)];
}

function App() {
  const [includeFakes, setIncludeFakes] = useState({ testimonies: false, evidence: false });
  const [caseData, setCaseData] = useState(null);

  async function generateCaseWithOptions() {
    const caseResult = generateCase({ includeFakeTestimonies: includeFakes.testimonies, includeFakeEvidence: includeFakes.evidence });
    setCaseData(caseResult);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🕵️ 버윅 미스터리 사건 생성기 🔍</h1>

      <label>
        <input
          type="checkbox"
          checked={includeFakes.testimonies}
          onChange={(e) => setIncludeFakes({ ...includeFakes, testimonies: e.target.checked })}
        />{' '}
        가짜 증언 포함
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={includeFakes.evidence}
          onChange={(e) => setIncludeFakes({ ...includeFakes, evidence: e.target.checked })}
        />{' '}
        가짜 증거 포함
      </label>
      <br /><br />
      <button onClick={generateCaseWithOptions}>사건 생성하기</button>

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