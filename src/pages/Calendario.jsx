import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from "axios"; // Importando axios para chamadas HTTP

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function Calendario() {
  const navigate = useNavigate();
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const [reservas, setReservas] = useState([]); // Estado para armazenar as reservas

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated");
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const diasNoMes = (mes, ano) => {
    return new Date(ano, mes + 1, 0).getDate();
  };

  const primeiroDiaSemana = (mes, ano) => {
    return new Date(ano, mes, 1).getDay();
  };

  const mudarMes = (direcao) => {
    let novoMes = mesAtual + direcao;
    let novoAno = anoAtual;

    if (novoMes < 0) {
      novoMes = 11;
      novoAno--;
    } else if (novoMes > 11) {
      novoMes = 0;
      novoAno++;
    }

    setMesAtual(novoMes);
    setAnoAtual(novoAno);
  };

  const totalDias = diasNoMes(mesAtual, anoAtual);
  const primeiroDia = primeiroDiaSemana(mesAtual, anoAtual);

  const diasCalendario = Array(primeiroDia).fill(null).concat(
    Array.from({ length: totalDias }, (_, i) => i + 1)
  );

  const handleDiaClick = async (dia) => {
    if (dia) {
      const dataSelecionada = `${anoAtual}-${String(mesAtual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
      try {
        const response = await axios.get(`/api/reservas?data=${dataSelecionada}`); // Chamada ao backend
        setReservas(response.data); // Atualiza o estado com as reservas para essa data
        navigate(`/reservar-sala?data=${dataSelecionada}`);
      } catch (error) {
        console.error("Erro ao buscar as reservas:", error);
      }
    }
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

      <Box sx={{ flex: 1, padding: 5, display: "flex", gap: 3 }}>
        <Box>
          <Paper sx={styles.card}>
            <Box sx={styles.cardClose}>x</Box>
            <Typography variant="h6" fontWeight="bold">Escolha uma data</Typography>
            <Typography variant="body2">
              Clique no dia e as salas a serem reservadas nele serão exibidas.
            </Typography>
          </Paper>
        </Box>

        <Box sx={styles.calendarContainer}>
          <Box sx={styles.calendarHeader}>
            <Button onClick={() => mudarMes(-1)}>{"<"}</Button>
            <Typography variant="h6">{meses[mesAtual]} {anoAtual}</Typography>
            <Button onClick={() => mudarMes(1)}>{">"}</Button>
          </Box>
          <Grid container spacing={1}>
            {["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa"].map((dia, i) => (
              <Grid item xs={1.71} key={"header-" + i}>
                <Paper sx={styles.dayHeader}>{dia}</Paper>
              </Grid>
            ))}
            {diasCalendario.map((dia, i) => (
              <Grid item xs={1.71} key={"day-" + i}>
                <Paper
                  sx={dia ? styles.day : { display: "none" }}
                  onClick={() => handleDiaClick(dia)}
                >
                  {dia}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

const styles = {
  card: {
    backgroundColor: "#cc0000",
    color: "white",
    padding: 2,
    borderRadius: 2,
    marginBottom: 3,
    width: 250,
    position: "relative"
  },
  cardClose: {
    position: "absolute",
    top: 8,
    right: 8,
    cursor: "pointer",
    fontWeight: "normal"
  },
  calendarContainer: {
    flexGrow: 1,
    backgroundColor: "white",
    padding: 3,
    borderRadius: 2,
    boxShadow: 3
  },
  calendarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2
  },
  dayHeader: {
    backgroundColor: "#f2f2f2",
    padding: 1,
    textAlign: "center",
    fontWeight: "bold"
  },
  day: {
    border: "1px solid #ddd",
    padding: 1,
    textAlign: "center",
    cursor: "pointer",
    '&:hover': { backgroundColor: "#e6e6e6" },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default Calendario;
