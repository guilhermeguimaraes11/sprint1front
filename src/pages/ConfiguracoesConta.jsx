import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Modal,
} from "@mui/material";

function ConfiguracoesConta() {
  const [modalAberto, setModalAberto] = useState(false);

  const usuario = {
    nome: "Nome De Usuário",
    email: "Email Do Usuário",
    senha: "Senha Do Usuário",
  };

  const handleLogout = () => {
    // Aqui você pode limpar o token e redirecionar, por exemplo:
    console.log("Usuário desconectado");
    setModalAberto(false);
    // window.location.href = "/login";
  };

  return (
    <>
      <Box display="flex" height="100vh" bgcolor="#fff">
        {/* Menu lateral */}
        <Box width="250px" bgcolor="#f9f9f9" borderRight="1px solid #ddd" p={2}>
          <Typography variant="h6" color="gray" mb={2}>
            Tela Configurações
          </Typography>
          <List>
            {[
              "Salas",
              "Reservas",
              "Configurações",
            ].map((item, index) => (
              <ListItem button key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
            <ListItem
              button
              sx={{ backgroundColor: "#ffcccc", borderRadius: 1 }}
              onClick={() => setModalAberto(true)}
            >
              <ListItemText
                primary="Finalizar seção"
                primaryTypographyProps={{
                  color: "error",
                  fontWeight: "bold",
                }}
              />
            </ListItem>
          </List>
        </Box>

        {/* Conteúdo principal */}
        <Box flexGrow={1} bgcolor="#ffd6d6" p={5}>
          <Typography variant="h4" color="#a80805" fontWeight="bold" mb={4}>
            Configurações da conta:
          </Typography>

          <Box mb={3}>
            <Typography fontWeight="bold">Nome:</Typography>
            <TextField
              fullWidth
              value={usuario.nome}
              variant="filled"
              InputProps={{ style: { backgroundColor: "#fd7c7c" } }}
            />
          </Box>

          <Box mb={3}>
            <Typography fontWeight="bold">Email:</Typography>
            <TextField
              fullWidth
              value={usuario.email}
              variant="filled"
              InputProps={{ style: { backgroundColor: "#fd7c7c" } }}
            />
          </Box>

          <Box mb={4}>
            <Typography fontWeight="bold">Senha:</Typography>
            <TextField
              fullWidth
              type="password"
              value={usuario.senha}
              variant="filled"
              InputProps={{ style: { backgroundColor: "#fd7c7c" } }}
            />
          </Box>

          <Button
            variant="contained"
            onClick={() => setModalAberto(true)}
            sx={{
              backgroundColor: "red",
              color: "white",
              "&:hover": { backgroundColor: "#c62828" },
            }}
          >
            Sair da sessão
          </Button>
        </Box>
      </Box>

      {/* Modal de confirmação */}
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
            Você deseja encerrar a seção?
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

export default ConfiguracoesConta;
