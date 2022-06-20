import "../scss/registrazione-style.scss";

import React from "react";
import { Navigate } from "react-router-dom";
import Userfront from "@userfront/react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  FormGroup,
} from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  fillRegioni,
  validEmail,
  containsNumber,
  validCity,
  invalidPassword,
} from "../functions/validazione-registrazione";

const axios = require("../axios/axios");

Userfront.init("rbv6pwxb");

let regioni = [];
fillRegioni(regioni);
let insertUrl = "";

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

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      errorFlag: [false, false, false, false, false, false, false],
      isCompany: false,
      name: "",
      fiscalCode: "",
      regione: "",
      city: "",
      username: "",
      email: "",
      password: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    if (target.type === "checkbox") {
      this.setState({
        [target.name]: target.checked,
      });
    } else {
      event.preventDefault();
      this.setState({
        [target.name]: target.value,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      errorFlag: [false, false, false, false, false, false, false],
    });

    let errorFlagBool = false;
    let errorFlagArray = this.state.errorFlag;

    if (
      this.state.name === undefined ||
      this.state.name === "" ||
      containsNumber(this.state.name)
    ) {
      errorFlagArray[0] = true;
      this.setState({
        errorFlag: errorFlagArray,
      });
    }

    if (this.state.fiscalCode === undefined || this.state.fiscalCode === "") {
      errorFlagArray[1] = true;
      this.setState({
        errorFlag: errorFlagArray,
      });
    }

    for (let value of regioni.values()) {
      if (
        value.trim().toLowerCase() === this.state.regione.trim().toLowerCase()
      ) {
        errorFlagBool = true;
      }
    }

    if (!errorFlagBool) {
      errorFlagArray[2] = true;
      this.setState({
        errorFlag: errorFlagArray,
      });
    }

    if (!validCity(this.state.city, this.state.regione)) {
      errorFlagArray[3] = true;
      this.setState({
        errorFlag: errorFlagArray,
      });
    }

    errorFlagBool = false;
    for (let i = 0; i < errorFlagArray.length; i++) {
      if (errorFlagArray[i] === true) {
        errorFlagBool = true;
      }
    }

    if ((this.state.username.toString().match(/^\s*$/) || []).length > 0) {
      errorFlagArray[4] = true;
      this.setState({
        errorFlag: errorFlagArray,
      });
    }

    if (!validEmail(this.state.email)) {
      errorFlagArray[5] = true;
      this.setState({
        errorFlag: errorFlagArray,
      });
    }

    if (invalidPassword(this.state.password)) {
      errorFlagArray[6] = true;
      this.setState({
        errorFlag: errorFlagArray,
      });
    }

    if (!errorFlagBool) {
      Userfront.signup({
        method: "password",
        email: this.state.email,
        password: this.state.password,
        name: this.state.name + " " + this.state.surname,
        username: this.state.username,
        data: {
          accountName: this.state.username,
        },
      }).then((res) => {
        insertUrl = "http://localhost:5000/users/insert";
        axios.insert(
          insertUrl,
          res.userUuid,
          this.state.username,
          this.state.email,
          this.state.password,
          this.state.fiscalCode,
          this.state.city,
          this.state.regione
        );
      });
    }
  }

  render() {
    if (Userfront.user.userUuid) {
      return <Navigate replace to="/dashboard" />;
    } else {
      return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Registrati
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={this.handleSubmit}
                sx={{ mt: 1 }}
              >
                <FormGroup>
                  <TextField
                    margin="normal"
                    name="name"
                    id="outlined-basic name-textarea"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    label="Nome"
                    variant="outlined"
                    inputProps={{ minLength: 2, maxLength: 12 }}
                    error={this.state.errorFlag[0] === true}
                    helperText={
                      this.state.errorFlag[0]
                        ? "Il nome inserito non è valido."
                        : ""
                    }
                  />
                </FormGroup>
                <TextField
                  margin="normal"
                  name="fiscalCode"
                  id="outlined-basic codiceFiscale-textarea"
                  fullWidth
                  value={this.state.fiscalCode}
                  onChange={this.handleInputChange}
                  label="Codice Fiscale"
                  variant="outlined"
                  inputProps={{ minLength: 16, maxLength: 16 }}
                  error={this.state.errorFlag[1] === true}
                  helperText={
                    this.state.errorFlag[1]
                      ? "Il codice ficale inserito non è valido"
                      : ""
                  }
                />
                <TextField
                  margin="normal"
                  name="regione"
                  id="outlined-basic regione-textarea"
                  fullWidth
                  value={this.state.regione}
                  onChange={this.handleInputChange}
                  label="Regione"
                  variant="outlined"
                  inputProps={{ maxLength: 25 }}
                  error={this.state.errorFlag[2] === true}
                  helperText={
                    this.state.errorFlag[2]
                      ? "La regione inserita non è valida."
                      : ""
                  }
                />
                <TextField
                  margin="normal"
                  name="city"
                  id="outlined-basic citta-textarea"
                  fullWidth
                  value={this.state.city}
                  onChange={this.handleInputChange}
                  label="Città"
                  variant="outlined"
                  inputProps={{ maxLength: 25 }}
                  error={this.state.errorFlag[3] === true}
                  helperText={
                    this.state.errorFlag[3]
                      ? "La città non corrisponde alla regione."
                      : ""
                  }
                />

                <TextField
                  margin="normal"
                  name="username"
                  id="outlined-basic username-textarea"
                  fullWidth
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  label="Username"
                  variant="outlined"
                  inputProps={{ minLength: 7, maxLength: 10 }}
                  error={this.state.errorFlag[4] === true}
                  helperText={
                    this.state.errorFlag[4]
                      ? "Lo username non può essere vuoto."
                      : ""
                  }
                />
                <TextField
                  margin="normal"
                  name="email"
                  id="outlined-basic email-textarea"
                  fullWidth
                  value={this.state.email}
                  type="email"
                  onChange={this.handleInputChange}
                  label="Indirizzo mail"
                  variant="outlined"
                  inputProps={{ minLength: 5, maxLength: 25 }}
                  error={this.state.errorFlag[5] === true}
                  helperText={
                    this.state.errorFlag[5] ? "La mail non è valida" : ""
                  }
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
                  inputProps={{ minLength: 8, maxLength: 16 }}
                  error={this.state.errorFlag[6] === true}
                  helperText={
                    this.state.errorFlag[6]
                      ? "La password non è in un formato valido"
                      : ""
                  }
                />
                <Button
                  align="center"
                  fullWidth
                  type="submit"
                  sx={{ mt: 3, mb: 2 }}
                  variant="contained"
                >
                  Registrati
                </Button>
              </Box>
            </Box>
            <Copyright sx={{ mt: 4, mb: 4 }} />
          </Container>
        </ThemeProvider>
      );
    }
  }
}

export default function Registrazione() {
  return <SignupForm />;
}
