// src/components/Header.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = ({ logout = true }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setOpenConfirm(true);
  };

  const handleConfirm = () => {
    localStorage.clear();
    setOpenConfirm(false);
    navigate("/");
  };

  const handleCancel = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <header style={headerStyle}>
        <div style={logoStyle}>
          {logout && (
            <Button
              onClick={handleLogoutClick}
              startIcon={<LogoutIcon sx={{ fontSize: 40 }} />}
              sx={buttonStyle}
            >
              Logout
            </Button>
          )}
        </div>
      </header>

      <Dialog open={openConfirm} onClose={handleCancel}>
        <DialogTitle>Finalizar Sessão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você deseja realmente encerrar a sessão?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="error" variant="contained">
            Sim
          </Button>
          <Button onClick={handleCancel} color="primary" variant="outlined">
            Não
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const headerStyle = {
  backgroundColor: "#D90000",
  width: "100%",
  height: "10vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  borderBottom: "5px solid white",
};

const logoStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "auto",
};

const buttonStyle = {
  color: "white",
  fontWeight: "bold",
  textTransform: "none",
  marginRight: "30px",
  padding: "15px 30px",
  fontSize: "18px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
};

export default Header;
