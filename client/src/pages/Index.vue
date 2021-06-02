<template>
  <q-page>
    <q-list>
      <template v-for="item in conversationList" :key="item.id">
        <conversation-item :conversation="item" />
      </template>
    </q-list>
  </q-page>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "src/store";
import ConversationItem from "../components/ConversationItem.vue";
import moment from "moment";

const store = useStore();

const conversationList = computed(() => {
  const list = store.state.user.conversationList;
  list.sort((a, b) => {
    if (moment(a.activeTime).isSame(b.activeTime)) {
      return 0;
    }
    if (moment(a.activeTime).isBefore(b.activeTime)) {
      return 1;
    }
    return -1;
  });
  return list;
});
</script>
