import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios"; // Importando api correto
import Header from "../components/Header";
import ModalCriarReserva from "../components/ModalCriarReserva";
import ModalDisponibilidade from "../components/ModalDisponibilidade";
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
  const [openCriar, setOpenCriar] = useState(false);
  const [openDisponibilidade, setOpenDisponibilidade] = useState(false);
  const [selectedSala, setSelectedSala] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();

  // Buscar salas
  const getSalas = async () => {
    try {
      const { data } = await api.getSalas(); // supondo que api.getSalas existe e retorna { salas: [...] }
      setSalas(data.salas);
    } catch (err) {
      console.error("Erro ao buscar salas:", err);
      alert("Erro ao buscar salas."); // Feedback para o usuário
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("authenticated")) {
      navigate("/");
    } else {
      getSalas();
    }
    // Removido getReservas daqui, pois a verificação de disponibilidade será feita na reserva
  }, [navigate]);

  // Abrir modal para criar reserva
  const handleOpenCriar = (sala) => {
    setSelectedSala(sala);
    setOpenCriar(true);
  };

  // Fechar modal
  const handleCloseCriar = () => {
    setSelectedSala(null);
    setOpenCriar(false);
  };

  // Criar reserva
  const handleReserva = async ({ data, horarioInicio, horarioFim }) => {
    if (!selectedSala) return;
    setLoading(true);

    try {
      const id_usuario = localStorage.getItem("id_usuario");
      // A validação de horário e conflitos será feita pelo backend
      await api.postReserva({
        data,
        horario_inicio: horarioInicio,
        horario_fim: horarioFim,
        fk_id_sala: selectedSala.id_sala,
        fk_id_usuario: id_usuario,
      });
      alert("Reserva realizada com sucesso!");
      handleCloseCriar();
      // Recarregar as salas se necessário, ou apenas atualizar o estado local
      // dependendo de como as reservas afetam a visualização da sala.
      // Se 'isSalaReservada' não é mais usado para desabilitar o botão,
      // talvez não precise de getReservas aqui. Se o backend retornar
      // informações atualizadas de disponibilidade, use-as.
    } catch (err) {
      console.error("Erro ao reservar sala:", err);
      // Exibir a mensagem de erro do backend para o usuário
      alert(err.response?.data?.error || "Erro ao reservar sala. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // A função isSalaReservada foi removida ou simplificada no frontend.
  // A validação de disponibilidade em um período específico será feita no backend.
  // O botão "Reservar" estará sempre ativo, e o usuário receberá feedback após a tentativa.
  // Se você quiser desabilitar o botão após uma reserva BEM-SUCEDIDA para a mesma sala
  // no período, você precisaria de uma forma mais robusta de gerenciar o estado das reservas locais,
  // ou buscar as reservas novamente após o sucesso. Por enquanto, a validação fica no backend.

  // Filtra salas por texto do filtro
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
          sx={{ mt: 3, width: "65%" }}
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#9c27b0",
            color: "white",
            fontWeight: "bold",
            borderRadius: 2,
          }}
          onClick={() => setOpenDisponibilidade(true)}
        >
          Disponibilidade
        </Button>

        <Box sx={styles.boxFundoTabela}>
          <TableContainer sx={styles.tableContainer}>
            <Table size="small" sx={styles.table}>
              <TableHead sx={styles.tableHead}>
                <TableRow sx={styles.tableRow}>
                  {["Nome", "Descrição", "Bloco", "Tipo", "Capacidade", "Ações"].map((h) => (
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
                      {/* O botão "Reservar" estará sempre ativo para permitir a tentativa de reserva */}
                      <Button
                        variant="contained"
                        onClick={() => handleOpenCriar(sala)}
                        sx={{
                          backgroundColor: "#FF5757",
                          "&:hover": {
                            backgroundColor: "#e14e4e",
                          },
                          color: "#fff",
                          fontWeight: "bold",
                          borderRadius: 2,
                          mr: 1,
                        }}
                      >
                        Reservar
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

        <ModalDisponibilidade
          open={openDisponibilidade}
          onClose={() => setOpenDisponibilidade(false)}
        />
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