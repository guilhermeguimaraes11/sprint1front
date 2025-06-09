import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Modal.setAppElement("#root");

export default function ModalDisponibilidade({ open, onClose, onConfirm }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Consultar Disponibilidade</h2>

      <label>Data Início:</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        dateFormat="Pp"
        className="date-picker"
      />

      <label>Data Fim:</label>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        showTimeSelect
        dateFormat="Pp"
        className="date-picker"
      />

      <button
        onClick={() => onConfirm(startDate, endDate)}
        className="btn-confirm"
      >
        Verificar Disponibilidade
      </button>
      <button onClick={onClose} className="btn-cancel">
        Cancelar
      </button>
    </Modal>
  );
}
