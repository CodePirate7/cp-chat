import { multipartUpload } from "src/utils/file-util";
import { ref } from "vue";
export function useUploader() {
  const uploaderRef = ref<any>(null);
  const url = ref("");
  const ext = ref("");

  function filePick() {
    uploaderRef.value.pickFiles();
  }

  async function fileAdded(files: File[]) {
    const res = await multipartUpload(files[0]);
    ext.value = res!.name.split(".").pop()!;
    url.value = res!.name;
    uploaderRef.value.reset();
  }

  return {
    uploaderRef,
    url,
    ext,
    filePick,
    fileAdded,
  };
}
