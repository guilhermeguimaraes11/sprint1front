import React from "react";
import { Box, Button, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

function Reservas() {
  const reservas = [
    { sala: "Sala 1", data: "3/12", horario: "12:30 - 14:45" },
    { sala: "Sala 2", data: "3/12", horario: "12:30 - 14:45" },
    { sala: "Sala 3", data: "3/12", horario: "12:30 - 14:45" },
  ];

  return (
    <Box display="flex" height="100vh" bgcolor="#ffe5e5">
      {/* Menu lateral */}
      <Box width="250px" bgcolor="#f9f9f9" borderRight="1px solid #ddd">
        <Typography variant="h6" sx={{ m: 2, color: "gray" }}>
          Tela Reservas
        </Typography>
        <List>
          {[ "Salas", "Reservas", "Configurações"].map((item, index) => (
            <ListItem button key={index}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
          <ListItem>
            <ListItemText
              primary="Finalizar seção"
              primaryTypographyProps={{ color: "error", fontWeight: "bold" }}
            />
          </ListItem>
        </List>
      </Box>

      {/* Conteúdo principal */}
      <Box flexGrow={1} p={4}>
        <Typography variant="h4" fontWeight="bold" color="#A80805" mb={3}>
          Reservas:
        </Typography>

        {reservas.map((reserva, index) => (
          <Paper
            key={index}
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
                {reserva.sala}
              </Typography>
            </Box>

            <Box textAlign="left" ml={2}>
              <Typography fontWeight="bold">Reservado para:</Typography>
              <Typography>{reserva.data}</Typography>
              <Typography>{reserva.horario}</Typography>
            </Box>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#A80805",
                color: "white",
                "&:hover": { backgroundColor: "#c62828" },
              }}
            >
              Cancelar reserva
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default Reservas;
