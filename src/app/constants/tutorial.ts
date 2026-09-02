import type { EnemyType, HazardType, SpecialTowerType } from "../types";

// =============================================================================
// TUTORIAL STEP DEFINITIONS
// =============================================================================

export type TutorialStepPosition =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  highlight?: "build-menu" | "hero-spell-bar" | "top-hud" | "canvas-center";
  position: TutorialStepPosition;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    description:
      "타워를 건설하고 영웅을 지휘하며 주문을 시전해 캠퍼스에 도달하려는 적 웨이브를 막아내세요.",
    id: "welcome",
    position: "center",
    title: "프린스턴 타워 디펜스에 오신 것을 환영합니다!",
  },
  {
    description:
      "빈 건설 지점에 타워를 드래그해 배치하세요. 각 타워는 고유한 태그로 역할을 표시합니다 — 공격형, 소환형, 대공 등 태그를 확인하세요.",
    highlight: "build-menu",
    id: "build-towers",
    position: "bottom-left",
    title: "타워 건설",
  },
  {
    description:
      "배치된 타워를 탭해 업그레이드하세요. 스탯을 세 단계 강화한 뒤 4레벨에서 두 가지 전문화 중 하나를 선택합니다.",
    id: "upgrade-towers",
    position: "center",
    title: "타워 업그레이드",
  },
  {
    description:
      "맵을 클릭해 영웅을 이동시키세요. 영웅은 자동으로 공격하며 특수 능력을 보유합니다. 전투 전에 하나를 선택하세요.",
    highlight: "hero-spell-bar",
    id: "move-hero",
    position: "bottom-center",
    title: "당신의 영웅",
  },
  {
    description:
      "주문은 최대 3개까지 장착할 수 있습니다. 발동에는 발톱 포인트가 필요하며 재사용 대기시간이 있습니다. 화면 하단의 주문 바를 활용하세요.",
    highlight: "hero-spell-bar",
    id: "use-spells",
    position: "bottom-center",
    title: "주문 시전",
  },
  {
    description:
      "경로 위 빛나는 버블을 탭하면 다음 웨이브를 즉시 소환할 수 있고, 카운트다운이 끝날 때까지 기다릴 수도 있습니다.",
    highlight: "canvas-center",
    id: "send-waves",
    position: "center",
    title: "웨이브 보내기",
  },
  {
    description:
      "우측 상단 톱니바퀴 아이콘에서 게임 속도, 그래픽, 오디오 및 조작 설정을 변경할 수 있습니다.",
    highlight: "top-hud",
    id: "settings",
    position: "top-right",
    title: "설정 및 조작",
  },
  {
    description:
      "F2로 게임을 일시정지하고 맵을 자유롭게 둘러보세요. 스페이스바로 스크린샷, Esc로 종료합니다.",
    highlight: "top-hud",
    id: "camera-mode",
    position: "top-right",
    title: "카메라 모드",
  },
  {
    description:
      "타워 조합을 섞고 영웅을 배치하며 주문 타이밍을 맞춰보세요. 맵마다 전혀 다른 공략이 필요합니다 — 행운을 빕니다!",
    id: "good-luck",
    position: "center",
    title: "준비 완료!",
  },
];

// =============================================================================
// ENCOUNTER DESCRIPTIONS — SPECIAL TOWERS
// =============================================================================

export interface EncounterInfo {
  name: string;
  description: string;
  category: "special_tower" | "hazard" | "enemy";
}

