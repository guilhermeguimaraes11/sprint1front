import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logout from "../../img/iconelogout.png";
import logo from "../../img/logo.png";
import api from "../services/axios";
import Footer from '../components/Footer';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


function Principal() {
  const styles = getStyles();
  const [salas, setSalas] = useState([]);

  async function getSalas() {
    await api.getSalas().then(
      (response) => {
        console.log(response.data.salas);
        setSalas(response.data.salas);
      },
      (error) => {
        console.log("Erro", error);
      }
    );
  }

  useEffect(() => {
    getSalas();
  }, []);

  const listSalas = salas.map((sala) => (
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
    </TableRow>
  ));

  return (
    <Container sx={styles.container}>
      <Box sx={styles.header}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <Button component={Link} to="/" sx={styles.buttonHome}>
          <img
            src={logout}
            alt="Logout"
            style={{ width: "58px", height: "58px" }}
          />
        </Button>
      </Box>
      <Box sx={styles.boxFundoTabela}>
        <Container sx={styles.container}>{/* Conteúdo da página */}</Container>

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
              </TableRow>
            </TableHead>
            <TableBody sx={styles.tableBody}>{listSalas}</TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />
      
      
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
    header: {
      backgroundColor: "rgba(177, 16, 16, 1)",
      width: "210vh",
      height: "11vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      borderBottom: "5px solid white",
    },
    logo: {
      width: "230px",
      height: "auto",
      marginRight: "1540px",
      border: "4px solid white",
      borderRadius: 15,
    },
    buttonHome: {
      mr: 8,
    },
    tableContainer: {
      backgroundColor: "transparent",
    },
    table: {
      backgroundColor: "#949494",
      marginTop:2.5,
      marginBottom:2.5,
      marginLeft: "auto", // Para centralizar
      marginRight: "auto", // Para centralizar
      width: "calc(100% - 40px)", // Ajuste o tamanho total da tabela
      borderRadius: "15px", // Bordas arredondadas
    },
    tableHead: {
      backgroundColor: "gray",
      borderRadius: "50px",
      border: "2px solid white",
    },
    boxFundoTabela: {
      border: "5px solid white",
      borderRadius: "15px",
      backgroundColor: "#B5B5B5",
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
      backgroundColor: "#949494",
      border: "1px solid white",
      borderRadius: 10,
      color: "white",
      fontSize: 20,
      paddingTop: 1.2,
      paddingBottom: 1.2,
    },
    footerText: {
      color: "white",
      fontSize: 18,
    },
  };
}

export default Principal;