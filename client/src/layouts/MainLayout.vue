<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-avatar v-if="!isNeedBack">
          <img :src="user?.avatar" />
        </q-avatar>

        <q-btn
          v-else
          flat
          round
          icon="arrow_back"
          color="primary"
          text-color="white"
          to="/"
        />

        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>

        <q-btn
          class="absolute-right q-pr-sm"
          icon="add"
          no-caps
          flat
          dense
          v-if="path === '/'"
          @click="toggle"
        ></q-btn>

        <q-btn
          class="absolute-right q-pr-sm"
          icon="add"
          no-caps
          flat
          dense
          v-if="path === '/found/community'"
          @click="toggle"
        ></q-btn>
        <!-- <q-btn
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          v-if="path === '/'"
        > -->
        <!-- Logout<br /> -->
        <!-- {{ user?.email.split("@")[0] }} -->
        <!-- </q-btn> -->
        <!-- <div class="absolute-right q-pr-sm row flex-center">
          {{ user?.email.split("@")[0] }}
        </div> -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered v-if="!path.includes('chat')">
      <q-tabs v-model="tab" narrow-indicator dense align="justify">
        <q-route-tab
          :ripple="false"
          name="mails"
          icon="chat"
          label="消息"
          to="/"
          exact
        />
        <q-route-tab
          :ripple="false"
          name="alarms"
          icon="apps"
          label="应用"
          to="/apps"
        />
        <q-route-tab
          :ripple="false"
          name="movies"
          icon="grade"
          label="发现"
          to="/found"
        />
        <q-route-tab
          :ripple="false"
          name="user"
          icon="person"
          label="个人"
          to="/my"
        />
      </q-tabs>
    </q-footer>

    <q-dialog v-model="drawer" full-width full-height>
      <div class="bg-white q-pa-md" v-if="path === '/found/community'">
        <q-input
          v-model="editor"
          type="textarea"
          placeholder="在这里说些什么吧"
          :rows="30"
          @keyup.enter="handleSubmit"
        />

        <div class="text-right q-mt-md">
          <q-btn class="q-mr-md" @click="hide">取消</q-btn>
          <q-btn color="primary" @click="handleSubmit">发送</q-btn>
        </div>
      </div>

      <create-group v-if="path === '/'" @ok="hide" />
    </q-dialog>
  </q-layout>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import socket from "src/boot/socket";
import { useStore } from "src/store";
import CreateGroup from "../components/CreateGroup.vue";
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  onUnmounted,
  reactive,
} from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "MainLayout",
  components: {
    CreateGroup,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const drawer = ref(false);
    const router = useRouter();
    const $q = useQuasar();

    const initState = {
      email: "",
      password: "",
      confirmPassword: "",
      nickName: "",
      avatar: "",
    };

    const isNeedBack = computed(() => {
      const path = route.fullPath;
      const pass = ["/", "/found", "/my", "/apps"];
      return !pass.some((p) => p === path);
    });

    const form = reactive({ ...initState });

    const editor = ref("");

    onMounted(async () => {
      if (!store.state.user.user) {
        // 未获取用户信息
        const isSuccess = await store.dispatch("user/doCurrentUser");
        console.log(isSuccess);
        isSuccess ? socket.connect(store) : router.push("/login");
      }
    });

    onUnmounted(() => {
      console.log("注销");
      socket.disconnect();
    });

    function hide() {
      drawer.value = false;
    }

    function show() {
      drawer.value = true;
    }

    async function handleSubmit() {
      if (editor.value) {
        const res = await api.post("/chat/community", {
          content: editor.value,
        });

        if (res.data) {
          $q.notify({
            type: "positive",
            message: "发布成功",
          });
          store.dispatch("user/doCommunityList");
          drawer.value = false;
        }
      }
    }

    return {
      user: computed(() => store.state.user.user),
      title: computed(() => {
        let currentPath = route.fullPath;
        if (currentPath === "/") return "消息";
        else if (currentPath.includes("/chat"))
          // @ts-ignore
          return store.state.user.activeUser?.nickname;
        else if (currentPath.includes("/community")) return "社区";
        else if (currentPath.includes("/found")) return "发现";
        else if (currentPath.includes("/my")) return "个人资料";
        else if (currentPath.includes("/apps")) return "应用";
        else if (currentPath === "/app")
          return store.state.user.activeApp?.label;
      }),
      path: computed(() => route.fullPath),
      tab: ref("mails"),
      drawer,

      toggle: () => {
        drawer.value = !drawer.value;
      },
      hide,
      show,
      handleSubmit,
      editor,
      form,
      isNeedBack,
    };
  },
});
</script>
