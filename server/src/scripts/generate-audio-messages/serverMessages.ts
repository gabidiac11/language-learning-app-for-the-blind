import { apiMessages } from "../../ApiSupport/apiMessages";
import { audioStorageBasePath } from "../../constants";

const apiMessageClean = Object.values(apiMessages)
  .map((v) => ({
    ...v,
    filePath: v.filePath.replace(`${audioStorageBasePath}`, "BASE_URL"),
  }))
  .reduce((prev, curr) => ({ ...prev, [curr.uniqueName]: curr }), {});
export default apiMessageClean;
