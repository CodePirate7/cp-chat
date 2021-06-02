export class CreateGroupDto {
  name: string; // 群名称

  avatar: string; // 群头像

  introduction: string; // 群简介

  users: string[]; // 群用户
}
