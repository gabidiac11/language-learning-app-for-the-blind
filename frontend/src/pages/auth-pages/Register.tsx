import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./../../auth/firebase-auth";
import GoogleIcon from "@mui/icons-material/Google";
import { withEnter } from "./../../utils";
import "./index.scss";
import { WithFocusControls } from "../../accessibility/WithFocusControls";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <div className="view register-page" aria-label="wrapper for register page">
        <div className="form" aria-label="wrapper for register form">
          <TextField
            type="text"
            label="Full Name"
            className="text-box"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            type="text"
            tabIndex={0}
            className="text-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="E-mail Address"
          />
          <TextField
            label="Password"
            type="password"
            tabIndex={0}
            className="text-box"
            value={password}
            onKeyUp={(e) => withEnter(e, () => register())}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="button-wrapper" aria-label="wrapper for action buttons">
            <Button
              color="primary"
              variant="contained"
              size="medium"
              className="form-button"
              onClick={register}
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
              tabIndex={0}
            >
              Register with Google
            </Button>

            <div>
              Do you own an account? <Link to="/" tabIndex={0} aria-label={"Do you own an account? Press enter to login."}>Login</Link> now.
            </div>
          </div>
        </div>
    </div>
  );
};
