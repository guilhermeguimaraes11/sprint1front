import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ListagemSalas from "./pages/ListagemSalas";
import Home from "./pages/Home";
import Calendario from "./pages/Calendario"; 
import ReservarSala from "./pages/ReservarSala"; // <<< importação da nova página
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
        <Route
          path="/reservar-sala" // <<< Nova rota adicionada
          element={
            <ProtectedRouter>
              <ReservarSala />
            </ProtectedRouter>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
