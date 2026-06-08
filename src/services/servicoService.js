
import Servico from "../models/Servico.js";

export async function criarServicoService(dados) {

  return await Servico.create(dados);

}

export async function listarServicosService() {

  return await Servico.find();

}

export async function buscarServicoPorIdService(id) {

  return await Servico.findById(id);

}

export async function atualizarServicoService(
  id,
  dados
) {

  return await Servico.findByIdAndUpdate(
    id,
    dados,
    {
      returnDocument: "after",
      runValidators: true
    }
  );

}

export async function deletarServicoService(id) {

  return await Servico.findByIdAndDelete(id);

}

export async function listarServicosPorEmpresaService(
  empresaId
) {

  return await Servico.find({
    empresaId
  });

}