import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import Fixture from './components/Fixture';
import AppLayout from './components/AppLayout';
import Favourites from './components/Favourites';
import Profile from './components/Profile';
import Team from  './components/Team';
import NotFound from "./components/NotFound";
import VerifyUser from "./components/VerifyUser";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./AuthTokenContext";
import { MatchesProvider } from './MatchesContext';
import { FavouritesProvider } from './FavouritesContext';
import "./index.css";

const container = document.getElementById("root");

const requestedScopes = ["profile", "email"];

function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  // If the user is not authenticated, redirect to the home page
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, display the children (the protected page)
  return children;
}

const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/verify-user`,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: requestedScopes.join(" "),
      }}
    >
      <AuthTokenProvider>
        <MatchesProvider>
          <FavouritesProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/verify-user" element={<VerifyUser />} />
                <Route path="/teams/:teamId" element={<Team />}/>
                <Route
                  path="app"
                  element={
                    <RequireAuth>
                      <AppLayout />
                    </RequireAuth>
                  }
                >
                  <Route index element={<Fixture />} />
                  <Route path="favourites" element={<Favourites />} />
                  <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </FavouritesProvider>
        </MatchesProvider>
      </AuthTokenProvider>
    </Auth0Provider>
  </React.StrictMode>
);