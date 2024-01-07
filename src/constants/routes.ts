import { IRoute } from "../modules/App/AppRoutes/interface";
import { AudioImage, AppInfo, Home, NoMatches } from "../modules/Pages/";

enum RoutesPath {
  MAIN_SCENARIO = "/visual",
  ABOUT = "/about",
  HOME = "/",
  OTHERS = "*",
}

const mappedRouterPaths: IRoute[] = [
  {
    path: RoutesPath.HOME,
    text: "Home",
    Component: Home,
  },
  {
    path: RoutesPath.ABOUT,
    text: "About",
    Component: AppInfo,
  },
  {
    path: RoutesPath.MAIN_SCENARIO,
    text: "Visualiser",
    Component: AudioImage,
  },
];

const routerPaths: IRoute[] = [
  ...mappedRouterPaths,
  {
    path: RoutesPath.OTHERS,
    Component: NoMatches,
  },
];

export { mappedRouterPaths, RoutesPath, routerPaths };
