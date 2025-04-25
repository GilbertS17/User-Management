import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Dashboard from "./Components/pages/Dashboard";
import NotFound from "./Components/pages/Notfound";
import Login from "./Components/pages/Login";
import PrivateRoute from "./Components/pages/PrivateRoute";
import AddUser from './Components/pages/NewUserForm';
import { useThemeStore } from "@/store/themeStore";
import { useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import EditUser from "./Components/pages/EditUser";

function App() {
  const theme = useThemeStore((state) => state.theme);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      <div ref={rootRef}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/new" element={<AddUser />} />
              <Route path="/dashboard/edit/:id" element={<EditUser />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </QueryClientProvider>
  );
}

export default App;