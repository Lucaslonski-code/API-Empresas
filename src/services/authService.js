
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Usuario from "../models/Usuario.js";

export async function loginService(
  email,
  senha
) {

  const usuario =
    await Usuario.findOne({
      email
    });

  if (!usuario) {

    throw new Error(
      "Email ou senha inválidos"
    );

  }

  const senhaCorreta =
    await bcrypt.compare(
      senha,
      usuario.senha
    );

  if (!senhaCorreta) {

    throw new Error(
      "Email ou senha inválidos"
    );

  }

  const token =
    jwt.sign(
      {
        usuarioId: usuario._id,
        empresaId: usuario.empresaId
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

  return {
    token
  };

}

