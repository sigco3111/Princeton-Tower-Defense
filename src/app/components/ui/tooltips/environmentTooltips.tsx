"use client";

import {
  Activity,
  AlertTriangle,
  CircleOff,
  Crown,
  Crosshair,
  Diamond,
  Eye,
  Fence,
  Flame,
  Home,
  Landmark,
  Mountain,
  Shield,
  Skull,
  Snowflake,
  Sparkles,
  Swords,
  TrendingDown,
  TrendingUp,
  Wind,
  Zap,
} from "lucide-react";
import React from "react";

import type { Position } from "../../../types";
import {
  GOLD,
  PANEL,
  RED_CARD,
  dividerGradient,
  panelGradient,
} from "../system/theme";
import { getTooltipPosition } from "./tooltipPositioning";

interface LandmarkTooltipProps {
  landmarkType: string;
  position: Position;
}

const LANDMARK_INFO: Record<
  string,
  { name: string; icon: React.ReactNode; desc: string; lore: string }
> = {
  alexander_hall: {
    desc: "반원형 후진을 단 단단한 리처드슨 로마네스크 양식의 홀입니다.",
    icon: <Home className="text-cyan-400" size={16} />,
    lore: "두꺼운 석벽이 갑옷처럼 추위를 막아냅니다. 폭풍조차 둥근 아치 안으로 침범하지 못합니다.",
    name: "알렉산더 홀",
  },
  ashen_spiral: {
    desc: "수차적으로 불꽃을 뿜어내는 그을린 통풍구의 소용돌이입니다.",
    icon: <Flame className="text-orange-400" size={16} />,
    lore: "한곳에 너무 오래 서 있으면, 땅이 당신을 어떻게 할지 궁리하기 시작합니다.",
    name: "잿빛 나선",
  },
  aurora_crystal: {
    desc: "빛나는 에너지를 내뿜는 수정 결정입니다.",
    icon: <Sparkles className="text-purple-400" size={16} />,
    lore: "이 수정 결정이 오로라의 근원이라는 전설이 있습니다.",
    name: "오로라 수정",
  },
  blair_arch: {
    desc: "기숙사들을 잇는 상징적인 쌍둥이 탑 석조 아치입니다.",
    icon: <Home className="text-amber-400" size={16} />,
    lore: "수많은 수비대들이 이 아치 아래를 지나갔습니다. 시계는 여전히 포위전 속에서 시간을 재고 있습니다.",
    name: "블레어 아치",
  },
  blight_basin: {
    desc: "부식성 웅덩이가 죽은 땅을 뚫고 거품을 이는 독성 분지입니다.",
    icon: <Skull className="text-lime-400" size={16} />,
    lore: "이곳의 공기가 이상합니다. 버섯들은 그것에 무척 신이 난 것 같습니다.",
    name: "황폐 분지",
  },
  bone_altar: {
    desc: "수많은 뼈로 쌓아 올린 음산한 제단입니다.",
    icon: <Skull className="text-red-400" size={16} />,
    lore: "암흑 의식이 행해지던 곳입니다. 아무리 닦아도 얼룩은 지워지지 않습니다.",
    name: "뼈 제단",
  },
  cannon_crest: {
    desc: "나소 대포가 늘어서 있는 깊이 파인 포격 방어선입니다.",
    icon: <Crosshair className="text-stone-400" size={16} />,
    lore: "이 능선은 사격로를 따라 개조되었습니다. 모든 모래주머니는 누군가가 뼈저린 교훈을 얻은 결과입니다.",
    name: "캐논 크레스트",
  },
  carnegie_lake: {
    desc: "하늘을 거울처럼 비추는 잔잔한 수면입니다.",
    icon: <Mountain className="text-blue-400" size={16} />,
    lore: "앤드루 카네기가 프린스턴 학생들이 노를 젓도록 호수를 기증했습니다. 물고기에게는 의견 청취가 없었습니다.",
    name: "카네기 호수",
  },
  cleveland_tower: {
    desc: "얼어붙은 하늘을 찌르는 고독한 고딕 탑으로, 수 마일 내 가장 높은 구조물입니다.",
    icon: <Home className="text-cyan-400" size={16} />,
    lore: "대통령을 기리기 위해 세워졌으나, 이제는 서리 wyrm에 대한 망루 역할을 합니다.",
    name: "클리블랜드 탑",
  },
  clio_hall: {
    desc: "사막의 바람 속에서 도발적으로 서 있는 고대 그리스 신전입니다.",
    icon: <Home className="text-amber-400" size={16} />,
    lore: "Whig 홀의 자매 격인 Clio는 모래가 모든 것을 덮는 곳에서도 그 자리를 지킵니다. 해질녘 기둥들이 긴 그림자를 드리웁니다.",
    name: "클리오 홀",
  },
  cobra_statue: {
    desc: "어두운 에너지를 내뿜는 위협적인 우상.",
    icon: <Diamond className="text-green-400" size={16} />,
    lore: "자신에게 '돌이 되고 싶은 모양을 알려줬다'고 주장하던 미친 조각가가 만들었습니다.",
    name: "코브라 조각상",
  },
  dark_barracks: {
    desc: "한때 어둠의 군대가 집결했던 요새화된 전초기지입니다.",
    icon: <Shield className="text-purple-400" size={16} />,
    lore: "침상은 여전히 정돈되어 있습니다. 사악함도 병영 정리는 철저한 모양입니다.",
    name: "어둠의 병영",
  },
  dark_spire: {
    desc: "하늘을 찌르는 검은 바위의 들쭉날쭉한 탑입니다.",
    icon: <TrendingUp className="text-purple-400" size={16} />,
    lore: "번개가 끊임없이 치는데도 무너지지 않습니다. 설계자는 천재였거나 저주받았거나 둘 중 하나입니다.",
    name: "어둠의 첨탑",
  },
  dark_throne: {
    desc: "그림자와 공포에 감싸인 위협적인 왕좌입니다.",
    icon: <Crown className="text-purple-400" size={16} />,
    lore: "그 안에 앉으면 막대한 힘이 주어지지만, 동시에 끔찍한 허리 통증도 따라옵니다.",
    name: "어둠의 왕좌",
  },
  demon_statue: {
    desc: "어두운 에너지를 내뿜는 위협적인 우상.",
    icon: <Swords className="text-red-400" size={16} />,
    lore: "자신에게 '돌이 되고 싶은 모양을 알려줬다'고 주장하던 미친 조각가가 만들었습니다.",
    name: "악마 조각상",
  },
  east_pyne: {
    desc: "습지에 풍화된 둥근 탑이 특징인 로마네스크 양식의 홀입니다.",
    icon: <Home className="text-amber-400" size={16} />,
    lore: "둥근 아치에는 속삭이는 주문의 메아리가 울립니다. 늪이 그 말을 듣고 있는 것 같습니다.",
    name: "이스트 파인 홀",
  },
  fine_hall: {
    desc: "화산의 잔열에 휩싸인 현대적 수학관 탑입니다.",
    icon: <Home className="text-red-400" size={16} />,
    lore: "예전에는 칠판에 방정식이 가득했지만, 이제는 흑요석 벽에 화염 룬이 빛납니다.",
    name: "파인 홀",
  },
  firestone_library: {
    desc: "고대 지식의 보고인 프린스턴의 위대한 도서관입니다.",
    icon: <Home className="text-amber-400" size={16} />,
    lore: "그 도서관의 기록 보관소에는 옛 학자들이 펴낸 타워 디펜스 전술에 관한 금단의 문헌이 있습니다.",
    name: "파이어스톤 도서관",
  },
  fortress: {
    desc: "한때 위대했던 요새의 무너진 폐허로, 탑은 부서지고 성벽은 돌무더기로 변했습니다.",
    icon: <Shield className="text-stone-400" size={16} />,
    lore: "누가 세웠는지, 왜 무너졌는지 아무도 기억하지 못합니다. 돌들은 기억하지만, 입을 열지 않습니다.",
    name: "요새 폐허",
  },
  foulke_hall: {
    desc: "칼데라에서 솟아오른 사악한 첨탑을 단 어두운 고딕 기숙사입니다.",
    icon: <Home className="text-red-400" size={16} />,
    lore: "거주자들은 오래전에 떠났습니다. 연기로 가득한 회랑에는 지금 다른 무언가가 살고 있습니다.",
    name: "폴크 홀",
  },
  frist_outpost: {
    desc: "투박한 망루와 모닥불 주변에 지어진 눈 덮인 울타리 전초기지입니다.",
    icon: <Fence className="text-cyan-300" size={16} />,
    lore: "벽은 삐걱거리고, 불은 꺼져 가는데, 어떻게든 매겨울을 버팁니다.",
    name: "프리스트 초소",
  },
  frost_citadel: {
    desc: "마법의 얼음으로 깎아 만든 거대한 요새입니다.",
    icon: <Snowflake className="text-cyan-400" size={16} />,
    lore: "왕좌의 방은 화려하지만 난방비 청구서는 0원입니다. 난방이 없으니까요.",
    name: "서리 성채",
  },
  frozen_gate: {
    desc: "전장을 지키는 얼어붙은 문입니다.",
    icon: <Fence className="text-cyan-400" size={16} />,
    lore: "문은 그다지 튼튼해 보이지 않습니다.",
    name: "얼어붙은 관문",
  },
  frozen_waterfall: {
    desc: "전장 가로질러 흐르는 얼어붙은 폭포입니다.",
    icon: <Snowflake className="text-cyan-400" size={16} />,
    lore: "폭포가 꽁꽁 얼어붙아 지나갈 수 없습니다.",
    name: "얼어붙은 폭포",
  },
  gate: {
    desc: "전장을 지키는 문입니다.",
    icon: <Fence className="text-cyan-400" size={16} />,
    lore: "문은 그다지 튼튼해 보이지 않습니다.",
    name: "문",
  },
  giant_sphinx: {
    desc: "사막의 모래를 내려다보는 거대한 스핑크스입니다.",
    icon: <Eye className="text-amber-400" size={16} />,
    lore: "그 시선은 환상을 꿰뚫는다고 합니다. 가장 용감한 적조차 그 그림자 속에서 불안해합니다.",
    name: "대스핑크스",
  },
  glacier: {
    desc: "수천 년의 바람과 추위에 깎인 거대한 고대 얼음 덩어리입니다.",
    icon: <Snowflake className="text-cyan-400" size={16} />,
    lore: "기억보다 오래된 수정 기둥들이 침묵의 파수꾼처럼 얼어붙은 고원을 천천히 가로질러 이동합니다.",
    name: "빙하",
  },
  hieroglyph_wall: {
    desc: "고대 상형 문자로 뒤덮인 풍화된 석벽입니다.",
    icon: <Landmark className="text-amber-400" size={16} />,
    lore: "학자들은 대부분을 번역했습니다. 대부분은 더위에 대한 불평과 맥주 추가 요청입니다.",
    name: "상형문자 벽",
  },
  holder_hall: {
    desc: "높은 시계탑을 갖춘 대학 고딕 양식의 기숙사입니다.",
    icon: <Home className="text-cyan-400" size={16} />,
    lore: "얼어붙은 시계탑은 여전히 매시간 종을 울리며, 적막한 얼음 속의 반항하는 심장 박동처럼 울립니다.",
    name: "홀더 홀",
  },
  ice_bridge: {
    desc: "험준한 균형을 가로지르는 얼어붙은 아치입니다.",
    icon: <Snowflake className="text-cyan-400" size={16} />,
    lore: "건너려면 용기, 균형, 그리고 아래를 보지 않는 현명한 판단이 필요합니다.",
    name: "얼음 다리",
  },
  ice_throne: {
    desc: "하나의 거대한 마법의 얼음 덩어리를 깎아 만든 위엄 있는 권좌입니다.",
    icon: <Snowflake className="text-cyan-300" size={16} />,
    lore: "서리 여왕이 한때 이 봉우리들을 뒤덮었던 영원한 겨울을 다스리던 왕좌입니다.",
    name: "얼음 왕좌",
  },
  idol_statue: {
    desc: "전장에 서 있는 우상상의 동상입니다.",
    icon: <Landmark className="text-amber-400" size={16} />,
    lore: "별로 위엄 없는 우상의 별로 인상적이지 않은 동상입니다.",
    name: "우상",
  },
  infernal_gate: {
    desc: "지옥불과 유황으로 이글이글 타오르는 문입니다.",
    icon: <Flame className="text-red-400" size={16} />,
    lore: "그곳은 매우 뜨거운 곳으로 이어집니다. 반대쪽 발판에 '희망을 버려라'라고 적혀 있습니다. 참으로 은근합니다.",
    name: "지옥의 문",
  },
  ivy_crossroads: {
    desc: "오래된 캠퍼스의 돌담을 따라 갈래길을 표시하는 담쟁이덩굴이 뒤덮인 아치입니다.",
    icon: <Landmark className="text-emerald-400" size={16} />,
    lore: "누가 먼저 이 아치를 지었는지 아무도 기억하지 못합니다. 이제는 담쟁이덩굴이 선배 격입니다.",
    name: "아이비 교차로",
  },
  lava_fall: {
    desc: "전장 가로질러 흐르는 용암 폭포입니다.",
    icon: <Flame className="text-orange-400" size={16} />,
    lore: "용암은 뜨거워서 지나갈 수 없습니다.",
    name: "용암 폭포",
  },
  mccosh_hall: {
    desc: "사구에서 솟아오른 중앙 고딕 탑을 갖춘 장엄한 강의 홀입니다.",
    icon: <Home className="text-amber-400" size={16} />,
    lore: "예전에는 철학이 가르쳐지던 곳입니다. 이제는 이 벽을 지키는 자들에게 인내를 가르칩니다.",
    name: "맥코시 홀",
  },
  nassau_hall: {
    desc: "1746년에 세워진 프린스턴 대학의 역사적인 중심부입니다.",
    icon: <Home className="text-amber-400" size={16} />,
    lore: "한때 미합중국의 군주가 있던 곳이었습니다. 이제는 어둠의 군대에 대한 최후의 보루 역할을 합니다.",
    name: "나소 홀",
  },
  obelisk: {
    desc: "신비한 문양이 새겨진 높은 모놀리스입니다.",
    icon: <TrendingUp className="text-amber-400" size={16} />,
    lore: "새겨진 글씨는 죽은 언어로 적힌 피자 레시피입니다. 학자들은 여전히 토핑을 두고 논쟁 중입니다.",
    name: "고대 오벨리스크",
  },
  obsidian_castle: {
    desc: "화산 유리에서 깎아 만든 어두운 요새입니다.",
    icon: <Shield className="text-purple-400" size={16} />,
    lore: "이 성은 빛 자체를 흡수합니다. 마법의 보호 없이는 횃불이 벽 안에서 꺼지고 만습니다.",
    name: "흑요석 성",
  },
  obsidian_pillar: {
    desc: "전장에 서 있는 흑요석 기둥입니다.",
    icon: <Shield className="text-purple-400" size={16} />,
    lore: "수정과 결합되면 용 한 마리를 치유할 수 있습니다.",
    name: "흑요석 기둥",
  },
  princeton_chapel: {
    desc: "높은 첨탑과 장미창을 갖춘 위엄 있는 대학 고딕 양식의 예배당입니다.",
    icon: <Home className="text-amber-400" size={16} />,
    lore: "그 종소리는 한때 신자들을 소집했습니다. 이제는 들판을 가로지르는 다가오는 어둠을 경고합니다.",
    name: "프린스턴 채플",
  },
  prospect_house: {
    desc: "관측탑이 딸린 이탈리아풍 저택으로, 늪에 절반이 삼켜진 채 있습니다.",
    icon: <Home className="text-amber-400" size={16} />,
    lore: "총장의 옛 거처입니다. 그 탑에서는 여전히 다가오는 어둠을 살필 수 있습니다.",
    name: "프로스펙트 하우스",
  },
  pyramid: {
    desc: "잊혀진 문명의 거대한 석조 기념물입니다.",
    icon: <Landmark className="text-amber-400" size={16} />,
    lore: "전설에 따르면, 다른 누구보다 먼저 기하학의 비밀을 발견한 학자들이 세웠다고 합니다.",
    name: "고대 피라미드",
  },
  robertson_hall: {
    desc: "사암으로 된 깔끔한 기하학적 형태의 모더니즘 각진 건물입니다.",
    icon: <Home className="text-amber-400" size={16} />,
    lore: "공공정책대학이 있던 곳입니다. 반영못은 이미 모래로 가득 찼습니다.",
    name: "로버트슨 홀",
  },
  ruined_temple: {
    desc: "고대 예배당의 무너진 잔해입니다.",
    icon: <Landmark className="text-stone-400" size={16} />,
    lore: "옛 신들은 떠났지만, 자정에는 아직 희미한 찬송가를 들을 수 있습니다.",
    name: "폐허 사원",
  },
  sarcophagus: {
    desc: "고대의 보호 마법으로 봉인된 장식된 석관입니다.",
    icon: <Skull className="text-amber-400" size={16} />,
    lore: "안에 있는 무언가가 계속 두드리고 있습니다. 모두 못 들은 척하기로 합의했습니다.",
    name: "석관",
  },
  skull_throne: {
    desc: "전장에 놓인 해골로 만든 왕좌입니다.",
    icon: <Skull className="text-red-400" size={16} />,
    lore: "좌석을 얻으려면 영혼이 얼마나 필요할까요?",
    name: "해골 왕좌",
  },
  sphinx: {
    desc: "살아있는 돌로 깎아 만든 신화 속 수호자입니다.",
    icon: <Eye className="text-amber-400" size={16} />,
    lore: "지나가는 모든 자에게 수수께끼를 냅니다. 대부분의 적은 너무 어리석어 제대로 답하지 못합니다.",
    name: "스핑크스",
  },
  statue: {
    desc: "잊혀진 영웅의 풍화된 동상입니다.",
    icon: <Crown className="text-amber-400" size={16} />,
    lore: "예전 학생들은 시험의 행운을 빌며 코를 문질렀습니다. 코는 매우 반들반들합니다.",
    name: "석상",
  },
  sun_obelisk: {
    desc: "태양의 힘을 전달하는 황금 첨탑입니다.",
    icon: <TrendingUp className="text-amber-400" size={16} />,
    lore: "한낮에는 그림자를 드리우지 않습니다. 한밤중에는 빛을 떠올리듯 희미하게 빛납니다.",
    name: "태양 오벨리스크",
  },
  sunken_pillar: {
    desc: "흙 속에 절반 묻힌 거대한 기둥입니다.",
    icon: <Mountain className="text-stone-400" size={16} />,
    lore: "한때 두 왕국을 잇던 다리의 일부입니다. 나머지 절반은 끝내 발견되지 않았습니다.",
    name: "가라앉은 기둥",
  },
  sunscorch_labyrinth: {
    desc: "벽이 군대뿐 아니라 열기까지 가두는 타오르는 사암 미로입니다.",
    icon: <TrendingUp className="text-amber-400" size={16} />,
    lore: "침입자들을 혼란에 빠뜨리고, 혼란에 빠진 사이로 익혀 죽일 목적으로 설계되었습니다.",
    name: "태양의 미궁",
  },
  tiger_stadium: {
    desc: "프린스턴의 체육관으로, 지금은 불과 흑요석의 투기장이 되었습니다.",
    icon: <Home className="text-red-400" size={16} />,
    lore: "한때 타이거즈가 경기를 벌이던 곳에서, 이제 악마들이 싸웁니다. 화로에는 영원한 불꽃이 타고 있습니다.",
    name: "타이거 스타디움",
  },
  triad_keep: {
    desc: "탁한 물과 녹색 깃발로 둘러싸인 요새화된 습지 요새입니다.",
    icon: <Shield className="text-emerald-400" size={16} />,
    lore: "세 개의 홀이 한때 이 요새에 식량을 공급했습니다. 이제 벽만 손님 명단을 기억합니다.",
    name: "삼두 요새",
  },
  volcano_rim: {
    desc: "전장을 둘러싼 용암의 테두리입니다.",
    icon: <Flame className="text-orange-400" size={16} />,
    lore: "영원한 불꽃의 벼랑입니다.",
    name: "화산 가장자리",
  },
  war_monument: {
    desc: "오래전 쓰러진 전사들을 기리는 거대한 기념비입니다.",
    icon: <Swords className="text-stone-400" size={16} />,
    lore: "그 표면에 새겨진 모든 이름은 한 명의 영웅을 의미합니다. 이름이 아주 많습니다.",
    name: "전쟁 기념비",
  },
  whig_hall: {
    desc: "습지에 천천히 잠식당하는 그리스 부흥 양식의 신전입니다.",
    icon: <Home className="text-amber-400" size={16} />,
    lore: "한때 토론과 수사학의 홀이었으나, 이제 이끼와 덩굴이 무너지는 기둥을 놓고 다투고 있습니다.",
    name: "휘그 홀",
  },
  witch_cottage: {
    desc: "물약과 오래된 마법 냄새가 진동하는 구부러진 거처입니다.",
    icon: <Sparkles className="text-green-400" size={16} />,
    lore: "마녀는 오래전에 떠났지만, 가마솥은 여전히 부글거립니다. 아무도 안의 내용물을 맛볼 엄두를 내지 못합니다.",
    name: "마녀의 오두막",
  },
};

