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

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <div className="view register-page">
      <div className="form">
        <TextField
          type="text"
          label="Full Name"
          className="text-box"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          type="text"
          className="text-box"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="E-mail Address"
        />
        <TextField
          label="Password"
          type="password"
          className="text-box"
          value={password}
          onKeyUp={(e) => withEnter(e, () => register())}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-wrapper">
          <Button
            color="primary"
            variant="contained"
            size="medium"
            className="form-button"
            onClick={register}
          >
            Register
          </Button>
          <Button
            color="primary"
            variant="contained"
            className="form-button"
            onClick={signInWithGoogle}
            startIcon={<GoogleIcon aria-hidden="true" />}
          >
            Register with Google
          </Button>

          <div>
            Do you own an account? <Link to="/">Login</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}
