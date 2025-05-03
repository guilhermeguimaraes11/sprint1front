import { useEffect, useState } from "react";
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
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

function ListagemSalas() {
  const styles = getStyles();
  const [salas, setSalas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSala, setSelectedSala] = useState(null);
  const [formData, setFormData] = useState({ data: "", horarioInicio: "", horarioFim: "" });
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState("");
  const navigate = useNavigate();

  async function getSalas() {
    try {
      const response = await api.getSalas();
      setSalas(response.data.salas);
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

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated");

    if (!isAuthenticated) {
      navigate("/");
    } else {
      getSalas();
      getReservas();
    }
  }, [navigate]);

  const handleOpenModal = (sala) => {
    setSelectedSala(sala);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedSala(null);
    setFormData({ data: "", horarioInicio: "", horarioFim: "" });
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReserva = async () => {
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
      await getReservas();
      handleCloseModal();
      alert("Reserva realizada com sucesso!");
    } catch (error) {
      console.error("Erro ao reservar sala", error);
      alert(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const isSalaReservada = (salaId) => {
    return reservas.some((reserva) => reserva.fk_id_sala === salaId);
  };

  const salasFiltradas = salas.filter((sala) => {
    const termo = filtro.toLowerCase();
    return (
      sala.nome.toLowerCase().includes(termo) ||
      sala.descricao.toLowerCase().includes(termo) ||
      sala.bloco.toLowerCase().includes(termo) ||
      sala.tipo.toLowerCase().includes(termo)
    );
  });

  const listSalas = salasFiltradas.map((sala) => (
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
    backgroundColor: isSalaReservada(sala.id_sala) ? '#B0B0B0' : '#FF5757',
    '&:hover': {
      backgroundColor: isSalaReservada(sala.id_sala) ? '#B0B0B0' : '#e14e4e',
    },
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: 2,
  }}
>
  {isSalaReservada(sala.id_sala) ? 'Reservada' : 'Reservar'}
</Button>

      </TableCell>
    </TableRow>
  ));

  return (
    <Container sx={styles.container}>
      {/* Campo de busca */}
      <TextField
        label="Buscar sala"
        variant="outlined"
        fullWidth
        sx={{ mt: 4, mb: 2, width: "60%" }}
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <Box sx={styles.boxFundoTabela}>
        <TableContainer sx={styles.tableContainer}>
          <Table size="small" sx={styles.table}>
            <TableHead sx={styles.tableHead}>
              <TableRow sx={styles.tableRow}>
                <TableCell align="center" sx={styles.tableCell}>Nome</TableCell>
                <TableCell align="center" sx={styles.tableCell}>Descrição</TableCell>
                <TableCell align="center" sx={styles.tableCell}>Bloco</TableCell>
                <TableCell align="center" sx={styles.tableCell}>Tipo</TableCell>
                <TableCell align="center" sx={styles.tableCell}>Capacidade</TableCell>
                <TableCell align="center" sx={styles.tableCell}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={styles.tableBody}>{listSalas}</TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={styles.modal}>
          <h2>Reservar Sala</h2>
          <TextField
            label="Data"
            type="date"
            name="data"
            value={formData.data}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Horário Início"
            type="time"
            name="horarioInicio"
            value={formData.horarioInicio}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Horário Fim"
            type="time"
            name="horarioFim"
            value={formData.horarioFim}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
       <Button
  variant="contained"
  onClick={handleReserva}
  disabled={loading}
  fullWidth
  sx={{
    mt: 2,
    backgroundColor: '#FF5757',
    '&:hover': {
      backgroundColor: '#e14e4e',
    },
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: 2,
  }}
>
  {loading ? <CircularProgress size={24} color="inherit" /> : "Confirmar Reserva"}
</Button>

        </Box>
      </Modal>
    </Container>
  );
}

function getStyles() {
  return {
    container: {
      backgroundColor: "#FFDCDC",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "auto",
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
    tableHead: {
      backgroundColor: "#FF7B7B",
      border: "2px solid white",
    },
    boxFundoTabela: {
      border: "5px solid white",
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
    tableBody: {
      backgroundColor: "#949494",
      border: "3px solid white",
      borderRadius: 10,
    },
    tableBodyCell: {
      backgroundColor: "#FF7B7B",
      border: "1px solid white",
      borderRadius: 10,
      color: "black",
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
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
      borderRadius: 2,
    },
  };
}

export default ListagemSalas;
