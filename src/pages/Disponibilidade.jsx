import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Disponibilidade = () => {
  const [salasDisponiveis, setSalasDisponiveis] = useState([]);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDataInicioChange = (e) => {
    setDataInicio(e.target.value);
  };

  const handleDataFimChange = (e) => {
    setDataFim(e.target.value);
  };

  const fetchSalasDisponiveis = async () => {
    if (!dataInicio || !dataFim) {
      setErrorMessage('Por favor, preencha as datas de início e fim.');
      return;
    }

    try {
      const response = await axios.post('/api/salas/disponiveis', {
        data_inicio: dataInicio,
        data_fim: dataFim,
      });

      if (response.status === 200) {
        setSalasDisponiveis(response.data);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Erro ao buscar salas:', error);
      setErrorMessage('Não foi possível buscar as salas disponíveis.');
    }
  };

  return (
    <div>
      <h1>Verificar Disponibilidade das Salas</h1>
      
      <div>
        <label>Data Início:</label>
        <input
          type="date"
          value={dataInicio}
          onChange={handleDataInicioChange}
        />
      </div>
      
      <div>
        <label>Data Fim:</label>
        <input
          type="date"
          value={dataFim}
          onChange={handleDataFimChange}
        />
      </div>
      
      <button onClick={fetchSalasDisponiveis}>Buscar Salas Disponíveis</button>

      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      <h2>Salas Disponíveis:</h2>
      <ul>
        {salasDisponiveis.length > 0 ? (
          salasDisponiveis.map((sala) => (
            <li key={sala.id_sala}>
              <strong>{sala.nome}</strong>
              <p>{sala.descricao}</p>
              <p>Capacidade: {sala.capacidade}</p>
              <p>Bloco: {sala.bloco}</p>
              <p>Tipo: {sala.tipo}</p>
            </li>
          ))
        ) : (
          <p>Nenhuma sala disponível para o período selecionado.</p>
        )}
      </ul>
    </div>
  );
};

export default Disponibilidade;
