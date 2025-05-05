import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ListagemSalas from "./pages/ListagemSalas";
import DisponibilidadeSala from "./pages/DisponibilidadeSala"; 
import Home from "./pages/Home";
import ProtectedRouter from "./components/ProtectedRouter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        
        <Route
          path="/ListagemSalas"
          element={
            <ProtectedRouter>
              <ListagemSalas />
            </ProtectedRouter>
          }
        />
        
        {/* Rota para a tela de Disponibilidade usando fk_id_sala */}
        <Route
          path="/DisponibilidadeSala/:fk_id_sala"
          element={
            <ProtectedRouter>
              <DisponibilidadeSala />
            </ProtectedRouter>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
