<template>
  <q-page>
    <iframe :src="app?.url" frameborder="0" width="100%" height="700"></iframe>
  </q-page>
</template>

<script setup lang="ts">
import { useStore } from "src/store";
import { computed } from "vue";

const store = useStore();

const app = computed(() => store.state.user.activeApp);
</script>

<style lang="scss" scoped></style>
