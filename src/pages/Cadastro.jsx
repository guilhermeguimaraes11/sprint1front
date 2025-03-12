import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import home from "../../img/iconehome.png";
import logo from "../../img/logo.png";
import api from "../services/axios";

const Cadastro = () => {
  const styles = getStyles();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ nome: "", email: "", NIF: "", senha: "" });

  const onChange = (event) => {
    const { name, value } = event.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.postCadastro(usuario);
      alert(response.data.message);
      navigate("/principal");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Erro ao cadastrar");
    }
  };

  return (
    <Container component="main" sx={styles.container}>
      <Box sx={styles.header}>
        <Button component={Link} to="/home" sx={styles.buttonHome}>
          <img src={home} alt="Home" style={{ width: "65px", height: "65px" }} />
        </Button>
      </Box>
      <Box component="form" sx={styles.form} onSubmit={handleSubmit} noValidate>
        <Box component="img" src={logo} alt="Logo" sx={styles.logo} />
        <TextField required fullWidth id="nome" placeholder="Nome" name="nome" margin="normal" value={usuario.nome} onChange={onChange} sx={styles.textField} />
        <TextField required fullWidth id="email" placeholder="E-mail" name="email" margin="normal" value={usuario.email} onChange={onChange} sx={styles.textField} />
        <TextField required fullWidth id="NIF" placeholder="NIF" name="NIF" margin="normal" value={usuario.NIF} onChange={onChange} sx={styles.textField} />
        <TextField required fullWidth id="senha" placeholder="Senha" name="senha" type="password" margin="normal" value={usuario.senha} onChange={onChange} sx={styles.textField} />
        <Button type="submit" variant="contained" sx={styles.buttonCadastro}>Cadastrar-se</Button>
        <Button component={Link} to="/login" variant="text" sx={styles.buttonToLogin}>Login</Button>
      </Box>
      <Box sx={styles.footer}>
        <Typography sx={styles.footerText}>
          &copy; Desenvolvido por: João Pedro Vidal, Gabriela de Melo, Leonardo Pedroso
        </Typography>
      </Box>
    </Container>
  );
};

function getStyles() {
  return {
    container: {
      backgroundColor: "#ffdcdc",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    header: {
      backgroundColor: "#D90000",
      width: "100%",
      height: "10vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      borderBottom: "5px solid white",
      paddingRight: "20px",
    },
    buttonHome: { mr: 2 },
    form: {
      mt: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#FD7C7C",
      padding: "20px",
      borderRadius: 10,
    },
    logo: { width: "250px", height: "auto", mb: 4 },
    textField: {
      width: "35vh",
      backgroundColor: "white",
      borderRadius: 10,
      "& .MuiOutlinedInput-root": {
        "& fieldset": { border: "none" },
        "&:hover fieldset": { border: "none" },
        "&.Mui-focused fieldset": { border: "none" },
      },
      "& input::placeholder": { fontSize: "17px", color: "black" },
    },
    buttonCadastro: {
      mt: 3,
      color: "white",
      backgroundColor: "#A80805",
      width: 135,
      height: 45,
      fontWeight: 600,
      fontSize: 15,
      borderRadius: 15,
      textTransform: "none",
      "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.55)" },
    },
    buttonToLogin: {
      mt: 2,
      color: "#A80805",
      backgroundColor: "transparent",
      fontWeight: "bold",
      fontSize: 15.5,
      textDecoration: "underline",
      textUnderlineOffset: "4px",
      "&:hover": { color: "rgb(167, 63, 63)" },
    },
    footer: {
      mt: "auto",
      backgroundColor: "#D90000",
      width: "100%",
      height: "7vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderTop: "5px solid white",
    },
    footerText: { color: "white", fontSize: 16 },
  };
}

export default Cadastro;