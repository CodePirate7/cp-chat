<template>
  <!-- 我的资料页面 -->
  <!-- <q-page> 我的资料页面 </q-page> -->

  <q-page class="q-py-md">
    <q-list>
      <!-- <q-separator /> -->

      <q-item clickable v-ripple @click="show = true">
        <q-item-section>头像</q-item-section>
        <q-item-section avatar>
          <q-avatar>
            <img :src="userinfo?.avatar" />
          </q-avatar>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable v-ripple>
        <q-item-section>昵称</q-item-section>
        <q-item-section side> {{ userinfo?.nickName }} </q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable v-ripple>
        <q-item-section>性别</q-item-section>
        <q-item-section side> 男 </q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable v-ripple>
        <q-item-section>邮箱</q-item-section>
        <q-item-section side> {{ userinfo?.email }} </q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable v-ripple>
        <q-item-section>加入时间</q-item-section>
        <q-item-section side> 2021-05-28 </q-item-section>
      </q-item>

      <q-separator />
    </q-list>

    <q-dialog v-model="show" position="bottom">
      <q-card>
        <q-list>
          <q-item clickable v-ripple>
            <q-item-section class="text-center text-subtitle1"
              >更换头像</q-item-section
            >
          </q-item>
        </q-list>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { useStore } from "src/store";
import { computed, ref } from "vue";

const store = useStore();

const userinfo = computed(() => store.state.user.user);

const show = ref(false);
</script>

<style lang="scss" scoped></style>
