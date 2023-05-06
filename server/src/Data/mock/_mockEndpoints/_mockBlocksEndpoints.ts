// import { axiosMockAdapterInstance } from "../../../../../front-end-lang-learning-app-for-the-blind/src/axiosInstance";
// import { mockContext } from "../mockContext";
// import { withUser, wait } from "./mockEndpointHelpers";

// axiosMockAdapterInstance.onGet(/^blocks\/([\d]+)$/).reply(async (config) =>
//   withUser(config, async (userId) => {
//     const existingUser = mockContext
//       .getCtx()
//       .userStories.find((i) => i.userId === userId);
//     if (!existingUser) {
//       return [401, { message: "User doesn't exist." }];
//     }

//     const [, blockId] = config?.url?.match(/blocks\/(.+)/) || [];
//     if (!blockId) {
//       return [400, { message: "Block id should not be empty." }];
//     }

//     const existingBlock = existingUser.stories
//       .flatMap((s) => s.buildingBlocksProgressItems)
//       .find((bp) => bp.id === Number(blockId));
//     if (!existingBlock) {
//       return [
//         403,
//         {
//           message: `User doesn't have any block with given id.`,
//         },
//       ];
//     }

//     await wait();
//     return [200, existingBlock];
//   })
// );

// axiosMockAdapterInstance
//   .onPost(/^blocks\/(.+)\/complete-summary$/)
//   .reply(async (config) =>
//     withUser(config, async (userId) => {
//       const existingUser = mockContext
//         .getCtx()
//         .userStories.find((i) => i.userId === userId);
//       if (!existingUser) {
//         return [401, { message: "User doesn't exist" }];
//       }

//       const [, blockId] =
//         config?.url?.match(/blocks\/(.+)\/complete-summary/) || [];
//       if (!blockId) {
//         return [400, { message: "Block id should not be empty" }];
//       }

//       const existingBlock = existingUser.stories
//         .flatMap((s) => s.buildingBlocksProgressItems)
//         .find((bp) => bp.id === Number(blockId));
//       if (!existingBlock) {
//         return [
//           403,
//           {
//             message: `User doesn't have any block with given id`,
//           },
//         ];
//       }

//       if(!existingBlock.timeUnlocked) {
//         return [
//           403,
//           {
//             message: `Block '${existingBlock.block.name}' is locked.`,
//           },
//         ];
//       }

//       existingBlock.timeSummaryCompleted = new Date().getTime();
//       mockContext.SaveContext();

//       await wait();
//       return [200, existingBlock];
//     })
//   );
