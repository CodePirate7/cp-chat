<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">创建群</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-sm"
        ref="formRef"
      >
        <div class="text-center" @click="filePick">
          <q-avatar size="100px" v-if="form.avatar">
            <img :src="form.avatar" />
          </q-avatar>
          <q-avatar
            size="100px"
            icon="add"
            style="border: 1px solid #aaa"
            v-else
          >
          </q-avatar>
        </div>

        <q-uploader
          style="display: none"
          :auto-upload="false"
          :multiple="false"
          @added="fileAdded"
          ref="uploaderRef"
        />

        <q-input
          v-model="form.name"
          placeholder="请输入群名称"
          lazy-rules
          outlined
          :rules="[(val) => !!val || '群名称不可为空']"
        />
        <q-input
          v-model="form.introduction"
          placeholder="请输入群简介"
          lazy-rules
          outlined
          type="textarea"
        />

        <q-option-group
          :options="usersOptions"
          type="checkbox"
          v-model="form.users"
        />

        <div class="text-right">
          <q-btn label="取消" class="q-mr-md" @click="onReset" />
          <q-btn label="确定" color="primary" @click="onSubmit" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useGroup } from "src/hooks/useGroup";
import { useUploader } from "src/hooks/useUploader";
import { defineComponent, computed, watch, ref } from "vue";

export default defineComponent({
  name: "CreateGroup",
  setup(props, ctx) {
    const { users, groupForm: form, createGroup } = useGroup();
    const { filePick, fileAdded, uploaderRef, url, ext } = useUploader();
    const formRef = ref<any>(null);

    const usersOptions = computed(() => {
      console.log(
        users.value.map((user) => ({ label: user.email, value: user.id }))
      );
      return users.value.map((user) => ({ label: user.email, value: user.id }));
    });

    watch(
      () => form.users,
      (user) => {
        console.log(user);
      }
    );

    async function onSubmit() {
      if (await formRef.value.validate()) {
        const isSuccess = await createGroup();
        isSuccess && ctx.emit("ok");
      }
    }

    function onReset() {
      ctx.emit("ok");
    }

    return {
      users,
      form,
      onSubmit,
      onReset,
      filePick,
      fileAdded,
      uploaderRef,
      url,
      ext,
      usersOptions,
      formRef,
    };
  },
});
</script>

<style lang="scss" scoped></style>
