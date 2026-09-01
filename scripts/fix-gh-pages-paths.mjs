#!/usr/bin/env node
// scripts/fix-gh-pages-paths.mjs
//
// Next.js 16 + output: 'export'에서 public/ 폴더 자산(이미지, favicon, manifest)은
// basePath 설정과 무관하게 절대 경로(/images/...)로 출력됨. JS/CSS 청크만
// basePath 적용. 서브경로 호스팅(github.io/user/repo)에서는 이 자산을 찾지 못해
// 404 발생.
//
// 이 스크립트는 out/ 안의 HTML/JS/CSS/webmanifest 파일에서 public/ 자산 경로에
// /Princeton-Tower-Defense prefix를 일괄 추가한다.
//
// 사용법: pnpm build:fix-paths (pnpm build 시 자동 실행)

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const BASE_PATH = "/Princeton-Tower-Defense";
const OUT_DIR = "out";
const TARGET_EXTENSIONS = [".html", ".js", ".css", ".webmanifest", ".txt"];

function walk(dir) {
  const results = [];
  for (const name of readdirSync(dir)) {
    if (name === "_next" || name === "node_modules") continue;
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      results.push(...walk(path));
    } else if (TARGET_EXTENSIONS.some((ext) => name.endsWith(ext))) {
      results.push(path);
    }
  }
  return results;
}

function patch(path) {
  let content = readFileSync(path, "utf-8");
  const original = content;

  // public/ 자산 경로만 basePath 추가 (CSS/JS 청크는 Next.js가 이미 처리)
  content = content.replace(
    /(?<!\/Princeton-Tower-Defense)\/images\//g,
    `${BASE_PATH}/images/`,
  );
  content = content.replace(
    /(?<!\/Princeton-Tower-Defense)\/favicon\.ico/g,
    `${BASE_PATH}/favicon.ico`,
  );
  content = content.replace(
    /(?<!\/Princeton-Tower-Defense)\/manifest\.webmanifest/g,
    `${BASE_PATH}/manifest.webmanifest`,
  );

  if (content !== original) {
    writeFileSync(path, content, "utf-8");
    return true;
  }
  return false;
}

let patched = 0;
for (const file of walk(OUT_DIR)) {
  if (patch(file)) patched++;
}

console.log(`✓ fix-gh-pages-paths: ${patched}개 파일에 basePath 추가됨 (${BASE_PATH})`);