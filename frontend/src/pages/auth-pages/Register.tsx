import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./../../auth/firebase-auth";
import GoogleIcon from "@mui/icons-material/Google";
import { withEnter } from "./../../utils";
import "./index.scss";
import { WithFocusControls } from "../../accessibility/WithFocusControls";
import { useFeedbackAudioQueue } from "../../context/hooks/useFeedbackAudiQueue";
import { registerPageMessages } from "./appMessages";
import { errorAppMessages } from "../../accessibility/errorAppMessages";
import { genKey } from "../../constants";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueuePlayableMessage } = useFeedbackAudioQueue();

  const register = async () => {
    try {
      await registerWithEmailAndPassword(email, password);
    } catch (err) {
      console.log({ err });
      const error = err as { code?: string };
      const code = error?.code ?? "";

      if (code.indexOf("email-already-in-use") > -1) {
        enqueuePlayableMessage({
          key: `${genKey()}-${
            registerPageMessages.emailAlreadyUsedRegisterPage.uniqueName
          }`,
          messages: [registerPageMessages.emailAlreadyUsedRegisterPage],
        });
        return;
      }

      if (code.indexOf("email") > -1) {
        enqueuePlayableMessage({
          key: `${genKey()}-${
            registerPageMessages.invalidEmailRegisterPage.uniqueName
          }`,
          messages: [registerPageMessages.invalidEmailRegisterPage],
        });
        return;
      }

      if (code.indexOf("password") > -1) {
        enqueuePlayableMessage({
          key: `${genKey()}-${
            registerPageMessages.invalidPasswordRegisterPage.uniqueName
          }`,
          messages: [registerPageMessages.invalidPasswordRegisterPage],
        });
        return;
      }

      enqueuePlayableMessage({
        key: `${genKey()}-${errorAppMessages.somethingWentWrong.uniqueName}`,
        messages: [errorAppMessages.somethingWentWrong],
      });
    }
  };

  useEffect(() => {
    enqueuePlayableMessage({
      key: `${genKey()}-${
        registerPageMessages.greetingRegisterPage.uniqueName
      }`,
      messages: [registerPageMessages.greetingRegisterPage],
    });
  }, []);

  return (
    <div className="view register-page" aria-label="wrapper for register page">
      <WithFocusControls direction="vertical">
        <div className="form" aria-label="wrapper for register form">
          <TextField
            autoComplete="false"
            type="text"
            tabIndex={0}
            aria-label="E-mail Address input label - press tab to edit input"
            className="text-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="E-mail Address"
          />
          <TextField
            autoComplete="false"
            label="Password"
            aria-label="Password input label - press tab to edit input"
            type="password"
            tabIndex={0}
            className="text-box"
            value={password}
            onKeyUp={(e) => withEnter(e, () => register())}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="button-wrapper"
            aria-label="wrapper for action buttons"
          >
            <Button
              color="primary"
              variant="contained"
              size="medium"
              className="form-button"
              onClick={register}
              aria-label="submit register"
              tabIndex={0}
            >
              Register
            </Button>
            <Button
              color="primary"
              variant="contained"
              className="form-button"
              onClick={signInWithGoogle}
              startIcon={<GoogleIcon aria-hidden="true" />}
              aria-label="register with google instead"
              tabIndex={0}
            >
              Register with Google instead
            </Button>

            <div>
              Do you own an account?{" "}
              <Link
                to="/"
                tabIndex={0}
                onClick={(e) =>
                  (e.target as HTMLElement)?.setAttribute("aria-hidden", "true")
                }
                aria-label={"Do you own an account? Press enter to login."}
              >
                Login
              </Link>{" "}
              now.
            </div>
          </div>
        </div>
      </WithFocusControls>
    </div>
  );
};
