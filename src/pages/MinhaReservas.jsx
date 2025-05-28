

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";

import { Box, Button, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  // Carrega as reservas do usuário logado
  const fetchReservas = async () => {
    try {
      const userId = localStorage.getItem("id_usuario");
      const response = await api.getReservas(); // retorna todas as reservas
      // filtra apenas as do usuário logado
      const minhas = response.data.reservas.filter(
        (r) => String(r.fk_id_usuario) === String(userId)
      );
      setReservas(minhas);
    } catch (error) {
      console.error("Erro ao buscar reservas", error);
      alert("Não foi possível carregar suas reservas");
    }
  };

  // Cancela uma reserva
  const handleCancelar = async (reservaId) => {
    if (!window.confirm("Deseja realmente cancelar esta reserva?")) return;
    try {
      await api.deleteReserva(reservaId);
      // recarrega lista
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

  return (
    <Box display="flex" height="100vh" bgcolor="#ffe5e5">
      {/* Menu lateral */}
      <Box width="250px" bgcolor="#f9f9f9" borderRight="1px solid #ddd">
        <Typography variant="h6" sx={{ m: 2, color: "gray" }}>
          Minhas Reservas
        </Typography>
        <List>
          {["Listagem de salas", "Minhas reservas", "Configurações"].map((item, idx) => (
            <ListItem
              button
              key={idx}
              onClick={() => {
                if (item === "Salas") navigate("/salas");
                if (item === "Reservas") navigate("/minhas-reservas");
                // você pode adicionar configurações aqui
              }}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
          <ListItem button onClick={() => {
            localStorage.clear();
            navigate("/");
          }}>
            <ListItemText
              primary="Finalizar sessão"
              primaryTypographyProps={{ color: "error", fontWeight: "bold" }}
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
          <Typography>
            Você não tem reservas no momento.
          </Typography>
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
                  {reserva.sala_nome /* ou reserva.sala.nome, conforme seu objeto */}
                </Typography>
              </Box>

              <Box textAlign="left" ml={2} flexGrow={1}>
                <Typography fontWeight="bold">Data:</Typography>
                <Typography>{reserva.data}</Typography>
                <Typography>{reserva.horario_inicio} - {reserva.horario_fim}</Typography>
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
  );
}

export default MinhasReservas;
