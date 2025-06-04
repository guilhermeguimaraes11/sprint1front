import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";

import {
  Box,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@mui/material";

import Header from "../components/Header"; // Importando Header

function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(false);

  const fetchReservas = async () => {
    try {
      const userId = localStorage.getItem("id_usuario");
      const response = await api.getAllreserva_salas();
      const minhas = response.data.reserva_sala.filter(
        (r) => String(r.fk_id_usuario) === String(userId)
      );
      setReservas(minhas);
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
      alert("Não foi possível carregar suas reservas");
    }
  };

  const handleCancelar = async (reservaId) => {
    if (!window.confirm("Deseja realmente cancelar esta reserva?")) return;
    try {
      await api.deleteReserva(reservaId);
      fetchReservas();
    } catch (error) {
      console.error("Erro ao cancelar reserva", error);
      alert("Não foi possível cancelar a reserva");
    }
  };

  useEffect(() => {
    const isAuth = localStorage.getItem("authenticated");
    if (!isAuth) {
      navigate("/");
    } else {
      fetchReservas();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    setModalAberto(false);
    navigate("/");
  };

  return (
    <>
      <Header logout={false} />

      <Box display="flex" height="100vh" bgcolor="#ffe5e5">
        {/* Menu lateral */}
        <Box width="250px" bgcolor="#f9f9f9" borderRight="1px solid #ddd">
          <Typography variant="h6" sx={{ m: 2, color: "gray" }}>
            Minhas Reservas
          </Typography>
          <List>
            {["Listagem de salas", "Minhas reservas", "Configurações"].map(
              (item, idx) => (
                <ListItem
                  button
                  key={idx}
                  onClick={() => {
                    if (item === "Listagem de salas")
                      navigate("/ListagemSalas");
                    if (item === "Minhas reservas") navigate("/reservas");
                    if (item === "Configurações") navigate("/configuracoes");
                  }}
                  sx={{ cursor: "pointer" }} // Para garantir cursor pointer
                >
                  <ListItemText primary={item} />
                </ListItem>
              )
            )}

            <ListItem
              button
              sx={{ backgroundColor: "#ffcccc", borderRadius: 1 }}
              onClick={() => setModalAberto(true)}
            >
              <ListItemText
                primary="Finalizar sessão"
                primaryTypographyProps={{
                  color: "error",
                  fontWeight: "bold",
                }}
              />
            </ListItem>
          </List>
        </Box>

        {/* Conteúdo principal */}
        <Box flexGrow={1} p={4}>
          <Typography variant="h4" fontWeight="bold" color="#A80805" mb={3}>
            Suas Reservas
          </Typography>

          {reservas.length === 0 ? (
            <Typography>Você não tem reservas no momento.</Typography>
          ) : (
            reservas.map((reserva) => (
              <Paper
                key={reserva.id_reserva}
                elevation={4}
                sx={{
                  mb: 3,
                  p: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 4,
                  backgroundColor: "#FD7C7C",
                  color: "black",
                  border: "1px solid red",
                }}
              >
                <Box>
                  <Typography variant="h5" fontWeight="bold" color="white">
                    {reserva.sala_nome || reserva.sala?.nome || "Sala"}
                  </Typography>
                </Box>

                <Box textAlign="left" ml={2} flexGrow={1}>
                  <Typography fontWeight="bold">Data:</Typography>
                  <Typography>
                    {new Date(reserva.data).toLocaleDateString("pt-BR")}
                  </Typography>
                  <Typography>
                    {reserva.horario_inicio} - {reserva.horario_fim}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  onClick={() => handleCancelar(reserva.id_reserva)}
                  sx={{
                    backgroundColor: "#A80805",
                    color: "white",
                    "&:hover": { backgroundColor: "#c62828" },
                  }}
                >
                  Cancelar
                </Button>
              </Paper>
            ))
          )}
        </Box>
      </Box>

      {/* Modal para finalizar sessão */}
      <Modal open={modalAberto} onClose={() => setModalAberto(false)}>
        <Box
          bgcolor="#fd7c7c"
          color="black"
          p={4}
          borderRadius={4}
          boxShadow={24}
          maxWidth={400}
          mx="auto"
          mt="20vh"
          textAlign="center"
        >
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Você deseja encerrar a sessão?
          </Typography>
          <Typography fontWeight="bold" mb={4}>
            Sua conta será desconectada
          </Typography>

          <Box display="flex" justifyContent="space-evenly">
            <Button
              onClick={handleLogout}
              variant="contained"
              sx={{
                backgroundColor: "darkred",
                color: "white",
                borderRadius: 2,
                px: 5,
              }}
            >
              Sim
            </Button>
            <Button
              onClick={() => setModalAberto(false)}
              variant="contained"
              sx={{
                backgroundColor: "darkred",
                color: "white",
                borderRadius: 2,
                px: 5,
              }}
            >
              Não
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default MinhasReservas;
