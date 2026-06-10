
import express from "express";

import {
  criarAgendamento,
  listarAgendamentos,
  buscarAgendamentoPorId,
  atualizarAgendamento,
  deletarAgendamento
}
from "../controllers/agendamentoController.js";

import validateId
from "../middlewares/validateId.js";

import authMiddleware
from "../middlewares/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/agendamento",
  authMiddleware,
  criarAgendamento
);

router.get(
  "/agendamento",
  authMiddleware,
  listarAgendamentos
);

router.route("/agendamento/:id")
  .get(
    authMiddleware,
    validateId,
    buscarAgendamentoPorId
  )
  .put(
    authMiddleware,
    validateId,
    atualizarAgendamento
  )
  .delete(
    authMiddleware,
    validateId,
    deletarAgendamento
  );

export default router;

