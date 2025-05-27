import { Route, Routes } from "react-router-dom";
import LoginPage from "../layout/AdminLogin";

const LoginRoutes = () => {
  return (
    <Routes>
      <Route element={<LoginPage />}>
        <Route path="/login" element={<LoginPage/>} />
      </Route>
    </Routes>
  );
};

export default LoginRoutes;
