import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authenticated");
  return isAuthenticated ? children : <Navigate to="/principal" />;
};
export default ProtectedRouter;