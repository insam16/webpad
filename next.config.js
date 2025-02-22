
// const withPWA = require("next-pwa")({
//   dest: "public", // PWA 서비스 워커 저장 위치
//   disable: process.env.NODE_ENV === "development", // 개발 환경에서는 PWA 비활성화
// });

// module.exports = withPWA({
//   reactStrictMode: true, // React Strict Mode 설정
// });

const withPWA = require('next-pwa');

const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // static HTML 내보내기 활성화
  images: {
    unoptimized: true  // GitHub Pages에서는 이미지 최적화를 사용할 수 없음
  },
  basePath: '/webpad',  // GitHub Pages에서 사용할 base path
};

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);

module.exports = pwaConfig;