import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Paper,
  TextField,
  Stack,
  CircularProgress,
} from "@mui/material";

export default function ModalCriarReserva({
  open,
  onClose,
  onConfirm,
  loading = false,
  errorMsg = "",
}) {
  const [data, setData] = useState("");
  const [horarioInicio, setHorarioInicio] = useState("");
  const [horarioFim, setHorarioFim] = useState("");

  // Limpa os campos sempre que o modal abre
  useEffect(() => {
    if (open) {
      setData("");
      setHorarioInicio("");
      setHorarioFim("");
      // Não limpa errorMsg porque ele vem via prop do componente pai
    }
  }, [open]);

  const handleSubmit = () => {
    // Apenas chama onConfirm, pois a validação está na API
    onConfirm({ data, horarioInicio, horarioFim });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component={Paper}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 320,
          p: 4,
          outline: "none",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Nova Reserva
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Data"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Horário Início"
            type="time"
            value={horarioInicio}
            onChange={(e) => setHorarioInicio(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Horário Fim"
            type="time"
            value={horarioFim}
            onChange={(e) => setHorarioFim(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          {errorMsg && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errorMsg}
            </Typography>
          )}

          <Stack direction="row" justifyContent="space-between" mt={1}>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{ borderColor: "#A80805", color: "#A80805" }}
              disabled={loading}
            >
              Cancelar
            </Button>

            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ backgroundColor: "#A80805", color: "white" }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Reservar"
              )}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
