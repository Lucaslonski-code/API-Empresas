
import express from "express";

import {
  criarCliente,
  listarClientes,
  buscarClientePorId,
  atualizarCliente,
  deletarCliente,
  listarClientesPorEmpresa
} from "../controllers/clienteController.js";

import validateEmpresa from "../middlewares/validateEmpresa.js";

import validateId from "../middlewares/validateId.js";

const router = express.Router();

router.post("/cliente", criarCliente);

router.get("/cliente", listarClientes);

// List Clientes por Empresa.
router.get(
  "/empresa/:id/clientes",
  validateId,
  validateEmpresa,
  listarClientesPorEmpresa
);

router.route("/cliente/:id")
  .get(validateId, buscarClientePorId)
  .put(validateId, atualizarCliente)
  .delete(validateId, deletarCliente);

export default router;
