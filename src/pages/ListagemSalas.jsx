// src/pages/ListagemSalas.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";
import Header from "../components/Header";
import ModalCriarReserva from "../components/ModalCriarReserva"; // << importa aqui
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
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";


function ListagemSalas() {
  const styles = getStyles();
  const [salas, setSalas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [openCriar, setOpenCriar] = useState(false);
  const [selectedSala, setSelectedSala] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();

  // Busca salas
  const getSalas = async () => {
    try {
      const { data } = await api.getSalas();
      setSalas(data.salas);
    } catch (err) {
      console.error("Erro ao buscar salas:", err);
    }
  };

  // Busca reservas
  const getReservas = async () => {
    try {
      const { data } = await api.getReservas();
      setReservas(data.reservas);
    } catch (err) {
      console.error("Erro ao buscar reservas:", err);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("authenticated")) {
      navigate("/");
    } else {
      getSalas();
      getReservas();
    }
  }, [navigate]);

  const handleOpenCriar = (sala) => {
    setSelectedSala(sala);
    setOpenCriar(true);
  };
  const handleCloseCriar = () => {
    setSelectedSala(null);
    setOpenCriar(false);
  };

  const handleReserva = async ({ data, horarioInicio, horarioFim }) => {
    if (!selectedSala) return;
    setLoading(true);

    try {
      const id_usuario = localStorage.getItem("id_usuario");
      await api.postReserva({
        data,
        horario_inicio: horarioInicio,
        horario_fim: horarioFim,
        fk_id_sala: selectedSala.id_sala,
        fk_id_usuario: id_usuario,
      });

      // Recarrega lista de reservas
      await getReservas();
      handleCloseCriar();
      alert("Reserva realizada com sucesso!");
    } catch (err) {
      console.error("Erro ao reservar sala:", err);
      alert(err.response?.data?.error || "Erro ao reservar");
    } finally {
      setLoading(false);
    }
  };

  const isSalaReservada = (id) =>
    reservas.some((r) => r.fk_id_sala === id);

  const salasFiltradas = salas.filter((s) => {
    const termo = filtro.toLowerCase();
    return (
      s.nome.toLowerCase().includes(termo) ||
      s.descricao.toLowerCase().includes(termo) ||
      s.bloco.toLowerCase().includes(termo) ||
      s.tipo.toLowerCase().includes(termo)
    );
  });

  return (
    <>
      <Header logout={true} />
      <Container sx={styles.container}>
        {/* Botão engrenagem no canto superior direito */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            pt: 2,
            pr: 2,
          }}
        >
          <IconButton
            color="gray"
            aria-label="configurações"
            onClick={() => navigate("/configuracoes")}
            size="large"
          >
            <SettingsIcon fontSize="inherit" />
          </IconButton>
        </Box>

        <TextField
          label="Buscar sala"
          variant="outlined"
          fullWidth
          sx={{ mt: 2, mb: 2, width: "60%" }}
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />

        <Box sx={styles.boxFundoTabela}>
          <TableContainer sx={styles.tableContainer}>
            <Table size="small" sx={styles.table}>
              <TableHead sx={styles.tableHead}>
                <TableRow sx={styles.tableRow}>
                  {[
                    "Nome",
                    "Descrição",
                    "Bloco",
                    "Tipo",
                    "Capacidade",
                    "Ações",
                  ].map((h) => (
                    <TableCell key={h} align="center" sx={styles.tableCell}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody sx={styles.tableBody}>
                {salasFiltradas.map((sala) => (
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
                        onClick={() => handleOpenCriar(sala)}
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
                          mr: 1,
                        }}
                      >
                        {isSalaReservada(sala.id_sala)
                          ? "Reservada"
                          : "Reservar"}
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          navigate(`/DisponibilidadeSala/${sala.id_sala}`)
                        }
                        sx={{
                          color: "#FF5757",
                          borderColor: "#FF5757",
                          "&:hover": { borderColor: "#e14e4e" },
                          fontWeight: "bold",
                          borderRadius: 2,
                        }}
                      >
                        Ver Disponibilidade
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {selectedSala && (
          <ModalCriarReserva
            open={openCriar}
            onClose={handleCloseCriar}
            onConfirm={handleReserva}
            loading={loading}
          />
        )}
      </Container>
    </>
  );
}

function getStyles() {
  return {
    container: {
      minWidth: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      backgroundColor: "#ffdcdc",
      position: "relative",
      minHeight: "100vh",
    },
    tableContainer: { backgroundColor: "transparent" },
    table: {
      backgroundColor: "#FF7B7B",
      m: 2.5,
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
    },
    tableBodyCell: {
      backgroundColor: "#FF7B7B",
      border: "1px solid white",
      fontSize: 20,
      py: 1.2,
    },
  };
}

export default ListagemSalas;
