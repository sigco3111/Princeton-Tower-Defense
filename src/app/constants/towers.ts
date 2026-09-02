import type { TowerType } from "../types";
import { TOWER_STATS } from "./towerStats";

// Tower data with 4-level progression: Level 1 -> 2 -> 3 (base upgrade) -> 4A/4B (branch)
export const TOWER_DATA: Record<
  TowerType,
  {
    name: string;
    cost: number;
    damage: number;
    range: number;
    attackSpeed: number;
    desc: string;
    spawnRange?: number;
    upgrades: {
      A: { name: string; desc: string; effect: string; range?: number };
      B: { name: string; desc: string; effect: string; range?: number };
    };
    levelDesc: Record<number, string>;
  }
> = {
  arch: {
    attackSpeed: TOWER_STATS.arch.baseStats.attackSpeed,

    cost: TOWER_STATS.arch.levels[1].cost,
    damage: TOWER_STATS.arch.baseStats.damage,
    desc: "연속 공격 시 가속되는 크레센도.",
    levelDesc: {
      1: "크레센도 - 최대 4중첩까지 축적",
      2: "공명 - 최대 6중첩, 1.4배 피해",
      3: "포르테 - 최대 8중첩, 1.8배 피해",
      4: "선택: 충격파 또는 심포니",
    },
    name: TOWER_STATS.arch.name,
    range: TOWER_STATS.arch.baseStats.range,
    upgrades: {
      A: {
        desc: "기절 효과의 크레센도 공격",
        effect: "35% stun chance, max 8 crescendo stacks",
        name: "충격파 사이렌",
        range: 350,
      },
      B: {
        desc: "궁극의 음파 크레센도",
        effect: "최대 12중첩까지 축적, 중첩당 보너스 강화",
        name: "심포니 홀",
        range: 370,
      },
    },
  },
  cannon: {
    attackSpeed: TOWER_STATS.cannon.baseStats.attackSpeed,

    cost: TOWER_STATS.cannon.levels[1].cost,
    damage: TOWER_STATS.cannon.baseStats.damage,
    desc: "지상 적에 대한 중포병 사격.",
    levelDesc: {
      1: "기본 캐논 - 단발 포격",
      2: "강화 캐논 - 더 큰 구경 (1.5배 피해)",
      3: "중형 캐논 - 안정화된 포신 (2.2배 피해)",
      4: "선택: 기관총 또는 화염방사기",
    },
    name: TOWER_STATS.cannon.name,
    range: TOWER_STATS.cannon.baseStats.range,
    upgrades: {
      A: {
        desc: "빠르게 발사하는 기관총",
        effect: "8x attack speed, 0.4x damage per shot",
        name: "gatling",
        range: 360,
      },
      B: {
        desc: "지속적인 화염 사격",
        effect: "적에게 지속 화염 피해",
        name: "flamethrower",
        range: 300,
      },
    },
  },
  club: {
    attackSpeed: TOWER_STATS.club.baseStats.attackSpeed,

    cost: TOWER_STATS.club.levels[1].cost,
    damage: TOWER_STATS.club.baseStats.damage,
    desc: "시간이 지나며 발포 인트를 생성합니다.",
    levelDesc: {
      1: "기본 클럽 - 8초마다 8 PP",
      2: "인기 클럽 - 7초마다 15 PP + 근처 처치 보너스",
      3: "그랜드 클럽 - 6초마다 25 PP + 사거리 내 적 감속",
      4: "선택: 투자 은행 또는 모집 센터",
    },
    name: TOWER_STATS.club.name,
    range: TOWER_STATS.club.baseStats.range,
    upgrades: {
      A: {
        desc: "최대 수동 수입",
        effect: "40 PP every 5s + 15% range buff to nearby towers",
        name: "투자 은행",
      },
      B: {
        desc: "수익 + 타워 지원",
        effect: "20 PP every 6s + 15% damage buff to nearby towers",
        name: "모집 센터",
      },
    },
  },
  lab: {
    attackSpeed: TOWER_STATS.lab.baseStats.attackSpeed,

    cost: TOWER_STATS.lab.levels[1].cost,
    damage: TOWER_STATS.lab.baseStats.damage,
    desc: "적 사이를 튀는 체인 라이트닝.",
    levelDesc: {
      1: "테슬라 충격기 - 3명의 적에게 연쇄",
      2: "강화 충격기 - 4명의 적에게 연쇄",
      3: "테슬라 코일 - 5명의 적에게 연쇄",
      4: "선택: 집중 빔 또는 체인 라이트닝",
    },
    name: TOWER_STATS.lab.name,
    range: TOWER_STATS.lab.baseStats.range,
    upgrades: {
      A: {
        desc: "집중 레이저 공격",
        effect: "지속 락온, 시간이 지날수록 피해 증가",
        name: "집중 빔",
        range: 320,
      },
      B: {
        desc: "다중 대상 전기 공격",
        effect: "최대 8명의 적에게 연쇄",
        name: "체인 라이트닝",
        range: 300,
      },
    },
  },
  library: {
    attackSpeed: TOWER_STATS.library.baseStats.attackSpeed,

    cost: TOWER_STATS.library.levels[1].cost,
    damage: TOWER_STATS.library.baseStats.damage,
    desc: "고대 지식으로 적을 감속시킵니다.",
    levelDesc: {
      1: TOWER_STATS.library.levels[1].description,
      2: TOWER_STATS.library.levels[2].description,
      3: TOWER_STATS.library.levels[3].description,
      4: "Choose: Earthquake or Blizzard",
    },
    name: TOWER_STATS.library.name,
    range: TOWER_STATS.library.baseStats.range,
    upgrades: {
      A: {
        desc: "지진파로 피해와 감속",
        effect: "광역 피해 35 + 50% 감속",
        name: "이쿼드 분쇄기",
        range: 330,
      },
      B: {
        desc: "적을 완전히 빙결시킴",
        effect: "50% slow + 25% freeze chance/2s",
        name: "blizzard",
        range: 385,
      },
    },
  },
  mortar: {
    attackSpeed: TOWER_STATS.mortar.baseStats.attackSpeed,

    cost: TOWER_STATS.mortar.levels[1].cost,
    damage: TOWER_STATS.mortar.baseStats.damage,
    desc: "광역 범위 피해를 주는 요새화된 포격.",
    levelDesc: {
      1: "야전 박격포 - 4다리 포신 + 철제 조준기",
      2: "공성 박격포 - 추진제 주입기, 잠망경 조준기, 탄창 공급기",
      3: "그랜드 박격포 - 디지털 거리측정기, 각도 조절기, 고각 장치",
      4: "선택: 미사일 배터리 또는 잿불 용광로",
    },
    name: TOWER_STATS.mortar.name,
    range: TOWER_STATS.mortar.baseStats.range,
    upgrades: {
      A: {
        desc: "6-pod guided launcher rack",
        effect: "자동 조준 또는 수동 조준으로 파괴적인 포격",
        name: "미사일 배터리",
        range: 400,
      },
      B: {
        desc: "3연발 리볼버 캐논",
        effect: "대상에 3발의 대형 소이탄 발사, 화염 지속 피해",
        name: "잿불 용광로",
        range: 350,
      },
    },
  },
  station: {
    name: TOWER_STATS.station.name,

    cost: TOWER_STATS.station.levels[1].cost,
    damage: TOWER_STATS.station.baseStats.damage,
    range: TOWER_STATS.station.baseStats.range,
    attackSpeed: TOWER_STATS.station.baseStats.attackSpeed,
    desc: "적을 막을 병사를 소환합니다.",
    spawnRange: 280, // Increased base range for better troop movement
    levelDesc: {
      1: "보병 - 기본 보병 유닛",
      2: "장갑 보병 - 장갑 장착",
      3: "정예 근위대 - 할버드를 든 왕실 전사",
      4: "선택: 켄타우로스 마구간 또는 로열 기병",
    },
    upgrades: {
      A: {
        desc: "인간과 말의 혼합 전사",
        effect: "원거리 공격이 가능한 켄타우로스 부대 소환",
        name: "켄타우로스 마구간",
      },
      B: {
        desc: "군마 위의 기마 기사",
        effect: "돌격 능력이 있는 튼튼한 기병 소환",
        name: "로열 기병",
      },
    },
  },
};

