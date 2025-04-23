import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ListagemSalas from "./pages/ListagemSalas";
import Home from "./pages/Home";
import Calendario from "./pages/Calendario"; 
import ProtectedRouter from "./components/ProtectedRouter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/ListagemSalas"
          element={
            <ProtectedRouter>
              <ListagemSalas />
            </ProtectedRouter>
          }
        />
        <Route
          path="/Calendario"
          element={
            <ProtectedRouter>
              <Calendario />
            </ProtectedRouter>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
