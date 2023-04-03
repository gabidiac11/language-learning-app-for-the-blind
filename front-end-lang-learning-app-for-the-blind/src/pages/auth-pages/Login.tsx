import { firebaseAuth, signInWithGoogle } from "./../../auth/firebase-auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import "./index.css";
import { useEffect } from "react";

export const Login = () => {
  const mmm = useAuthState(firebaseAuth);
  const [loading, hasError, error] = mmm;

  useEffect(() => {
      if(hasError) console.log("error occured while logging in", {hasError, loading,  error, mmm});
  }, [hasError])

  return (
    <div className="view">
      <div className="form">
        <div className="buttons">
          <Typography variant="h4" style={{ paddingBottom: "20px" }}>
            Login page
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<GoogleIcon />}
            onClick={signInWithGoogle}
          >
            Login with Google
          </Button>
        </div>

        {loading && <>Loading...</>}
        {hasError && <>{error?.message ?? "An unexpected error happen"}...</>}
      </div>
    </div>
  );
}

export default Login;
