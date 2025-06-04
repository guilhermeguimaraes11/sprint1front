import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.70:5000/reservas/v1/",
  headers: { accept: "application/json" },
});


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
  getSalas: () => api.get("salas/"),
  postReserva: (reserva) => api.post("reservaschedule/", reserva),
  getReservas_id: (id) => api.get(`reservaschedule/${id}`), 
  deleteReserva: (id) => api.delete(`reservaschedule/${id}`),
  getAllreserva_salas: () => api.get("reservaschedule"),
 
};

export default sheets;
