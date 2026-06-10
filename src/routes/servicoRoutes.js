
import express from "express";

import {
  criarServico,
  listarServicos,
  buscarServicoPorId,
  atualizarServico,
  deletarServico
} from "../controllers/servicoController.js";

import validateId
from "../middlewares/validateId.js";

import authMiddleware
from "../middlewares/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/servico",
  authMiddleware,
  criarServico
);

router.get(
  "/servico",
  authMiddleware,
  listarServicos
);

router.route("/servico/:id")
  .get(
    authMiddleware,
    validateId,
    buscarServicoPorId
  )
  .put(
    authMiddleware,
    validateId,
    atualizarServico
  )
  .delete(
    authMiddleware,
    validateId,
    deletarServico
  );

export default router;

