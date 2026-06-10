
import express from "express";

import {
  criarCliente,
  listarClientes,
  buscarClientePorId,
  atualizarCliente,
  deletarCliente
} from "../controllers/clienteController.js";

import validateId
from "../middlewares/validateId.js";

import authMiddleware
from "../middlewares/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/cliente",
  authMiddleware,
  criarCliente
);

router.get(
  "/cliente",
  authMiddleware,
  listarClientes
);

router.route("/cliente/:id")
  .get(
    authMiddleware,
    validateId,
    buscarClientePorId
  )
  .put(
    authMiddleware,
    validateId,
    atualizarCliente
  )
  .delete(
    authMiddleware,
    validateId,
    deletarCliente
  );

export default router;

