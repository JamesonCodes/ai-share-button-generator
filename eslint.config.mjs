import nextConfig from 'eslint-config-next';

const config = [
  ...nextConfig,
  {
    ignores: ['public/share.js'],
  },
];

export default config;
