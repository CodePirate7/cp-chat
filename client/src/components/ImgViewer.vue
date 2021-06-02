<template>
  <q-img
    :src="url"
    style="width: 100%; min-width: 300px"
    fit="cover"
    @click="showImg"
  />
  <q-dialog
    v-model="show"
    full-width
    full-height
    @click="hideImg"
    style="padding: 0"
    class="dialog"
  >
    <q-img :src="url" @click="hideImg" fit="contain" />
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ImgViewer",
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  setup() {
    const show = ref(false);

    function showImg() {
      show.value = true;
    }
    function hideImg() {
      show.value = false;
    }
    return {
      show,
      showImg,
      hideImg,
    };
  },
});
</script>

<style lang="scss">
.dialog {
  .q-dialog__inner--minimized {
    padding: 0 !important;
  }
}

.q-dialog__inner--minimized {
  padding: 0 !important;
}
</style>
