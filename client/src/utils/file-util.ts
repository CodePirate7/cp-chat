import OSS from "ali-oss";
import shortid from "shortid";

const client = new OSS({
  accessKeyId: "LTAI4FeTfZPsmMNwydFYQLse",
  accessKeySecret: "d6Q2m6LEmbKMNVe6VVMDqX5r8wK0i6", // 你创建的Bucket时获取的
  bucket: "codepirate-img", // 你创建的Bucket名称
  region: "oss-cn-chengdu", //  你所购买oss服务的区域，默认oss-cn-hangzhou
  timeout: 60000, //超时时间 默认60S 自行设置
});

export async function multipartUpload(file: File) {
  try {
    let result = await client.multipartUpload(
      shortid.generate() + "." + file.name.split(".").pop(),
      file,
      {
        parallel: 4, // 同时请求分片数
        partSize: 1024 * 1024, // 分片大小
      }
    );
    result.name = `http://img.xswhb.cn/${result.name}`;
    return result;
  } catch (err) {
    console.log(err);
  }
}
