import moment from "moment";
import { IConversation, IUser } from "./interface";

// export const mockUsers: Record<string, IUser> = {
//   "1": {
//     id: "1",
//     email: "389491729@qq.com",
//     nickname: "CodePirate",
//     avatar: "https://avatars.githubusercontent.com/u/35660919?v=4",
//   },
//   "2": {
//     id: "2",
//     email: "test@test.com",
//     nickname: "测试账号1",
//     avatar:
//       "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201905%2F28%2F20190528143150_fETNW.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624549940&t=d077c4115080b320e26d72e1d8c40f85",
//   },
//   "3": {
//     id: "3",
//     email: "test1@test.com",
//     nickname: "测试账号2",
//     avatar:
//       "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-0e98d843ef66ae5e9ec846a7c5f98224_hd.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624549940&t=c606df89aaf63c6b07a97610018ab577",
//   },
//   "4": {
//     id: "4",
//     email: "test2@test.com",
//     nickname: "测试账号3",
//     avatar:
//       "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2Fv2-46a8e6a6f8419bc8bf02dcec85d991d2_b.jpg&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624549940&t=355f8a2f17475e1a86c2afed4aa0f359",
//   },
// };

// export const mockPosts = [
//   {
//     id: 1,
//     user: mockUsers["4"],
//     content: "今天的天气真不错, 下了班很适合出去走走。有人一起去吗？",
//     time: moment("2021-05-26 12:54").toString(),
//     comment: [],
//   },
//   {
//     id: 2,
//     user: mockUsers["3"],
//     content: "公司门口的麻辣烫真不错，建议大家都去尝尝。",
//     time: moment("2021-05-26 11:54").toString(),
//     comment: [
//       {
//         user: mockUsers["1"],
//         content: "我也觉得不错！有时间一起去！！",
//       },
//     ],
//   },
// ];

// export const mockConversationList = [
//   {
//     id: "1", // 1 , 2
//     type: "single",
//     isActive: false,
//     activeTime: "2021-05-25T18:33:12.912Z",
//     target: mockUsers["2"],
//     messages: [
//       {
//         id: 4,
//         from: mockUsers["1"],
//         to: mockUsers["2"],
//         isMe: true,
//         conversationId: "1",
//         body: {
//           type: "text",
//           content: "这段代码能帮我看看什么意思吗？",
//         },
//       },
//       {
//         id: 3,
//         from: mockUsers["1"],
//         to: mockUsers["2"],
//         isMe: true,
//         conversationId: "1",
//         body: {
//           type: "img",
//           src: "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d17966f33ad9476aaf39e05d110b013a~tplv-k3u1fbpfcp-watermark.image",
//           width: "300",
//           height: "600",
//         },
//       },
//       {
//         id: 2,
//         from: mockUsers["2"],
//         to: mockUsers["1"],
//         body: {
//           type: "text",
//           content: "有时间的，你说",
//         },
//         conversationId: "1",
//         isMe: false,
//       },
//       {
//         id: 1,
//         from: mockUsers["1"],
//         to: mockUsers["2"],
//         body: {
//           type: "text",
//           content: "有一个工作上的问题向您请教，请问有时间吗？",
//         },
//         conversationId: "1",
//         isMe: true,
//       },
//     ],
//   },
//   {
//     id: "2", // 1 , 3
//     type: "single",
//     isActive: false,
//     activeTime: "2021-05-25T16:33:12.912Z",
//     target: mockUsers["3"],
//     messages: [
//       {
//         id: 2,
//         from: mockUsers["1"],
//         to: mockUsers["3"],
//         body: {
//           type: "text",
//           content: "下个月三号",
//         },
//         conversationId: "1",
//         isMe: true,
//       },
//       {
//         id: 1,
//         from: mockUsers["3"],
//         to: mockUsers["1"],
//         body: {
//           type: "text",
//           content: "这个需求什么时候截止？",
//         },
//         conversationId: "1",
//         isMe: false,
//       },
//     ],
//   },
//   {
//     id: "3", // 1 , 2
//     type: "single",
//     isActive: false,
//     activeTime: "2021-05-25T15:33:12.912Z",
//     target: mockUsers["4"],
//     messages: [
//       {
//         id: 2,
//         from: mockUsers["2"],
//         to: mockUsers["1"],
//         body: {
//           type: "text",
//           content: "直接说就好，不要客气",
//         },
//         conversationId: "1",
//         isMe: false,
//       },
//       {
//         id: 1,
//         from: mockUsers["1"],
//         to: mockUsers["2"],
//         body: {
//           type: "text",
//           content: "有一个工作上的问题向您请教，请问有时间吗？",
//         },
//         conversationId: "1",
//         isMe: true,
//       },
//     ],
//   },
//   // {
//   //   id: "4", // 1 , 2
//   //   type: "single",
//   //   isActive: false,
//   //   activeTime: "2021-05-25T15:33:12.912Z",
//   //   target: mockUsers["4"],
//   //   messages: [
//   //     {
//   //       id: 2,
//   //       from: mockUsers["2"],
//   //       to: mockUsers["1"],
//   //       body: {
//   //         type: "text",
//   //         content: "有时间的，你说",
//   //       },
//   //       conversationId: "1",
//   //       isMe: false,
//   //     },
//   //     {
//   //       id: 1,
//   //       from: mockUsers["1"],
//   //       to: mockUsers["2"],
//   //       body: {
//   //         type: "text",
//   //         content: "有一个工作上的问题向您请教，请问有时间吗？",
//   //       },
//   //       conversationId: "1",
//   //       isMe: true,
//   //     },
//   //   ],
//   // },
// ];
