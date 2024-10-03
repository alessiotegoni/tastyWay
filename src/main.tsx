import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "./components/ui/toaster.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import AddressProvider from "./contexts/AddressContext.tsx";
import { queryClientConfig } from "./lib/react-query/config.ts";
import CartProvider from "./contexts/CartContext.tsx";

const client = new QueryClient(queryClientConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <AuthProvider>
        <AddressProvider>
          <CartProvider>
            <Router>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </Router>
          </CartProvider>
        </AddressProvider>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
    <Toaster />
  </StrictMode>
);
