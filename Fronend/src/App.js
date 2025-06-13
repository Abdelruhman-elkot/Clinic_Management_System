import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { UserProvider } from "./core/contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;