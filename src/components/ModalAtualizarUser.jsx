import React from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
} from "@mui/material";

const ModalAtualizarUser = ({ open, onConfirm, onCancel }) => {
  return (
    <Modal open={open} onClose={onCancel}>
      <Box
        bgcolor="#fd7c7c"
        color="black"
        p={4}
        borderRadius={4}
        boxShadow={24}
        maxWidth={400}
        mx="auto"
        mt="20vh"
        textAlign="center"
      >
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Confirmar Atualização
        </Typography>
        <Typography fontWeight="bold" mb={4}>
          Deseja realmente atualizar seus dados? Essa ação substituirá suas informações anteriores.
        </Typography>

        <Box display="flex" justifyContent="space-evenly">
          <Button
            onClick={onConfirm}
            variant="contained"
            sx={{
              backgroundColor: "darkred",
              color: "white",
              borderRadius: 2,
              px: 4,
            }}
          >
            Confirmar
          </Button>
          <Button
            onClick={onCancel}
            variant="contained"
            sx={{
              backgroundColor: "darkred",
              color: "white",
              borderRadius: 2,
              px: 4,
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAtualizarUser;
