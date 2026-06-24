<!--
  Copyright (c) The Tachiyomi Open Source Project
  SPDX-License-Identifier: MPL-2.0
-->

<script setup lang="ts">
import { GITHUB_EXTENSION_MIN_JSON_ANI } from "../../config/constants";
import { onMounted, ref } from "vue";

const isAndroid = ref(true);

onMounted(() => {
  isAndroid.value = !!navigator.userAgent.match(/android/i);
});

function handleAnalytics() {
  window.goatcounter?.count?.({
    path: "/#add-to-aniyomi",
    title: "Add extension repository",
  });
}
</script>

<template>
  <div v-if="!isAndroid">
    <div class="custom-block warning">
      <p class="custom-block-title">
        Sistema operacional não suportado
      </p>
      <p>
        <strong>Mihon/Aniyomi</strong> é apenas um <strong>aplicativo Android</strong>.
        Use um <strong>dispositivo Android com Mihon/Aniyomi instalado</strong> para
        adicionar este repositório de extensões.
      </p>
    </div>
  </div>
  <div v-else>
    <div class="action-buttons">
      <a
        class="action-button primary"
        :href="`aniyomi://add-repo?url=${encodeURIComponent(GITHUB_EXTENSION_MIN_JSON_ANI)}`"
        @click="handleAnalytics"
      >
        <span class="text">Adicionar repositório</span>
      </a>
    </div>
    <span class="version-disclaimer">
      Requer <strong>Aniyomi</strong> ou variantes recentes.
    </span>
  </div>
</template>

<style lang="stylus">
.action-buttons {
  display: flex
  gap: 0.75em
  justify-content: center
  align-items: center
  margin: 0.75em auto
}

.action-button {
  display: inline-block
  border: 1px solid transparent
  text-align: center
  font-weight: 600
  white-space: nowrap
  transition: color 0.25s, border-color 0.25s, background-color 0.25s
  cursor: pointer
  transition: all 0.3s ease
  border-radius: 20px
  padding: 0 20px
  line-height: 38px
  font-size: 14px

  &:hover {
    text-decoration: none !important
  }

  &.primary {
    border-color: var(--vp-button-brand-border)
    color: var(--vp-button-brand-text)
    background-color: var(--vp-button-brand-bg)

    &:hover {
      border-color: var(--vp-button-brand-hover-border)
      color: var(--vp-button-brand-hover-text)
      background-color: var(--vp-button-brand-hover-bg)
    }

    &:active {
      border-color: var(--vp-button-brand-active-border)
      color: var(--vp-button-brand-active-text)
      background-color: var(--vp-button-brand-active-bg)
    }
  }

  &.secondary {
    border-color: var(--vp-button-alt-border)
    color: var(--vp-button-alt-text)
    background-color: var(--vp-button-alt-bg)

    &:hover {
      border-color: var(--vp-button-alt-hover-border)
      color: var(--vp-button-alt-hover-text)
      background-color: var(--vp-button-alt-hover-bg)
    }

    &:active {
      border-color: var(--vp-button-alt-active-border)
      color: var(--vp-button-alt-active-text)
      background-color: var(--vp-button-alt-active-bg)
    }
  }

  svg {
    display: inline-block
    vertical-align: middle
    margin-right: 0.5em
    font-size: 1.25em
  }

  .version {
    font-size: 0.8em
  }
}

.version-disclaimer {
  display: block
  text-align: center
  margin: 0.75em auto
  font-size: 0.75rem
}
</style>
