
import {
  criarUsuarioService
}
from "../services/usuarioService.js";

export async function criarUsuario(
  req,
  res
) {

  try {

    const usuario =
      await criarUsuarioService(
        req.body
      );

    return res.status(201).json(
      usuario
    );

  } catch (error) {

    return res.status(500).json({

      erro:
        error.message

    });

  }

}

