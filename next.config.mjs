const __dirname = import.meta.dirname;

const SOCIAL_AND_SEO_BOTS =
  /Googlebot|GoogleOther|Google-Extended|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Twitterbot|facebookexternalhit|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot|Applebot|Pinterestbot|Bingbot|YandexBot|GPTBot|ChatGPT-User|ClaudeBot|anthropic-ai|PerplexityBot|Bytespider|CCBot|cohere-ai/;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages 정적 export — sigco3111.github.io/Princeton-Tower-Defense/
  // basePath는 서브경로 prefix를 위해 필요. assetPrefix는 _next 자산 경로.
  output: 'export',
  // gh-pages는 trailingSlash 없이도 동작하지만, 일부 라우트는 trailingSlash와 호환되도록
  trailingSlash: true,
  // 이미지 최적화 비활성화 (정적 export와 호환 안 됨)
  images: {
    unoptimized: true,
  },
  // gh-pages 서브경로 배포용
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