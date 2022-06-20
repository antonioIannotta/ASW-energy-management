import React from "react";

import logo from "../img/logo.png";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Link,
  List,
  ListItem,
  Badge,
  styled,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Userfront from "@userfront/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const pages = ["contatti", "chi-siamo", "dashboard"];
const settings = ["Contatti", "Inserisci dati", "Logout"];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function NavbarComponent() {
  const [anchorElUser] = React.useState(null);
  const [state, setState] = React.useState({});

  const handleOpenUserMenu = (event) => {};

  const handleCloseUserMenu = () => {};

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {pages.map((page) => (
          <ListItem button key={page}>
            <Button
              key={page}
              href={"/" + page}
              sx={{ color: "#222222", display: "block" }}
            >
              {page.replace("-", " ")}
            </Button>
          </ListItem>
        ))}
        <ListItem button key={"login"}>
          <Button
            key={"login"}
            href={"login"}
            sx={{ color: "#222222", display: "block" }}
          >
            Log in
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar className="navbar" position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            noWrap
            component="div"
            sx={{ mt: 1, mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Link href="/">
              <img className="logo" src={logo} alt="LOGO" />
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 0.5, display: { xs: "flex", md: "none" } }}>
            {["left"].map((anchor) => (
              <React.Fragment key={anchor}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={toggleDrawer(anchor, true)}
                >
                  <MenuIcon />
                </IconButton>
                <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  {list(anchor)}
                </SwipeableDrawer>
              </React.Fragment>
            ))}
          </Box>
          <Typography
            noWrap
            component="div"
            sx={{ flexGrow: 0.5, mt: 1, display: { xs: "flex", md: "none" } }}
          >
            <Link href="/">
              <img className="logo-mobile" src={logo} alt="LOGO" />
            </Link>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              mr: "20px",
              justifyContent: "flex-end",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                href={"/" + page}
                sx={{ my: 2, color: "#222222", display: "block" }}
              >
                {page.replace("-", " ")}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant={Userfront.user.username ? "dot" : ""}
                >
                  {Userfront.user.username ? (
                    <Avatar>
                      {" "}
                      {Userfront.user.username
                        ? Userfront.user.username.toUpperCase()[0]
                        : ""}{" "}
                    </Avatar>
                  ) : (
                    <AccountCircleIcon
                      onClick={() => window.open("/login")}
                      sx={{ fontSize: 40 }}
                    />
                  )}
                </StyledBadge>
              </IconButton>
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
