import {
  ChessRook,
  GitBranch,
  MousePointer2,
  Route,
  Sword,
  User,
} from "lucide-react";

import {
  ENEMY_DATA,
  GRID_HEIGHT,
  GRID_WIDTH,
  LEVEL_DATA,
  MAP_PATHS,
} from "../../constants";
import type { CustomSpecialTowerConfig } from "../../customLevels/types";
import type {
  DecorationCategory,
  EnemyType,
  HazardType,
  MapDecoration,
  MapHazard,
  MapTheme,
  SpecialTowerType,
  TowerType,
} from "../../types";
import { LANDMARK_DECORATION_TYPES } from "../../utils";
import { WORLD_LEVELS } from "../menus/world-map/worldMapData";
import type {
  GridPoint,
  MapPresetTemplate,
  ObjectiveTypeStats,
  ToolOption,
} from "./types";

export const THEME_OPTIONS: MapTheme[] = [
  "grassland",
  "swamp",
  "desert",
  "winter",
  "volcanic",
];

export const SPECIAL_TOWER_TYPES: SpecialTowerType[] = [
  "beacon",
  "shrine",
  "vault",
  "barracks",
  "chrono_relay",
  "sentinel_nexus",
  "sunforge_orrery",
];

export const OBJECTIVE_TYPE_STATS: Record<
  SpecialTowerType,
  ObjectiveTypeStats
> = {
  barracks: {
    effect: "시간이 지나며 아군 병력을 생성합니다.",
    risk: "이를 잃으면 증원 압력이 줄어듭니다.",
    title: "Barracks",
  },
  beacon: {
    effect: "주변 수비대에 버프 오라를 부여합니다.",
    risk: "적이 돌파하면 목표가 함락됩니다.",
    title: "Beacon",
  },
  chrono_relay: {
    effect: "주변 타워의 공격 속도를 증가시킵니다.",
    risk: "이를 잃으면 해당 구역의 DPS 템포가 느려집니다.",
    title: "Arcane Time Crystal",
  },
  sentinel_nexus: {
    effect: "10초마다 잠긴 대상을 벼락으로 강타합니다.",
    risk: "이를 잃으면 통제 가능한 맵 압력이 사라집니다.",
    title: "Imperial Sentinel",
  },
  shrine: {
    effect: "아군에게 주기적인 치유 펄스를 제공합니다.",
    risk: "이를 잃으면 지속력 템포가 사라집니다.",
    title: "Shrine",
  },
  sunforge_orrery: {
    effect: "삼중 플라즈마 연사가 밀집한 적 무리를 강타합니다.",
    risk: "긴 템포 덕분에 신중한 타이밍 설계가 보상받습니다.",
    title: "태양 용광로",
  },
  vault: {
    effect: "체력이 있어 직접 파괴될 수 있습니다.",
    risk: "체력이 0이 되면 목표가 실패합니다.",
    title: "금고",
  },
};

export const DECORATION_OPTIONS_BY_THEME: Record<
  MapTheme,
  DecorationCategory[]
