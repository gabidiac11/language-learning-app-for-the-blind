import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { firebaseAuth, logout } from "./../../auth/firebase-auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Alert, Avatar, Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router";
import { Home, Info, LogoutRounded } from "@mui/icons-material";

export default function Header() {
  const [user] = useAuthState(firebaseAuth);
  const [snack, setSnack] = useState({
    message: "",
    open: false,
    severity: "error",
  });
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <button
            className="no-btn"
            aria-label="link to instructions page"
            onClick={() => navigate("/instructions")}
            style={{ flexGrow: 0, padding: 10, boxSizing: "border-box" }}
            tabIndex={0}
          >
            <Info
              htmlColor="white"
              aria-label="link to instructions page"
              onClick={() => navigate("/instructions")}
              className="outline-none"
            />
          </button>
          <button
            className="no-btn"
            aria-label="link to home page"
            onClick={() => navigate("/dashboard")}
            style={{ flexGrow: 0, padding: 10, boxSizing: "border-box" }}
            tabIndex={0}
          >
            <Home
              htmlColor="white"
              aria-label="link to home page"
              onClick={() => navigate("/dashboard")}
              className="outline-none"
            />
          </button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                style={{ lineHeight: "50px", paddingRight: "10px" }}
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {user?.displayName || user?.email}
              </Typography>
              <IconButton sx={{ p: 0 }}>
                {!user?.photoURL && <AccountCircle htmlColor="white" />}
                {user?.photoURL && (
                  <Avatar
                    alt={`User button (press enter to open the log out dropdown). Your name is ${
                      user?.displayName || "... oh wait you don't have one"
                    }`}
                    src={user?.photoURL}
                  />
                )}
              </IconButton>
              <div>
                <LogoutRounded
                  onClick={() => logout()}
                  style={{ color: "white", marginLeft: "10px", fontSize: 20 }}
                ></LogoutRounded>
              </div>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={snack.open}
        autoHideDuration={12000}
        transitionDuration={0}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          //TODO: repairt here stuff
          severity={"error"}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
