
import Agendamento from "../models/Agendamento.js";
import Empresa from "../models/Empresa.js";
import Cliente from "../models/Cliente.js";
import Servico from "../models/Servico.js";

export async function criarAgendamentoService(
  dados
) {

  const empresa =
    await Empresa.findById(
      dados.empresaId
    );

  if (!empresa) {

    throw new Error(
      "Empresa não encontrada"
    );

  }

  const cliente =
    await Cliente.findById(
      dados.clienteId
    );

  if (!cliente) {

    throw new Error(
      "Cliente não encontrado"
    );

  }

  const servico =
    await Servico.findById(
      dados.servicoId
    );

  if (!servico) {

    throw new Error(
      "Serviço não encontrado"
    );

  }

  if (
    cliente.empresaId.toString()
    !==
    empresa._id.toString()
  ) {

    throw new Error(
      "Cliente não pertence à empresa"
    );

  }

  if (
    servico.empresaId.toString()
    !==
    empresa._id.toString()
  ) {

    throw new Error(
      "Serviço não pertence à empresa"
    );

  }

  const horarioOcupado =
    await Agendamento.findOne({
      empresaId: dados.empresaId,
      dataHora: dados.dataHora
    });

  if (horarioOcupado) {

    throw new Error(
      "Horário já está ocupado"
    );

  }

  return await Agendamento.create(
    dados
  );

}

export async function listarAgendamentosService() {

  return await Agendamento.find()
    .populate("empresaId")
    .populate("clienteId")
    .populate("servicoId");

}

export async function buscarAgendamentoPorIdService(
  id
) {

  return await Agendamento.findById(id)
    .populate("empresaId")
    .populate("clienteId")
    .populate("servicoId");

}

export async function atualizarAgendamentoService(
  id,
  dados
) {

  return await Agendamento.findByIdAndUpdate(
    id,
    dados,
    {
      returnDocument: "after",
      runValidators: true
    }
  );

}

export async function deletarAgendamentoService(
  id
) {

  return await Agendamento.findByIdAndDelete(
    id
  );

}

export async function listarAgendamentosPorEmpresaService(
  empresaId
) {

  return await Agendamento.find({
    empresaId
  })
    .populate("empresaId")
    .populate("clienteId")
    .populate("servicoId");

}