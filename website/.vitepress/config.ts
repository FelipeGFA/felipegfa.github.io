// SPDX-License-Identifier: Apache-2.0

import { defineConfig, loadEnv } from 'vitepress'
import ElementPlus from 'unplugin-element-plus/vite';

import generateMeta from './config/hooks/generateMeta';

const env = loadEnv('', process.cwd());
const hostname: string = env.VITE_HOSTNAME || 'http://localhost:4173';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FelipeGFA",
  description: "Um repositório não oficial de extensões para Mihon e variantes.",
  cleanUrls: true,
  transformHead: (context) => {
    context.head.push(['meta', { name: 'robots', content: 'noindex, nofollow' }]);
    context.head.push(...generateMeta(context, hostname));
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/FelipeGFA/extensoes',
        ariaLabel: 'Projeto GitHub',
      },
      {
        icon: 'discord',
        link: 'https://discord.gg/QpyjwsWENq',
        ariaLabel: 'Discord server',
      },
    ],
  },
  vite: {
    plugins: [ElementPlus({})],
    ssr: {
      noExternal: ['element-plus'],
    }
  }
})
