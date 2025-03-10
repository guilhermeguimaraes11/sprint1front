import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function Home() {
  const styles = getStyles();

  return (
    <Container sx={styles.container}>
      <Box sx={styles.header}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <Box sx={styles.buttonsContainer}>
          <Button
            component={Link}
            to="/cadastro"
            sx={styles.buttonToCadastro}
            variant="contained"
          >
            Cadastre-se
          </Button>
          <Button
            component={Link}
            to="/login"
            sx={styles.buttonToLogin}
            variant="contained"
          >
            Login
          </Button>
        </Box>
      </Box>
      <Box sx={styles.body}>
        <Typography sx={styles.bodyText}>
          Bem-vindo ao site de Reservas do SENAI
        </Typography>
      </Box>
      <Box sx={styles.footer}>
        <Typography sx={styles.footerText}>
          &copy; Desenvolvido por: Leonardo Pedroso, Hyago e Guilherme
        </Typography>
      </Box>
    </Container>
  );
}

function getStyles() {
  return {
    container: {
      backgroundImage: `url(../../img/fundoinicial.png)`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      minWidth: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "20px",
    },
    logo: {
      width: "250px",
      height: "auto",
      borderRadius: "10px",
      marginBottom: "40px",
    },
    buttonsContainer: {
      display: "flex",
      gap: "20px",
    },
    buttonToCadastro: {
      backgroundColor: "#2c3e50",
      color: "#fff",
      borderRadius: "30px",
      width: "150px",
      height: "45px",
      fontSize: "16px",
      "&:hover": {
        backgroundColor: "#34495e",
      },
    },
    buttonToLogin: {
      backgroundColor: "#e74c3c",
      color: "#fff",
      borderRadius: "30px",
      width: "150px",
      height: "45px",
      fontSize: "16px",
      "&:hover": {
        backgroundColor: "#c0392b",
      },
    },
    body: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "30vh",
      textAlign: "center",
    },
    bodyText: {
      fontSize: "35px",
      fontWeight: "700",
      letterSpacing: "2px",
      lineHeight: "1.2",
    },
    footer: {
      position: "absolute",
      bottom: "10px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      padding: "10px",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    footerText: {
      fontSize: "14px",
      color: "#fff",
    },
  };
}

export default Home;
