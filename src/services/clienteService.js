
import Cliente from "../models/Cliente.js";

export async function criarClienteService(dados) {

  return await Cliente.create(dados);

}

export async function listarClientesService() {

  return await Cliente.find();

}

export async function buscarClientePorIdService(id) {

  return await Cliente.findById(id);

}

export async function atualizarClienteService(
  id,
  dados
) {

  return await Cliente.findByIdAndUpdate(
    id,
    dados,
    {
      returnDocument: "after",
      runValidators: true
    }
  );

}

export async function deletarClienteService(id) {

  return await Cliente.findByIdAndDelete(id);

}

export async function listarClientesPorEmpresaService(
  empresaId
) {

  return await Cliente.find({
    empresaId
  });

}
