import * as React from "react";
import {
  List,
  ListItemIcon,
  ListItemText,
  Grid,
  ListItem,
  Button,
  TextField,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material/";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallIcon from "@mui/icons-material/Call";
import PlaceIcon from "@mui/icons-material/Place";

export default function Contatti() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Grid container component="main" sx={{ backgroundColor: "#f9f9f9" }}>
      <Grid
        item
        xs={false}
        sm={6}
        md={6}
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

      <Grid item xs={12} sm={6} md={6}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h1>Contattaci</h1>
          <List component="nav" dense={true} aria-label="main mailbox folders">
            <ListItem>
              <ListItemIcon>
                <MailOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Info@energymanagement.com" />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <CallIcon />
              </ListItemIcon>
              <ListItemText primary="+39 349 4222505" />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <PlaceIcon />
              </ListItemIcon>
              <ListItemText primary="Via Cesare Pavese, 50, 47521 Cesena FC" />
            </ListItem>
          </List>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              name="Nome e Cognome"
              id="outlined-basic username-textarea"
              fullWidth
              label="Nome e Cognome"
              variant="outlined"
            />
            <TextField
              margin="normal"
              name="Email"
              id="outlined-basic password-textarea"
              fullWidth
              label="Email"
              variant="outlined"
            />
            <TextField
              margin="normal"
              name="Messaggio"
              id="message-textarea"
              label="Messaggio"
              fullWidth
              variant="outlined"
            />

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Accetta termini e condizioni"
              />
            </FormGroup>

            <Button
              variant="contained"
              disabled={!checked}
              align="center"
              fullWidth
              type="submit"
              sx={{ mt: 3, mb: 2 }}
              href="#"
              onClick={() => alert("Funzionalità non implementata.")}
              underline="none"
            >
              Invia
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
