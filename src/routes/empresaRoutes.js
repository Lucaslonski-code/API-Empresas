
import express from "express";

import {
  criarEmpresa,
  listarEmpresas,
  buscarEmpresaPorId,
  atualizarEmpresa,
  deletarEmpresa
} from "../controllers/empresaController.js";

import validateId
from "../middlewares/validateId.js";

import authMiddleware
from "../middlewares/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/empresa",
  authMiddleware,
  criarEmpresa
);

router.get(
  "/empresa",
  authMiddleware,
  listarEmpresas
);

router.route("/empresa/:id")
  .get(
    authMiddleware,
    validateId,
    buscarEmpresaPorId
  )
  .put(
    authMiddleware,
    validateId,
    atualizarEmpresa
  )
  .delete(
    authMiddleware,
    validateId,
    deletarEmpresa
  );

export default router;

