import { AppMessage } from "../../accessibility/types/appMessage.type";
import { audioStorageBasePath } from "../../constants";

export const registerPageMessages: {
  greetingRegisterPage: AppMessage;
  invalidEmailRegisterPage: AppMessage;
  invalidPasswordRegisterPage: AppMessage;
  emailAlreadyUsedRegisterPage: AppMessage;
} = {
  invalidEmailRegisterPage: {
    uniqueName: "invalidEmailRegisterPage",
    text: "Invalid email error occured while trying to register.",
    filePath: `${audioStorageBasePath}/pages/register/invalidEmailRegisterPage.mp3`,
  },
  emailAlreadyUsedRegisterPage: {
    uniqueName: "emailAlreadyUsedRegisterPage",
    text: "Invalid email error occured while trying to register.",
    filePath: `${audioStorageBasePath}/pages/register/emailAlreadyUsedRegisterPage.mp3`,
  },
  invalidPasswordRegisterPage: {
    uniqueName: "invalidPasswordRegisterPage",
    text: "Invalid password occured while trying to register. Make sure to include capital letters, lowercase letters, and use a password between 8 and 16 characters.",
    filePath: `${audioStorageBasePath}/pages/register/invalidPasswordRegisterPage.mp3`,
  },
  greetingRegisterPage: {
    uniqueName: "greetingRegisterPage",
    text: "Page: Register with email and password.",
    filePath: `${audioStorageBasePath}/pages/register/greetingRegisterPage.mp3`,
  },
};

export const loginPageMessages: {
    greetingLoginPage: AppMessage;
  } = {
    greetingLoginPage: {
      uniqueName: "greetingLoginPage",
      text: "Page: Login page. Login or register with google.",
      filePath: `${audioStorageBasePath}/pages/login/greetingLoginPage.mp3`,
    },
  };


