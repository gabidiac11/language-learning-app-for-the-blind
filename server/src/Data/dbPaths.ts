const dbPaths = {
  idsDependentOnThisUserStory: (userId: string, userStoryId: string) =>
    `userStories/${userId}/${userStoryId}/idsDependentOnThisUserStory`,
};
export default dbPaths;
