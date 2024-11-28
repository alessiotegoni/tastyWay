import { Route, Routes } from "react-router-dom";
import Home from "./components/_root/pages/Home";
import Signin from "./components/_auth/Signin";
import Signup from "./components/_auth/Signup";
import Restaurants from "./components/_root/pages/Restaurants";
import Restaurant from "./components/_root/pages/Restaurant";
import HomeLayout from "./components/_root/layouts/HomeLayout";
import ActiveOrders from "./components/_root/pages/ActiveOrders";
import ProtectedRoutes from "./components/custom/routes/ProtectedRoutes";
import UserPrevsOrders from "./components/_root/pages/UserPrevsOrders";
import ClientLayout from "./components/_root/layouts/ClientLayout";
import UserProfileLayout from "./components/_root/layouts/UserProfileLayout";
import UserProfile from "./components/_root/pages/UserProfile";
import UserSecurity from "./components/_root/pages/UserSecurity";
import RestaurantProfileLayout from "./components/_root/layouts/RestaurantProfileLayout";
import RestaurantProfile from "./components/_root/pages/RestaurantProfile";
import RestaurantUserOrder from "./components/_root/pages/RestaurantUserOrder";
import VerifyEmail from "./components/_root/pages/VerifyEmail";
import ResetPassword from "./components/_root/pages/ResetPassword";
import HelpAndSupport from "./components/_root/pages/HelpAndSupport";
import RestaurantOrders from "./components/_root/pages/RestaurantOrders";

const App = () => (
  <Routes>
    <Route path="/">
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />

      <Route path="help" element={<HelpAndSupport />} />

      <Route element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="active-orders" element={<ActiveOrders />} />
        </Route>
      </Route>
      <Route path="restaurants">
        <Route index element={<Restaurants />} />
        <Route path=":restaurantName" element={<Restaurant />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="verify-email" element={<VerifyEmail />} />

        <Route element={<ClientLayout />}>
          <Route path="user">
            <Route element={<UserProfileLayout />}>
              <Route index element={<UserProfile />} />
              <Route path="security" element={<UserSecurity />} />
            </Route>
            <Route path="orders" element={<UserPrevsOrders />} />
          </Route>

          <Route path="my-restaurant">
            <Route element={<RestaurantProfileLayout />}>
              <Route index element={<RestaurantProfile />} />
              <Route path="security" element={<UserSecurity />} />
              <Route path="owner" element={<UserProfile />} />
            </Route>
            <Route path="orders" element={<RestaurantOrders />} />
            <Route path="order/:orderId" element={<RestaurantUserOrder />} />
          </Route>
        </Route>
      </Route>
    </Route>
  </Routes>
);

export default App;
