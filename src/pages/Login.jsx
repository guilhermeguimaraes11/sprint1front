import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import home from "../../img/iconehome.png";
import logo from "../../img/logo.png";
import api from "../services/axios";

const Login = () => {
  const styles = getStyles();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ email: "", senha: "" });

  const onChange = (event) => {
    const { name, value } = event.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.postLogin(usuario);
      alert(response.data.message);
      navigate("/principal");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Erro ao fazer login");
    }
  };

  return (
    <div style={{ backgroundColor: "#FFDCDC"}} >
    
    <Box sx={styles.header}>
        <Button component={Link} to="/home" sx={styles.buttonHome}>
          <img src={home} alt="Home" style={{ width: "65px", height: "65px" }} />
        </Button>
      </Box>

    <Container component="main" sx={styles.container}>
      
      <Box component="form" sx={styles.form} onSubmit={handleSubmit} noValidate>
        <Box component="img" src={logo} alt="Logo" sx={styles.logo} />
        <TextField required fullWidth id="email" placeholder="E-mail" name="email" margin="normal" value={usuario.email} onChange={onChange} sx={styles.textField} />
        <TextField required fullWidth id="senha" placeholder="Senha" name="senha" type="password" margin="normal" value={usuario.senha} onChange={onChange} sx={styles.textField} />
        <Button type="submit" variant="contained" sx={styles.buttonLogin}>Login</Button>
        <Button component={Link} to="/cadastro" variant="text" sx={styles.buttonCadastro}>Cadastre-se</Button>
      </Box>
      
    </Container>

    <Box sx={styles.footer}>
        <Typography sx={styles.footerText}>
          &copy; Desenvolvido por: Leonardo Pedroso, Guilherme Guimarães e
            Hyago
        </Typography>
      </Box> 

    </div>
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
      height: "78.6vh"
    },
    header: {
      backgroundColor: "#D90000",
      width: "100%",
      height: "10vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      borderBottom: "5px solid white",
    },
    buttonHome: { mr: 2 },
    form: {
      mt: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#FD7C7C",
      padding: "30px",
      borderRadius: 10,
      width: "40%",
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
    buttonLogin: {
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
    buttonCadastro: {
      mt: 2,
      color: "rgb(152, 0, 0)",
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
      height: "10vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderTop: "5px solid white",
    },
    footerText: { color: "white", fontSize: 16 },
  };
}

export default Login;