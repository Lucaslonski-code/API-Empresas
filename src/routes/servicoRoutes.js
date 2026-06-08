
import express from "express";

import { criarServico, listarServicos, buscarServicoPorId, atualizarServico, deletarServico, listarServicosPorEmpresa } from "../controllers/servicoController.js";

import validateId from "../middlewares/validateId.js";

import validateEmpresa from "../middlewares/validateEmpresa.js";

const router = express.Router();

router.post("/servico", criarServico);

router.get("/servico", listarServicos);

//List Serviços por Empresa.
router.get(
  "/empresa/:id/servicos",
  validateId,
  validateEmpresa,
  listarServicosPorEmpresa
);

router.route("/servico/:id")
  .get(validateId, buscarServicoPorId)
  .put(validateId, atualizarServico)
  .delete(validateId, deletarServico);

export default router;
