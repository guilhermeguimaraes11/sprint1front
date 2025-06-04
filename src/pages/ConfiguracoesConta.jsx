import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Modal,
  CircularProgress,
} from "@mui/material";

function ConfiguracoesConta() {
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Busca os dados do usuário no localStorage para preencher os campos
  const fetchUserData = () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("id_usuario");
      const nomeSalvo = localStorage.getItem("nome");
      const emailSalvo = localStorage.getItem("email");

      if (!userId || !nomeSalvo || !emailSalvo) {
        navigate("/"); // redireciona para login se faltar dados
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

  // Função para atualizar os dados do usuário via API
  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("id_usuario");
      if (!userId) {
        alert("Usuário não autenticado.");
        return;
      }

      const userDataToUpdate = { nome, email };
      if (senha) {
        userDataToUpdate.senha = senha;
      }

      // Exemplo: supondo que sua API tenha esse método
      await api.updateUsuario(userId, userDataToUpdate);

      // Atualiza localStorage com os novos dados
      localStorage.setItem("nome", nome);
      localStorage.setItem("email", email);

      alert("Dados atualizados com sucesso!");
      setSenha(""); // limpa campo senha
      setError(null);
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      setError("Não foi possível atualizar os dados.");
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

  return (
    <>
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
        <Box flexGrow={1} bgcolor="#ffd6d6" p={5}>
          <Typography variant="h4" color="#a80805" fontWeight="bold" mb={4}>
            Configurações da conta:
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
                <Typography fontWeight="bold">Nome:</Typography>
                <TextField
                  fullWidth
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  variant="filled"
                  InputProps={{ style: { backgroundColor: "#fd7c7c" } }}
                />
              </Box>

              <Box mb={3}>
                <Typography fontWeight="bold">Email:</Typography>
                <TextField
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="filled"
                  InputProps={{ style: { backgroundColor: "#fd7c7c" } }}
                />
              </Box>

              <Box mb={4}>
                <Typography fontWeight="bold">Nova Senha (opcional):</Typography>
                <TextField
                  fullWidth
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Deixe em branco para manter a senha atual"
                  variant="filled"
                  InputProps={{ style: { backgroundColor: "#fd7c7c" } }}
                />
              </Box>

              <Button
                variant="contained"
                onClick={handleUpdateUser}
                sx={{
                  backgroundColor: "#A80805",
                  color: "white",
                  "&:hover": { backgroundColor: "#c62828" },
                  mr: 2,
                }}
              >
                Salvar Alterações
              </Button>

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
            </>
          )}
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

export default ConfiguracoesConta;