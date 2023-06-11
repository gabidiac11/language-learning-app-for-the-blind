import { firebaseAuth, signInWithGoogle } from "./../../auth/firebase-auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import "./index.scss";
import { useEffect } from "react";
import { WithFocusControls } from "../page-components/accessibility/WithFocusControls";
import { loginPageMessages } from "./appMessages";
import { useFeedbackAudioQueue } from "../../context/hooks/useFeedbackAudiQueue";
import { apiErrorsAppMessages } from "../../accessibility/staticAppMessages/apiErrorsAppMessages";
import { genKey } from "../../constants";

export const Login = () => {
  const authState = useAuthState(firebaseAuth);
  const [user, , error] = authState;

  const { singleEnque } = useFeedbackAudioQueue();

  useEffect(() => {
    singleEnque({
      key: `${genKey()}-${loginPageMessages.greetingLoginPage.uniqueName}`,
      messages: [loginPageMessages.greetingLoginPage],
    });
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }
    singleEnque({
      key: `${genKey()}-${apiErrorsAppMessages.somethingWentWrong.uniqueName}`,
      messages: [apiErrorsAppMessages.somethingWentWrong],
    });
  }, [error]);

  return (
    <div className="view login-page" aria-label="wrapper for login page">
      <WithFocusControls
        direction="vertical"
        customMessage="Press arrow up or arrow down to switch between buttons"
      >
        <div className="container" aria-label="inner wrapper for login page">
          <div
            className="buttons"
            aria-label="login buttons wrapper for login page"
          >
            <Typography
              tabIndex={0}
              aria-label="Login page"
              variant="h4"
              style={{ paddingBottom: "20px" }}
            >
              Login page
            </Typography>
            <Button
              tabIndex={0}
              aria-label="Login with Google"
              variant="contained"
              color="primary"
              className="button"
              startIcon={<GoogleIcon aria-hidden="true" />}
              onClick={signInWithGoogle}
            >
              Login with Google
            </Button>

            {/* TODO: register with email and password should be finalized */}
            {/* <Link
              tabIndex={0}
              aria-label="Register with email and password"
              to={"/register"}
              color="primary"
            >
              Or register
            </Link> */}
          </div>

          {user && <div tabIndex={0}>Loading...</div>}
          {error && (
            <div tabIndex={0}>
              {error?.message ?? "An unexpected error happen"}...
            </div>
          )}
        </div>
      </WithFocusControls>
    </div>
  );
};

export default Login;
