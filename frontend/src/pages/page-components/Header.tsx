import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { firebaseAuth, logout } from "./../../auth/firebase-auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Alert,
  Avatar,
  Menu,
  MenuItem,
  Snackbar,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router";
import { Home, Info } from "@mui/icons-material";

const settings = ["Logout"];

export default function Header() {
  const [user] = useAuthState(firebaseAuth);
  const [anchorElUser, setAnchorElUser] = useState<EventTarget & Element|undefined>();
  const [snack, setSnack] = useState({
    message: "",
    open: false,
    severity: "error",
  });
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting: string) => {
    setAnchorElUser(undefined);

    switch (setting) {
      case "Logout":
        logout();
        break;
    }
  };
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
            <Tooltip title="Open settings">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={handleOpenUserMenu}
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
              </div>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
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
