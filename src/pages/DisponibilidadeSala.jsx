import React, { useState, useEffect } from "react";
import axios from "axios";


const DisponibilidadeSala = () => {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [salaId, setSalaId] = useState(""); // ID da sala
  const [disponibilidade, setDisponibilidade] = useState([]);
  const [error, setError] = useState("");

  const fetchDisponibilidade = async () => {
    if (!salaId || !dataInicio || !dataFim) {
      setError("Todos os campos são obrigatórios!");
      return;
    }
    try {
      const response = await axios.post(
        `/api/disponibilidade`, 
        { fk_id_sala: salaId, data_inicio: dataInicio, data_fim: dataFim }
      );
      setDisponibilidade(response.data.disponibilidade);
      setError("");
    } catch (err) {
      console.error("Erro ao buscar disponibilidade:", err);
      setError("Erro ao buscar disponibilidade.");
    }
  };

  return (
    <div>
      <h2>Disponibilidade da Sala</h2>
      <div>
        <label>ID da Sala</label>
        <input
          type="text"
          value={salaId}
          onChange={(e) => setSalaId(e.target.value)}
          placeholder="Digite o ID da sala"
        />
      </div>
      <div>
        <label>Data de Início</label>
        <input
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />
      </div>
      <div>
        <label>Data de Fim</label>
        <input
          type="date"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
        />
      </div>
      <button onClick={fetchDisponibilidade}>Buscar Disponibilidade</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        {disponibilidade.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Horários Disponíveis</th>
              </tr>
            </thead>
            <tbody>
              {disponibilidade.map((dia, index) => (
                <tr key={index}>
                  <td>{dia.data}</td>
                  <td>
                    {dia.horarios_disponiveis.length > 0 ? (
                      dia.horarios_disponiveis.join(", ")
                    ) : (
                      <span style={{ color: "red" }}>Sem Disponibilidade</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma disponibilidade encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default DisponibilidadeSala;
