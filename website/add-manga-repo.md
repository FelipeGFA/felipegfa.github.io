---
# SPDX-License-Identifier: Apache-2.0
title: "Add repository"
description: "Add this repository to the app"
lastUpdated: false
editLink: false
prev: false
next: false
---

<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { GITHUB_EXTENSION_MIN_JSON } from "./.vitepress/config/constants";

    const isAndroid = ref(true);
    const url = ref(GITHUB_EXTENSION_MIN_JSON);

    onMounted(() => {
        isAndroid.value = !!navigator.userAgent.match(/android/i);

        if (isAndroid.value) {
            window.goatcounter?.count?.({
                path: "/#add-to-tachiyomi",
                title: "Add extension repository",
            });

            window.location.replace(`tachiyomi://add-repo?url=${encodeURIComponent(GITHUB_EXTENSION_MIN_JSON)}`);
        }
    });
</script>

<div v-if="isAndroid">
    Você deve ser redirecionado para o aplicativo em instantes. Recarregue a página se não funcionar,
    ou adicione o repositório manualmente usando este link:
</div>
<div v-else>
    Sistema operacional não suportado. Mihon/Aniyomi é um aplicativo <strong>Android</strong>. Por favor, adicione
    o repositório manualmente usando este link:
</div>

<a :href="url">{{ url }}</a>
