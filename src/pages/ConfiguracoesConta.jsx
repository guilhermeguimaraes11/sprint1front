import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import FinalizarSecao from "../components/FinalizarSecao";
import ModalAtualizarUser from "../components/ModalAtualizarUser"; // Modal atualizar
import ModalDeletarUser from "../components/ModalDeletarUser"; // Modal deletar
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
  const [modalAtualizarAberto, setModalAtualizarAberto] = useState(false);
  const [modalDeletarAberto, setModalDeletarAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("id_usuario");
      const nomeSalvo = localStorage.getItem("nome");
      const emailSalvo = localStorage.getItem("email");
      const cpfSalvo = localStorage.getItem("cpf");

      if (!userId || !nomeSalvo || !emailSalvo || !cpfSalvo) {
        navigate("/");
        return;
      }

      setNome(nomeSalvo);
      setEmail(emailSalvo);
      setCpf(cpfSalvo);
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
        cpf,
        nomecompleto: nome,
        email,
      });

      localStorage.setItem("nome", nome);
      localStorage.setItem("email", email);
      localStorage.setItem("cpf", cpf);

      setError(null);
      alert("Dados atualizados com sucesso!");
      setModalAtualizarAberto(false); // fecha modal só aqui, após sucesso
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Erro ao atualizar dados.");
      }
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

    try {
      setLoading(true);
      await api.deleteUser(id_usuario);
      alert("Conta excluída com sucesso.");
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error("Erro ao excluir conta:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Erro ao excluir a conta.");
      }
    } finally {
      setLoading(false);
      setModalDeletarAberto(false);
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
                  CPF:
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  disabled
                  value={cpf}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>

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
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setModalAtualizarAberto(true)}
                >
                  Atualizar dados
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setModalDeletarAberto(true)} // abrir modal deletar
                >
                  Excluir minha conta
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>

      <FinalizarSecao
        open={modalAberto}
        onConfirm={handleLogout}
        onCancel={() => setModalAberto(false)}
      />

      <ModalAtualizarUser
        open={modalAtualizarAberto}
        onConfirm={handleAtualizarUsuario} 
        onCancel={() => setModalAtualizarAberto(false)}
      />

      <ModalDeletarUser
        open={modalDeletarAberto}
        onConfirm={handleExcluirConta}
        onCancel={() => setModalDeletarAberto(false)}
      />
    </>
  );
}

export default ConfiguracoesConta;
