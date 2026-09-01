# 인수인계 노트 (Handover)

이 문서는 Princeton Tower Defense 한글화 작업의 인수인계용 노트입니다.
다른 에이전트가 이 폴더를 이어받을 때 즉시 파악할 수 있도록 작성되었습니다.

---

## 📌 현재 상태 (2026-09-02)

- **저장소**: https://github.com/sigco3111/Princeton-Tower-Defense
- **라이브**: https://sigco3111.github.io/Princeton-Tower-Defense/
- **작업 폴더**: `~/Desktop/princeton-td/work/`
- **Notion 페이지**: https://app.notion.com/p/Princeton-Tower-Defense-3ce76f2e90978148bb78c2434e78d890
- **현재 gh-pages 상태**: ⚠️ 흰화면 + 404 에러 발생 중 (해결책 아래)

## 🚨 흰화면 문제 — 가장 중요한 함정

### 증상
- 사용자가 라이브(`/bog/` 등)에서 검은/흰 화면 + 콘솔 30개 404 확인
- 모든 자산이 `https://sigco3111.github.io/...` (basePath 없는 루트 경로)로 요청됨
- 하지만 빌드된 자산은 `https://sigco3111.github.io/Princeton-Tower-Defense/...`에만 존재
- 결과: 30개 404

### 원인 (확정됨)
**Next.js 16 + `output: 'export'`에서 public/ 폴더 자산은 basePath를 무시하고 절대 경로로 출력됩니다.**

- `/_next/static/chunks/*.js` (CSS/JS): ✅ basePath 자동 적용
- `/images/*.png`, `/favicon.ico`, `/manifest.webmanifest`: ❌ basePath 무시

### 해결책 (이미 구현됨)
**`scripts/fix-gh-pages-paths.mjs`** — post-build 스크립트로 43개 HTML/JS 파일의 public/ 자산 경로에 `/Princeton-Tower-Defense` prefix를 일괄 추가.

```bash
pnpm build  # 자동으로 next build + fix-gh-pages-paths 실행
```

### 다음 에이전트가 할 일
1. `pnpm install` (의존성 설치)
2. `pnpm build` (자동으로 fix-gh-pages-paths 실행됨)
3. `~/Desktop/princeton-td/gh-pages-deploy/` 폴더에 out/ 내용 복사 후 gh-pages에 푸시
4. 사용자에게 강력 새로고침 안내 (Ctrl+Shift+R / Cmd+Shift+R)

---

## 📁 작업 폴더 구조

```
~/Desktop/princeton-td/
├── work/                    # 메인 작업 폴더 (Git repo, main 브랜치)
│   ├── src/                 # 게임 소스 (16,472줄 상수 + 컴포넌트)
│   ├── public/              # 게임 자산 (296MB)
│   ├── scripts/
│   │   └── fix-gh-pages-paths.mjs   # ★ post-build basePath 변환 스크립트
│   ├── next.config.mjs      # output: 'export' + basePath: '/Princeton-Tower-Defense'
│   ├── package.json         # build: next build && pnpm build:fix-paths
│   ├── pnpm-workspace.yaml  # packages: ['.']
│   ├── README.md            # 한글 README (24KB)
│   ├── README.en.md         # 원본 보존
│   ├── LICENSE              # 원본 MIT
│   └── LICENSE.md           # 한글 번역
│
└── gh-pages-deploy/         # gh-pages 브랜치 push용 임시 폴더
    └── (out/ 내용 복사 후 git init -b gh-pages + push -f)
```

## 🔧 핵심 설정 변경사항

### 1. `next.config.mjs`
```js
{
  output: 'export',           // 정적 export
  trailingSlash: true,        // /bog/index.html 형태로 빌드 (서브라우트 정상 작동)
  images: { unoptimized: true },
  basePath: '/Princeton-Tower-Defense',      // JS/CSS에 적용됨
  assetPrefix: '/Princeton-Tower-Defense/',  // 동일
  // public/ 자산은 basePath 무시 → scripts/fix-gh-pages-paths.mjs로 후처리
}
```

### 2. 동적 라우트 force-static (Next.js 16 제약)
다음 파일에 `export const dynamic = "force-static"` 추가:
- `src/app/robots.ts`
- `src/app/manifest.ts`
- `src/app/sitemap.ts`
- `src/app/og/route.tsx`

