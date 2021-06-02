<template>
  <q-page class="q-py-md bg">
    <q-card flat class="q-mb-md" v-for="(post, idx) in list" :key="post.id">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="post.user.avatar" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ post.user.nickname }}</q-item-label>
          <q-item-label caption>
            {{ moment(post.createAt).fromNow() }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item> {{ post.content }}</q-item>

      <template v-if="post.comments.length">
        <q-separator />

        <div
          v-for="c in post.comments"
          :key="c.id"
          style="align-items: center; margin: 8px 16px"
        >
          <span>{{ c.user.nickname }}:</span>
          {{ c.content }}
        </div>
      </template>

      <q-item>
        <q-input
          class="full-width"
          label="评论"
          dense
          v-model="inputList[idx].value"
          @keyup.enter="sendComment(idx)"
        >
          <template v-slot:after>
            <q-btn
              round
              dense
              flat
              type="submit"
              icon="send"
              @click="sendComment(idx)"
            />
          </template>
        </q-input>
      </q-item>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref, computed, watch } from "vue";
import moment from "moment";
import { api } from "src/boot/axios";
import type { IUser } from "src/interface";
import { useStore } from "src/store";

const store = useStore();

const list = computed(() => {
  return store.state.user.communityList.map((c) => ({ ...c, value: "" }));
});

interface IInput {
  value: string;
}

function getInitList() {
  const len = list.value.length;
  const tmp = [];
  for (let i = 0; i < len; i++) {
    tmp.push({ value: "" });
  }
  return tmp;
}

const inputList = ref<IInput[]>(getInitList());

watch(
  () => store.state.user.communityList.length,
  (len) => {
    const tmp = [];
    for (let i = 0; i < len; i++) {
      tmp.push({ value: "" });
    }
    inputList.value = tmp;
  }
);

onMounted(() => {
  store.dispatch("user/doCommunityList");
});

async function sendComment(idx: number) {
  if (inputList.value[idx].value) {
    const res = await api.post("/chat/community/comment", {
      content: inputList.value[idx].value,
      communityId: list.value[idx].id,
    });
    if (res.data) {
      store.dispatch("user/doCommunityList");
      inputList.value[idx].value = "";
    }
  }
}
</script>

<style>
.bg {
  background: linear-gradient(180deg, #f3f3fb 0%, #fdfbfd 100%);
}
</style>