> = {
  desert: [
    "palm",
    "cactus",
    "dune",
    "skull",
    "pottery",
    "oasis_pool",
    "pyramid",
    "obelisk",
    "sphinx",
    "hieroglyph_wall",
    "treasure_chest",
    "skeleton",
    "torch",
    "temple_entrance",
    "sarcophagus",
    "cobra_statue",
    "sand_pile",
    "idol_statue",
  ],
  grassland: [
    "tree",
    "bush",
    "rock",
    "flowers",
    "statue",
    "bench",
    "fence",
    "lamppost",
    "fountain",
    "hedge",
    "dock",
    "boat",
    "reeds",
    "campfire",
    "gate",
    "flag",
    "signpost",
    "ruins",
    "water",
    "idol_statue",
  ],
  swamp: [
    "swamp_tree",
    "fog_patch",
    "broken_bridge",
    "witch_cottage",
    "cauldron",
    "tombstone",
    "glowing_runes",
    "hanging_cage",
    "poison_pool",
    "ruined_temple",
    "sunken_pillar",
    "idol_statue",
    "algae_pool",
    "tentacle",
    "skeleton_pile",
    "treasure_hoard",
    "deep_water",
  ],
  volcanic: [
    "lava_pool",
    "obsidian_spike",
    "magma_vent",
    "charred_tree",
    "skull_pile",
    "ember_rock",
    "volcano_rim",
    "lava_fall",
    "obsidian_pillar",
    "fire_crystal",
    "dead_adventurer",
    "broken_weapon",
    "obsidian_castle",
    "dark_throne",
    "dark_barracks",
    "dark_spire",
    "demon_statue",
    "lava_moat",
    "skull_throne",
    "fire_pit",
    "battle_standard",
    "idol_statue",
  ],
  winter: [
    "pine_tree",
    "snowman",
    "ice_crystal",
    "frozen_pond",
    "snow_pile",
    "icicles",
    "glacier",
    "fortress",
    "frozen_gate",
    "broken_wall",
    "frozen_soldier",
    "battle_crater",
    "ice_spire",
    "ice_throne",
    "ice_bridge",
    "frozen_waterfall",
    "aurora_crystal",
    "snow_drift",
    "snow_lantern",
    "idol_statue",
  ],
};

export const UNIVERSAL_DECORATIONS: DecorationCategory[] = [
  "cart",
  "tent",
  "campfire",
  "fishing_spot",
  "gate",
  "flag",
  "bones",
  "candles",
  "ritual_circle",
  "ember",
];

export const HAZARD_OPTIONS_BY_THEME: Record<MapTheme, HazardType[]> = {
  desert: [
    "quicksand",
    "storm_field",
    "lava_geyser",
    "fire",
    "lava",
    "lightning",
  ],
  grassland: ["poison_fog", "deep_water", "storm_field", "poison", "swamp"],
  swamp: ["poison_fog", "deep_water", "maelstrom", "poison", "swamp", "void"],
  volcanic: [
    "lava_geyser",
    "storm_field",
    "quicksand",
    "lava",
    "fire",
    "volcano",
  ],
  winter: ["ice_sheet", "ice_spikes", "storm_field", "slippery_ice", "ice"],
};

export const ALL_HAZARD_OPTIONS: HazardType[] = [
  "poison_fog",
  "deep_water",
  "maelstrom",
  "storm_field",
  "quicksand",
  "ice_sheet",
  "ice_spikes",
  "lava_geyser",
  "slippery_ice",
  "lava",
  "swamp",
  "ice",
  "poison",
  "fire",
  "lightning",
  "void",
  "volcano",
];

export const TOWER_TYPE_OPTIONS: TowerType[] = [
  "cannon",
  "library",
  "lab",
  "arch",
  "club",
  "station",
  "mortar",
];

export const TOWER_DISPLAY_NAMES: Record<TowerType, string> = {
  arch: "블레어 아치",
  cannon: "나소 캐논",
  club: "이팅 클럽",
  lab: "이쿼드 연구소",
  library: "파이어스톤 도서관",
  mortar: "팔머 박격포",
  station: "딩키 정거장",
};

export const LANDMARK_OPTIONS = [
  ...LANDMARK_DECORATION_TYPES,
] as DecorationCategory[];

export const CHALLENGE_DECORATIONS: DecorationCategory[] = [
  "cannon_crest",
  "ivy_crossroads",
  "blight_basin",
  "triad_keep",
  "sunscorch_labyrinth",
  "frist_outpost",
  "ashen_spiral",
];

export const ENEMY_OPTIONS = Object.keys(ENEMY_DATA) as EnemyType[];

export const DEFAULT_PRESET_ID = "default";

