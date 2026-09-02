// Princeton Tower Defense - Standardized Tower Stats
// Centralized tower statistics for damage calculations and buff application

import type { TroopType } from "../types";
import {
  LEVEL_2_RANGE_MULT,
  LEVEL_3_RANGE_MULT,
  LEVEL_4_RANGE_MULT,
} from "./combatConstants";

// ============================================================================
// TOWER STATS INTERFACES
// ============================================================================

export interface TowerBaseStats {
  damage: number;
  range: number;
  attackSpeed: number; // Milliseconds between attacks
  projectileSpeed?: number;
  splashRadius?: number;
  stunChance?: number;
  stunDuration?: number;
  slowAmount?: number; // Percentage 0-1
  slowDuration?: number;
  burnDamage?: number;
  burnDuration?: number;
  chainTargets?: number;
  chainRange?: number; // Max distance per chain hop
  crescendoMaxStacks?: number;
  crescendoSpeedMult?: number; // Per-stack cooldown multiplier (e.g. 0.92 = 8% faster)
  crescendoDamageMult?: number; // Per-stack additive damage bonus (e.g. 0.05 = +5%)
  crescendoDecayTime?: number; // Ms before stacks reset when idle
  lockOnMaxStacks?: number;
  lockOnDamageMult?: number; // Per-stack additive damage multiplier (e.g. 0.15 = +15% per stack)
  lockOnDecayTime?: number; // Ms before stacks reset when target changes or idle
  income?: number; // For economy towers
  incomeInterval?: number;
  bonusIncomeMultiplier?: number;
  damageBuff?: number; // For support towers
  rangeBuff?: number; // For support towers
  spawnTroopType?: TroopType;
  spawnInterval?: number;
  maxTroops?: number;
  specialEffect?: string;
}

export interface TowerLevelUpgrade {
  cost: number;
  description: string;
  multipliers?: {
    damage?: number;
    range?: number;
    attackSpeed?: number;
    splashRadius?: number;
    chainTargets?: number;
    income?: number;
    slowAmount?: number;
    maxTroops?: number;
  };
  overrides?: Partial<TowerBaseStats>;
}

export interface TowerUpgradePath {
  name: string;
  description: string;
  effect: string;
  stats: Partial<TowerBaseStats>;
}

export interface TowerStatsDefinition {
  name: string;
  baseStats: TowerBaseStats;
  levels: {
    1: TowerLevelUpgrade;
    2: TowerLevelUpgrade;
    3: TowerLevelUpgrade;
  };
  level4Cost: number; // Cost to upgrade to level 4
  upgrades: {
    A: TowerUpgradePath;
    B: TowerUpgradePath;
  };
}

// ============================================================================
// TOWER STATS DEFINITIONS
// ============================================================================

