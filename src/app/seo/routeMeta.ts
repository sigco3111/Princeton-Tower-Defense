import type { Metadata } from "next";

import { WORLD_LEVELS } from "../components/menus/world-map/worldMapData";
import { parseRoute } from "../constants/routes";
import { SITE_URL, SITE_NAME } from "./constants";

/**
 * Bump whenever the OG renderer layout changes. Appended to every OG image
 * URL so Vercel's edge cache + external social-platform unfurl caches see a
 * new key and re-fetch the freshly-rendered image. Without this the old
 * layout can stick around for days on Slack / iMessage / Twitter / etc.
 * even after a deploy.
 */
const OG_VERSION = "2";

const HOME_OG = {
  alt: "프린스턴 타워 디펜스 - 26개 레벨, 9명 영웅, 100종 이상의 적을 갖춘 무료 브라우저 타워 디펜스 게임",
  height: 630,
  type: "image/png",
  url: `/og.png?v=${OG_VERSION}`,
  width: 1200,
} as const;

function buildLevelOgImage(level: { id: string; name: string }) {
  return {
    alt: `${level.name} — level preview in ${SITE_NAME}`,
    height: 630,
    type: "image/png",
    url: `/og.png?level=${encodeURIComponent(level.id)}&v=${OG_VERSION}`,
    width: 1200,
  } as const;
}

const REGION_LABEL: Record<string, string> = {
  desert: "사하라 모래",
  grassland: "프린스턴 캠퍼스",
  swamp: "음울한 습지",
  volcanic: "화산 심연",
  winter: "얼어붙은 변경",
};

const DIFFICULTY_LABEL: Record<number, string> = {
  1: "쉬움",
  2: "중간",
  3: "어려움",
};

const KIND_LABEL: Record<string, string> = {
  campaign: "캠페인",
  challenge: "Challenge Map",
  sandbox: "샌드박스 모드",
};

const CODEX_TAB_META: Record<string, { title: string; description: string }> = {
  enemies: {
    description:
      "Explore the full bestiary of 100+ enemies across 5 regions: melee, ranged, flying, shielded, boss, and swarm types. Learn their abilities and weaknesses.",
    title: "적 도감 - 100종 이상의 적 & 보스",
  },
  guide: {
    description:
      "Complete strategy guide for Princeton Tower Defense. Learn tower placement, hero deployment, spell timing, wave management, and upgrade priorities for every region.",
    title: "전략 가이드 - 팁, 메커니즘 & 공략",
  },
  hazards: {
    description:
      "Learn about environmental hazards across all 5 regions: lava geysers, poison fog, quicksand, blizzard zones, and more. Strategy tips for hazard-heavy maps.",
    title: "환경 위험 가이드 - 용암, 소택지, 블리자드 등",
  },
  heroes: {
    description:
      "Meet all 9 heroes: Princeton Tiger, Mathey Knight, Acapella Tenor, Rocky Raccoon, F. Scott, General Mercer, BSE Engineer, Nassau Phoenix, and Ivy Warden. View abilities, stats, and roles.",
    title: "영웅 도감 - 모든 9명의 영웅 & 능력",
  },
  special_towers: {
    description:
      "Discover special objective structures in Princeton Tower Defense: beacons, shrines, vaults, and barracks. Learn how to capture and defend them on each map.",
    title: "특수 타워 - 비콘, 신전, 금고 & 병영",
  },
  spells: {
    description:
      "Master all 6 spells: Fireball, Lightning, Freeze, Hex Ward, Payday, and Reinforcements. View upgrade trees, cooldowns, damage, and area of effect.",
    title: "주문 도감 - 모든 주문 & 업그레이드 트리",
  },
  towers: {
    description:
      "Browse every tower in Princeton Tower Defense: Nassau Cannon, Firestone Library, E-Quad Lab, Blair Arch, Eating Club, Dinky Station, and Palmer Mortar. Each with dual upgrade paths, stats, and strategy tips.",
    title: "타워 도감 - 모든 7개 타워 & 업그레이드 경로",
  },
};

