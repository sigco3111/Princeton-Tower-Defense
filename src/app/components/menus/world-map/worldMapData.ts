import { LEVEL_WAVES } from "../../../constants";

export interface LevelNode {
  id: string;
  name: string;
  description: string;
  region: "grassland" | "swamp" | "desert" | "winter" | "volcanic";
  difficulty: 1 | 2 | 3;
  kind?: "campaign" | "challenge" | "sandbox";
  tags: string[];
  x: number;
  y: number;
  connectsTo: string[];
}

export const WORLD_LEVELS: LevelNode[] = [
  {
    connectsTo: ["carnegie"],
    description:
      "열린 풀밭에서 새로운 방어자를 훈련하세요.\n황혼에 첫 번째 길을 지키세요.",
    difficulty: 1,
    id: "poe",
    name: "포 필드",
    region: "grassland",
    tags: ["Open Field", "초보자"],
    x: 100,
    y: 66,
  },
  {
    connectsTo: [],
    description:
      "자원 제한 없이 자유로운 산꼭마리 콜로세움. 무엇이든 건설하고 모든 것을 시험하세요.",
    difficulty: 1,
    id: "sandbox",
    kind: "sandbox",
    name: "샌드박스 전장",
    region: "grassland",
    tags: ["샌드박스", "무제한"],
    x: 205,
    y: 59,
  },
  {
    connectsTo: ["nassau"],
    description:
      "호숫안 진입 도로를 보호하세요.\n양안의 분할 공격을 강력히 제압하세요.",
    difficulty: 2,
    id: "carnegie",
    name: "카네기 호수",
    region: "grassland",
    tags: ["Split Path", "Lakefront"],
    x: 205,
    y: 40,
  },
  {
    connectsTo: ["bog", "ivy_crossroads"],
    description:
      "캠퍼스 돌바닥 안마당을 방어하세요.\n정문 근처의 압력을 흡수하세요.",
    difficulty: 3,
    id: "nassau",
    name: "나소 홀",
    region: "grassland",
    tags: ["요새 지점", "안뜰"],
    x: 320,
    y: 58,
  },
  {
    connectsTo: ["cannon_crest"],
    description:
      "교차하는 라인이 집중을 분산시킵니다.\n체인 버프로 두 병목 지점을 동시에 잠그세요.",
    difficulty: 3,
    id: "ivy_crossroads",
    kind: "challenge",
    name: "아이비 교차로",
    region: "grassland",
    tags: ["Multi-Lane", "Buff Chains"],
    x: 370,
    y: 30,
  },
  {
    connectsTo: [],
    description:
      "내서 캐논만 허용됩니다.\n잔혹한 사격 라인으로 전선을 고정하세요.",
    difficulty: 3,
    id: "cannon_crest",
    kind: "challenge",
    name: "캐논 크레스트",
    region: "grassland",
    tags: ["제한된 빌드", "포격"],
    x: 175,
    y: 26,
  },
  // Swamp - Murky Marshes
  {
    connectsTo: ["witch_hut"],
    description:
      "안개 낀 습지 오솔길이 위협을 숨깁니다.\n시야를 확보하고 축축한 병목을 지키세요.",
    difficulty: 1,
    id: "bog",
    name: "음울한 소택지",
    region: "swamp",
    tags: ["시야 좁음", "요새 지점"],
    x: 430,
    y: 56,
  },
  {
    connectsTo: ["sunken_temple"],
    description:
      "어둠의 신비가 늪의 습격자를 강화합니다.\n웨이브가 쌓이기 전에 저주를 풀어버리세요.",
    difficulty: 2,
    id: "witch_hut",
    name: "마녀의 영역",
    region: "swamp",
    tags: ["저주받은", "Debuffs"],
    x: 535,
    y: 33,
  },
  {
    connectsTo: ["oasis", "blight_basin", "triad_keep"],
    description:
      "폐허가 무너져 침수된 길로 변합니다.\n부서진 아치 주변에 타워를 배치하세요.",
    difficulty: 3,
    id: "sunken_temple",
    name: "가라앉은 신전",
    region: "swamp",
    tags: ["Ruins", "침수"],
    x: 650,
    y: 56,
  },
  {
    connectsTo: [],
    description:
      "독 웅덩이가 양쪽 라인을 부식시킵니다.\n독성 교차 사격 사이를 빠르게 회전하세요.",
    difficulty: 3,
    id: "blight_basin",
    kind: "challenge",
    name: "황폐 분지",
    region: "swamp",
    tags: ["poison", "교차 사격"],
    x: 540,
    y: 70,
  },
  {
    connectsTo: [],
    description:
      "딩키, 도서관, 클럽만 건설할 수 있습니다.\n군중 제어와 경제력으로 적 떼를 견뎌내세요.",
    difficulty: 3,
    id: "triad_keep",
    kind: "challenge",
    name: "삼두 요새",
    region: "swamp",
    tags: ["제한된 빌드", "경제"],
    x: 680,
    y: 28,
  },
  // Desert
  {
    connectsTo: ["pyramid"],
    description:
      "열린 모래 위의 우물을 지키세요.\n사구 주변의 빠른 측면 공격을 제압하세요.",
    difficulty: 1,
    id: "oasis",
    name: "사막 오아시스",
    region: "desert",
    tags: ["Open Sand", "Flanking"],
    x: 785,
    y: 62,
  },
  {
    connectsTo: ["sphinx", "sun_obelisk", "mirage_dunes"],
    description:
      "고대 ramp가 방어선을 분할합니다.\n고지와 라인 회전 지점을 점거하세요.",
    difficulty: 2,
    id: "pyramid",
    name: "피라미드 고개",
    region: "desert",
    tags: ["High Ground", "Split Defense"],
    x: 910,
    y: 38,
  },
  {
    connectsTo: [],
    description:
      "하늘이 날개로 어두워집니다; 모든 적이 비행합니다.\n안타깝지만 포병만 사용 가능합니다.",
    difficulty: 3,
    id: "mirage_dunes",
    kind: "challenge",
    name: "신기루 사구",
    region: "desert",
    tags: ["All Flying", "Mortars Only"],
    x: 820,
    y: 33,
  },
  {
    connectsTo: [],
    description:
      "태양 신전이 양쪽 라인을 태웁니다.\n고대 살육장에서 병력을 분산시키세요.",
    difficulty: 3,
    id: "sun_obelisk",
    kind: "challenge",
    name: "태양 오벨리스크",
    region: "desert",
    tags: ["Solar Hazards", "Dual Lane"],
    x: 910,
    y: 25,
  },
  {
    connectsTo: ["glacier", "sunscorch_labyrinth"],
    description:
      "수호자가 모든 진형을 시험합니다.\n대칭된 전선에서의 폭발을 견뎌내세요.",
    difficulty: 3,
    id: "sphinx",
    name: "스핑크스 문",
    region: "desert",
    tags: ["Mirror Lanes", "Burst Waves"],
    x: 968,
    y: 53,
  },
  {
    connectsTo: [],
    description:
      "쌍둥이 미궁이 분산 대응을 강요합니다.\n라인이 수렴할 때 위험 요소를 처리하세요.",
    difficulty: 3,
    id: "sunscorch_labyrinth",
    kind: "challenge",
    name: "태양의 미궁",
    region: "desert",
    tags: ["미로", "위험요소"],
    x: 1000,
    y: 67,
  },
  // Winter
  {
    connectsTo: ["fortress"],
    description:
      "얼음 바람이 모든 진격을 늦춥니다.\n간격을 활용해 빙결을 견뎌내세요.",
    difficulty: 1,
    id: "glacier",
    name: "빙하 길",
    region: "winter",
    tags: ["Slow Effects", "Spacing"],
    x: 1142,
    y: 48,
  },
  {
    connectsTo: ["peak"],
    description:
      "서리 벽이 무거운 공격을 한곳으로 유도합니다.\n라인이 무너지기 전에 안정시키세요.",
    difficulty: 2,
    id: "fortress",
    name: "서리 요새",
    region: "winter",
    tags: ["깔때기", "Heavy Assault"],
    x: 1268,
    y: 67,
  },
  {
    connectsTo: ["lava", "whiteout_pass"],
    description:
      "폭풍이 절벽 도로를 가로질러 몰아칩니다.\n끊임없는 정예 적으로부터 절벽을 방어하세요.",
    difficulty: 3,
    id: "peak",
    name: "봉우리 정상",
    region: "winter",
    tags: ["Cliffs", "정예 웨이브"],
    x: 1365,
    y: 48,
  },
  {
    connectsTo: ["frist_outpost"],
    description:
      "백색 폭풍이 양쪽 라인을 숨깁니다.\n연속 빙결 이후 빠르게 회복하세요.",
    difficulty: 3,
    id: "whiteout_pass",
    kind: "challenge",
    name: "화이트아웃 고개",
    region: "winter",
    tags: ["시야 좁음", "연쇄 빙결"],
    x: 1210,
    y: 32,
  },
  {
    connectsTo: [],
    description:
      "딩키 스태이션만 건설 가능합니다.\n프론티어 막사가 전선을 지킵니다.",
    difficulty: 3,
    id: "frist_outpost",
    kind: "challenge",
    name: "프리스트 초소",
    region: "winter",
    tags: ["제한된 빌드", "병영"],
    x: 1332,
    y: 28,
  },
  // Volcanic
  {
    connectsTo: ["crater"],
    description:
      "용암 수로가 배치 구역을 태웁니다.\n열기 폭발 사이로 증원 타이밍을 맞추세요.",
    difficulty: 2,
    id: "lava",
    name: "용암 지대",
    region: "volcanic",
    tags: ["Hazard Zones", "Timing"],
    x: 1522,
    y: 61,
  },
  {
    connectsTo: ["throne", "infernal_gate"],
    description:
      "칼데라 분출구가 앵커를 분할합니다.\n측면에서 분출하는 동안 중앙을 지키세요.",
    difficulty: 3,
    id: "crater",
    name: "칼데라 분지",
    region: "volcanic",
    tags: ["Split Anchor", "Eruptions"],
    x: 1592,
    y: 37,
  },
  {
    connectsTo: [],
    description:
      "악마의 포털이 쌍둥이 화염 라인을 범람시킵니다.\n해골 제단 주변의 분출 속에서 살아남으세요.",
    difficulty: 3,
    id: "infernal_gate",
    kind: "challenge",
    name: "지옥의 문",
    region: "volcanic",
    tags: ["Lava Geysers", "뼈 제단"],
    x: 1530,
    y: 28,
  },
  {
    connectsTo: ["ashen_spiral"],
    description:
      "흑요석 문이 잔혹한 웨이브를 방출합니다.\n왕좌가 쓰러질 때까지 견뎌내세요.",
    difficulty: 3,
    id: "throne",
    name: "흑요석 왕좌",
    region: "volcanic",
    tags: ["Final Stand", "보스 러시"],
    x: 1702,
    y: 59,
  },
  {
    connectsTo: [],
    description:
      "지옥불 라인이 킬존으로 나선형을 그립니다.\n쌓인 간헐천과 돌격 정예를 대응하세요.",
    difficulty: 3,
    id: "ashen_spiral",
    kind: "challenge",
    name: "잿빛 나선",
    region: "volcanic",
    tags: ["Spiral Path", "Geysers"],
    x: 1612,
    y: 72,
  },
];

