
import express from "express";

import {
  criarAgendamento,
  listarAgendamentos,
  buscarAgendamentoPorId,
  atualizarAgendamento,
  deletarAgendamento,
  listarAgendamentosPorEmpresa
} from "../controllers/agendamentoController.js";

import validateEmpresa from "../middlewares/validateEmpresa.js";

import validateId from "../middlewares/validateId.js";

const router = express.Router();

router.post("/agendamento", criarAgendamento);

router.get("/agendamento", listarAgendamentos);

// List Agendamentos por Empresa.
router.get(
  "/empresa/:id/agendamentos",
  validateId,
  validateEmpresa,
  listarAgendamentosPorEmpresa
);

router.route("/agendamento/:id")
  .get(validateId, buscarAgendamentoPorId)
  .put(validateId, atualizarAgendamento)
  .delete(validateId, deletarAgendamento);

export default router;
