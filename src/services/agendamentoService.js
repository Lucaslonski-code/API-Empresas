import {
  criarEventoGoogle,
  atualizarEventoGoogle,
  deletarEventoGoogle
} from "../integrations/google/googleCalendar.js";

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
    cliente.empresaId.toString() !==
    empresa._id.toString()
  ) {

    throw new Error(
      "Cliente não pertence à empresa"
    );

  }

  if (
    servico.empresaId.toString() !==
    empresa._id.toString()
  ) {

    throw new Error(
      "Serviço não pertence à empresa"
    );

  }

  const horarioOcupado =
    await Agendamento.findOne({

      empresaId:
        dados.empresaId,

      dataHora:
        dados.dataHora

    });

  if (horarioOcupado) {

    throw new Error(
      "Horário já está ocupado"
    );

  }

  const agendamento =
    await Agendamento.create(
      dados
    );

  const inicio =
    new Date(
      agendamento.dataHora
    );

  const fim =
    new Date(
      inicio
    );

  fim.setMinutes(

    fim.getMinutes() +

    servico.duracaoMinutos

  );

  const eventoGoogle =
    await criarEventoGoogle(

      empresa._id,

      {

        summary:
          `${cliente.nome} - ${servico.nome}`,

        description:
          agendamento.observacoes || "",

        start:
          inicio.toISOString(),

        end:
          fim.toISOString()

      }

    );

  agendamento.googleEventId =
    eventoGoogle.id;

  await agendamento.save();

  return agendamento;

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

export async function buscarAgendamentoPorIdService(
  id,
  empresaId
) {

  return await Agendamento.findOne({

    _id: id,

    empresaId

  })
    .populate("empresaId")
    .populate("clienteId")
    .populate("servicoId");

}

export async function atualizarAgendamentoService(
  id,
  empresaId,
  dados
) {

  const agendamento =
    await Agendamento.findOneAndUpdate(

      {

        _id: id,

        empresaId

      },

      dados,

      {

        new: true,

        runValidators: true

      }

    );

  if (!agendamento) {

    throw new Error(
      "Agendamento não encontrado"
    );

  }

  const cliente =
    await Cliente.findById(
      agendamento.clienteId
    );

  const servico =
    await Servico.findById(
      agendamento.servicoId
    );

  const inicio =
    new Date(
      agendamento.dataHora
    );

  const fim =
    new Date(
      inicio
    );

  fim.setMinutes(

    fim.getMinutes() +

    servico.duracaoMinutos

  );

  await atualizarEventoGoogle(

    agendamento.empresaId,

    agendamento.googleEventId,

    {

      summary:
        `${cliente.nome} - ${servico.nome}`,

      description:
        agendamento.observacoes || "",

      start:
        inicio.toISOString(),

      end:
        fim.toISOString()

    }

  );

  return agendamento;

}

export async function deletarAgendamentoService(
  id,
  empresaId
) {

  const agendamento =
    await Agendamento.findOne({

      _id: id,

      empresaId

    });

  if (!agendamento) {

    throw new Error(
      "Agendamento não encontrado"
    );

  }

  if (agendamento.googleEventId) {

    await deletarEventoGoogle(

      agendamento.empresaId,

      agendamento.googleEventId

    );

  }

  await Agendamento.findOneAndDelete({

    _id: id,

    empresaId

  });

  return {

    sucesso: true

  };

}