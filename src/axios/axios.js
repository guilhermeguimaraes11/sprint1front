import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.8:5000/reservas/v1/",
  headers: { accept: "application/json" },
});

// Interceptador para adicionar o token JWT automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

const sheets = {
  postLogin: (usuario) => api.post("login/", usuario),
  postCadastro: (usuario) => api.post("user/", usuario),
  getAllUsers: () => api.get("user/"),
  getSalas: () => api.get("salas/"),
  postReserva: (reserva) => api.post("reservaschedule/", reserva),
  getReservas_id: (id) => api.get(`reservaschedule/${id}`),
  deleteReserva: (id) => api.delete(`reservaschedule/${id}`),
getAllreserva_salas: () => api.get("reservaschedule"),
  getDisponibilidade: (data_inicio, data_fim) =>
    api.get(`salasdisponiveldata/${data_inicio}/${data_fim}`),
  updateUser: (id_usuario, dadosUsuario) => api.put(`user/${id_usuario}`, dadosUsuario),
  deleteUser: (id_usuario) => api.delete(`user/${id_usuario}`),
};

export default sheets;