export const SPECIAL_TOWER_ENCOUNTERS: Record<SpecialTowerType, EncounterInfo> =
  {
    barracks: {
      category: "special_tower",
      description:
        "경로를 차단하도록 병력을 자동으로 소환하는 사전 배치된 병영입니다. " +
        "병사들은 비용 없이 싸웁니다 — 주변 타워로 지원하세요!",
      name: "병영",
    },
    beacon: {
      category: "special_tower",
      description:
        "비콘 타워는 근처 모든 타워의 사거리를 증가시킵니다. " +
        "버프를 활용하려면 타워를 근처에 배치하세요!",
      name: "비콘 타워",
    },
    chrono_relay: {
      category: "special_tower",
      description:
        "크로노 릴레이는 근처 타워의 공격 속도를 높입니다. " +
        "화력 타워를 근처에 모아 압도적인 연사 속도를 노리세요!",
      name: "크로노 릴레이",
    },
    sentinel_nexus: {
      category: "special_tower",
      description:
        "센티넬 넥서스는 지나가는 적에게 자체적으로 번개 광선을 발사합니다. " +
        "강력한 아군이니 근처에 타워를 배치해 섬멸 구역을 만들세요.",
      name: "파수 넥서스",
    },
    shrine: {
      category: "special_tower",
      description:
        "방어에 패시브 보너스를 제공하는 신비한 사당입니다. " +
        "타워 배치를 계획할 때 위치를 고려하세요.",
      name: "사당",
    },
    sunforge_orrery: {
      category: "special_tower",
      description:
        "선포지 오러리는 광역 피해를 주는 파괴적인 광선을 발사합니다. " +
        "경로에 걸린 적은 지속적인 큰 피해를 입습니다.",
      name: "태양 용광로",
    },
    vault: {
      category: "special_tower",
      description:
        "이 레벨에는 반드시 지켜야 할 금고가 있습니다! 적이 금고를 직접 공격합니다. " +
        "금고 체력이 0이 되면 패배합니다. 적이 금고에 도달하기 전에 타워로 요격하세요.",
      name: "금고",
    },
  };

// =============================================================================
// ENCOUNTER DESCRIPTIONS — HAZARDS
// =============================================================================

const HAZARD_ENCOUNTER_DATA: Partial<Record<HazardType, EncounterInfo>> = {
  deep_water: {
    category: "hazard",
    description:
      "깊은 물 지대는 지상 이동 속도를 크게 늦춥니다. " +
      "비행 적은 영향을 받지 않습니다 — 대공 방어를 준비하세요!",
    name: "깊은 물",
  },
  ice_sheet: {
    category: "hazard",
    description:
      "미끄러운 얼음 위에서는 적이 미끄러지며 빨라집니다. " +
      "빠르게 이동하는 적을 잡기 위해 얼음 근처에 가장 강력한 타워를 배치하세요.",
    name: "얼음판",
  },
  ice_spikes: {
    category: "hazard",
    description:
      "날카로운 얼음 가시가 통과하는 적에게 피해를 주고 둔화시킵니다. " +
      "천연 요충지입니다 — 타워로 보강하세요!",
    name: "얼음 가시",
  },
  lava: {
    category: "hazard",
    description:
      "녹아내린 용암이 지나가는 모든 것에 지속적인 피해를 줍니다. " +
      "영웅과 병력을 위험한 용암 흐름에서 멀리 떨어뜨리세요!",
    name: "용암",
  },
  lava_geyser: {
    category: "hazard",
    description:
      "주기적인 용암 분출이 주변의 적과 아군 모두에게 큰 피해를 줍니다. " +
      "분출 타이밍에 맞춰 병력 배치를 신중하게 조절하세요.",
    name: "용암 간헐천",
  },
  maelstrom: {
    category: "hazard",
    description:
      "반경 안의 모든 것을 끌어당기고 감속시키는 소용돌이입니다. " +
      "병력에게는 위험하지만 적을 타워 사거리 안에 묶어두기엔 좋습니다.",
    name: "소용돌이",
  },
  poison_fog: {
    category: "hazard",
    description:
      "독성 구름이 영역 안에 오래 머무는 병력과 영웅에게 지속 피해를 줍니다. " +
      "영웅을 빠르게 통과시키거나 안개를 완전히 피하세요!",
    name: "독 안개",
  },
  quicksand: {
    category: "hazard",
    description:
      "유사 지대는 통과하는 적을 둔화시키지만 병력도 느려집니다! " +
      "둔화된 적을 타워로 공략하되 영웅은 멀리 떨어뜨리세요.",
    name: "유사트",
  },
  storm_field: {
    category: "hazard",
    description:
      "주기적으로 영역 내 유닛에게 피해와 방해를 주는 갈라지는 폭풍 에너지입니다. " +
      "적과 아군 모두 영향을 받습니다!",
    name: "폭풍 지대",
  },
  swamp: {
    category: "hazard",
    description:
      "흐릿한 늪 지형이 적과 병력 모두의 지상 이동을 늦춥니다. " +
      "원거리 타워로 둔화 효과를 활용하세요.",
    name: "늪지",
  },
  volcano: {
    category: "hazard",
    description:
      "주기적으로 분출하여 넓은 지역에 불을 내리는 활화산입니다. " +
      "분출 경고에 주의하고 영웅을 재배치하세요!",
    name: "화산",
  },
};

