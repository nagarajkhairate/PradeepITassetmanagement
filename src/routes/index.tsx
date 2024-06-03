import { ReactNode } from "react";
import { Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import { pagesRoutes } from "./pagesRoutes";

const generateRoute = (routes: any[]): ReactNode => {
  return routes.map((route, index) => (
    route.index ? (
      <Route
        index
        path={route.path}
        element={<PageWrapper state={route.state}>
          {route.element}
        </PageWrapper>}
        key={index}
      />
    ) : (
     
        route.children && generateRoute(route.children)

    )
  ));
};

export const routes: ReactNode = generateRoute(pagesRoutes);