export const TOWER_STATS: Record<string, TowerStatsDefinition> = {
  arch: {
    baseStats: {
      attackSpeed: 700,
      crescendoDamageMult: 0.05,
      crescendoDecayTime: 2500,
      crescendoMaxStacks: 4,
      crescendoSpeedMult: 0.92,
      damage: 22,
      range: 250,
      specialEffect: "음파 크레센도 - 연속 공격 시 속도 증가",
    },
    level4Cost: 500,
    levels: {
      1: {
        cost: 110,
        description: "크레센도 - 시간이 지날수록 공격 속도 증가",
      },
      2: {
        cost: 135,
        description: "공명 - 최대 6중첩, 1.4배 피해",
        multipliers: { damage: 1.4 },
        overrides: { crescendoMaxStacks: 6 },
      },
      3: {
        cost: 225,
        description: "포르테 - 최대 8중첩, 1.8배 피해",
        multipliers: { damage: 1.8 },
        overrides: { crescendoMaxStacks: 8 },
      },
    },
    name: "블레어 아치",
    upgrades: {
      A: {
        description: "기절 효과의 크레센도 공격",
        effect: "35% 기절 확률, 최대 8 크레센도 중첩",
        name: "충격파 사이렌",
        stats: {
          crescendoDamageMult: 0.05,
          crescendoDecayTime: 2500,
          crescendoMaxStacks: 8,
          crescendoSpeedMult: 0.92,
          damage: 22 * 1.8 * 1.25,
          range: 350,
          specialEffect: "기절 크레센도",
          stunChance: 0.35,
          stunDuration: 1200,
        },
      },
      B: {
        description: "궁극의 음파 크레센도",
        effect: "강화된 스택 보너스로 최대 12중첩",
        name: "심포니 홀",
        stats: {
          crescendoDamageMult: 0.07,
          crescendoDecayTime: 3000,
          crescendoMaxStacks: 12,
          crescendoSpeedMult: 0.9,
          damage: 22 * 1.8 * 1.1,
          range: 370,
          specialEffect: "궁극의 크레센도",
        },
      },
    },
  },

  cannon: {
    baseStats: {
      attackSpeed: 1200,
      damage: 50,
      projectileSpeed: 800,
      range: 240,
      specialEffect: "지상 적에 대한 중포병 사격",
      splashRadius: 0,
    },
    level4Cost: 400,
    levels: {
      1: {
        cost: 120,
        description: "기본 캐논 - 단발 포격",
      },
      2: {
        cost: 140,
        description: "강화 캐논 - 더 큰 구경",
        multipliers: { damage: 1.5 },
      },
      3: {
        cost: 220,
        description: "중형 캐논 - 안정화된 포신",
        multipliers: { attackSpeed: 0.75, damage: 2.2 },
      },
    },
    name: "나소 캐논",
    upgrades: {
      A: {
        description: "빠르게 발사하는 기관총",
        effect: "공격 속도 8배, 발당 피해 0.4배",
        name: "개틀링",
        stats: {
          damage: 50 * 2.2 * 0.4,
          range: 360, // 1.5x base range for level 4
          attackSpeed: 150,
          specialEffect: "속사 제압",
        },
      },
      B: {
        description: "지속적인 화염 사격",
        effect: "시간이 지남에 따라 적에게 화상 피해",
        name: "화염방사기",
        stats: {
          damage: 50 * 2.2 * 0.3,
          range: 300, // Shorter range but burns
          attackSpeed: 100,
          burnDamage: 15,
          burnDuration: 3000,
          specialEffect: "적에게 화상 부여",
        },
      },
    },
  },

  club: {
    baseStats: {
      attackSpeed: 0,
      damage: 0,
      income: 8,
      incomeInterval: 8000,
      range: 0,
      specialEffect: "시간이 지남에 따라 발자국 포인트 생성",
    },
    level4Cost: 550,
    levels: {
      1: {
        cost: 150,
        description: "기본 클럽 - 8초마다 8 PP",
      },
      2: {
        cost: 200,
        description: "인기 클럽 - 7초마다 12 PP",
        overrides: { income: 12, incomeInterval: 7000 },
      },
      3: {
        cost: 325,
        description: "그랜드 클럽 - 6초마다 20 PP",
        overrides: {
          income: 20,
          incomeInterval: 6000,
        },
      },
    },
    name: "이팅 클럽",
    upgrades: {
      A: {
        description: "최대 수동 수입",
        effect: "5초마다 40 PP + 추가 수입 10% + 사거리 오라 15%",
        name: "투자 은행",
        stats: {
          bonusIncomeMultiplier: 0.1,
          income: 40,
          incomeInterval: 5000,
          range: 200,
          rangeBuff: 0.15,
          specialEffect: "전반적인 수입 증가 + 사거리 오라",
        },
      },
      B: {
        description: "수입 + 타워 지원",
        effect: "6초마다 20 PP + 주변 타워 피해 15% 증가",
        name: "모집 센터",
        stats: {
          damageBuff: 0.15,
          income: 20,
          incomeInterval: 6000,
          range: 200,
          specialEffect: "피해 오라",
        },
      },
    },
  },

  lab: {
    baseStats: {
      attackSpeed: 800,
      chainRange: 150,
      chainTargets: 3,
      damage: 35,
      range: 200,
      specialEffect: "적 사이를 튕기는 체인 라이트닝",
    },
    level4Cost: 450,
    levels: {
      1: {
        cost: 100,
        description: "테슬라 충격기 - 3명의 적에게 연쇄",
      },
      2: {
        cost: 150,
        description: "강화 충격기 - 4명의 적에게 연쇄, 1.5배 피해",
        multipliers: { damage: 1.5 },
        overrides: { chainTargets: 4 },
      },
      3: {
        cost: 250,
        description: "테슬라 코일 - 5명의 적에게 연쇄, 2배 피해",
        multipliers: { damage: 2 },
        overrides: { chainTargets: 5 },
      },
    },
    name: "이쿼드 연구소",
    upgrades: {
      A: {
        description: "집중 레이저 공격",
        effect: "연속 락온, 시간이 지날수록 피해 증가",
        name: "집중 빔",
        stats: {
          attackSpeed: 100,
          chainTargets: 1,
          damage: 35 * 2 * 1.3 * 0.15,
          lockOnDamageMult: 0.045,
          lockOnDecayTime: 600,
          lockOnMaxStacks: 120,
          range: 320,
          specialEffect: "락온 피해 증가",
        },
      },
      B: {
        description: "다중 대상 전기 공격",
        effect: "최대 8명의 적에게 연쇄",
        name: "체인 라이트닝",
        stats: {
          chainRange: 180,
          chainTargets: 8,
          damage: 35 * 2 * 1.3 * 0.7,
          range: 300,
          specialEffect: "튕기는 번개",
        },
      },
    },
  },

  library: {
    baseStats: {
      attackSpeed: 0,
      damage: 0,
      range: 220,
      slowAmount: 0.2,
      slowDuration: 1000,
      specialEffect: "고대 지식으로 적을 감속",
    },
    level4Cost: 600,
    levels: {
      1: {
        cost: 150,
        description: "기본 감속 - 20% 감속 필드",
      },
      2: {
        cost: 175,
        description: "강화 감속 - 30% 감속 필드",
        overrides: { slowAmount: 0.3 },
      },
      3: {
        cost: 275,
        description: "비전 도서관 - 40% 감속 + 마법 피해",
        overrides: { attackSpeed: 500, damage: 30, slowAmount: 0.4 },
      },
    },
    name: "파이어스톤 도서관",
    upgrades: {
      A: {
        description: "지진파로 피해와 감속",
        effect: "광역 피해 35 + 45% 감속",
        name: "이쿼드 분쇄기",
        stats: {
          damage: 35,
          range: 330, // 1.5x base range for level 4
          slowAmount: 0.45,
          attackSpeed: 500,
          splashRadius: 80,
          specialEffect: "대지를 뒤흔드는 광역 공격",
        },
      },
      B: {
        description: "적을 완전히 빙결",
        effect: "45% 감속 + 2초마다 25% 빙결 확률",
        name: "블리자드",
        stats: {
          range: 385, // 1.75x base range - wide freeze area
          slowAmount: 0.45,
          attackSpeed: 1000,
          stunDuration: 2000,
          stunChance: 0.25, // 25% chance every 2 seconds
          specialEffect: "적을 얼려 굳힘",
        },
      },
    },
  },

  mortar: {
    baseStats: {
      attackSpeed: 3000,
      damage: 48,
      projectileSpeed: 400,
      range: 300,
      specialEffect: "높은 각도로 폭발성 포탄 발사",
      splashRadius: 100,
    },
    level4Cost: 500,
    levels: {
      1: {
        cost: 160,
        description: "기본 박격포 - 광역 폭발 포탄",
      },
      2: {
        cost: 200,
        description: "강화 박격포 - 더 큰 장약, 더 넓은 폭발",
        multipliers: { damage: 1.5, splashRadius: 1.3 },
      },
      3: {
        cost: 300,
        description: "공성 박격포 - 대형 무기, 대규모 광역",
        multipliers: { damage: 2, splashRadius: 1.6 },
      },
    },
    name: "팔머 박격포",
    upgrades: {
      A: {
        description: "선택한 지역에 대한 표적 미사일 타격",
        effect: "파괴적인 미사일 포격을 위해 지역을 클릭해 표적",
        name: "미사일 배터리",
        stats: {
          attackSpeed: 4000,
          damage: 48 * 2 * 1.5,
          range: 400,
          specialEffect: "선택한 지역에 대한 표적 미사일 타격",
          splashRadius: 150,
        },
      },
      B: {
        description: "전장에 타오르는 잿불을 비처럼 내림",
        effect: "지속 피해를 주는 타오르는 잿불 더미를 흩뿌림",
        name: "잿불 용광로",
        stats: {
          attackSpeed: 2500,
          burnDamage: 25,
          burnDuration: 4000,
          damage: 48 * 2 * 0.4,
          range: 350,
          specialEffect: "불타는 잿불 지대 생성",
          splashRadius: 170,
        },
      },
    },
  },
  station: {
    baseStats: {
      attackSpeed: 0,
      damage: 0,
      maxTroops: 1,
      range: 0,
      spawnInterval: 5000,
      spawnTroopType: "footsoldier",
      specialEffect: "적을 막기 위해 병사 소환",
    },
    level4Cost: 500,
    levels: {
      1: {
        cost: 200,
        description: "보병 - 기본 보병 유닛",
        overrides: { maxTroops: 1, spawnTroopType: "footsoldier" },
      },
      2: {
        cost: 250,
        description: "장갑 보병 - 장갑 장착",
        overrides: { maxTroops: 2, spawnTroopType: "armored" },
      },
      3: {
        cost: 350,
        description: "정예 근위대 - 할버드를 든 왕실 전사",
        overrides: { maxTroops: 3, spawnTroopType: "elite" },
      },
    },
    name: "딩키 정거장",
    upgrades: {
      A: {
        description: "반인반마 전사",
        effect: "원거리 공격을 하는 켄타우로스 부대 소환",
        name: "켄타우로스 마구간",
        stats: {
          maxTroops: 3,
          spawnInterval: 4000,
          spawnTroopType: "centaur",
        },
      },
      B: {
        description: "군마 위의 기마 기사",
        effect: "돌격 능력이 있는 탱커 기병 소환",
        name: "로열 기병",
        stats: {
          maxTroops: 3,
          spawnInterval: 6000,
          spawnTroopType: "cavalry",
        },
      },
    },
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calculate the effective stats for a tower at a given level and upgrade path
 */
export function calculateTowerStats(
  towerType: string,
  level: number,
  upgrade?: "A" | "B",
  rangeBoost: number = 1,
  damageBoost: number = 1
): TowerBaseStats {
  const towerDef = TOWER_STATS[towerType];
  if (!towerDef) {
    throw new Error(`Unknown tower type: ${towerType}`);
  }

  // Start with base stats
  let stats = { ...towerDef.baseStats };

  // Apply level multipliers and overrides for levels 1-3
  for (let l = 1; l <= Math.min(level, 3); l++) {
    const levelData = towerDef.levels[l as 1 | 2 | 3];

    if (levelData.multipliers) {
      if (levelData.multipliers.damage !== undefined) {
        stats.damage = towerDef.baseStats.damage * levelData.multipliers.damage;
      }
      if (levelData.multipliers.range !== undefined) {
        stats.range = towerDef.baseStats.range * levelData.multipliers.range;
      }
      if (levelData.multipliers.attackSpeed !== undefined) {
        stats.attackSpeed =
          towerDef.baseStats.attackSpeed * levelData.multipliers.attackSpeed;
      }
      if (levelData.multipliers.splashRadius !== undefined) {
        stats.splashRadius =
          (towerDef.baseStats.splashRadius || 0) *
          levelData.multipliers.splashRadius;
      }
      if (levelData.multipliers.chainTargets !== undefined) {
        stats.chainTargets =
          (towerDef.baseStats.chainTargets || 1) *
          levelData.multipliers.chainTargets;
      }
      if (levelData.multipliers.income !== undefined) {
        stats.income =
          (towerDef.baseStats.income || 0) * levelData.multipliers.income;
      }
      if (levelData.multipliers.slowAmount !== undefined) {
        stats.slowAmount =
          (towerDef.baseStats.slowAmount || 0) *
          levelData.multipliers.slowAmount;
      }
      if (levelData.multipliers.maxTroops !== undefined) {
        stats.maxTroops =
          (towerDef.baseStats.maxTroops || 1) * levelData.multipliers.maxTroops;
      }
    }

    if (levelData.overrides) {
      stats = { ...stats, ...levelData.overrides };
    }
  }

  // Apply level-based range bonuses (standard across all towers)
  if (level === 2) {
    stats.range = towerDef.baseStats.range * LEVEL_2_RANGE_MULT;
  }
  if (level === 3) {
    stats.range = towerDef.baseStats.range * LEVEL_3_RANGE_MULT;
  }

  // Apply upgrade path stats if at level 4 (upgrade selected)
  if (level >= 4 && upgrade) {
    const upgradePath = towerDef.upgrades[upgrade];
    if (upgradePath) {
      stats = { ...stats, ...upgradePath.stats };
    }
    if (upgradePath && upgradePath.stats?.range === undefined) {
      stats.range = towerDef.baseStats.range * LEVEL_4_RANGE_MULT;
    }
  }

  // Apply external buffs
  stats.range *= rangeBoost;
  stats.damage *= damageBoost;

  return stats;
}

/**
 * Get the cost to upgrade a tower to the next level
 */
export function getUpgradeCost(
  towerType: string,
  currentLevel: number,
  _upgrade?: "A" | "B"
): number {
  const towerDef = TOWER_STATS[towerType];
  if (!towerDef) {
    return 0;
  }

  if (currentLevel < 3) {
    const nextLevel = (currentLevel + 1) as 1 | 2 | 3;
    return towerDef.levels[nextLevel]?.cost || 0;
  }

  // Level 4 upgrade cost from tower definition
  return towerDef.level4Cost;
}

/**
 * Get the level 4 upgrade cost for a specific tower type
 */
export function getLevel4Cost(towerType: string): number {
  const towerDef = TOWER_STATS[towerType];
  if (!towerDef) {
    return 400;
  } // Default fallback
  return towerDef.level4Cost;
}

/**
 * Get the description for a tower at a given level
 */
export function getLevelDescription(
  towerType: string,
  level: number,
  upgrade?: "A" | "B"
): string {
  const towerDef = TOWER_STATS[towerType];
  if (!towerDef) {
    return "";
  }

  if (level <= 3) {
    return towerDef.levels[level as 1 | 2 | 3]?.description || "";
  }

  if (upgrade) {
    return towerDef.upgrades[upgrade]?.description || "";
  }

  return "";
}

/**
 * Get upgrade path information
 */
export function getUpgradePath(
  towerType: string,
  path: "A" | "B"
): TowerUpgradePath | null {
  const towerDef = TOWER_STATS[towerType];
  if (!towerDef) {
    return null;
  }

  return towerDef.upgrades[path] || null;
}

/**
 * Get the effective range for a tower at a given level and upgrade path
 */
export function getTowerRange(
  towerType: string,
  level: number,
  upgrade?: "A" | "B",
  rangeBoost: number = 1
): number {
  const towerDef = TOWER_STATS[towerType];
  if (!towerDef) {
    return 0;
  }

  let { range } = towerDef.baseStats;

  // Apply level range bonuses
  if (level === 2) {
    range *= 1.15;
  }
  if (level === 3) {
    if (towerType === "library" && upgrade === "B") {
      range *= 1.5;
    } else {
      range *= 1.25;
    }
  }

  // Level 4 uses the range from upgrade paths if specified
  if (level >= 4 && upgrade) {
    const upgradePath = towerDef.upgrades[upgrade];
    if (upgradePath?.stats?.range !== undefined) {
      ({ range } = upgradePath.stats);
    } else {
      // Fallback: 1.5x base range if no specific range defined
      range = towerDef.baseStats.range * 1.5;
    }
  }

  // Apply external range buff
  return range * rangeBoost;
}
