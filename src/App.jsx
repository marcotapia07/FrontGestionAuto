import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
