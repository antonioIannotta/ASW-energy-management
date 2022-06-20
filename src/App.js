import React from "react";
import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/navbar.component";
import HomePage from "./components/homepage.component";
import Dashboard from "./components/dashboard.component";
import Contatti from "./components/contatti.component";
import Login from "./components/login.component";
import Registrazione from "./components/registrazione.component";
import Footer from "./components/footer.component";
import ChiSiamo from "./components/chi-siamo.component";
import CookiePolicy from "./components/cookie-policy.component";
import PrivacyPolicy from "./components/privacy-policy.component";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          exact
          element={
            <>
              <NavbarComponent />
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/contatti"
          element={
            <>
              <NavbarComponent />
              <Contatti />
              <Footer />
            </>
          }
        />
        <Route
          path="/chi-siamo"
          element={
            <>
              <NavbarComponent />
              <ChiSiamo />
              <Footer />
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/login"
          element={
            <>
              <NavbarComponent />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path="/registrazione"
          element={
            <>
              <NavbarComponent />
              <Registrazione />
              <Footer />
            </>
          }
        />
        <Route
          path="/cookie-policy"
          element={
            <>
              <NavbarComponent />
              <CookiePolicy />
              <Footer />
            </>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <>
              <NavbarComponent />
              <PrivacyPolicy />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}
