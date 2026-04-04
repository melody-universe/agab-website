import { LocationProvider, Route, Router } from "preact-iso";
import { routes } from "../routes";

// Maybe we'll come back and figure out how to do this proper-like.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getInitialData(): any {
  if (typeof window !== "undefined" && "__INITIAL_DATA__" in window) {
    return window.__INITIAL_DATA__;
  }

  return {};
}

export default function App() {
  const initialData = getInitialData();

  return (
    <LocationProvider>
      <Router>
        {routes.map(({ Page, path }) => (
          <Route
            key={path}
            path={path}
            component={() => <Page {...initialData} />}
          />
        ))}
      </Router>
    </LocationProvider>
  );
}
