import { Route, Routes } from "react-router-dom";
import Home from "./components/_root/pages/Home";
import Signin from "./components/_auth/Signin";
import Signup from "./components/_auth/Signup";
import Restaurants from "./components/_root/pages/Restaurants";
import FilterRoutes from "./components/custom/FilterRoutes";
import Restaurant from "./components/_root/pages/Restaurant";

function App() {
  return (
    <Routes>
      <Route path="/">
        {/* Auth */}
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />

        <Route element={<FilterRoutes />}>
          <Route index element={<Home />} />
          <Route path="restaurants">
            <Route index element={<Restaurants />} />
            <Route path=":restaurantName" element={<Restaurant />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
