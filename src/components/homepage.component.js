import "../scss/homepage-style.scss";
import React from "react";

import {
  Typography,
  Grid,
  Stack,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material/";

import ImgHome from "../img/img-home.png";
import electric from "../img/electic.png";
import heat from "../img/heat.png";
import water from "../img/water.png";

export default function HomePage() {
  return (
    <>
      <Container padding="2rem">
        <Grid container spacing={2} mt={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              fontFamily="Arial Black"
              mb="2rem"
              align="center"
              gutterBottom
              component="div"
            >
              La nostra energia è illimitata come la nostra ambizione
            </Typography>
            <Stack spacing={3} direction="row">
              <Button
                href="/registrazione"
                variant="contained"       
                fullWidth         
                className="linear-gradient"
              >
                Registrati
              </Button>
              <Button
                href="/dashboard"
                variant="contained"
                fullWidth
                className="linear-gradient"                
              >
                Dashboard
              </Button>
            </Stack>
          </Grid>
          <Grid
            item
            container
            height="480px"
            xs={12}
            md={8}
            sx={{
              backgroundImage: `url(${ImgHome})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "right",
            }}
          />
        </Grid>
      </Container>

      <Container className="team-container" maxWidth="md">
        <Typography
          variant="h4"
          mb="2rem"
          fontFamily="Arial Black"
          align="center"
          gutterBottom
          component="div"
        >
          I NOSTRI SERVIZI
        </Typography>
        <Grid align="center" container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="150"
                image={electric}
                alt="personale"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  MONITORAGGIO CONSUMI ELETTRICI
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Possibilità di poter monitorare i consumi elettrici.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="150"
                image={water}
                alt="personale"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  MONITORAGGIO CONSUMI IDRICI
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Possibilità di poter monitorare i consumi idrici.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="150"
                image={heat}
                alt="personale"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  MONITORAGGIO CONSUMI TERMICI
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Possibilità di poter monitorare i consumi termici.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
