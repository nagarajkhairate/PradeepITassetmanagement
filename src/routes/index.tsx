import { ReactNode } from "react";
import { Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import { pagesRoutes } from "./pagesRoutes";

const generateRoute = (routes: any[]): ReactNode => {
  return routes.map((route, idx) => (
    route.index ? (
      <Route
        index
        path={route.path}
        element={<PageWrapper state={route.state}>
          {route.element}
        </PageWrapper>}
        key={idx}
      />
    ) : (
     
        route.children && generateRoute(route.children)
        

    )
  ));
};

export const routes: ReactNode = generateRoute(pagesRoutes);