export const TOOL_OPTIONS: ToolOption[] = [
  { icon: MousePointer2, key: "select", label: "선택" },
  { icon: Route, key: "path_primary", label: "Path A" },
  { icon: GitBranch, key: "path_secondary", label: "Path B" },
  { icon: User, key: "hero_spawn", label: "영웅" },
];

export const TOOL_HINTS: Record<string, string> = {
  decoration: "클릭 또는 드롭으로 장식을 배치합니다.",
  erase: "아이템을 클릭해 지웁니다.",
  hazard: "클릭 또는 드롭으로 위험 지대를 배치합니다.",
  hero_spawn: "타일을 클릭해 영웅 소환 지점을 배치합니다.",
  landmark: "클릭 또는 드롭으로 지형지물을 배치합니다.",
  path_primary: "클릭해 주 경로에 노드를 이어 붙입니다.",
  path_secondary: "클릭해 보조 경로에 노드를 이어 붙입니다.",
  select: "기존 노드/아이템을 선택해 드래그합니다.",
  special_tower: "클릭 또는 드롭으로 목표물을 배치합니다.",
  tower: "클릭 또는 드롭으로 사전 배치 타워를 설치합니다.",
};

const clonePath = (
  points: { x: number; y: number }[] | undefined
): GridPoint[] | undefined =>
  points && points.length >= 2
    ? points.map((p) => ({ x: p.x, y: p.y }))
    : undefined;

const cloneDecorations = (
  decorations: MapDecoration[] | undefined
): MapDecoration[] =>
  (decorations ?? []).map((deco) => ({
    ...deco,
    pos: { ...deco.pos },
  }));

const cloneHazards = (hazards: MapHazard[] | undefined): MapHazard[] =>
  (hazards ?? []).map((hazard) => ({
    ...hazard,
    gridPos: hazard.gridPos ? { ...hazard.gridPos } : hazard.gridPos,
    pos: hazard.pos ? { ...(hazard.pos as GridPoint) } : hazard.pos,
  }));

const collectSpecialTowers = (
  levelData: (typeof LEVEL_DATA)[string] | undefined
): CustomSpecialTowerConfig[] => {
  if (!levelData) {
    return [];
  }
  if (levelData.specialTowers && levelData.specialTowers.length > 0) {
    return levelData.specialTowers.map((st) => ({
      hp: st.hp,
      pos: { ...st.pos },
      type: st.type,
    }));
  }
  if (levelData.specialTower) {
    return [
      {
        hp: levelData.specialTower.hp,
        pos: { ...levelData.specialTower.pos },
        type: levelData.specialTower.type,
      },
    ];
  }
  return [];
};

export const MAP_PRESET_TEMPLATES: MapPresetTemplate[] = [
  {
    decorations: [],
    description: "비어 있는 샌드박스 프리셋입니다.",
    hazards: [],
    id: DEFAULT_PRESET_ID,
    label: "기본",
    specialTowers: [],
  },
  ...WORLD_LEVELS.map((level) => {
    const levelData = LEVEL_DATA[level.id];
    const secondaryPathKey = levelData?.secondaryPath ?? `${level.id}_b`;
    return {
      decorations: cloneDecorations(levelData?.decorations),
      description: levelData?.description ?? level.description,
      difficulty: levelData?.difficulty ?? level.difficulty,
      hazards: cloneHazards(levelData?.hazards),
      heroSpawn: levelData?.heroSpawn
        ? { x: levelData.heroSpawn.x, y: levelData.heroSpawn.y }
        : undefined,
      id: level.id,
      label: levelData?.name ?? level.name,
      primaryPath: clonePath(MAP_PATHS[level.id]),
      secondaryPath: clonePath(MAP_PATHS[secondaryPathKey]),
      specialTowers: collectSpecialTowers(levelData),
      startingPawPoints: levelData?.startingPawPoints,
      theme: levelData?.theme ?? level.region,
    };
  }),
];