function getLevelMeta(levelId: string): Metadata | null {
  const level = WORLD_LEVELS.find((l) => l.id === levelId);
  if (!level) {
    return null;
  }

  const region = REGION_LABEL[level.region] ?? level.region;
  const difficulty = DIFFICULTY_LABEL[level.difficulty] ?? "보통";
  const kind = KIND_LABEL[level.kind ?? "campaign"] ?? "캠페인";
  const cleanDesc = level.description.replaceAll("\n", " ");
  const tags = level.tags.join(", ");
  const canonical = `${SITE_URL}/${level.id}`;

  const title = `Play ${level.name} — ${region} ${kind} | ${SITE_NAME}`;
  const description =
    `Play ${level.name} in Princeton Tower Defense — a ${difficulty.toLowerCase()} ${kind.toLowerCase()} level in the ${region} region. ` +
    `${cleanDesc} Tags: ${tags}. Build towers, summon heroes, and cast spells to survive every wave. Share this link to let anyone try this level!`;

  const ogImage = buildLevelOgImage(level);

  return {
    alternates: { canonical },
    description,
    openGraph: {
      description,
      images: [ogImage],
      siteName: SITE_NAME,
      title,
      type: "website",
      url: canonical,
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      images: [ogImage],
      title,
    },
  };
}

export function getRouteMetadata(slug: string[] | undefined): Metadata {
  const route = parseRoute(slug);
  if (!route) {
    return {};
  }

  switch (route.type) {
    case "home": {
      return {};
    }

    case "level": {
      return getLevelMeta(route.levelId) ?? {};
    }

    case "codex": {
      const tab = route.tab ?? "tower";
      const meta = CODEX_TAB_META[tab];
      if (!meta) {
        return {};
      }
      const canonical = route.tab
        ? `${SITE_URL}/codex/${route.tab}`
        : `${SITE_URL}/codex`;
      return {
        alternates: { canonical },
        description: meta.description,
        openGraph: {
          description: meta.description,
          images: [HOME_OG],
          siteName: SITE_NAME,
          title: `${meta.title} | ${SITE_NAME}`,
          type: "website",
          url: canonical,
        },
        title: meta.title,
        twitter: {
          card: "summary_large_image",
          description: meta.description,
          images: [HOME_OG],
          title: `${meta.title} | ${SITE_NAME}`,
        },
      };
    }

    case "creator": {
      const desc =
        "Design custom tower defense maps in Princeton Tower Defense. Place paths, set enemy waves, add hazards, choose themes, and playtest your creations. 5 themes and full wave editor.";
      const ogDesc =
        "Build custom tower defense maps with the Princeton TD level creator. Design paths, place hazards, compose waves, and share your maps.";
      const title = `Level Creator | ${SITE_NAME}`;
      return {
        alternates: { canonical: `${SITE_URL}/creator` },
        description: desc,
        openGraph: {
          description: ogDesc,
          images: [HOME_OG],
          siteName: SITE_NAME,
          title,
          type: "website",
          url: `${SITE_URL}/creator`,
        },
        title: "커스텀 레벨 제작 도구 - 자신만의 맵 만들기",
        twitter: {
          card: "summary_large_image",
          description: ogDesc,
          images: [HOME_OG],
          title,
        },
      };
    }

    case "credits": {
      const desc =
        "Princeton Tower Defense was created by Kevin Liu. Built with Next.js, React, TypeScript, and HTML5 Canvas. No game engine — every pixel is hand-rendered.";
      const ogDesc =
        "Meet the creator of Princeton Tower Defense and learn about the tech stack behind the game.";
      const title = `Credits | ${SITE_NAME}`;
      return {
        alternates: { canonical: `${SITE_URL}/credits` },
        description: desc,
        openGraph: {
          description: ogDesc,
          images: [HOME_OG],
          siteName: SITE_NAME,
          title,
          type: "website",
          url: `${SITE_URL}/credits`,
        },
        title: "Credits & About",
        twitter: {
          card: "summary_large_image",
          description: ogDesc,
          images: [HOME_OG],
          title,
        },
      };
    }

    case "settings": {
      const desc =
        "Configure graphics quality, audio, controls, and accessibility options for Princeton Tower Defense.";
      const title = `Game Settings | ${SITE_NAME}`;
      return {
        alternates: { canonical: `${SITE_URL}/settings` },
        description: desc,
        openGraph: {
          description: desc,
          images: [HOME_OG],
          siteName: SITE_NAME,
          title,
          type: "website",
          url: `${SITE_URL}/settings`,
        },
        title: "Game Settings",
        twitter: {
          card: "summary_large_image",
          description: desc,
          images: [HOME_OG],
          title,
        },
      };
    }
  }
}
