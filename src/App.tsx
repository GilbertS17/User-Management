import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router"
import Dashboard from "./Components/pages/Dashboard"
import NotFound from "./Components/pages/Notfound"
import Login from "./Components/pages/Login"
import PrivateRoute from "./Components/pages/PrivateRoute"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App