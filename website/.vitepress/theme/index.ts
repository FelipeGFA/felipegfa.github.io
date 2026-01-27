// SPDX-License-Identifier: Apache-2.0

import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { VueQueryPlugin } from '@tanstack/vue-query';

import './styles/base.styl';
import 'element-plus/theme-chalk/dark/css-vars.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(VueQueryPlugin);
  },
} satisfies Theme
