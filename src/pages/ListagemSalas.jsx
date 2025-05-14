import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ReservaModal from "../components/ReservaModal"; // Importe o componente ReservaModal

function ListagemSalas() {
  const styles = getStyles();
  const [salas, setSalas] = useState([]); // Lista de salas
  const [reservas, setReservas] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSala, setSelectedSala] = useState(null); // Sala selecionada para reserva
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState(""); // Campo de busca
  const navigate = useNavigate();

  // Função para buscar as salas
  async function getSalas() {
    try {
      const response = await api.getSalas();
      setSalas(response.data.salas); // Atualiza o estado com a lista de salas
    } catch (error) {
      console.log("Erro", error);
    }
  }

  async function getReservas() {
    try {
      const response = await api.getReservas();
      setReservas(response.data.reservas);
    } catch (error) {
      console.log("Erro ao buscar reservas", error);
    }
  }

  // useEffect que verifica autenticação e carrega os dados iniciais
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated");

    if (!isAuthenticated) {
      navigate("/"); // Redireciona se não estiver autenticado
    } else {
      getSalas(); // Busca salas
      getReservas(); // Busca reservas
    }
  }, [navigate]);

  // Abre o modal e define a sala selecionada
  const handleOpenModal = (sala) => {
    setSelectedSala(sala);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedSala(null);
    setOpenModal(false);
  };

  // Realiza a requisição de reserva da sala
  const handleReserva = async (formData) => {
    if (!selectedSala) return;
    setLoading(true);
    try {
      const id_usuario = localStorage.getItem("id_usuario");
      await api.postReserva({
        data: formData.data,
        horario_inicio: formData.horarioInicio,
        horario_fim: formData.horarioFim,
        fk_id_sala: selectedSala.id_sala,
        fk_id_usuario: id_usuario,
      });
      await getReservas(); // Atualiza lista de reservas
      handleCloseModal();
      alert("Reserva realizada com sucesso!");
    } catch (error) {
      console.error("Erro ao reservar sala", error);
      alert(error.response?.data?.error || "Erro ao reservar");
    } finally {
      setLoading(false);
    }
  };

  // Verifica se a sala está reservada
  const isSalaReservada = (salaId) => {
    return reservas.some((reserva) => reserva.fk_id_sala === salaId);
  };

  // Filtra as salas com base no texto digitado
  const salasFiltradas = salas.filter((sala) => {
    const termo = filtro.toLowerCase();
    return (
      sala.nome.toLowerCase().includes(termo) ||
      sala.descricao.toLowerCase().includes(termo) ||
      sala.bloco.toLowerCase().includes(termo) ||
      sala.tipo.toLowerCase().includes(termo)
    );
  });

  // Renderização das linhas da tabela com ações
  const listSalas = salasFiltradas.map((sala, index) => (
    <TableRow key={sala.id_sala}>
      <TableCell align="center" sx={styles.tableBodyCell}>
        {sala.nome}
      </TableCell>
      <TableCell align="center" sx={styles.tableBodyCell}>
        {sala.descricao}
      </TableCell>
      <TableCell align="center" sx={styles.tableBodyCell}>
        {sala.bloco}
      </TableCell>
      <TableCell align="center" sx={styles.tableBodyCell}>
        {sala.tipo}
      </TableCell>
      <TableCell align="center" sx={styles.tableBodyCell}>
        {sala.capacidade}
      </TableCell>
      <TableCell align="center" sx={styles.tableBodyCell}>
        <Button
          variant="contained"
          disabled={isSalaReservada(sala.id_sala)}
          onClick={() => handleOpenModal(sala)}
          sx={{
            backgroundColor: isSalaReservada(sala.id_sala)
              ? "#B0B0B0"
              : "#FF5757",
            "&:hover": {
              backgroundColor: isSalaReservada(sala.id_sala)
                ? "#B0B0B0"
                : "#e14e4e",
            },
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 2,
          }}
        >
          {isSalaReservada(sala.id_sala) ? "Reservada" : "Reservar"}
        </Button>

        {/* Botão "Ver Disponibilidade" */}
        {index === 0 && (
          <Button
            variant="outlined"
            onClick={() => navigate(`/DisponibilidadeSala/${sala.id_sala}`)}
            sx={{
              marginTop: 1,
              color: "white",
              borderColor: "#FF5757",
              "&:hover": {
                borderColor: "#e14e4e",
                backgroundColor: "",
              },
              fontWeight: "bold",
              borderRadius: 2,
            }}
          >
            Ver Disponibilidade
          </Button>
        )}
      </TableCell>
    </TableRow>
  ));

  return (
    <Container sx={styles.container}>
      {/* Campo de filtro de busca */}
      <TextField
        label="Buscar sala"
        variant="outlined"
        fullWidth
        sx={{ mt: 4, mb: 2, width: "60%" }}
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      {/* Tabela de salas */}
      <Box sx={styles.boxFundoTabela}>
        <TableContainer sx={styles.tableContainer}>
          <Table size="small" sx={styles.table}>
            <TableHead sx={styles.tableHead}>
              <TableRow sx={styles.tableRow}>
                <TableCell align="center" sx={styles.tableCell}>
                  Nome
                </TableCell>
                <TableCell align="center" sx={styles.tableCell}>
                  Descrição
                </TableCell>
                <TableCell align="center" sx={styles.tableCell}>
                  Bloco
                </TableCell>
                <TableCell align="center" sx={styles.tableCell}>
                  Tipo
                </TableCell>
                <TableCell align="center" sx={styles.tableCell}>
                  Capacidade
                </TableCell>
                <TableCell align="center" sx={styles.tableCell}>
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={styles.tableBody}>{listSalas}</TableBody>
          </Table>
        </TableContainer>
      </Box>

      {selectedSala && (
        <ReservaModal
          open={openModal}
          onClose={handleCloseModal}
          onReserva={handleReserva}
          loading={loading}
        />
      )}
    </Container>
  );
}

// Estilização centralizada da aplicação
function getStyles() {
  return {
    container: {
      minWidth: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    tableContainer: { backgroundColor: "transparent" },
    table: {
      backgroundColor: "#FF7B7B",
      marginTop: 2.5,
      marginBottom: 2.5,
      marginLeft: "auto",
      marginRight: "auto",
      width: "calc(100% - 40px)",
      borderRadius: "15px",
    },
    boxFundoTabela: {
      borderRadius: "15px",
      backgroundColor: "#FFC2C2",
      width: "90%",
    },
    tableCell: {
      backgroundColor: "#D9D9D9",
      border: "2px solid white",
      fontWeight: "bold",
      fontSize: 22,
      paddingTop: 2,
    },
    tableBodyCell: {
      backgroundColor: "#FF7B7B",
      border: "1px solid white",
      fontSize: 20,
      paddingTop: 1.2,
      paddingBottom: 1.2,
    },
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      p: 4,
      borderRadius: 2,
    },
  };
}

export default ListagemSalas;

