import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { routerDeveloper } from "./routes/routesDeveloper";
import { StoreProvider } from "./store/StoreContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Router>
        <Routes>
          <Route path="*" element={<div>Page Not Found</div>} />

          {routerDeveloper.map(({...routesProps}, key) =>{
            return <Route key={key} {...routesProps} />
          })}

        </Routes>
      </Router>

      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;