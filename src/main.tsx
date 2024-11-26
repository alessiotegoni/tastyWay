import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "./components/ui/toaster.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import CartProvider from "./contexts/CartContext.tsx";
import { queryClientConfig } from "./config/reactQueryConfig.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoadScript as LoadGoogleMaps } from "@react-google-maps/api";
import { googleMapsConfigs } from "./config/googleMapsConfig.ts";

const client = new QueryClient(queryClientConfig);
const authClientId = import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID!;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadGoogleMaps {...googleMapsConfigs}>
      <QueryClientProvider client={client}>
        <Router>
          <GoogleOAuthProvider clientId={authClientId}>
            <AuthProvider>
              <CartProvider>
                <Routes>
                  <Route path="/*" element={<App />} />
                </Routes>
              </CartProvider>
            </AuthProvider>
          </GoogleOAuthProvider>
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
      <Toaster />
    </LoadGoogleMaps>
  </StrictMode>
);
