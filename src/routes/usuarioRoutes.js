
import express from "express";

import {
  criarUsuario
}
from "../controllers/usuarioController.js";

const router =
  express.Router();

router.post(
  "/usuario",
  criarUsuario
);

export default router;

