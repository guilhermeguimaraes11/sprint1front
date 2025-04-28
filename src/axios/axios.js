import axios from "axios";

const api = axios.create({
  baseURL: "http://10.89.240.72:5000/reservas/v1/",
  headers: { accept: "application/json" },
}); 

const sheets = {
  postLogin: (usuario ) => api.post("login/", usuario),
  postCadastro: (usuario) => api.post("user/", usuario),
  getSalas: (sala) => api.get("salas/", sala),
  postReserva: (reserva) => api.post("reservaschedule", reserva),

};

export default sheets;
