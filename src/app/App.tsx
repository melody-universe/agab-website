import { LocationProvider, Route, Router } from "preact-iso";
import { routes } from "../routes";
import {
  InitialData,
  noPreloadedData,
  NoPreloadedData,
  RouteWithLoader,
} from "../route";
import { GlobalLayout } from "./components/GlobalLayout";

function getInitialData():
  | InitialData<RouteWithLoader<unknown>>
  | NoPreloadedData {
  if (typeof window !== "undefined" && "__INITIAL_DATA__" in window) {
    return window.__INITIAL_DATA__ as InitialData<RouteWithLoader<unknown>>;
  }

  return noPreloadedData;
}

export default function App() {
  const initialData = getInitialData();

  return (
    <GlobalLayout>
      <LocationProvider>
        <Router>
          {routes.map(({ Page, path }) => {
            if (initialData !== noPreloadedData && initialData.path === path) {
              return (
                <Route
                  key={path}
                  path={path}
                  component={() => <Page data={initialData.data} />}
                />
              );
            } else {
              return (
                <Route
                  key={path}
                  path={path}
                  component={() => <Page data={noPreloadedData} />}
                />
              );
            }
          })}
        </Router>
      </LocationProvider>
    </GlobalLayout>
  );
}
