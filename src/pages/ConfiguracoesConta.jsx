// src/pages/ConfiguracoesConta.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import FinalizarSecao from "../components/FinalizarSecao";
import api from "../axios/axios";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";

function ConfiguracoesConta() {
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("id_usuario");
      const nomeSalvo = localStorage.getItem("nome");
      const emailSalvo = localStorage.getItem("email");

      if (!userId || !nomeSalvo || !emailSalvo) {
        navigate("/");
        return;
      }

      setNome(nomeSalvo);
      setEmail(emailSalvo);
      setError(null);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setError("Erro ao carregar dados do usuário.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isAuth = localStorage.getItem("authenticated");
    if (!isAuth) {
      navigate("/");
    } else {
      fetchUserData();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    setModalAberto(false);
    navigate("/");
  };

  const handleAtualizarUsuario = async () => {
    const id_usuario = localStorage.getItem("id_usuario");

    if (!id_usuario) {
      setError("ID do usuário não encontrado.");
      return;
    }

    try {
      setLoading(true);
     await api.updateUser(id_usuario, {
  nomecompleto: nome,
  email: email,
});

      localStorage.setItem("nome", nome);
      localStorage.setItem("email", email);

      setError(null);
      alert("Dados atualizados com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      setError("Erro ao atualizar dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleExcluirConta = async () => {
    const id_usuario = localStorage.getItem("id_usuario");

    if (!id_usuario) {
      setError("ID do usuário não encontrado.");
      return;
    }

    const confirmar = window.confirm(
      "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita."
    );
    if (!confirmar) return;

    try {
      setLoading(true);
      await api.deleteUser(id_usuario);
      alert("Conta excluída com sucesso.");
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error("Erro ao excluir conta:", err);
      setError("Erro ao excluir a conta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header logout={false} />

      <Box display="flex" height="100vh" bgcolor="#fff">
        {/* Menu lateral */}
        <Box width="250px" bgcolor="#f9f9f9" borderRight="1px solid #ddd" p={2}>
          <Typography variant="h6" color="gray" mb={2}>
            Tela Configurações
          </Typography>
          <List>
            {["Listagem de salas", "Minhas reservas", "Configurações"].map(
              (item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => {
                    if (item === "Listagem de salas") navigate("/ListagemSalas");
                    if (item === "Minhas reservas") navigate("/reservas");
                    if (item === "Configurações") navigate("/configuracoes");
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <ListItemText primary={item} />
                </ListItem>
              )
            )}
            <ListItem
              button
              sx={{ borderRadius: 1 }}
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
        <Box flexGrow={1} bgcolor="#ffd6d6" p={5}>
          <Typography variant="h4" color="black" fontWeight="bold" mb={4}>
            Informações do usuário
          </Typography>

          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="50%"
            >
              <CircularProgress color="error" />
              <Typography ml={2}>Carregando informações...</Typography>
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <>
              <Box mb={3}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Nome:
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Box>

              <Box mb={3}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Email:
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>

             <Box display="flex" flexDirection="column" gap={2}>
  <Button variant="contained" color="error" onClick={handleAtualizarUsuario}>
    Atualizar dados
  </Button>
  <Button variant="outlined" color="error" onClick={handleExcluirConta}>
    Excluir minha conta
  </Button>
</Box>
            </>
          )}
        </Box>
      </Box>

      {/* Modal de confirmação de logout */}
      <FinalizarSecao
        open={modalAberto}
        onConfirm={handleLogout}
        onCancel={() => setModalAberto(false)}
      />
    </>
  );
}

export default ConfiguracoesConta;
