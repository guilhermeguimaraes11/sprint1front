import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import api from "../axios/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

export default function ModalDisponibilidade({ open, onClose }) {
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [salasDisponiveis, setSalasDisponiveis] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const handleVerificar = async () => {
    if (!inicio || !fim) {
      alert("Preencha as duas datas.");
      return;
    }

    setCarregando(true);
    setSalasDisponiveis([]);

    try {
      const resposta = await api.getDisponibilidade(inicio, fim);
      setSalasDisponiveis(resposta.data.salas || []);
    } catch (erro) {
      console.error("Erro ao buscar disponibilidade:", erro);
      alert("Erro ao buscar disponibilidade.");
    } finally {
      setCarregando(false);
    }
  };

  const handleClose = () => {
    setInicio("");
    setFim("");
    setSalasDisponiveis([]);
    setCarregando(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" textAlign="center" fontWeight="bold" gutterBottom>
          Consultar disponibilidade
        </Typography>

        <TextField
          label="Data Início"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={inicio}
          onChange={(e) => setInicio(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Data Fim"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={fim}
          onChange={(e) => setFim(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ backgroundColor: "#C30000", mb: 2 }}
          onClick={handleVerificar}
        >
          Verificar Disponibilidade
        </Button>

        {carregando && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        )}

        {!carregando && salasDisponiveis.length > 0 && (
          <>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
              Salas disponíveis:
            </Typography>
            <List dense>
              {salasDisponiveis.map((sala) => (
                <ListItem key={sala.id_sala}>
                  <ListItemText
                    primary={`${sala.nome} (${sala.bloco})`}
                    secondary={`Capacidade: ${sala.capacidade}`}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}

        {!carregando && salasDisponiveis.length === 0 && inicio && fim && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Nenhuma sala disponível no período informado.
          </Typography>
        )}

        <Button variant="outlined" fullWidth onClick={handleClose} sx={{ mt: 2 }}>
          Fechar
        </Button>
      </Box>
    </Modal>
  );
}
