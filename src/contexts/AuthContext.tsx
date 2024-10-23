import React, { createContext, useContext } from "react";
import { useRefreshToken } from "@/lib/react-query/queries/authQueries";
import { UserJwt } from "@/types/userTypes";
import { jwtDecode } from "jwt-decode";
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateAsyncFunction,
} from "@tanstack/react-query";
import { ApiError, LogoutRes } from "@/types/apiTypes";
import { useLogout } from "@/lib/react-query/mutations/authMutations";

interface AuthContextType {
  accessToken: string | undefined;
  user: UserJwt | null;
  isAuthenticated: boolean;
  isRefreshingToken: boolean;
  logout: UseMutateAsyncFunction<LogoutRes, ApiError, void, unknown>;
  refreshToken: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<string, ApiError>>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Refresh token only if it isn't stored in react-query cache

  const { mutateAsync: logout } = useLogout();

  const {
    data: accessToken,
    isError,
    isLoading: isRefreshingToken,
    refetch: refreshToken,
  } = useRefreshToken();

  const isAuthenticated = !!accessToken && !isError;

  let user: UserJwt | null = null;

  if (isAuthenticated) user = jwtDecode<UserJwt>(accessToken);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated,
        logout,
        refreshToken,
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
