<template>
  <q-page class="q-pa-md row justify-center" ref="divRef">
    <div style="width: 100%">
      <template v-for="msg in messages" :key="msg.id">
        <q-chat-message
          v-if="msg.body.type === 'text'"
          :name="msg?.sender?.nickname"
          :text="[msg.body.content]"
          :sent="msg.isMe"
          :avatar="msg?.sender?.avatar"
          :stamp="moment(msg.createAt).fromNow()"
          :bg-color="!msg.isMe ? 'primary' : 'grey-3'"
        />

        <q-chat-message
          v-if="msg.body.type === 'img'"
          :name="msg?.sender?.nickname"
          :sent="msg.isMe"
          :avatar="msg?.sender?.avatar"
          :stamp="moment(msg.createAt).fromNow()"
          :bg-color="!msg.isMe ? 'primary' : 'grey-3'"
        >
          <img-viewer :url="msg.body.url" />
        </q-chat-message>

        <q-chat-message
          v-if="msg.body.type === 'video'"
          :name="msg?.sender?.nickname"
          :sent="msg.isMe"
          :avatar="msg?.sender?.avatar"
          :stamp="moment(msg.createAt).fromNow()"
          :bg-color="!msg.isMe ? 'primary' : 'grey-3'"
        >
          <video
            :src="msg.body.url"
            style="width: 100%; height: 100%; max-width: 400px"
            controls
          ></video>
        </q-chat-message>
      </template>
    </div>
    <q-footer>
      <q-toolbar>
        <q-form @submit="sendMessage" class="full-width">
          <q-input
            v-model="newMessage"
            bg-color="white"
            outlined
            rounded
            dense
            @blur="scrollToBottom"
            ref="input"
            autofocus
          >
            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                type="submit"
                color="white"
                icon="send"
                @click="sendMessage"
              />
              <q-btn
                round
                dense
                flat
                color="white"
                icon="add"
                @click="handleUploader"
              />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>

    <q-uploader
      style="display: none"
      :auto-upload="false"
      :multiple="false"
      @added="handleAdded"
      ref="uploader"
    />
  </q-page>
</template>

<script lang="ts" setup>
import { useStore } from "src/store";
import { useRoute } from "vue-router";
import { ref, computed, watch, nextTick, onMounted, reactive } from "vue";
import moment from "moment";

import ImgViewer from "src/components/ImgViewer.vue";

import socket from "src/boot/socket";
import { multipartUpload } from "src/utils/file-util";

const route = useRoute();
const store = useStore();
const divRef = ref<HTMLDivElement | null>(null);
const input = ref<HTMLInputElement | null>(null);

const { id } = route.params;

const messages = computed(() => {
  return (
    store.state.user.conversationList.find((c) => c.id === +id)?.messages || []
  );
});

const user = computed(() => store.state.user.user);
const activeUser = computed(() => store.state.user.activeUser);

const newMessage = ref("");

function sendMessage() {
  if (newMessage.value) {
    socket.sendMessage({
      conversationId: id,
      fromId: user.value?.id,
      toId: activeUser.value?.id,
      body: {
        type: "text",
        content: newMessage.value,
      },
    });
    newMessage.value = "";
  }
  input.value?.focus();
}

watch(
  () => store.state.user.conversationList,
  () => {
    if (!store.state.user.activeUser) {
      const co = store.state.user.conversationList.find((co) => co.id === +id);
      if (co) {
        store.dispatch("user/doActiveUser", co.target);
      }
      socket.join(+id);
    }
  }
);

watch(
  () => messages.value.length,
  () => scrollToBottom()
);

onMounted(async () => {
  await nextTick();
  scrollToBottom();
});

async function scrollToBottom() {
  if (divRef.value) {
    await nextTick();
    // @ts-ignore
    window.scrollTo(0, divRef.value.$el.scrollHeight);
  }
}

const msgBody = reactive({ type: "text", content: "" });

const uploader = ref<any>(null);

function handleUploader() {
  uploader.value.pickFiles();
}

async function handleAdded(files: File[]) {
  try {
    const res = await multipartUpload(files[0]);
    const ext = res!.name.split(".").pop()!;
    const url = res!.name;

    if (/png|jpg|gif|jpeg/.test(ext)) {
      // 图片类型 直接发送消息
      socket.sendMessage({
        conversationId: id,
        fromId: user.value?.id,
        toId: activeUser.value?.id,
        body: {
          type: "img",
          url,
          ext,
        },
      });
    }
    console.log(url, ext, "111");
    // tv_id!=".mp4"&&tv_id!=".rmvb"&&tv_id!=".avi"&&tv_id!=".ts")
    if (/mp4|rmvb|avi/.test(ext)) {
      // 视频类型
      socket.sendMessage({
        conversationId: id,
        fromId: user.value?.id,
        toId: activeUser.value?.id,
        body: {
          type: "video",
          url,
          ext,
        },
      });
    }
    uploader.value.reset();
    console.log(res);
  } catch (err) {}

  // imgUrl.value = res!.name;
  // // reset
  // uploader.value.reset();
}
</script>
