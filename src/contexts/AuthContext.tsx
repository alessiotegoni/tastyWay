import React, { createContext, useContext, useEffect } from "react";
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
import GoogleOneTapLogin from "@/components/_auth/GoogleOneTapLogin";
import useAddress from "@/hooks/useAddress";

interface AuthContextType {
  accessToken: string | undefined;
  user: UserJwt | null;
  isAuthenticated: boolean;
  isLoadingToken: boolean;
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

  const { handleSetSelectedAddress, selectedAddress } = useAddress();

  const { mutateAsync: logout, isSuccess: hasLoggedOut } = useLogout();

  const {
    data: accessToken,
    isError,
    isLoading: isLoadingToken,
    isRefetching: isRefreshingToken,
    isSuccess,
    refetch: refreshToken,
  } = useRefreshToken();

  const isAuthenticated = !!accessToken && !isError;

  let user: UserJwt | null = null;

  if (isAuthenticated) user = jwtDecode<UserJwt>(accessToken);

  useEffect(() => {
    if (user?.address && !selectedAddress)
      handleSetSelectedAddress(user.address);
  }, [user?.address]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated,
        logout,
        refreshToken,
        isLoadingToken,
        isRefreshingToken,
        user,
      }}
    >
      {!isAuthenticated && (isSuccess || isError) && !hasLoggedOut && (
        <GoogleOneTapLogin />
      )}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve essere usato all'interno di AuthProvider");

  return context;
};
