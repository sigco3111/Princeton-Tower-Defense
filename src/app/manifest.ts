import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#1a1a2e",
    categories: ["games", "entertainment"],
    description:
      "Free browser tower defense game set at Princeton University. Build campus-themed towers, summon heroes, cast spells, and defend Nassau Hall across 26 levels.",
    display: "standalone",
    icons: [
      {
        purpose: "any",
        sizes: "512x512",
        src: "/images/logos/princeton-td-logo.png",
        type: "image/png",
      },
      {
        sizes: "any",
        src: "/images/logos/princeton-td-logo.svg",
        type: "image/svg+xml",
      },
    ],
    name: "프린스턴 타워 디펜스",
    orientation: "landscape",
    screenshots: [
      {
        label: "프린스턴 타워 디펜스 - 캠퍼스에서 게임플레이",
        sizes: "2966x1826",
        src: "/images/new/gameplay_grounds_ui.png",
        type: "image/png",
      },
      {
        label: "사막 지역 - 사하라 모래 레벨",
        sizes: "2964x1828",
        src: "/images/new/gameplay_desert_ui.png",
        type: "image/png",
      },
      {
        label: "늪지 지역 - 음울한 습지 레벨",
        sizes: "2968x1824",
        src: "/images/new/gameplay_swamp_ui.png",
        type: "image/png",
      },
      {
        label: "겨울 지역 - 얼어붙은 변경 레벨",
        sizes: "2970x1820",
        src: "/images/new/gameplay_winter_ui.png",
        type: "image/png",
      },
      {
        label: "화산 지역 - 화산 심연 레벨",
        sizes: "2962x1814",
        src: "/images/new/gameplay_volcano_ui.png",
        type: "image/png",
      },
      {
        label: "샌드박스 전장 전투",
        sizes: "2964x1790",
        src: "/images/new/gameplay_sandbox_ui.png",
        type: "image/png",
      },
      {
        label: "캠페인 진행이 있는 월드맵",
        sizes: "2978x1828",
        src: "/images/promo/worldmap.png",
        type: "image/png",
      },
    ],
    short_name: "프린스턴 TD",
    start_url: "/",
    theme_color: "#E87722",
  };
}
