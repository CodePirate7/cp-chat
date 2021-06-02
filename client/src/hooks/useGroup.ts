import { api } from "src/boot/axios";
import { IUser } from "./../interface";
import { onMounted, reactive, ref } from "vue";
import { useStore } from "src/store";
import { useQuasar } from "quasar";

export function useGroup() {
  const store = useStore();
  const $q = useQuasar();
  const groupForm = reactive({
    name: "",
    avatar: "",
    introduction: "",
    users: [],
  });

  // 获取用户列表
  const users = ref<IUser[]>([]);

  async function getUserList() {
    const res = await api.get("/chat/group/users");
    if (res.data) {
      users.value = res.data;
    }
  }

  onMounted(() => {
    getUserList();
  });

  async function createGroup() {
    try {
      const res = await api.post("/chat/group", groupForm);
      if (res.data) {
        // 重新获取conversation list
        store.dispatch("user/doConversationList");
        return true;
      }
    } catch (error) {}
    $q.notify({
      type: "warning",
      message: "服务器错误，请稍后再试",
    });
    return false;
  }

  return {
    users,
    groupForm,
    createGroup,
  };
}