// =============================================================================
// TOWER ACCENT COLORS (used for sprite frame themes and UI theming)
// =============================================================================

export const TOWER_ACCENTS: Record<TowerType, string> = {
  arch: "#60a5fa",
  cannon: "#f87171",
  club: "#f59e0b",
  lab: "#facc15",
  library: "#67e8f9",
  mortar: "#fb923c",
  station: "#a78bfa",
};

// =============================================================================
// TOWER CATEGORIES (role label + color name for UI display)
// =============================================================================

export interface TowerCategory {
  label: string;
  colorName: string;
}

export const TOWER_CATEGORIES: Record<TowerType, TowerCategory> = {
  arch: { colorName: "blue", label: "다중 대상" },
  cannon: { colorName: "red", label: "중포병" },
  club: { colorName: "amber", label: "경제" },
  lab: { colorName: "yellow", label: "에너지 피해" },
  library: { colorName: "cyan", label: "군중 제어" },
  mortar: { colorName: "orange", label: "Siege AoE" },
  station: { colorName: "purple", label: "부대 소환" },
};

// =============================================================================
// TOWER TAGS — centralized capability tags for at-a-glance clarity
// =============================================================================

export type TowerTag =
  | "attacker"
  | "dps"
  | "spawner"
  | "economy"
  | "crowd_control"
  | "support"
  | "anti_air"
  | "ground_only"
  | "aoe"
  | "single_target"
  | "chain"
  | "ramp_up"
  | "blocker";

