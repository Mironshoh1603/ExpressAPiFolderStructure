import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./screens/home";
import AuthUser from "./screens/auth";
import Register from "./screens/register";
import AppView from "./screens/app/index";
import Submits from "./screens/app/submission/submission";
import AuthAdmin from "./screens/admin/auth";
// DASHBOARD PAGES COMPONENTES
import Dashboard from "./screens/admin/dashboard/index";
import ViewRequests from "./screens/admin/dashboard/requests/requests";
import "./styles/main.scss";
import { useContext } from "react";
import { AuthContext } from "./context/UserAuthContext";

export default function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/auth/user" />;
  };

  const RedirectDashboard = ({ children }) => {
    console.log(currentUser);
    return currentUser ? <Navigate to="/app/submissions" /> : children;
  };

  const RedirectAdmin = ({ children }) => {
    console.log(currentUser);
    return currentUser ? <Navigate to="/dashboard/requests" /> : children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth/user"
          element={
            <RedirectDashboard>
              <AuthUser />
            </RedirectDashboard>
          }
        />
        <Route
          path="/auth/admin"
          element={
            <RedirectAdmin>
              <AuthAdmin />
            </RedirectAdmin>
          }
        />
        <Route
          path="register"
          element={
            <RedirectDashboard>
              <Register />
            </RedirectDashboard>
          }
        />

        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route path="requests" element={<ViewRequests />} />
          <Route 
              path="accepted-requests"
              element={<p>Эта часть в процессе. Будет доступен в бета-версии этого веб-программного обеспечения.</p>}
          />
          <Route 
              path="all-requests"
              element={<p>Эта часть в процессе. Будет доступен в бета-версии этого веб-программного обеспечения.</p>}
          />
        </Route>
        <Route
          path="app"
          element={
            <RequireAuth>
              <AppView />
            </RequireAuth>
          }
        >
          <Route 
            path="submissions"
            element={<Submits />} 
          />
          <Route 
            path="certifications" 
            element={<p>Эта часть в процессе. Будет доступен в бета-версии этого веб-программного обеспечения.</p>} 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
