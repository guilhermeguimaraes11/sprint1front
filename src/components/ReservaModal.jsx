import React, { useState } from 'react';
import { Modal, Box, TextField, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

// Estilização do Modal usando styled-components
const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: 8,
  padding: theme.spacing(3),
  width: '90%',
  maxWidth: 400, // Largura máxima para o modal
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para destacar o modal
}));

const ReservaModal = ({ open, onClose, onReserva, loading }) => {
  const [formData, setFormData] = useState({
    data: '',
    horarioInicio: '',
    horarioFim: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReserva = () => {
    onReserva(formData); // Chama a função de reserva passada como prop
  };

  return (
    <StyledModal open={open} onClose={onClose}>
      <ModalContent>
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
          <Button
            onClick={handleReserva}
            disabled={loading}
            sx={{
              backgroundColor: '#FF5757',
              '&:hover': { backgroundColor: '#e14e4e' },
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: 2,
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Confirmar'
            )}
          </Button>

          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              color: '#FF5757',
              borderColor: '#FF5757',
              '&:hover': {
                borderColor: '#e14e4e',
                backgroundColor: '#ffecec',
              },
              fontWeight: 'bold',
              borderRadius: 2,
            }}
          >
            Cancelar
          </Button>
        </Box>
      </ModalContent>
    </StyledModal>
  );
};

export default ReservaModal;
