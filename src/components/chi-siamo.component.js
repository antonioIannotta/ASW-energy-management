import "../scss/chi-siamo-style.scss";

import ImmagineStandard from "../img/img-standard.png";
import dashboardDemoImage from "../img/dashboard-demo-image.png";

import * as React from "react";
import {
  CardMedia,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  IconButton,
} from "@mui/material/";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function chiSiamo() {
  return (
    <>
      <Container padding="2rem">
        <Grid container className="top-chisiamo-container" spacing={2}>
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              minHeight: "180px",
              backgroundImage: `url(${dashboardDemoImage})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          />
          <Grid item xs={12} md={5}>
            <Typography
              variant="h6"
              mb="1rem"
              fontFamily="Arial Black"
              align="left"
              gutterBottom
              component="div"
            >
              Su di noi
            </Typography>
            <Typography
              variant="h4"
              mb="1rem"
              fontFamily="Arial Black"
              align="left"
              gutterBottom
              component="div"
            >
              IL SUCCESSO DEFINISCE CHI SIAMO
            </Typography>
            <Typography mb="2rem" align="left" gutterBottom component="div">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio, eaque rerum! Provident
              similique accusantium nemo autem. Veritatis obcaecati tenetur iure
              eius earum ut molestias architecto voluptate aliquam nihil,
              eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
              tenetur error, harum nesciunt ipsum debitis quas aliquid.
              Reprehenderit, quia. Quo neque error repudiandae fuga?
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Container className="team-container">
        <Typography
          variant="h4"
          mb="2rem"
          fontFamily="Arial Black"
          align="center"
          gutterBottom
          component="div"
        >
          IL NOSTRO TEAM
        </Typography>
        <Grid sx={{ flexGrow: 1 }} align="center" container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="200"
                image={ImmagineStandard}
                alt="personale"
                sx={{ marginTop: "1rem" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Demetrio Andriani
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginBottom: "1rem" }}
                  color="text.secondary"
                >
                  Studente magistrale iscritto all' Alma Mater.
                </Typography>
                <IconButton
                  aria-label=""
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/demetrio-andriani-876515236/"
                    )
                  }
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  aria-label=""
                  onClick={() => window.open("https://www.instagram.com")}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  aria-label=""
                  onClick={() => window.open("https://www.twitter.com")}
                >
                  <TwitterIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="200"
                image={ImmagineStandard}
                alt="personale"
                sx={{ marginTop: "1rem" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Antonio Iannotta
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: "1rem" }}
                >
                  Studente magistrale iscritto all' Alma Mater.
                </Typography>
                <IconButton
                  aria-label=""
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/antonio-iannotta-3703111a4/"
                    )
                  }
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  aria-label=""
                  onClick={() => window.open("https://www.instagram.com")}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  aria-label=""
                  onClick={() => window.open("https://www.twitter.com")}
                >
                  <TwitterIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="200"
                image={ImmagineStandard}
                alt="personale"
                sx={{ marginTop: "1rem" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Andrea Catani
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginBottom: "1rem" }}
                  color="text.secondary"
                >
                  Studente magistrale iscritto all'Alma Mater.
                </Typography>
                <IconButton
                  aria-label=""
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/andrea-catani-5b2764143/"
                    )
                  }
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  aria-label=""
                  onClick={() => window.open("https://www.instagram.com")}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  aria-label=""
                  onClick={() => window.open("https://www.twitter.com")}
                >
                  <TwitterIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
