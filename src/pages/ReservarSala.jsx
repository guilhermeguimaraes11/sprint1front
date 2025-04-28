import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";

// Simulando uma resposta do backend
const salasReservadas = [
  { id_sala: 1, horario_inicio: "09:00:00", horario_fim: "12:00:00" },
  { id_sala: 2, horario_inicio: "14:00:00", horario_fim: "18:00:00" }
];

function ReservarSala() {
  const navigate = useNavigate();
  const location = useLocation();
  const [horario, setHorario] = useState("");
  const [data, setData] = useState("");
  const [salasDisponiveis, setSalasDisponiveis] = useState([]);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const dataParam = params.get("data");
    setData(dataParam || "");

    // Aqui você pode substituir esse código por uma requisição ao backend
    // para buscar as salas disponíveis para o horário selecionado
    setSalasDisponiveis([1, 3, 5]); // Exemplo de salas disponíveis para reserva
  }, [location]);

  const handleReservar = () => {
    alert(`Reserva feita para o dia ${data} às ${horario}`);
    // Aqui você faria a lógica de enviar para o backend para salvar a reserva
  };

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    navigate("/");
  };

  return (
    <Container maxWidth="xl" sx={{ height: "100vh", backgroundColor: "#FFE6E6", display: "flex" }}>
      <Box sx={{ width: 250, backgroundColor: "#f2f2f2", paddingTop: 2 }}>
        <Box component="ul" sx={{ listStyle: "none", padding: 0 }}>
          {["Cadastro/Login", "Calendário", "Pesquisa", "Salas", "Reservas", "Configurações", "Finalizar seção"].map((item, index) => (
            <Box
              key={index}
              component="li"
              sx={{
                padding: "15px 20px",
                borderBottom: "1px solid #ddd",
                cursor: "pointer",
                color: item === "Finalizar seção" ? "red" : "black",
                '&:hover': {
                  backgroundColor: "#e6e6e6"
                }
              }}
              onClick={item === "Finalizar seção" ? handleLogout : undefined}
            >
              {item}
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ flex: 1, padding: 5 }}>
        <Box sx={{ backgroundColor: "#cc0000", borderRadius: 2, padding: 4, color: "white", marginBottom: 4, display: "flex", gap: 4 }}>
          <Box>
            <Typography variant="h5" fontWeight="bold">Sala X</Typography>
            <Typography>Bloco: Ex</Typography>
            <Typography>Categoria: Ex</Typography>
            <Typography>Andar: Ex</Typography>
            <Typography>Descrição: Ex</Typography>
          </Box>
          <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/640px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg" alt="Imagem da Sala" sx={{ width: 250, height: 150, objectFit: "cover", borderRadius: 2 }} />
        </Box>

        <Paper sx={{ backgroundColor: "#cc0000", borderRadius: 2, padding: 4, color: "white", display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography variant="h6" fontWeight="bold">Para a reserva:</Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Select
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              displayEmpty
              sx={{ backgroundColor: "white", color: "black", flex: 1 }}
            >
              <MenuItem value=""><em>Horários</em></MenuItem>
              <MenuItem value="08:00">08:00</MenuItem>
              <MenuItem value="10:00">10:00</MenuItem>
              <MenuItem value="14:00">14:00</MenuItem>
              <MenuItem value="16:00">16:00</MenuItem>
            </Select>

            <Select
              value={data}
              displayEmpty
              disabled
              sx={{ backgroundColor: "white", color: "black", flex: 1 }}
            >
              <MenuItem value=""><em>Data</em></MenuItem>
              <MenuItem value={data}>{data}</MenuItem>
            </Select>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <Button
              variant="contained"
              onClick={() => navigate("/calendario")}
              sx={{ backgroundColor: "#800000", "&:hover": { backgroundColor: "#660000" } }}
            >
              Voltar
            </Button>
            <Button
              variant="contained"
              onClick={handleReservar}
              sx={{ backgroundColor: "#800000", "&:hover": { backgroundColor: "#660000" } }}
              disabled={!horario || !salasDisponiveis.length}
            >
              Reservar
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default ReservarSala;
