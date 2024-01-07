import { Routes, Route } from "react-router-dom";
import { routerPaths } from "../../../constants/routes";

const AppRoutes = () => {
  return (
    <Routes>
      {routerPaths.map(({ path, Component }) => (
        <Route path={path} key={path} element={<Component />} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
