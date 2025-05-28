import React, { useState, useEffect } from "react"; // Importe useEffect
import { useNavigate } from "react-router-dom"; // Importe useNavigate para redirecionamento
import api from "../axios/axios"; // Assumindo que você tem um arquivo api.js configurado para suas chamadas de API

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Modal,
  CircularProgress, // Adicionado para indicar carregamento
} from "@mui/material";

function ConfiguracoesConta() {
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState(""); // Estado para o nome
  const [email, setEmail] = useState(""); // Estado para o email
  const [senha, setSenha] = useState(""); // Estado para a senha (se permitir edição)
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento
  const [error, setError] = useState(null); // Estado para lidar com erros
  const navigate = useNavigate(); // Hook para navegação

  // Função para buscar os dados do usuário da API
  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = localStorage.getItem("id_usuario");
      if (!userId) {
        navigate("/"); // Redireciona se não houver ID de usuário logado
        return;
      }
        // Exemplo: Supondo que sua API tenha um endpoint para buscar dados do usuário por ID
        // const response = await api.get(`/users/${userId}`); // Ajuste o endpoint conforme sua API
        // Dados de exemplo, substitua pela chamada real à API
        const response = {
          data: {
            nome: "",
            email: "",
          }
        };

      setNome(response.data.nome);
      setEmail(response.data.email);
      // Não preencha a senha aqui por segurança, o usuário deve digitá-la para alterar
    } catch (err) {
      console.error("Erro ao carregar dados do usuário:", err);
      setError("Não foi possível carregar as informações do usuário.");
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com a atualização dos dados do usuário
  const handleUpdateUser = async () => {
    // Validação básica
    if (!nome || !email) {
      alert("Nome e Email são obrigatórios.");
      return;
    }

    try {
      const userId = localStorage.getItem("id_usuario");
      if (!userId) {
        alert("Usuário não autenticado.");
        return;
      }

      const userDataToUpdate = { nome, email };
      if (senha) { // Apenas inclua a senha se ela foi digitada para atualização
        userDataToUpdate.senha = senha;
      }

      // Exemplo: Supondo que sua API tenha um endpoint para atualizar dados do usuário
      // await api.put(`/users/${userId}`, userDataToUpdate); // Ajuste o endpoint e o método (PUT/PATCH)
      // Simulação de chamada de API
      console.log("Dados a serem enviados para atualização:", userDataToUpdate);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay da API

      alert("Informações atualizadas com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar informações:", err);
      alert("Não foi possível atualizar as informações. Tente novamente.");
    }
  };

  // Efeito para carregar os dados do usuário quando o componente for montado
  useEffect(() => {
    const isAuth = localStorage.getItem("authenticated");
    if (!isAuth) {
      navigate("/"); // Redireciona para a página inicial/login se não estiver autenticado
    } else {
      fetchUserData();
    }
  }, [navigate]); // Adicionado navigate como dependência

  const handleLogout = () => {
    // Limpa os dados de autenticação e redireciona
    localStorage.clear(); // Limpa todos os itens do localStorage
    console.log("Usuário desconectado");
    setModalAberto(false);
    navigate("/"); // Redireciona para a página de login/inicial
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
            {["Listagem de salas", "Minhas reservas", "Configurações"].map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  if (item === "Salas") navigate("/salas");
                  if (item === "Reservas") navigate("/minhas-reservas");
                  // Se for "Configurações", já estamos aqui, ou pode navegar para uma sub-rota
                }}
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
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
            <Box display="flex" justifyContent="center" alignItems="center" height="50%">
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
                  onChange={(e) => setNome(e.target.value)} // Adicionado onChange
                  variant="filled"
                  InputProps={{ style: { backgroundColor: "#fd7c7c" } }}
                />
              </Box>

              <Box mb={3}>
                <Typography fontWeight="bold">Email:</Typography>
                <TextField
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Adicionado onChange
                  variant="filled"
                  InputProps={{ style: { backgroundColor: "#fd7c7c" } }}
                />
              </Box>

              <Box mb={4}>
                <Typography fontWeight="bold">Nova Senha (opcional):</Typography>
                <TextField
                  fullWidth
                  type="password"
                  value={senha} // Removido "Senha Do Usuário" fixo
                  onChange={(e) => setSenha(e.target.value)} // Adicionado onChange
                  placeholder="Deixe em branco para manter a senha atual" // Dica para o usuário
                  variant="filled"
                  InputProps={{ style: { backgroundColor: "#fd7c7c" } }}
                />
              </Box>

              <Button
                variant="contained"
                onClick={handleUpdateUser} // Botão para salvar as alterações
                sx={{
                  backgroundColor: "#A80805", // Vermelho do seu tema
                  color: "white",
                  "&:hover": { backgroundColor: "#c62828" },
                  mr: 2, // Margem à direita
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

      {/* Modal de confirmação (mantido como está) */}
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