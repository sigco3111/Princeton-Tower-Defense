<div align="center">

# 🎓 프린스턴 타워 디펜스

### 🐯 *Go Tigers!* — 브라우저에서 즐기는 Princeton 대학 컨셉 타워 디펜스

[![라이선스: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![언어: TypeScript](https://img.shields.io/badge/language-TypeScript-3178C6.svg)](https://www.typescriptlang.org/)
[![프레임워크: Next.js 16](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)
[![렌더링: Canvas 2D + Three.js](https://img.shields.io/badge/render-Canvas_2D%20%2B%20Three.js-orange.svg)](#)
[![호스팅: GitHub Pages](https://img.shields.io/badge/hosted-GitHub_Pages-222.svg)](https://sigco3111.github.io/Princeton-Tower-Defense/)
[![한글화 미러](https://img.shields.io/badge/i18n-한국어-red.svg)](#)

[**🎮 라이브 플레이**](https://sigco3111.github.io/Princeton-Tower-Defense/) · [**📦 원본 저장소**](https://github.com/Kevin-Liu-01/Princeton-Tower-Defense) · [**🇰🇷 한글화 미러**](https://github.com/sigco3111/Princeton-Tower-Defense)

</div>

---

## 📸 게임 스크린샷

<table>
<tr>
<td align="center" width="50%">

### 🏛️ 프린스턴 캠퍼스 (초원)
*메인 화면 — Nassau 홀, Firestone 도서관 등 실제 캠퍼스 랜드마크*

![Princeton Grounds - 초원](public/images/new/gameplay_grounds.png)

</td>
<td align="center" width="50%">

### 🌿 음울한 습지 (늪지)
*안개 낀 소택지, 가라앉은 신전, 분위기 있는 바이옴*

![Murky Marshes - 늪지](public/images/new/gameplay_swamp.png)

</td>
</tr>
<tr>
<td align="center" width="50%">

### 🏜️ 사하라 모래 (사막)
*피라미드와 오아시스, 이국적인 모래 환경*

![Sahara Sands - 사막](public/images/new/gameplay_desert.png)

</td>
<td align="center" width="50%">

### ❄️ 얼어붙은 변경 (겨울)
*얼어붙은 빙하와 설산, 혹한의 시련*

![Frozen Frontier - 겨울](public/images/new/gameplay_winter.png)

</td>
</tr>
<tr>
<td align="center" colspan="2">

### 🌋 화산 심연 (화산)
*용암과 화염, 최종 메가 보스까지*

![Volcanic Depths - 화산](public/images/new/gameplay_volcano.png)

</td>
</tr>
</table>

---

## 📑 목차

- [🎯 게임 소개](#-게임-소개)
- [✨ 주요 특징](#-주요-특징)
- [🛠️ 기술 스택](#-기술-스택)
- [🚀 빠른 시작](#-빠른-시작)
- [🏛️ 타워 (7종)](#-타워-7종)
- [🦸 영웅 (9명)](#-영웅-9명)
- [🔮 주문과 환경 효과](#-주문과-환경-효과)
- [🗺️ 월드맵과 진행](#-월드맵과-진행)
- [🎨 커스텀 레벨 제작 도구](#-커스텀-레벨-제작-도구)
- [♾️ 샌드박스 모드](#-샌드박스-모드)
- [🏗️ 아키텍처](#-아키텍처)
- [📁 폴더 구조](#-폴더-구조)
- [⚠️ 알려진 한계](#-알려진-한계)
- [🤝 기여하기](#-기여하기)
- [📜 라이선스](#-라이선스)

---

## 🎯 게임 소개

> **Princeton Tower Defense**는 React, Canvas 2D, Next.js로만 구현된 풀 브라우저 기반 정통 타워 디펜스입니다.
> 게임 엔진도, 스프라이트 시트도 없습니다. 모든 것이 손으로 작성된 Canvas 2D 코드로 그려집니다.

프린스턴대학교 캠퍼스를 배경으로 **5개 바이옴 × 26개 정교한 레벨**을 정복하세요.

| 🏛️ 캠퍼스 | 🌿 습지 | 🏜️ 사막 | ❄️ 겨울 | 🌋 화산 |
|:---:|:---:|:---:|:---:|:---:|
| Nassau 홀 | 음울한 습지 | 사하라 모래 | 얼어붙은 변경 | 화산 심연 |
| Poe Field | Murky Bog | Desert Oasis | Glacier Path | Lava 필드 |
| Carnegie Lake | Sunken Temple | Pyramid Pass | Frost Frost | Obsidian Throne |

---

## ✨ 주요 특징

<table>
<tr>
<th>🏛️ 7개 타워 (분기형 업그레이드)</th>
<th>🦸 9명 영웅</th>
</tr>
<tr>
<td>

| 타워 | 역할 | 업그레이드 경로 |
|---|---|---|
| **나소 캐논** | 중포병 | 기관총 / 화염방사기 |
| **파이어스톤 도서관** | 감속 + 제어 | 이쿼드 분쇄기 / 블리자드 |
| **이쿼드 연구소** | 연쇄 마법 DPS | 집중 빔 / 체인 라이트닝 |
| **블레어 아치** | 음파 크레센도 | 충격파 사이렌 / 심포니 홀 |
| **이팅 클럽** | 경제 | 투자 은행 / 모집 센터 |
| **딩키 정거장** | 부대 소환 | 켄타우로스 궁수 / 중장 기병 |
| **팔머 박격포** | 공성 광역 | 미사일 배터리 / 잿불 용광로 |

</td>
<td>

| 영웅 | 스타일 | 능력 |
|---|---|---|
| **프린스턴 호랑이** | 근접 격투가 | 장엄한 포효 (광역 기절+공포) |
| **아카펠라 테너** | 원거리 지원 | 고음 (음파 폭발+치유) |
| **매시 기사** | 탱ker | | 요새 사장 (무적+도발) |
| **로키 라쿤** | 원거리 포격 | 바위 강타 (대규모 광역) |
| **F. 스콧** | 버퍼 | 영감의 환호 (강화) |
| **머서 장군** | 지휘관 | 기사 소집 (중장 기병 ×3) |
| **BSE 엔지니어** | 유틸리티 | 포탑 배치 (자동 방어) |
| **아이비 수호자** | 자연 화신 | 자연의 변환 |
| **덩굴** | 소환수 | 자연의 힘 |

</td>
</tr>
</table>

### 🔮 주문 · 환경 효과 · 챌린지

- **6개 주문** — 화염구, 번개, 빙결, 주문 방어막, 보급일, 증원 (별점으로 업그레이드)
- **환경 위험** — 용암 웅덩이, 소택지, 블리자드, 금고/신전/병영/비콘
- **챌린지 맵** — 타워 제한 + 다중 목표 점수로 비표준 전략 강제
- **샌드박스** — 10,000 파우 포인트로 시작하는 무한 모드

---

## 🛠️ 기술 스택

<table>
<thead>
<tr><th>영역</th><th>기술</th></tr>
</thead>
<tbody>
<tr><td><b>프레임워크</b></td><td>Next.js 16, React 19</td></tr>
<tr><td><b>언어</b></td><td>TypeScript</td></tr>
<tr><td><b>스타일링</b></td><td>Tailwind CSS</td></tr>
<tr><td><b>렌더링</b></td><td>HTML5 Canvas 2D (커스텀, 엔진 없음)</td></tr>
<tr><td><b>UI 컴포넌트</b></td><td>Radix Themes</td></tr>
<tr><td><b>애니메이션</b></td><td>Framer Motion + requestAnimationFrame</td></tr>
<tr><td><b>아이콘</b></td><td>Lucide React</td></tr>
<tr><td><b>3D 요소</b></td><td>Three.js + React Three Fiber + Drei</td></tr>
<tr><td><b>상태</b></td><td>React 훅 + localStorage (외부 라이브러리 없음)</td></tr>
<tr><td><b>호스팅</b></td><td>GitHub Pages (정적 export)</td></tr>
</tbody>
</table>

---

## 🚀 빠른 시작

### 필수 조건
- **Node.js** 18 이상
- **pnpm** (권장)

### 설치 및 실행

```bash
# 1. 클론
git clone https://github.com/sigco3111/Princeton-Tower-Defense.git
cd Princeton-Tower-Defense

# 2. 의존성 설치
pnpm install

# 3. 개발 서버 (localhost:3000)
pnpm dev

# 4. 프로덕션 빌드 + 정적 export → out/
pnpm build

# 5. 정적 호스팅 (예: npx serve out)
npx serve out
```

### 환경 변수

| 변수 | 설명 |
|---|---|
| `NEXT_PUBLIC_TD_DEV_PERF` | `"1"`로 설정하면 개발 성능 오버레이 활성화 (Ctrl+Shift+P) |

---

## 🏛️ 타워 (7종)

<table>
<thead>
<tr><th>타워</th><th>역할</th><th>1단계</th><th>2단계</th><th>3단계</th><th>4단계 선택</th></tr>
</thead>
<tbody>
<tr>
<td><b>나소 캐논</b></td>
<td>중포병</td>
<td>기본 캐논</td>
<td>강화 캐논 (1.5×)</td>
<td>중형 캐논 (2.2×)</td>
<td>기관총 / 화염방사기</td>
</tr>
<tr>
<td><b>파이어스톤 도서관</b></td>
<td>감속 + 제어</td>
<td>기본 도서관</td>
<td>강화 (40% 감속 + 마법)</td>
<td>고위 (60% 감속)</td>
<td>이쿼드 분쇄기 / 블리자드</td>
</tr>
<tr>
<td><b>이쿼드 연구소</b></td>
<td>연쇄 마법 DPS</td>
<td>테슬라 충격기 (3체인)</td>
<td>강화 (4체인)</td>
<td>테슬라 코일 (5체인)</td>
<td>집중 빔 / 체인 라이트닝</td>
</tr>
<tr>
<td><b>블레어 아치</b></td>
<td>음파 크레센도</td>
<td>크레센도 (4중첩)</td>
<td>공명 (6중첩, 1.4×)</td>
<td>포르테 (8중첩, 1.8×)</td>
<td>충격파 사이렌 / 심포니 홀</td>
</tr>
<tr>
<td><b>이팅 클럽</b></td>
<td>경제</td>
<td>8 PP/8초</td>
<td>12 PP/7초</td>
<td>20 PP/6초</td>
<td>투자 은행 / 모집 센터</td>
</tr>
<tr>
<td><b>딩키 정거장</b></td>
<td>부대 소환</td>
<td>보병</td>
<td>장갑 보병</td>
<td>정예 근위대</td>
<td>켄타우로스 궁수 / 중장 기병</td>
</tr>
<tr>
<td><b>팔머 박격포</b></td>
<td>공성 광역</td>
<td>박격포 (광역)</td>
<td>더 큰 장약</td>
<td>대형 무기</td>
<td>미사일 배터리 / 잿불 용광로</td>
</tr>
</tbody>
</table>

---

## 🦸 영웅 (9명)

<table>
<thead>
<tr><th width="20%">영웅</th><th width="15%">스타일</th><th width="25%">능력</th><th width="40%">설명</th></tr>
</thead>
<tbody>
<tr><td>🐯 <b>프린스턴 호랑이</b></td><td>근접 격투가</td><td>장엄한 포효 (광역 기절+공포)</td><td>캠퍼스의 상징. 엄청한적 광역 포효로 적들을 혼란에 빠뜨림</td></tr>
<tr><td>🎵 <b>아카펠라 테너</b></td><td>원거리 지원</td><td>고음 (음파 폭발+치유)</td><td>음파의 힘으로 적을 공격하고 아군 치유</td></tr>
<tr><td>🛡️ <b>매시 기사</b></td><td>탱커</td><td>요새 방패 (10초 무적+도발)</td><td>매시 홀의 수호자. 모든 적의 주의를 끔</td></tr>
<tr><td>🦝 <b>로키 라쿤</b></td><td>원거리 포격</td><td>바위 강타 (대규모 광역)</td><td>거대한 바위를 던져 적 무리를 쓸어버림</td></tr>
<tr><td>✍️ <b>F. 스콧</b></td><td>버퍼</td><td>영감의 환호 (강화)</td><td>문학적 영감을 불어넣어 타워 강화</td></tr>
<tr><td>⚔️ <b>머서 장군</b></td><td>지휘관</td><td>기사 소집 (기병 ×3)</td><td>화염에 휩싸인 지휘관. 충직한 기사 소환</td></tr>
<tr><td>🔧 <b>BSE 엔지니어</b></td><td>유틸리티</td><td>포탑 배치 (자동 방어)</td><td>공학 도서관에서 설계한 자동 포탑</td></tr>
<tr><td>🌿 <b>아이비 수호자</b></td><td>자연 화신</td><td>자연의 변환 (두 형태)</td><td>고딕 탑의 아이비를 구현한 고대 수호령</td></tr>
<tr><td>🌱 <b>덩굴</b></td><td>소환수</td><td>자연의 힘</td><td>자연의 힘으로 적을 휘감고 압도</td></tr>
</tbody>
</table>

---

## 🔮 주문과 환경 효과

### 6개 시전 주문

| 주문 | 효과 | 업그레이드 효과 |
|---|---|---|
| **화염구** | 광역 화염 피해 | + 피해량, + 광역 |
| **번개** | 연쇄 전기 피해 | + 체인 수 |
| **빙결** | 광역 빙결 (정지) | + 지속시간, + 광역 |
| **주문 방어막** | 광역 디버프 | + 효과 |
| **보급일** | 즉시 골드 | + 골드량 |

### 환경 위험 요소
- 🔥 **용암 웅덩이** — 화산 지역, 가만히 서 있는 적에게 지속 피해
- 🌫️ **소택지** — 습지에서 이동 속도 감소
- ❄️ **블리자드 구역** — 겨울에서 이동 속도 급감
- 🏛️ **특수 구조물** — 금고/신전/병영/비콘 (지역별 목표 추가)

---

## 🗺️ 월드맵과 진행 시스템

| 진행 시스템 |
|---|---|
| **인터랙티브 월드맵** | 영역 노드, 별 게이트 진행, 캠페인 개요 |
| **5개 바이옴** | 캠퍼스 → 습지 → 사막 → 겨울 → 화산 (순차 해제) |
| **26개 정교한 레벨** | 각 지역마다 고유한 도전 |
| **별 게이트** | 별을 모아 새 영역/챌린지/주문 업그레이드 해제 |

---

## 🎨 커스텀 레벨 제작 도구

내장된 맵 에디터로 자신만의 레벨을 디자인하고 플레이하세요:

- ✅ 경로 정의 (주/보조 경로)
- ✅ 타워 슬롯 배치
- ✅ 웨이브 구성 (몹 종류/수/타이밍)
- ✅ 환경 위험 및 목표 구조물
- ✅ 5개 테마 프리셋

---

## ♾️ 샌드박스 모드

테마가 있는 웨이워가 끝없이 생성되는 무한 모드:

| 특징 | 설명 |
|---|---|
| 시작 골드 | 10,000 파우 포인트 |
| 웨이브 | 무한 생성 |
| 테마 순환 | 다크 판타지 → 벌레 떼 → 야수 떼 |
| 보스 웨이브 | 5라운드마다 |
| 카오스 웨이브 | 10라운드마다 |

---

## 🏗️ 아키텍처

### 게임 루프

```
usePrincetonTowerDefenseRuntime (중앙 오케스트레이터)
├─ updateGame.ts (시뮬레이션)
│  ├─ 적 이동
│  ├─ 타워 타겟팅
│  ├─ 발사체 물리
│  ├─ 상태 효과
│  └─ 웨이브 생성
└─ renderScene.ts (렌더링)
   └─ 다중 레이어 Canvas 2D 파이프라인
```

### Canvas 2D 렌더링 파이프라인

| 레이어 | 캐시 | 갱신 빈도 |
|---|---|---|
| 정적 맵 (지형, 경로, 기본 장식) | ✅ 오프스크린 | 줌/리사이즈 시 |
| 장식 (나무, 바위, 구조물) | ✅ 오프스크린 | 줌/리사이즈 시 |
| 안개 + 분위기 | - | 매 프레임 |
| 엔티티 (타워, 적, 영웅, 파티클) | - | 매 프레임 |
| UI 오버레이 (사거리, 건설 메뉴) | - | 매 프레임 |

**품질 인지 렌더링**

---

## 📁 폴더 구조

<details>
<summary><b>전체 트리 보기</b></summary>

```
src/app/
├── components/
│   ├── creator/             # 커스텀 레벨 에디터
│   │   ├── components/      # 에디터 UI
│   │   ├── hooks/
│   │   ├── utils/           # 맵 IO, 드래프트
│   │   └── constants.ts
│   ├── landing/             # 랜딩 페이지
│   │   ├── sections/        # 히어로, 타워, 영웅 등
│   │   └── landingConstants.ts
│   ├── menus/               # 인게임 메뉴 모달
│   │   ├── world-map/       # 월드맵 렌더러
│   │   └── shared/          # 코드, 설정, 승패 화면
│   └── ui/                  # 인게임 UI
│       ├── hud/             # 상단 HUD, 영웅 주문 바
│       ├── primitives/      # BaseModal, OrnateFrame 등
│       ├── tooltips/        # 타워/적/영웅/환경 툴팁
│       ├── upgrades/        # 주문 업그레이드 모달
│       └── system/          # 테마 토큰, 공유 훅
├── constants/               # 정적 게임 데이터
│   ├── towers.ts            # 타워 스탯/업그레이드
│   ├── enemies.ts           # 적 스탯/웨이브 구성
│   ├── heroes.ts            # 영웅 능력
│   ├── spells.ts            # 주문 정의
│   ├── waves.ts             # 레벨별 웨이브
│   └── maps.ts              # 경로/위험/제약
├── game/                    # 핵심 게임 로직 (순수 함수)
│   ├── setup/, state/, spatial/, movement/
│   ├── status/, hazards/, progression.ts
├── rendering/               # Canvas 2D 그리기 함수
│   ├── towers/,, /enemies/, / heroes/
│   ├── effects/, decorations/, maps/, ui/
├── types/,, / utils/,, / seo/,, / customLevels/
```

</details>

---

## ⚠️ 알려진 한계

| # | 항목 | 설명 |
|---|---|---|
| 1 | **`updateGame.ts` 5,000줄+** | 단일 함수가 시뮬레이션 전체를 처리. 도메인별 모듈로 분할 필요 |
| 2 | **`renderDecorationItem.ts` 33,000줄+** | 모든 바이옴 장식이 한 파일. 레지스트리 패턴으로 리팩터 |
| 3 | **전역 가변 레지스트리** | `LEVEL_DATA`, `MAP_PATHS`가 런타임에 변경됨. 불변 컨텍스트로 교체 필요 |
| 4 | **고정 파티클 풀** | 풀 소진 시 효과이 누락. 동적 스케일링 또는 우선순위 기반 축출 |
| 5 | **`switch/case` 디스패치** | 새 엔티티 타입 추가 시 오류 발생. 레지스트리 맵 패턴 필요 |

---

## 🤝 기여하기

1. 저장소 포크
2. 기능 브랜치 생성: `git switch -c feature/your-feature`
3. 변경 후 `pnpm lint` 통과 확인
4. PR 열기 (명확한 설명 포함)

### 개발 팁

- `NEXT_PUBLIC_TD_DEV_PERF=1`로 성능 오버레이 활성화 (Ctrl+Shift+P)
- PR 전 `pnpm build`로 타입 오류 잡기
- 렌더링 함수는 순수 함수 유지 (state + ctx 받아 그리기)

---

## 📜 라이선스

이 저장소는 **MIT 라이선스** 하에 배포됩니다. ([LICENSE](LICENSE))

- **원본**: [Kevin-Liu-01/Princeton-Tower-Defense](https://github.com/Kevin-Liu-01/Princeton-Tower-Defense)
- **원작자**: Kevin Liu ([@kevskgs](https://x.com/kevskgs))
- **원본 라이브**: [https://princeton-tower-defense.vercel.app](https://princeton-tower-defense.vercel.app)
- **한글화 미러**: [sigco3111.github.io/Princeton-Tower-Defense](https://sigco3111.github.io/Princeton-Tower-Defense/)

### 🇰🇷 한글화 노트

- 모든 UI 텍스트를 한국어로 번역 (식별자는 영문 유지)
- 게임 로직, 자산, 디자인은 원작자의 창작물
- 기계 + 사람 협업 번역. 어색한 표현 발견 시 이슈 제보 환영

### 외부 라이브러리 고지

| 라이브러리 | 라이선스 | 저작권 |
|---|---|---|
| Next.js / React | MIT | Vercel / Meta |
| Three.js / R3F / Drei | MIT | Three.js Authors / Poimandres |
| Radix Themes | MIT | WorkOS |
| Framer Motion | MIT | Framer |
| Lucide React | ISC | Lucide Contributors |
| Tailwind CSS | MIT | Tailwind Labs |

---

<div align="center">

### 🎓 *Go Tigers!* 🐯

**[⭐ Star this repo](https://github.com/sigco3111/Princeton-Tower-Defense)** · **[🎮 Play now](https://sigco3111.github.io/Princeton-Tower-Defense/)** · **[🐛 Report bug](https://github.com/sigco3111/Princeton-Tower-Defense/issues)**

<sub>Made with ❤️ by the Korean localization community · sigco3111</sub>

</div>