### 3. pnpm-workspace.yaml
```yaml
packages:
  - '.'
ignoredBuiltDependencies:
  - sharp
  - unrs-resolver
```
(단일 패키지로 인식하도록)

### 4. 한글화 상태
- ✅ 모든 표시 텍스트(name/desc/description/effect/label/title/message) 한국어화
- ✅ 식별자(id/type 키) 영문 유지
- ✅ 약 1,328개 자동 변환 사전 + 5개 subagent 수동 번역
- ✅ enemies.ts 284개 / spells.ts 26개 / towers.ts 27개 / components 333개
- ✅ SEO 메타데이터 한국어 (SITE_NAME, description, og, twitter)
- ✅ `<html lang="ko">`
- ✅ 한자 0건

## 📝 커밋 이력

```
93d1ec6 Cleanup: 빌드 산출물 추적 제거 + .gitignore 강화
93327d3 Auto-fix: public/ 자산 경로 basePath 변환 스크립트 추가
06714f2 Fix gh-pages 404: public/ 자산에 basePath 적용 (Next.js 16 제약)
fb57a81 추가 한글화: creator + HUD 마이크로 텍스트 (8개 항목)
cbcbe29 Princeton Tower Defense 한글화 미러 (sigco3111)
```

## ⚠️ 절대 하지 말 것

1. **`pnpm build` 후 out/ 폴더를 `git add .`로 커밋하지 말 것** — .gitignore가 차단하지만 검증 필수
2. **`basePath`만 제거하지 말 것** — subpath 호스팅이라 basePath 필수. post-build 스크립트로 해결
3. **`pnpm dev`로 dev 서버 띄워서 테스트하지 말 것** — R3F SSR 에러로 인한 복잡함. 빌드 결과물로만 검증
4. **`'use client'` 추가하지 말 것** — 기존 구조가 작동하니 건드리지 말 것
5. **큰 미디어(영상/이미지) 무분별 추가하지 말 것** — GitHub 1GB 한도 보호. 현재 609MB

## ✅ 권장 작업 흐름

```bash
cd ~/Desktop/princeton-td/work

# 1. 의존성 설치
pnpm install

# 2. 빌드 (자동으로 fix-gh-pages-paths 실행)
pnpm build
# → out/ 폴더 생성 (352MB)

# 3. gh-pages로 배포
cd ~/Desktop/princeton-td/gh-pages-deploy
rm -rf * .[^.]* 2>/dev/null
cp -r /Users/mac/Desktop/princeton-td/work/out/* .
git init -q -b gh-pages  # 없으면
git config user.email "sigco3111@users.noreply.github.com"
git config user.name "sigco3111"
git remote add origin https://github.com/sigco3111/Princeton-Tower-Defense.git
git add . && git commit -m "Deploy: ..."
git push -f origin gh-pages

# 4. 검증
curl -s -o /dev/null -w "HTTP %{http_code}\n" https://sigco3111.github.io/Princeton-Tower-Defense/_next/static/chunks/<hash>.js
# → 200이어야 정상
```

## 🔍 검증 스크립트

```bash
# 한자 검출 (0이어야 정상)
grep -rnE '[一-鿿]+' src/app/

# 진짜 영문 잔여 (코드/색상 제외)
grep -rhE ':\s*"[A-Za-z][^"]{30,}"' src/app/ | grep -vE 'http|bg-|text-|linear-gradient|rgba'

# 한국어 비율
grep -rE '[가-힣]' src/app/ | wc -l
```

## 📞 연락처 / 환경

- GitHub: sigco3111
- Notion DB: `3c976f2e-9097-815f-9601-c34e47d30334` (깃허브 관리)
- 메인 작업자: 헬린 (MiniMax M3)

## 🎯 현재 미해결

1. **흰화면 / 404 에러** — 위 해결책 적용 후에도 사용자 환경에서 미해결. 다른 에이전트의 추가 진단 필요.
2. **푸시 결과**: main `93d1ec6`, gh-pages는 마지막 성공 빌드(`afac967`) 그대로. 다음 빌드 + fix 스크립트 + 강제 푸시로 해결 가능할 수 있음.

---

생성: 2026-09-02 (헬린)
용도: 다른 에이전트로 인수인계