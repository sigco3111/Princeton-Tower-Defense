import { GRID_HEIGHT, GRID_WIDTH } from "../../../constants";
import type { GridPoint } from "../types";

export const PATH_MARGIN_TILES = 4;

export const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

export const normalizeMapPoint = (point: GridPoint): GridPoint => ({
  x: clamp(Math.round(point.x), 0, GRID_WIDTH - 1),
  y: clamp(Math.round(point.y), 0, GRID_HEIGHT - 1),
});

export const normalizePathPoint = (point: GridPoint): GridPoint => ({
  x: clamp(
    Math.round(point.x),
    -PATH_MARGIN_TILES,
    GRID_WIDTH - 1 + PATH_MARGIN_TILES
  ),
  y: clamp(
    Math.round(point.y),
    -PATH_MARGIN_TILES,
    GRID_HEIGHT - 1 + PATH_MARGIN_TILES
  ),
});

export const isInsideMap = (point: GridPoint): boolean =>
  point.x >= 0 &&
  point.x <= GRID_WIDTH - 1 &&
  point.y >= 0 &&
  point.y <= GRID_HEIGHT - 1;

export const samePoint = (a: GridPoint | null, b: GridPoint | null): boolean =>
  Boolean(a && b && a.x === b.x && a.y === b.y);

export const formatPointLabel = (point: GridPoint | null): string =>
  point ? `(${point.x},${point.y})` : "(--,--)";

const ASSET_NAME_KO: Record<string, string> = {
  // Common / universal
  algae_pool: "조류 연못",
  aurora_crystal: "오로라 크리스탈",
  battle_crater: "전투 분화구",
  battle_standard: "전투 깃발",
  bench: "벤치",
  boat: "보트",
  bones: "뼈",
  broken_wall: "무너진 벽",
  broken_weapon: "부서진 무기",
  bush: "덤불",
  campfire: "모닥불",
  candles: "촛불",
  cart: "수레",
  cactus: "선인장",
  charred_tree: "그을린 나무",
  cobra_statue: "코브라 조각상",
  dark_barracks: "어둠의 병영",
  dark_spire: "어둠의 첨탑",
  dark_throne: "어둠의 왕좌",
  dead_adventurer: "죽은 모험가",
  deep_water: "깊은 물",
  demon_statue: "악마 조각상",
  dock: "선착장",
  dune: "모래 언덕",
  ember: "잔불",
  ember_rock: "불씨 바위",
  fence: "울타리",
  fire_crystal: "불의 수정",
  fire_pit: "화덕",
  fishing_spot: "낚시터",
  flag: "깃발",
  flowers: "꽃",
  fog_patch: "안개 지대",
  fountain: "분수",
  frozen_gate: "얼어붙은 관문",
  frozen_pond: "얼어붙은 연못",
  frozen_soldier: "얼어붙은 병사",
  frozen_waterfall: "얼어붙은 폭포",
  fortress: "요새",
  gate: "관문",
  glacier: "빙하",
  glowing_runes: "빛나는 룬",
  hanging_cage: "매달린 우리",
  hedge: "생울타리",
  hieroglyph_wall: "상형문자 벽",
  ice_bridge: "얼음 다리",
  ice_crystal: "얼음 수정",
  ice_spire: "얼음 첨탑",
  ice_throne: "얼음 왕좌",
  icicles: "고드름",
  idol_statue: "우상 조각상",
  lamppost: "가로등",
  lava_fall: "용암 폭포",
  lava_moat: "용암 해자",
  lava_pool: "용암 웅덩이",
  magma_vent: "마그마 분출구",
  oasis_pool: "오아시스 연못",
  obelisk: "오벨리스크",
  obsidian_castle: "흑요석 성",
  obsidian_pillar: "흑요석 기둥",
  obsidian_spike: "흑요석 가시",
  palm: "야자수",
  pine: "소나무",
  pine_tree: "소나무",
  poison_pool: "독 웅덩이",
  pottery: "도자기",
  pyramid: "피라미드",
  reeds: "갈대",
  ritual_circle: "의식 마법진",
  rock: "바위",
  ruins: "폐허",
  ruined_temple: "폐허 사원",
  sand_pile: "모래 더미",
  sarcophagus: "석관",
  signpost: "표지판",
  skeleton: "해골",
  skeleton_pile: "해골 더미",
  skull: "해골",
  skull_pile: "해골 더미",
  skull_throne: "해골 왕좌",
  snow_drift: "눈더미",
  snow_lantern: "눈 등불",
  snow_pile: "눈 더미",
  snowman: "눈사람",
  sphinx: "스핑크스",
  statue: "조각상",
  sunken_pillar: "가라앉은 기둥",
  swamp_tree: "늪지 나무",
  tent: "천막",
  tentacle: "촉수",
  tombstone: "묘비",
  treasure_chest: "보물 상자",
  treasure_hoard: "보물 더미",
  tree: "나무",
  volcano_rim: "화산 분화구",
  water: "물",
  witch_cottage: "마녀의 오두막",
  // Themes
  desert: "사막",
  grassland: "초원",
  swamp: "늪지",
  volcanic: "화산",
  winter: "겨울",
};

export const formatAssetName = (value: string): string =>
  ASSET_NAME_KO[value] ??
  ASSET_NAME_KO[value.toLowerCase()] ??
  value.replaceAll("_", " ").replaceAll(/\b\w/g, (char) => char.toUpperCase());

export const distanceSq = (a: GridPoint, b: GridPoint): number => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
};