export interface TowerTagDef {
  label: string;
  icon: string;
  textClass: string;
  bgClass: string;
  borderClass: string;
}

export const TOWER_TAG_DEFS: Record<TowerTag, TowerTagDef> = {
  anti_air: {
    bgClass: "bg-sky-950/60",
    borderClass: "border-sky-700/40",
    icon: "feather",
    label: "공중 공격",
    textClass: "text-sky-300",
  },
  aoe: {
    bgClass: "bg-orange-950/60",
    borderClass: "border-orange-700/40",
    icon: "circle-dot",
    label: "광역",
    textClass: "text-orange-300",
  },
  attacker: {
    bgClass: "bg-red-950/60",
    borderClass: "border-red-700/40",
    icon: "swords",
    label: "공격형",
    textClass: "text-red-300",
  },
  blocker: {
    bgClass: "bg-emerald-950/60",
    borderClass: "border-emerald-700/40",
    icon: "shield",
    label: "차단형",
    textClass: "text-emerald-300",
  },
  chain: {
    bgClass: "bg-cyan-950/60",
    borderClass: "border-cyan-700/40",
    icon: "zap",
    label: "체인",
    textClass: "text-cyan-300",
  },
  crowd_control: {
    bgClass: "bg-purple-950/60",
    borderClass: "border-purple-700/40",
    icon: "snowflake",
    label: "제어",
    textClass: "text-purple-300",
  },
  dps: {
    bgClass: "bg-red-950/60",
    borderClass: "border-red-700/40",
    icon: "flame",
    label: "DPS",
    textClass: "text-red-400",
  },
  economy: {
    bgClass: "bg-amber-950/60",
    borderClass: "border-amber-700/40",
    icon: "coins",
    label: "경제",
    textClass: "text-amber-300",
  },
  ground_only: {
    bgClass: "bg-stone-800/60",
    borderClass: "border-stone-600/40",
    icon: "footprints",
    label: "지상 전용",
    textClass: "text-stone-400",
  },
  ramp_up: {
    bgClass: "bg-green-950/60",
    borderClass: "border-green-700/40",
    icon: "trending-up",
    label: "점진 강화",
    textClass: "text-green-300",
  },
  single_target: {
    bgClass: "bg-red-950/40",
    borderClass: "border-red-800/30",
    icon: "crosshair",
    label: "단일 대상",
    textClass: "text-red-200",
  },
  spawner: {
    bgClass: "bg-fuchsia-950/60",
    borderClass: "border-fuchsia-700/40",
    icon: "users",
    label: "Spawner",
    textClass: "text-fuchsia-300",
  },
  support: {
    bgClass: "bg-emerald-950/60",
    borderClass: "border-emerald-700/40",
    icon: "heart-pulse",
    label: "지원",
    textClass: "text-emerald-300",
  },
};

export const TOWER_TAGS: Record<TowerType, TowerTag[]> = {
  arch: ["ramp_up", "attacker", "anti_air"],
  cannon: ["dps", "attacker", "anti_air"],
  club: ["economy"],
  lab: ["chain", "attacker", "anti_air"],
  library: ["crowd_control", "anti_air"],
  mortar: ["aoe", "attacker", "ground_only"],
  station: ["spawner", "blocker"],
};

