import React, { createContext, useState, useContext, useEffect } from "react";
import { useRefreshToken } from "@/lib/react-query/queries";
import { UserJwt } from "@/types/userTypes";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  accessToken: string | undefined;
  user: UserJwt | null;
  isAuthenticated: boolean;
  isRefreshingToken: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserJwt | null>(null);

  // Refresh token only if it isn't stored in react-query cache

  const {
    data: accessToken,
    isError,
    isLoading: isRefreshingToken,
  } = useRefreshToken();

  const isAuthenticated = !!accessToken && !isError;

  useEffect(() => {
    if (!isAuthenticated) return;

    const userDecoded = jwtDecode<UserJwt>(accessToken);

    setUser(userDecoded);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated,
        isRefreshingToken,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve essere usato all'interno di AuthProvider");
  }
  return context;
};
