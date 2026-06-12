
import Cliente from "../models/Cliente.js";

export async function criarClienteService(dados) {

  return await Cliente.create(dados);

}

export async function listarClientesService() {

  return await Cliente.find();

}

export async function buscarClientePorIdService(
  id,
  empresaId
) {

  return await Cliente.findOne({

    _id: id,

    empresaId

  });

}

export async function atualizarClienteService(
  id,
  dados,
  empresaId
) {

  return await Cliente.findOneAndUpdate(

    {

      _id: id,

      empresaId

    },

    dados,

    {

      returnDocument: "after",

      runValidators: true

    }
  );

}

export async function deletarClienteService(
  id,
  empresaId
) {

  return await Cliente.findOneAndDelete({

    _id: id,

    empresaId

  });

}

export async function listarClientesPorEmpresaService(
  empresaId
) {

  return await Cliente.find({
    empresaId
  });

}