export const LandmarkTooltip: React.FC<LandmarkTooltipProps> = ({
  landmarkType,
  position,
}) => {
  const info = LANDMARK_INFO[landmarkType] || {
    desc: "전장의 주요 지형지물입니다.",
    icon: <Landmark className="text-amber-400" size={16} />,
    lore: "그 기원은 베일에 싸여 있습니다.",
    name: landmarkType
      .replaceAll("_", " ")
      .replaceAll(/\b\w/g, (c) => c.toUpperCase()),
  };

  const coords = getTooltipPosition(position, { height: 180, width: 280 });

  return (
    <div
      className="fixed pointer-events-none shadow-2xl rounded-xl backdrop-blur-md overflow-hidden"
      style={{
        background: panelGradient,
        border: `1.5px solid ${GOLD.border30}`,
        boxShadow: `0 0 24px ${GOLD.glow07}, inset 0 1px 0 ${GOLD.innerBorder08}`,
        left: coords.left,
        top: coords.top,
        width: 280,
        zIndex: 250,
      }}
    >
      <div
        className="absolute inset-[2px] rounded-[10px] pointer-events-none z-10"
        style={{ border: `1px solid ${GOLD.innerBorder08}` }}
      />

      <div
        className="px-3.5 py-2 relative z-10"
        style={{
          background: PANEL.bgWarmMid,
          borderBottom: `1px solid ${GOLD.border25}`,
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
            style={{
              background: `linear-gradient(135deg, rgba(80,60,20,0.6), rgba(45,32,12,0.8))`,
              border: `1px solid ${GOLD.innerBorder12}`,
              boxShadow: `0 0 8px ${GOLD.glow07}`,
            }}
          >
            {info.icon}
          </div>
          <div className="min-w-0">
            <div className="font-bold text-amber-200 text-sm leading-tight truncate">
              {info.name}
            </div>
            <div className="text-[8px] text-amber-500/60 uppercase tracking-[0.2em] mt-0.5 flex items-center gap-1 font-semibold">
              <Landmark size={7} />
              Landmark
            </div>
          </div>
        </div>
      </div>

      <div className="px-3.5 py-2.5 relative z-10">
        <p className="text-[11px] text-amber-100/80 leading-relaxed">
          {info.desc}
        </p>

        <div className="my-2.5 h-px" style={{ background: dividerGradient }} />

        <div
          className="pl-2.5 relative"
          style={{ borderLeft: `2px solid ${GOLD.innerBorder12}` }}
        >
          <p className="text-[10px] text-amber-400/55 leading-relaxed italic">
            &quot;{info.lore}&quot;
          </p>
        </div>
      </div>
    </div>
  );
};

interface HazardTooltipProps {
  hazardType: string;
  position: Position;
}

const HAZARD_INFO: Record<
  string,
  {
    name: string;
    icon: React.ReactNode;
    desc: string;
    effect: string;
    effectColor: string;
  }
> = {
  deep_water: {
    desc: "강한 이안류와 거의 발 디딜 곳이 없는 어두운 물.",
    effect: "모든 유닛을 감속시키고 익사시킵니다 — 4~9 DPS + 38% 감속",
    effectColor: "text-blue-300",
    icon: <Activity className="text-blue-400" size={16} />,
    name: "깊은 물",
  },
  eruption_zone: {
    desc: "깊은 지하에서 녹은 암석이 주기적으로 분출합니다.",
    effect: "무작위 분출로 근처의 모든 유닛에게 화염 피해 5를 입힙니다",
    effectColor: "text-orange-400",
    icon: <Flame className="text-orange-400" size={16} />,
    name: "용암 간헐천",
  },
  fire: {
    desc: "끊임없이 타오르는 불꽃이 지역의 모든 것을 불태웁니다.",
    effect: "모든 유닛에게 화염 DPS 10 피해",
    effectColor: "text-orange-400",
    icon: <Flame className="text-orange-400" size={16} />,
    name: "지옥불 구역",
  },
  ice: {
    desc: "발을 디디기 어려운 얼어붙은 지대입니다.",
    effect: "이 구역을 통과하는 모든 유닛의 이동 속도 50% 증가",
    effectColor: "text-cyan-300",
    icon: <Snowflake className="text-cyan-300" size={16} />,
    name: "얼음의",
  },
  ice_sheet: {
    desc: "이동 속도를 높이는 미끄러운 얼어붙은 땅입니다.",
    effect: "이 구역을 통과하는 모든 유닛의 이동 속도 60% 증가",
    effectColor: "text-cyan-400",
    icon: <Snowflake className="text-cyan-400" size={16} />,
    name: "얼음판",
  },
  ice_spikes: {
    desc: "날카로운 수정 결정이 얼어붙은 땅에서 솟아오릅니다.",
    effect: "주기적으로 솟아올라 모든 유닛에게 피해를 입히고 감속시킵니다",
    effectColor: "text-cyan-300",
    icon: <Mountain className="text-cyan-300" size={16} />,
    name: "얼음 가시",
  },
  lava: {
    desc: "가까이 오는 모든 것을 태우는 부글거리는 마그마입니다.",
    effect: "주기적인 비산으로 근처의 모든 유닛에게 화염 피해 4를 입힙니다",
    effectColor: "text-red-300",
    icon: <Flame className="text-red-300" size={16} />,
    name: "용암 웅덩이",
  },
  lava_geyser: {
    desc: "깊은 지하에서 녹은 암석이 주기적으로 분출합니다.",
    effect: "무작위 분출로 근처의 모든 유닛에게 화염 피해 5를 입힙니다",
    effectColor: "text-orange-400",
    icon: <Flame className="text-orange-400" size={16} />,
    name: "용암 간헐천",
  },
  lightning: {
    desc: "산발적인 고전압 번개가 해당 지역을 강타합니다.",
    effect: "번개 타격당 모든 유닛에게 순간 피해 18",
    effectColor: "text-yellow-300",
    icon: <Zap className="text-yellow-300" size={16} />,
    name: "번개 필드",
  },
  maelstrom: {
    desc: "모든 것을 압도적인 중심으로 끌어당기는 회오리 소용돌이입니다.",
    effect: "모든 유닛에게 8-20 DPS + 55% 감속",
    effectColor: "text-cyan-300",
    icon: <Wind className="text-cyan-300" size={16} />,
    name: "소용돌이",
  },
  poison: {
    desc: "농축된 독소가 모인 웅덩이입니다.",
    effect: "모든 유닛에게 초당 12의 피해",
    effectColor: "text-green-400",
    icon: <Wind className="text-green-400" size={16} />,
    name: "poison",
  },
  poison_fog: {
    desc: "이 지역에 두꺼운 유독 가스가 짙게 깔려 있습니다.",
    effect: "통과하는 모든 유닛에게 DPS 15의 피해를 입힙니다",
    effectColor: "text-green-400",
    icon: <Wind className="text-green-400" size={16} />,
    name: "독 안개",
  },
  quicksand: {
    desc: "밟는 모든 것을 삼키는 위험한 지형입니다.",
    effect: "모든 유닛의 이동 속도 50% 감소",
    effectColor: "text-yellow-400",
    icon: <TrendingDown className="text-yellow-400" size={16} />,
    name: "유사트",
  },
  slippery_ice: {
    desc: "매우 미끄러운 얼음 표면입니다.",
    effect: "이 구역을 통과하는 모든 유닛의 이동 속도 60% 증가",
    effectColor: "text-cyan-400",
    icon: <Snowflake className="text-cyan-400" size={16} />,
    name: "미끄러운 얼음",
  },
  spikes: {
    desc: "날카로운 수정 결정이 얼어붙은 땅에서 솟아오릅니다.",
    effect: "주기적으로 솟아올라 모든 유닛에게 피해를 입히고 감속시킵니다",
    effectColor: "text-cyan-300",
    icon: <Mountain className="text-cyan-300" size={16} />,
    name: "얼음 가시",
  },
  storm_field: {
    desc: "이온화된 폭풍 공기라서 이동 속도는 강화되지만 장갑이 찢어집니다.",
    effect: "모든 유닛의 이동 속도 15% 증가, 대신 DPS 6의 피해를 입음",
    effectColor: "text-sky-300",
    icon: <Zap className="text-sky-300" size={16} />,
    name: "폭풍 지대",
  },
  swamp: {
    desc: "부식성 찌꺼기가 스며 나오는 악취로운 진흙탕입니다.",
    effect: "모든 유닛에게 독 DPS 6 + 35% 감속",
    effectColor: "text-lime-400",
    icon: <Wind className="text-lime-400" size={16} />,
    name: "독성 늪",
  },
  void: {
    desc: "생명력을 빨아들이는 차원의 균열입니다.",
    effect: "모든 유닛에게 8 DPS + 30% 감속",
    effectColor: "text-purple-400",
    icon: <CircleOff className="text-purple-400" size={16} />,
    name: "공허 균열",
  },
  volcano: {
    desc: "전장 위로 용암암을 내던지는 불안정한 분화구입니다.",
    effect: "파괴적인 분출로 근처의 모든 유닛에게 화염 피해 15를 입힙니다",
    effectColor: "text-red-400",
    icon: <Flame className="text-red-400" size={16} />,
    name: "화산",
  },
};

const HAZARD_EFFECT_RGB: Record<string, [number, number, number]> = {
  "text-blue-300": [147, 197, 253],
  "text-blue-400": [96, 165, 250],
  "text-cyan-300": [103, 232, 249],
  "text-cyan-400": [34, 211, 238],
  "text-green-400": [74, 222, 128],
  "text-lime-400": [163, 230, 53],
  "text-orange-400": [251, 146, 60],
  "text-purple-400": [192, 132, 252],
  "text-red-300": [252, 165, 165],
  "text-red-400": [248, 113, 113],
  "text-sky-300": [125, 211, 252],
  "text-yellow-300": [253, 224, 71],
  "text-yellow-400": [250, 204, 21],
};

function getHazardAccent(effectColor: string) {
  const rgb = HAZARD_EFFECT_RGB[effectColor] || [180, 60, 60];
  const [r, g, b] = rgb;
  return {
    accentLine: `rgba(${r},${g},${b},0.7)`,
    border: `rgba(${r},${g},${b},0.45)`,
    glow: `rgba(${r},${g},${b},0.12)`,
    headerBg: `rgba(${r},${g},${b},0.06)`,
    innerBorder: `rgba(${r},${g},${b},0.12)`,
    subtleBorder: `rgba(${r},${g},${b},0.2)`,
  };
}

export const HazardTooltip: React.FC<HazardTooltipProps> = ({
  hazardType,
  position,
}) => {
  const info = HAZARD_INFO[hazardType] || {
    desc: "위험한 환경 재해입니다.",
    effect: "구역 내 유닛에게 알 수 없는 효과를 부여합니다",
    effectColor: "text-red-400",
    icon: <AlertTriangle className="text-red-400" size={16} />,
    name: hazardType
      .replaceAll("_", " ")
      .replaceAll(/\b\w/g, (c) => c.toUpperCase()),
  };

  const accent = getHazardAccent(info.effectColor);
  const coords = getTooltipPosition(position, { height: 190, width: 280 });

  return (
    <div
      className="fixed pointer-events-none shadow-2xl rounded-xl backdrop-blur-md overflow-hidden"
      style={{
        background: panelGradient,
        border: `1.5px solid ${accent.border}`,
        boxShadow: `0 0 24px ${accent.glow}, inset 0 1px 0 rgba(255,255,255,0.03)`,
        left: coords.left,
        top: coords.top,
        width: 280,
        zIndex: 250,
      }}
    >
      <div
        className="h-[3px] w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent.accentLine}, transparent)`,
        }}
      />

      <div
        className="absolute inset-[2px] rounded-[10px] pointer-events-none z-10"
        style={{ border: `1px solid ${accent.innerBorder}` }}
      />

      <div
        className="px-3.5 py-2 relative z-10"
        style={{
          background: accent.headerBg,
          borderBottom: `1px solid ${accent.subtleBorder}`,
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
            style={{
              background: `linear-gradient(135deg, ${accent.innerBorder}, ${accent.glow})`,
              border: `1px solid ${accent.subtleBorder}`,
            }}
          >
            {info.icon}
          </div>
          <div className="min-w-0">
            <div className="font-bold text-amber-200 text-sm leading-tight truncate">
              {info.name}
            </div>
            <div className="text-[8px] text-red-400/60 uppercase tracking-[0.2em] mt-0.5 flex items-center gap-1 font-semibold">
              <AlertTriangle size={8} />
              Environmental Hazard
            </div>
          </div>
        </div>
      </div>

      <div className="px-3.5 py-2.5 relative z-10">
        <p className="text-[11px] text-stone-300/80 leading-relaxed">
          {info.desc}
        </p>

        <div
          className="mt-2.5 rounded-lg px-3 py-2"
          style={{
            background: PANEL.bgDeep,
            border: `1px solid ${accent.subtleBorder}`,
            boxShadow: `inset 0 0 12px ${accent.glow}`,
          }}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Zap size={10} className={info.effectColor} />
            <span className="text-[9px] text-red-400/50 uppercase tracking-[0.15em] font-bold">
              Effect
            </span>
          </div>
          <p
            className={`text-[11px] font-medium leading-snug ${info.effectColor}`}
          >
            {info.effect}
          </p>
        </div>
      </div>
    </div>
  );
};
