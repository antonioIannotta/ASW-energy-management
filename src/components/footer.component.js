import * as React from 'react';
import {CssBaseline, Box, Typography, Container, Link, Grid, Button, IconButton} from '@mui/material/';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

import logoIcon from '../img/logo-icon.png';

const pages = ['contatti', 'chi-siamo', 'privacy-policy', 'cookie-policy', 'dashboard'];

function Copyright() {
  return (
    <Grid container spacing={3}>        
        <Grid item xs={12}>            
            <Typography variant="body2" align="center" color="text.secondary">
            {'Copyright © '}
            {new Date().getFullYear()}
            {' '}
            <Link underline="none" color="inherit" href="/">
                Energy Management - P.IVA 00000032321 - Tutti i diritti riservati - Design by ICA
            </Link>{' '}
            </Typography>
        </Grid>
    </Grid>
  );
}

export default function footerComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(254,189,51,1)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(254,211,119,1)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(245, 255, 167, 1)"
            />
          </g>
        </svg>
      </div>
      <CssBaseline />

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: "#f5ffa7",
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body1" align="center">
            <img
              className="logo-icon-footer"
              src={logoIcon}
              alt="logoIcon.png"
            ></img>
          </Typography>

          <Typography
            variant="subtitle2"
            gutterBottom
            align="center"
            component="div"
          >
            Sii il cambiamento che vuoi vedere.
          </Typography>

          <Box
            sx={{
              justifyContent: "center",
              "& > :not(style)": { m: 2 },
              display: "flex",
            }}
          >
            <IconButton
              aria-label=""
              onClick={() => window.open("https://www.facebook.com")}
            >
              <FacebookIcon />
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
          </Box>

          <Box
            sx={{
              justifyContent: "center",
              mr: "20px",
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
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}