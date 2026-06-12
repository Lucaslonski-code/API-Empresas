
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Empresa from "../models/Empresa.js";
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
  token,
  usuario: {
    _id: usuario._id,
    nome: usuario.nome,
    email: usuario.email,
    empresaId: usuario.empresaId
  }
};

}

export async function signupService(
  dados
) {

  const usuarioExistente =
    await Usuario.findOne({
      email:
        dados.usuario.email
    });

  if (usuarioExistente) {

    throw new Error(
      "Email já cadastrado"
    );

  }

  const empresa =
    await Empresa.create(
      dados.empresa
    );

  const senhaHash =
    await bcrypt.hash(
      dados.usuario.senha,
      10
    );

  const usuario =
    await Usuario.create({

      nome:
        dados.usuario.nome,

      email:
        dados.usuario.email,

      senha:
        senhaHash,

      empresaId:
        empresa._id

    });

  const token =
    jwt.sign(
      {
        usuarioId:
          usuario._id,

        empresaId:
          empresa._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

  const usuarioSemSenha =
    usuario.toObject();

  delete usuarioSemSenha.senha;

return {
  token,

  empresa: {
    _id: empresa._id,
    nome: empresa.nome,
    email: empresa.email
  },

  usuario: usuarioSemSenha
};
}

