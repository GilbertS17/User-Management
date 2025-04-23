import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router"
import Dashboard from "./Components/pages/Dashboard"
import NotFound from "./Components/pages/Notfound"
import Login from "./Components/pages/Login"
import PrivateRoute from "./Components/pages/PrivateRoute"
import NewUserForm from "./Components/pages/NewUserForm"
import { useThemeStore } from "@/store/themeStore";
import { useEffect, useRef } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App() {
  const theme = useThemeStore((state) => state.theme);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apply theme on page load based on the local storage value
    if (rootRef.current) {
      if (theme === "dark") {
        rootRef.current.classList.add("dark");
      } else {
        rootRef.current.classList.remove("dark");
      }
    }
  }, [theme]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/new" element={<NewUserForm />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App