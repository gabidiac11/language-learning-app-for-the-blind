import { firebaseAuth, signInWithGoogle } from "./../../auth/firebase-auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import "./index.scss";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const authState = useAuthState(firebaseAuth);
  const [user, , error] = authState;

  return (
    <div className="view login-page">
      <div className="container">
        <div className="buttons">
          <Typography variant="h4" style={{ paddingBottom: "20px" }}>
            Login page
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="button"
            startIcon={<GoogleIcon aria-hidden="true" />}
            onClick={signInWithGoogle}
          >
            Login with Google
          </Button>
          <Link to={"/register"} color="primary">
            Or register
          </Link>
        </div>

        {user && <>Loading...</>}
        {error && <>{error?.message ?? "An unexpected error happen"}...</>}
      </div>
    </div>
  );
};

export default Login;
