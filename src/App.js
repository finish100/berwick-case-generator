import { useState } from 'react';

const suspects = [
  { code: "D", name: "Desmond Duncan" },
  { code: "E", name: "Emily Eckhart" },
  { code: "Q", name: "Quinton Quills" },
  { code: "R", name: "Remedios del Real" },
  { code: "Y", name: "Yoriko Yagami" },
  { code: "Z", name: "Zachariah Zilber" },
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
  1: "Ancestral Affront",
  2: "Professional Rivalry",
  5: "Financial Dispute",
  6: "Hidden Affair",
  12: "Lethal Jealousy",
  13: "Political Motive",
  14: "Inheritance Conflict",
  17: "Public Humiliation",
};

const rooms = ["Study", "Tea Room", "Bathroom", "Dining Room", "Gallery", "Guest House", "Vestibule", "Bedroom"];
const traces = [
  "Heavy bleeding",
  "Defensive wounds",
  "Torn clothing",
  "Cyanosis or bruises",
  "Burn marks",
  "Gunpowder residue",
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
    범인: `${suspect.name} (${suspect.code})`,
    동기: `#${motive} – ${motives[motive]}`,
    무기: `${weaponName} (${weaponType})`,
    경로: path.join(" → "),
    무기발견장소: weaponRoom,
    제거된포렌식: traceRemoved,
    페이크동기: fakeMotives.map(m => `#${m}`),
    페이크증거위치: fakeEvidenceRooms,
  };
}

function App() {
  const [caseData, setCaseData] = useState(null);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🕵️ 사건 생성기</h1>
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
