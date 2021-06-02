<template>
  <q-item
    class="q-my-sm"
    clickable
    v-ripple
    :to="`/chat/${conversation.id}`"
    @click="handleClick"
  >
    <q-item-section avatar>
      <q-avatar
        color="primary"
        text-color="white"
        v-if="conversation.target.avatar"
      >
        <img :src="conversation.target.avatar" />
      </q-avatar>
      <q-avatar
        color="primary"
        icon="group"
        text-color="white"
        v-if="!conversation.target.avatar && conversation.type === 'group'"
      >
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ conversation.target.nickname }}</q-item-label>
      <q-item-label caption lines="1">
        <!-- {{
        conversation.messages[0] ?? ""
      }} -->
        {{ lastMessage }}
      </q-item-label>
    </q-item-section>

    <q-item-section side top>{{
      moment(conversation.activeTime).fromNow()
    }}</q-item-section>

    <q-item-section side>
      <q-icon name="chevron_right" />
    </q-item-section>
  </q-item>

  <q-separator />
</template>

<script lang="ts">
import type { IConversation } from "src/interface";
import { useStore } from "src/store";
import moment from "moment";
import "moment/locale/zh-cn";
import socket from "src/boot/socket";
import { computed, toRefs, onMounted, defineComponent, PropType } from "vue";

interface PropsType {
  conversation: IConversation;
}

export default defineComponent({
  props: {
    conversation: {
      type: Object as PropType<IConversation>,
      required: true,
    },
  },
  setup(props) {
    const { conversation } = toRefs(props);
    const store = useStore();

    const lastMessage = computed(() => {
      const length = conversation.value.messages.length;
      if (!length) {
        return "";
      }
      const message = conversation.value.messages[length - 1];

      switch (message.body.type) {
        case "text":
          return message.body.content;
        case "img":
          return "[图片]";
        case "video":
          return "[视频]";
        default:
          return "";
      }
    });

    function handleClick() {
      store.dispatch("user/doActiveUser", conversation.value.target);
    }

    onMounted(() => {
      socket.join(conversation.value.id);
    });

    return {
      conversation,
      handleClick,
      moment,
      lastMessage,
    };
  },
});
</script>

<style lang="scss" scoped></style>
