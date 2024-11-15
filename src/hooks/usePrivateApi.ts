import { useEffect } from "react";
import { privateApi } from "../config/apiConfig";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const useAxiosPrivate = () => {
  const { accessToken, refreshToken } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const reqIntercept = privateApi.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const resIntercept = privateApi.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevReq = err?.config;
        if (
          err?.response?.status === 403 &&
          err?.response?.data?.message === "jwt expired" &&
          !prevReq?.sent
        ) {
          const { data: accessToken, isError } = await refreshToken();
          if (isError) return navigate("/signin");
          prevReq.headers.Authorization = `Bearer ${accessToken}`;
          prevReq.sent = true;
          return privateApi(prevReq);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      privateApi.interceptors.request.eject(reqIntercept);
      privateApi.interceptors.response.eject(resIntercept);
    };
  }, [accessToken, refreshToken]);

  return privateApi;
};

export default useAxiosPrivate;
