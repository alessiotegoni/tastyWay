import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const ALLOWED_ROUTES = ["/active-orders", "/verify-email"];

const useProtectRoutes = (isCmpAccount?: boolean) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect");

  let canPass = true;

  if (ALLOWED_ROUTES.includes(pathname)) return true;

  if (isCmpAccount && redirect?.startsWith("my-restaurant")) {
    navigate(`/${redirect}`);
    return true;
  }

  if (isCmpAccount && !pathname.includes("/my-restaurant")) canPass = false;

  if (!isCmpAccount && !pathname.includes("/user")) canPass = false;

  return canPass;
};
export default useProtectRoutes;
