const __dirname = import.meta.dirname;

const SOCIAL_AND_SEO_BOTS =
  /Googlebot|GoogleOther|Google-Extended|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Twitterbot|facebookexternalhit|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot|Applebot|Pinterestbot|Bingbot|YandexBot|GPTBot|ChatGPT-User|ClaudeBot|anthropic-ai|PerplexityBot|Bytespider|CCBot|cohere-ai/;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages 정적 export — sigco3111.github.io/Princeton-Tower-Defense/
  // 서브경로 호스팅이라 basePath가 필요. basePath 없으면 브라우저가 루트에서
  // 자산을 찾으려고 해서 404 발생. trailingSlash로 /bog/index.html 형태로 빌드.
  output: 'export',
  // sub-route(/bog/, /codex/ 등)가 gh-pages에서 정상 작동하도록 강제
  trailingSlash: true,
  // 이미지 최적화 비활성화 (정적 export와 호환 안 됨)
  images: {
    unoptimized: true,
  },
  // gh-pages 서브경로 배포용 (필수)
  basePath: '/Princeton-Tower-Defense',
  assetPrefix: '/Princeton-Tower-Defense/',

  htmlLimitedBots: SOCIAL_AND_SEO_BOTS,
  async rewrites() {
    return [{ source: "/og.png", destination: "/og" }];
  },
  headers() {
    return [
      {
        source: "/og",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  turbopack: {
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
export default nextConfig;