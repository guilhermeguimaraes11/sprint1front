import React, { useState } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import api from "../axios/axios";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Login() {
  const styles = getStyles();
  const [usuario, setUsuario] = useState({ email: "", senha: "" });
  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.postLogin(usuario);
      const user = response.data.user;

      localStorage.setItem("id_usuario", response.data.user.id_usuario);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("authenticated", "true");
      localStorage.setItem("nome", response.data.user.nome);
      localStorage.setItem("email", response.data.user.email);

      alert("Login realizado com sucesso!");

      // Redireciona
      navigate("/ListagemSalas", { state: { user } });
    } catch (error) {
      console.error("Erro no login:", error);
      alert(
        error.response?.data?.error ||
          "Erro ao fazer login. Verifique suas credenciais."
      );
    }
  };

  return (
    <div style={{ backgroundColor: "#FFDCDC" }}>
      <Header logout={false} />

      <Container component="main" sx={styles.container}>
        <Box
          component="form"
          sx={styles.form}
          onSubmit={handleSubmit}
          noValidate
        >
          <Box component="img" src={logo} alt="Logo" sx={styles.logo} />

          <TextField
            required
            fullWidth
            id="email"
            placeholder="E-mail"
            name="email"
            margin="normal"
            value={usuario.email}
            onChange={onChange}
            sx={styles.textField}
          />

          <TextField
            required
            fullWidth
            id="senha"
            placeholder="Senha"
            name="senha"
            type="password"
            margin="normal"
            value={usuario.senha}
            onChange={onChange}
            sx={styles.textField}
          />

          <Button type="submit" variant="contained" sx={styles.buttonLogin}>
            Entrar
          </Button>

          <Button
            component={Link}
            to="/cadastro"
            variant="text"
            sx={styles.buttonCadastro}
          >
            Cadastre-se
          </Button>
        </Box>
      </Container>

      <Footer />
    </div>
  );
}

function getStyles() {
  return {
    container: {
      backgroundColor: "#ffdcdc",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "78.3vh",
    },
    form: {
      mt: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#FD7C7C",
      padding: "30px",
      borderRadius: 10,
      width: "33%",
      height: "140%",
    },
    logo: { width: "250px", height: "auto", mb: 4 },
    textField: {
      width: "45vh",
      backgroundColor: "white",
      borderRadius: 2,
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
      width: 300,
      height: 45,
      fontWeight: 600,
      fontSize: 15,
      borderRadius: 2,
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
  };
}

export default Login;