export const TOWER_QUICK_SUMMARY: Record<TowerType, string> = {
  arch: "음파 공격이 속도를 점진적으로 올림; 공중·지상 모두 공격",
  cannon: "지상 적에게 높은 단일 대상 피해",
  club: "전투 없이 자동으로 발자국 포인트 생성",
  lab: "체인 라이트닝이 공중·지상 적 사이를 튕김",
  library: "비행 적을 포함한 사거리 내 모든 적 감속",
  mortar: "큰 폭발 반경의 느린 폭발성 포탄",
  station: "적을 물리적으로 차단하는 부대 소환",
};

// =============================================================================
// TOWER ROLE STYLES — visual styling for role badges in UI
// =============================================================================

export interface TowerRoleStyle {
  label: string;
  accent: string;
  text: string;
  bg: string;
  border: string;
  statColor: string;
}

export const TOWER_ROLE_STYLES: Record<TowerType, TowerRoleStyle> = {
  arch: {
    accent: "rgba(74,222,128,0.7)",
    bg: "rgba(20,83,45,0.35)",
    border: "rgba(22,101,52,0.3)",
    label: "점진",
    statColor: "rgb(134,239,172)",
    text: "rgb(134,239,172)",
  },
  cannon: {
    accent: "rgba(239,68,68,0.7)",
    bg: "rgba(127,29,29,0.35)",
    border: "rgba(153,27,27,0.3)",
    label: "DPS",
    statColor: "rgb(252,165,165)",
    text: "rgb(252,165,165)",
  },
  club: {
    accent: "rgba(250,204,21,0.7)",
    bg: "rgba(113,63,18,0.35)",
    border: "rgba(133,77,14,0.3)",
    label: "Econ",
    statColor: "rgb(253,224,71)",
    text: "rgb(253,224,71)",
  },
  lab: {
    accent: "rgba(56,189,248,0.7)",
    bg: "rgba(12,74,110,0.35)",
    border: "rgba(14,116,144,0.3)",
    label: "체인",
    statColor: "rgb(125,211,252)",
    text: "rgb(125,211,252)",
  },
  library: {
    accent: "rgba(168,85,247,0.7)",
    bg: "rgba(88,28,135,0.35)",
    border: "rgba(107,33,168,0.3)",
    label: "감속",
    statColor: "rgb(216,180,254)",
    text: "rgb(216,180,254)",
  },
  mortar: {
    accent: "rgba(249,115,22,0.7)",
    bg: "rgba(124,45,18,0.35)",
    border: "rgba(154,52,18,0.3)",
    label: "광역",
    statColor: "rgb(253,186,116)",
    text: "rgb(253,186,116)",
  },
  station: {
    accent: "rgba(232,121,249,0.7)",
    bg: "rgba(112,26,117,0.35)",
    border: "rgba(134,25,143,0.3)",
    label: "병사",
    statColor: "rgb(240,171,252)",
    text: "rgb(240,171,252)",
  },
};

// =============================================================================
// TOWER RENDERING COLORS
// =============================================================================

// Tower colors
export const TOWER_COLORS: Record<
  TowerType,
  {
    base: string;
    dark: string;
    accent: string;
    light: string;
    primary: string;
    secondary: string;
  }
> = {
  arch: {
    accent: "#9370db",
    base: "#6b5b4f",
    dark: "#4a3f37",
    light: "#8b7b6f",
    primary: "#6b5b4f",
    secondary: "#4a3f37",
  },
  cannon: {
    accent: "#ff6600",
    base: "#4a4a52",
    dark: "#2a2a32",
    light: "#6a6a72",
    primary: "#4a4a52",
    secondary: "#2a2a32",
  },
  club: {
    accent: "#ffd700",
    base: "#228b22",
    dark: "#145214",
    light: "#42ab42",
    primary: "#228b22",
    secondary: "#145214",
  },
  lab: {
    accent: "#00ffff",
    base: "#2d5a7b",
    dark: "#1a3a4f",
    light: "#4d7a9b",
    primary: "#2d5a7b",
    secondary: "#1a3a4f",
  },
  library: {
    accent: "#daa520",
    base: "#8b4513",
    dark: "#5c2e0d",
    light: "#a65d33",
    primary: "#8b4513",
    secondary: "#5c2e0d",
  },
  mortar: {
    accent: "#ff4400",
    base: "#7a5c3a",
    dark: "#4a3520",
    light: "#9a7c5a",
    primary: "#7a5c3a",
    secondary: "#4a3520",
  },
  station: {
    accent: "#ffffff",
    base: "#8b0000",
    dark: "#5c0000",
    light: "#ab2020",
    primary: "#8b0000",
    secondary: "#5c0000",
  },
};
