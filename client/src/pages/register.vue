<template>
  <div class="q-pa-md">
    <h1 class="title">CP-Chat</h1>
    <div class="subtitle">注册</div>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="text-center" @click="handleUploader">
        <q-avatar size="100px" v-if="imgUrl">
          <img :src="imgUrl" />
        </q-avatar>
        <q-avatar size="100px" icon="add" style="border: 1px solid #aaa" v-else>
        </q-avatar>
      </div>

      <q-uploader
        style="display: none"
        :auto-upload="false"
        :multiple="false"
        @added="handleAdded"
        ref="uploader"
      />

      <q-input
        v-model="form.email"
        placeholder="请输入邮箱地址"
        lazy-rules
        outlined
        :rules="[
          (val) => !!val || '邮箱地址不可为空',
          (val) =>
            /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/.test(
              val
            ) || '邮箱格式不正确',
        ]"
      />
      <q-input
        v-model="form.nickName"
        placeholder="请输入昵称"
        lazy-rules
        outlined
        :rules="[(val) => !!val || '昵称不可为空']"
      />

      <q-input
        v-model="form.password"
        :type="isPwd ? 'password' : 'text'"
        placeholder="请输入密码"
        outlined
        lazy-rules
        :rules="[
          (val) => !!val || '密码不可为空',
          (val) =>
            (val.length >= 6 && val.length <= 20) ||
            '密码长度不可低于6位、也不可超过20位',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-input
        v-model="form.confirmPassword"
        :type="isConfirmPwd ? 'password' : 'text'"
        placeholder="请再次输入密码"
        outlined
        lazy-rules
        :rules="[
          (val) => !!val || '请再次输入密码',
          (val) => val === form.password || '两次输入的密码不一致',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isConfirmPwd = !isConfirmPwd"
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
      已经有账号了？
      <router-link to="/login"> 去登录 </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { reactive, ref } from "vue";
import { useStore } from "src/store";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";
import { multipartUpload } from "src/utils/file-util";

const $q = useQuasar();
const router = useRouter();
const store = useStore();

const initState = {
  email: "",
  password: "",
  confirmPassword: "",
  nickName: "",
  avatar: "",
};

const form = reactive({ ...initState });

const isPwd = ref(true);
const isConfirmPwd = ref(true);
const uploader = ref<any>(null);
const imgUrl = ref("");

async function onSubmit() {
  // 发送请求注册用户

  try {
    const res = await api.post("/users/signup", {
      ...form,
      avatar: imgUrl.value,
    });
    console.log(res);
    if (res.data) {
      $q.notify({
        type: "positive",
        message: "注册成功",
        position: "top",
      });

      router.push("/login");
    }
  } catch (error) {
    $q.notify({
      type: "warning",
      message: "服务器错误，请稍后重试",
    });
    console.log(error.messages);
  }
}

function onReset() {
  form.avatar = "";
  form.email = "";
  form.confirmPassword = "";
  form.password = "";
  form.nickName = "";
  imgUrl.value = "";
}

function handleUploader() {
  uploader.value.pickFiles();
}

async function handleAdded(files: File[]) {
  const res = await multipartUpload(files[0]);
  imgUrl.value = res!.name;
  // reset
  uploader.value.reset();
}
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
  margin-top: 32px;
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
