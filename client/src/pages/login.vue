<template>
  <div class="q-pa-md">
    <h1 class="title">CP-Chat</h1>
    <div class="subtitle">登录</div>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input v-model="email" placeholder="输入邮箱地址" lazy-rules outlined />

      <q-input
        v-model="password"
        :type="isPwd ? 'password' : 'text'"
        placeholder="输入密码"
        outlined
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div class="submit">
        <q-btn
          label="提交"
          type="submit"
          color="primary"
          class="full-width"
          size="lg"
        />
      </div>
    </q-form>
    <div class="text">
      还没有账号？
      <router-link to="/register"> 去注册 </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { api } from "boot/axios";
import { useStore } from "src/store";
import socket from "src/boot/socket";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const store = useStore();

    const email = ref("");
    const password = ref("");
    const isPwd = ref(true);

    return {
      email,
      password,
      isPwd,
      onSubmit() {
        api
          .request({
            url: "/users/signin",
            method: "POST",
            data: {
              email: email.value,
              password: password.value,
            },
          })
          .then(async (res) => {
            await store.dispatch("user/doCurrentUser");
            socket.connect(store);
            router.push("/");
          });
      },

      onReset() {
        email.value = "";
        password.value = "";
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 48px;
  color: #243443;
  margin-bottom: 40px;
}
.subtitle {
  /* Text/18.SemiBold */

  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  text-align: center;

  /* Black/Black */

  color: #243443;
  margin-bottom: 40px;
}
.submit {
  margin-top: 200px;
  margin-bottom: 30px;
}
.text {
  /* Text/14.Medium */

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  text-align: center;

  /* Black/Black */

  color: #243443;
  a {
    font-weight: bold;
    font-weight: 500;
    font-size: 14px;
    color: #377dff;
    text-decoration: none;
  }
}
</style>
