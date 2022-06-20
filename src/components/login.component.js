import "../scss/login-style.scss";

import React from "react";
import Userfront from "@userfront/react";
import { Navigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

Userfront.init("rbv6pwxb");

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}{" "}
      <Link underline="none" color="inherit" href="https://mui.com/">
        Energy Management
      </Link>{" "}
    </Typography>
  );
}

const theme = createTheme();

class LoginFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailOrUsername: "",
      password: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    Userfront.login({
      method: "password",
      emailOrUsername: this.state.emailOrUsername,
      password: this.state.password,
    }).catch((error) => {
      this.setAlertMessage(error.message);
    });
  }

  setAlertMessage(message) {
    message = "";
    message = "Username o password non corretti.";
    alert(message);
  }

  render() {
    if (Userfront.user.userUuid) {
      return <Navigate replace to="/dashboard" />;
    } else {
      return (
        <ThemeProvider theme={theme}>
          <Grid
            container
            component="main"
            sx={{ height: "calc(100vh - 102px)" }}
          >
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: "url(https://source.unsplash.com/random)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Log in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={this.handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    name="emailOrUsername"
                    id="outlined-basic username-textarea"
                    fullWidth
                    value={this.state.emailOrUsername}
                    onChange={this.handleInputChange}
                    label="Username o indirizzo email"
                    variant="outlined"
                  />
                  <TextField
                    margin="normal"
                    name="password"
                    id="outlined-basic password-textarea"
                    fullWidth
                    value={this.state.password}
                    type="password"
                    onChange={this.handleInputChange}
                    label="Password"
                    variant="outlined"
                  />
                  <Button
                    align="center"
                    fullWidth
                    type="submit"
                    sx={{ mt: 3, mb: 2 }}
                    variant="contained"
                  >
                    Accedi
                  </Button>
                </Box>
                <Link
                  href="#"
                  onClick={() => alert("Funzionalità non implementata.")}
                  underline="none"
                >
                  Password dimenticata?
                </Link>

                <Link href="/registrazione" underline="none">
                  Non hai un account? Registrati gratuitamente.
                </Link>
              </Box>
              <Copyright />
            </Grid>
          </Grid>
        </ThemeProvider>
      );
    }
  }
}

export default function Login() {
  return <LoginFormComponent />;
}
