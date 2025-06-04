import { Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authenticated");
  return isAuthenticated ? <div>{children}<Footer/></div> : <Navigate to="/" />;
};  

export default ProtectedRoute;
