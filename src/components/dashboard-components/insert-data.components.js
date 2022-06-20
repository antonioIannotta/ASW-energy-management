import "../../scss/insert-data-style.scss";

import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Userfront from "@userfront/react";
import {
  TextField,
  Container,
  Button,
  InputAdornment,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const axios = require("../../axios/axios");

function isValid(value) {
  return !isNaN(value) && !(value.toString().match(/^\s*$/) || []).length > 0;
}

export class InsertData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: "panel1",
      electricUsage: 0,
      electricInsertionDate: Date.now(),
      electricCost: 0,
      waterUsage: 0,
      waterInsertionDate: Date.now(),
      waterCost: 0,
      heatUsage: 0,
      heatInsertionDate: Date.now(),
      heatCost: 0,
      userID: Userfront.user.userUuid,
      electricUsageBoolean: false,
      electricCostBoolean: false,
      waterUsageBoolean: false,
      waterCostBoolean: false,
      heatUsageBoolean: false,
      heatCostBoolean: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  insertWaterData() {
    let res = axios.insertWaterUsage(
      `http://localhost:5000/users/insertWaterUsage/${this.state.userID}`,
      this.state.waterUsage,
      this.state.waterInsertionDate,
      this.state.waterCost
    );
    res.then((result) => {
      if (result) {
        console.log("Consumi idrici inseriti");
      }
    });
  }

  insertHeatData() {
    let res = axios.insertHeatUsage(
      `http://localhost:5000/users/insertHeatUsage/${this.state.userID}`,
      this.state.heatUsage,
      this.state.heatInsertionDate,
      this.state.heatCost
    );
    res.then((result) => {
      if (result) {
        console.log("Consumi termici inseriti");
      }
    });
  }

  insertElectricData() {
    let res = axios.insertElectricUsage(
      `http://localhost:5000/users/insertElectricUsage/${this.state.userID}`,
      this.state.electricUsage,
      this.state.electricInsertionDate,
      this.state.electricCost
    );
    res.then((result) => {
      if (result) {
        console.log("Consumi elettrici inseriti");
      }
    });
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  handleChange = (panel) => {
    this.setState({
      expanded: panel,
    });
  };

  handleChangeDateWater(date) {
    this.setState({
      waterInsertionDate: date,
    });
  }
  handleChangeDateHeat(date) {
    this.setState({
      heatInsertionDate: date,
    });
  }
  handleChangeDateElectric(date) {
    this.setState({
      electricInsertionDate: date,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const target = event.target;

    if (target.name === "electricSubmit") {
      this.insertElectricData();
    } else if (target.name === "waterSubmit") {
      this.insertWaterData();
    } else {
      this.insertHeatData();
    }
    alert("Dati inseriti correttamente!");
  }

  render() {
    return (
      <div className="accordion-wrapper">
        <Accordion
          expanded={this.state.expanded === "panel1"}
          onClick={() => this.handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>Acqua</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Container maxWidth="sm" align="center">
              <TextField
                fullWidth
                name="waterUsage"
                onChange={this.handleInputChange}
                id="outlined-start-adornment"
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Lmc</InputAdornment>
                  ),
                }}
                defaultValue={0}
                error={!isValid(this.state.waterUsage)}
                helperText={
                  !isValid(this.state.waterUsage)
                    ? "Utilizzo idrico inserito non valido!"
                    : ""
                }
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Data inserimento"
                  inputFormat="dd/MM/yyyy"
                  value={this.state.waterInsertionDate}
                  onChange={(e) => this.handleChangeDateWater(e)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                name="waterCost"
                id="outlined-start-adornment"
                sx={{ mt: 2 }}
                onChange={this.handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">€</InputAdornment>
                  ),
                }}
                defaultValue={0}
                error={!isValid(this.state.waterCost)}
                helperText={
                  !isValid(this.state.waterCost)
                    ? "Costo idrico inserito non valido!"
                    : ""
                }
              />
              <Button
                fullWidth
                name="waterSubmit"
                className="button-margin"
                variant="contained"
                onClick={(e) => this.handleSubmit(e)}
                disabled={
                  !isValid(this.state.waterCost) ||
                  !isValid(this.state.waterUsage)
                }
              >
                Inserisci dati
              </Button>
            </Container>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={this.state.expanded === "panel2"}
          onClick={() => this.handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Energia elettrica
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Container maxWidth="sm" align="center">
              <TextField
                fullWidth
                name="electricUsage"
                onChange={this.handleInputChange}
                id="outlined-start-adornment"
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">KW/h</InputAdornment>
                  ),
                }}
                defaultValue={0}
                error={!isValid(this.state.electricUsage)}
                helperText={
                  !isValid(this.state.electricUsage)
                    ? "Utilizzo elettrico inserito non valido!"
                    : ""
                }
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Data inserimento"
                  inputFormat="dd/MM/yyyy"
                  value={this.state.electricInsertionDate}
                  onChange={(e) => this.handleChangeDateElectric(e)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                name="electricCost"
                id="outlined-start-adornment"
                sx={{ mt: 2 }}
                onChange={this.handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">€</InputAdornment>
                  ),
                }}
                defaultValue={0}
                error={!isValid(this.state.electricCost)}
                helperText={
                  !isValid(this.state.electricCost)
                    ? "Costo elettricità inserito non valido!"
                    : ""
                }
              />
              <Button
                fullWidth
                name="electricSubmit"
                className="button-margin"
                variant="contained"
                onClick={(e) => this.handleSubmit(e)}
                disabled={
                  !isValid(this.state.electricCost) ||
                  !isValid(this.state.electricUsage)
                }
              >
                Inserisci dati
              </Button>
            </Container>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={this.state.expanded === "panel3"}
          onClick={() => this.handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Riscaldamento
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Container maxWidth="sm" align="center">
              <TextField
                fullWidth
                name="heatUsage"
                onChange={this.handleInputChange}
                id="outlined-start-adornment"
                sx={{ mb: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Smc</InputAdornment>
                  ),
                }}
                defaultValue={0}
                error={!isValid(this.state.heatUsage)}
                helperText={
                  !isValid(this.state.heatUsage)
                    ? "Utilizzo termico inserito non valido!"
                    : ""
                }
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Data inserimento"
                  inputFormat="dd/MM/yyyy"
                  value={this.state.heatInsertionDate}
                  onChange={(e) => this.handleChangeDateHeat(e)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                name="heatCost"
                id="outlined-start-adornment"
                sx={{ mt: 2 }}
                onChange={this.handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">€</InputAdornment>
                  ),
                }}
                defaultValue={0}
                error={!isValid(this.state.heatCost)}
                helperText={
                  !isValid(this.state.heatCost)
                    ? "Costo termico inserito non valido!"
                    : ""
                }
              />
              <Button
                fullWidth
                name="heatSubmit"
                className="button-margin"
                variant="contained"
                onClick={(e) => this.handleSubmit(e)}
                disabled={
                  !isValid(this.state.heatCost) ||
                  !isValid(this.state.heatUsage)
                }
              >
                Inserisci dati
              </Button>
            </Container>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}
