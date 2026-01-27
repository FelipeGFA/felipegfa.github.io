<!--
  Copyright (c) The Tachiyomi Open Source Project
  SPDX-License-Identifier: MPL-2.0
-->

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useMediaQuery } from '@vueuse/core'

import {
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElSelect,
} from 'element-plus'

import { langName, simpleLangName } from '../../utils/languages'
import type { Extension } from '../../queries/useExtensionsRepositoryQuery'

export type Nsfw = 'Show all' | 'NSFW' | 'SFW'
export type Sort = 'Ascending' | 'Descending'

const props = defineProps<{
  extensions: Extension[][]
  search: string
  lang: string[]
  nsfw: Nsfw
  sort: Sort
}>()

defineEmits<{
  (e: 'update:search', search: string): void
  (e: 'update:lang', lang: string[]): void
  (e: 'update:nsfw', nsfw: Nsfw): void
  (e: 'update:sort', sort: Sort): void
}>()

const { extensions } = toRefs(props)

const isSmallScreen = useMediaQuery('(max-width: 767px)')
const labelPosition = computed(() => isSmallScreen.value ? 'top' : 'right')
</script>

<template>
  <ClientOnly>
    <div class="filters-list">
      <ElForm label-width="150px" :label-position="labelPosition">
        <ElFormItem label="Buscar:">
          <ElInput
            :model-value="search"
            placeholder="Buscar extensões por nome ou ID..."
            clearable
            @update:model-value="$emit('update:search', $event)"
          />
        </ElFormItem>
        <ElFormItem label="Idiomas:">
          <ElSelect
            :model-value="lang"
            placeholder="Mostrar idiomas específicos..."
            multiple
            clearable
            @update:model-value="$emit('update:lang', $event)"
          >
            <ElOption
              v-for="[group] in extensions"
              :key="group.lang"
              :label="group.lang === 'en' ? simpleLangName(group.lang) : langName(group.lang)"
              :value="group.lang"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="Ordenar:">
          <ElRadioGroup
            :model-value="sort"
            @update:model-value="$emit('update:sort', $event)"
          >
            <ElRadio label="Ascending">Crescente</ElRadio>
            <ElRadio label="Descending">Decrescente</ElRadio>
          </ElRadioGroup>
        </ElFormItem>
        <ElFormItem label="Exibição:">
          <ElRadioGroup
            :model-value="nsfw"
            @update:model-value="$emit('update:nsfw', $event)"
          >
            <ElRadio label="NSFW">+18</ElRadio>
            <ElRadio label="SFW">Seguro</ElRadio>
            <ElRadio label="Show all">Todos</ElRadio>
          </ElRadioGroup>
        </ElFormItem>
      </ElForm>
    </div>
  </ClientOnly>
</template>

<style lang="stylus">
.filters-list {
  display: flex
  flex-direction: column
  row-gap: 1rem
}

.el-select {
  width: 100%
}
</style>