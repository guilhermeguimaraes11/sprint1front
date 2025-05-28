import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ListagemSalas from "./pages/ListagemSalas";
import DisponibilidadeSala from "./pages/DisponibilidadeSala";
import Home from "./pages/Home";
import ProtectedRouter from "./components/ProtectedRouter";
import Reservas from "./pages/MinhaReservas";
import ConfiguracoesConta from "./pages/ConfiguracoesConta";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route
          path="/ListagemSalas"
          element={
            <ProtectedRouter>
              <ListagemSalas />
            </ProtectedRouter>
          }
        />

        <Route
          path="/DisponibilidadeSala/:fk_id_sala"
          element={
            <ProtectedRouter>
              <DisponibilidadeSala />
            </ProtectedRouter>
          }
        />

        <Route
          path="/reservas"
          element={
            <ProtectedRouter>
              <Reservas />
            </ProtectedRouter>
          }
        />

        <Route
          path="/configuracoes"
          element={
            <ProtectedRouter>
              <ConfiguracoesConta />
            </ProtectedRouter>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;