export function getHazardEncounter(type: HazardType): EncounterInfo | null {
  return HAZARD_ENCOUNTER_DATA[type] ?? null;
}

// =============================================================================
// ENCOUNTER DESCRIPTIONS — ENEMIES
// =============================================================================

type EnemyEncounterCategory =
  | "academic"
  | "ranged"
  | "flying"
  | "boss"
  | "nature_swamp"
  | "nature_desert"
  | "nature_winter"
  | "nature_volcanic"
  | "campus"
  | "undead"
  | "special";

interface EnemyEncounterGroup {
  title: string;
  description: string;
  category: EnemyEncounterCategory;
  members: EnemyType[];
}

export const ENEMY_ENCOUNTER_GROUPS: EnemyEncounterGroup[] = [
  {
    category: "ranged",
    description:
      "이 적들은 원거리에서 타워와 병력을 공격합니다! " +
      "뒤에 머물며 방어를 갉아먹습니다. 빠른 공격의 타워나 주문으로 신속히 제거하세요.",
    members: ["archer", "mage", "catapult", "warlock", "crossbowman", "hexer"],
    title: "원거리 공격자",
  },
  {
    category: "flying",
    description:
      "비행 적은 전장을 날아다니며 지상 병력을 완전히 무시합니다. " +
      "특정 타워(아치, 연구소)와 주문만 대응할 수 있습니다. 대공 화력을 반드시 확보하세요!",
    members: ["harpy", "wyvern", "specter", "banshee"],
    title: "비행 적",
  },
  {
    category: "special",
    description:
      "버서커는 흉포한 근접 전사로, 병사들에게 막대한 피해를 입힙니다. " +
      "빠르게 이동하고 강하게 공격하니 병영에 도달하기 전에 타워 화력으로 압도하세요.",
    members: ["berserker"],
    title: "광전사",
  },
  {
    category: "boss",
    description:
      "골렘은 엄청난 체력과 두꺼운 장갑을 가진 거대 적입니다. " +
      "매우 느리지만 거의 막을 수 없습니다. 모든 화력을 집중해 쓰러뜨리세요!",
    members: ["golem"],
    title: "골렘",
  },
  {
    category: "special",
    description:
      "강령술사는 쓰러진 적을 언데드 하수인으로 되살립니다! " +
      "멈출 수 없는 좀비 군단이 모이기 전에 빠르게 처치하세요.",
    members: ["necromancer"],
    title: "강령술사",
  },
  {
    category: "special",
    description:
      "그림자 기사는 두꺼운 장갑과 파괴적인 공격을 가진 정예 전사입니다. " +
      "일시적으로 타워를 무력화할 수 있으니 한 번에 너무 많은 타워를 잃지 않도록 방어를 분산하세요.",
    members: ["shadow_knight"],
    title: "그림자 기사",
  },
  {
    category: "special",
    description:
      "광신도는 주변 적을 강화해 더 강하고 빠르게 만듭니다. " +
      "나머지 웨이브를 강화하기 전에 우선적으로 제거하세요!",
    members: ["cultist"],
    title: "광인",
  },
  {
    category: "special",
    description:
      "역병 운반자는 시간이 지남에 따라 병력에 피해를 주는 독을 퍼뜨립니다. " +
      "가능하면 영웅과 병영 병력을 안전한 거리에 두세요.",
    members: ["plaguebearer"],
    title: "역병 운반자",
  },
  {
    category: "special",
    description:
      "암살자는 빠르고 은밀하여 방어선을 빠져나갈 수 있습니다. " +
      "치명적인 피해를 주고 잡기 어렵습니다 — 둔화 타워를 활용하세요!",
    members: ["assassin"],
    title: "암살자",
  },
  {
    category: "boss",
    description:
      "드래곤이 접근 중! 이 비행 보스는 엄청난 체력을 가지고 있으며, 광역 화염 피해를 입히고, " +
      "대부분의 공격에 저항력을 가집니다. 최고의 주문과 업그레이드된 타워를 준비하세요!",
    members: ["dragon"],
    title: "드래곤",
  },
  {
    category: "boss",
    description:
      "파괴자는 게임 내 체력이 가장 높은 멈출 수 없는 공성 병기입니다. " +
      "경로의 모든 것을 짓뭉갭니다. 방어를 깊게 겹겹이 쌓으세요!",
    members: ["juggernaut"],
    title: "파괴자",
  },
  {
    category: "nature_swamp",
    description:
      "늪의 생물들이 출현했습니다! 늪 괴물, 도깨비불, 늪 트롤이 " +
      "습지 지형에서 활개칩니다. 탁한 지역에서 발동하는 고유 능력에 주의하세요.",
    members: ["bog_creature", "will_o_wisp", "swamp_troll"],
    title: "늪지 생물",
  },
  {
    category: "nature_desert",
    description:
      "사막의 적들이 다가옵니다! 유목민은 빠르고, 전갈은 맹독을 가졌으며, 풍뎅이는 떼로 몰려옵니다. " +
      "광역 타워는 무리에게 효과적입니다.",
    members: ["nomad", "scorpion", "scarab"],
    title: "사막 약탈자",
  },
  {
    category: "nature_winter",
    description:
      "한파의 적들이 도착했습니다! 눈 고블린은 빠르고, 예티는 맷집이 좋으며, " +
      "얼음 마녀는 타워를 얼릴 수 있습니다. 화염 공격이 특히 효과적입니다!",
    members: ["snow_goblin", "yeti", "ice_witch"],
    title: "겨울 군대",
  },
  {
    category: "nature_volcanic",
    description:
      "화산의 적들이 왔습니다! 마그마 스폰은 불타는 궤적을 남기고, 화염 임프는 빠르고 폭발적이며, " +
      "잿가루 수호자는 중장갑을 둘렀습니다. 둔화 효과로 제압하세요.",
    members: ["magma_spawn", "fire_imp", "ember_guard"],
    title: "화산 마귀들",
  },
  {
    category: "special",
    description:
      "가시걷이는 시간이 지나며 체력을 재생하고 근접 공격하는 병력에게 피해를 줍니다. " +
      "원거리 타워와 주문으로 안전하게 처치하세요.",
    members: ["thornwalker"],
    title: "가시걷이",
  },
  {
    category: "special",
    description:
      "모래벌레는 땅속으로 파고들어 타워 근처에서 솟아오릅니다! " +
      "경로 일부를 우회하니 방어를 더 뒤쪽에 배치하세요.",
    members: ["sandworm"],
    title: "모래벌레",
  },
  {
    category: "special",
    description:
      "서리 정령은 죽을 때 근처 타워를 얼려 일시적으로 공백을 만듭니다. " +
      "연쇄 동결을 피하려면 타워를 분산 배치하세요!",
    members: ["frostling"],
    title: "서리 정령",
  },
  {
    category: "special",
    description:
      "지옥의 적들은 주변 모든 것을 불태우는 화염에 휩싸인 악마입니다. " +
      "병력에게 광역 피해를 주고 화염 저항을 가집니다. 얼음 주문을 사용하세요!",
    members: ["infernal"],
    title: "지옥의",
  },
];

export function getEnemyEncounterGroup(
  enemyType: EnemyType
): EnemyEncounterGroup | null {
  return (
    ENEMY_ENCOUNTER_GROUPS.find((g) => g.members.includes(enemyType)) ?? null
  );
}
