
import bcrypt from "bcryptjs";

import Usuario from "../models/Usuario.js";

export async function criarUsuarioService(
  dados
) {

  const usuarioExistente =
    await Usuario.findOne({
      email: dados.email
    });

  if (usuarioExistente) {

    throw new Error(
      "Email já cadastrado"
    );

  }

  const senhaHash =
    await bcrypt.hash(
      dados.senha,
      10
    );

  return await Usuario.create({

    ...dados,

    senha: senhaHash

  });

}

