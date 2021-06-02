import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttrs {
  email: string;
  password: string;
  nickName: string;
  avatar: string;
}

interface UserDoc extends mongoose.Document {
  id: string;
  email: string;
  password: string;
  nickName: string;
  avatar: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  nickName: {
    type: String,
    required: true,
  },
});

/**
 * 返回数据时将_id password __v 三个字段删除
 */
userSchema.set("toJSON", {
  transform(doc: any, ret: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.__v;
  },
});

/**
 * 保存之前的hook， 如果密码被更改过，重新hash密码存储
 */
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done(null);
});

userSchema.static("build", (attrs: UserAttrs) => new User(attrs));

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
