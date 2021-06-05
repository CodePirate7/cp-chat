<template>
  <q-page>
    <div class="q-ma-md" v-for="(item, idx) in appList" :key="idx">
      <div class="text-subtitle1 text-bold q-mb-sm">{{ item.label }}</div>
      <div class="row">
        <div
          class="column col-3 q-mt-sm items-center"
          v-for="(app, appIndex) in item.apps"
          :key="appIndex"
          @click="handleAppClick(app)"
        >
          <q-avatar
            color="primary"
            text-color="white"
            :icon="app.icon"
            class="q-mb-xs"
          ></q-avatar>
          <div>{{ app.label }}</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useStore } from "src/store";
import { useRouter } from "vue-router";

interface IApp {
  label: string;
  url: string;
  icon: string;
}
const appList = [
  {
    label: "信息同步",
    apps: [
      {
        label: "公告",
        url: "http://www.baidu.com",
        icon: "campaign",
      },
      {
        label: "任务通知",
        url: "http://www.baidu.com",
        icon: "task",
      },
      {
        label: "项目代办",
        url: "http://www.baidu.com",
        icon: "task_alt",
      },
      {
        label: "联系人",
        url: "http://www.baidu.com",
        icon: "supervised_user_circle",
      },

      {
        label: "自动通知",
        url: "http://www.baidu.com",
        icon: "circle_notifications",
      },
    ],
  },
  {
    label: "员工服务",
    apps: [
      {
        label: "个人信息看板",
        url: "http://www.baidu.com",
        icon: "perm_identity",
      },
      {
        label: "休假申请",
        url: "http://www.baidu.com",
        icon: "flight_land",
      },
    ],
  },
];

const store = useStore();
const router = useRouter();
const handleAppClick = (app: IApp) => {
  console.log("click", app);
  store.commit("user/doActiveApp", app);

  router.push("/app");
};
</script>

<style lang="scss" scoped></style>