export const DEV_LEVEL_IDS: ReadonlySet<string> = new Set([
  "dev_enemy_showcase",
  "dev_building_showcase",
]);

export const ALWAYS_UNLOCKED_IDS: ReadonlySet<string> = new Set([
  "poe",
  "sandbox",
]);

export const DEV_LEVELS: LevelNode[] = [
  {
    connectsTo: [],
    description:
      "모든 타워의 모든 업그레이드를 갖춘 샌드박스.\n개발자 전용 테스트 레벨.",
    difficulty: 1,
    id: "dev_enemy_showcase",
    name: "적 도감",
    region: "grassland",
    tags: ["Dev", "모든 적"],
    x: 60,
    y: 25,
  },
  {
    connectsTo: [],
    description:
      "모든 랜드마크와 프린스턴 건물.\n개발자 전용 갤러리 레벨.",
    difficulty: 1,
    id: "dev_building_showcase",
    name: "건물 도감",
    region: "grassland",
    tags: ["Dev", "All Buildings"],
    x: 60,
    y: 40,
  },
];

/** Per-connection curve overrides. Key is "fromId->toId". */
export const CONNECTION_OVERRIDES: Record<string, { flip?: boolean }> = {
  "crater->throne": { flip: true },
  "nassau->bog": { flip: true },
  "poe->carnegie": { flip: true },
  "pyramid->mirage_dunes": { flip: true },
  "whiteout_pass->frist_outpost": { flip: true },
};

export const MAP_WIDTH = 1800;

export const getWaveCount = (levelId: string): number => {
  const waves = LEVEL_WAVES[levelId];
  return waves ? waves.length : 0;
};
