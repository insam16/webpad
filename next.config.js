// /** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa');

// const nextConfig = {
//   reactStrictMode: true,
// };
// ``
// const pwaConfig = withPWA({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV === 'development',
// })(nextConfig);

// module.exports = pwaConfig;




const withPWA = require("next-pwa")({
  dest: "public", // PWA 서비스 워커 저장 위치
  disable: process.env.NODE_ENV === "development", // 개발 환경에서는 PWA 비활성화
});

module.exports = withPWA({
  reactStrictMode: true, // React Strict Mode 설정
});
