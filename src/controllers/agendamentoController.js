
import {
  criarAgendamentoService,
  listarAgendamentosService,
  buscarAgendamentoPorIdService,
  atualizarAgendamentoService,
  deletarAgendamentoService,
  listarAgendamentosPorEmpresaService
} from "../services/agendamentoService.js";

export async function criarAgendamento(
  req,
  res
) {
  try {

    const agendamento =
      await criarAgendamentoService(
        req.body
      );

    return res.status(201).json(
      agendamento
    );

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function listarAgendamentos(
  req,
  res
) {
  try {

    const agendamentos =
      await listarAgendamentosService();

    return res.json(
      agendamentos
    );

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function buscarAgendamentoPorId(
  req,
  res
) {
  try {

    const agendamento =
      await buscarAgendamentoPorIdService(
        req.params.id
      );

    if (!agendamento) {

      return res.status(404).json({
        erro: "Agendamento não encontrado"
      });

    }

    return res.json(
      agendamento
    );

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function atualizarAgendamento(
  req,
  res
) {
  try {

    const agendamento =
      await atualizarAgendamentoService(
        req.params.id,
        req.body
      );

    if (!agendamento) {

      return res.status(404).json({
        erro: "Agendamento não encontrado"
      });

    }

    return res.json(
      agendamento
    );

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function deletarAgendamento(
  req,
  res
) {
  try {

    const agendamento =
      await deletarAgendamentoService(
        req.params.id
      );

    if (!agendamento) {

      return res.status(404).json({
        erro: "Agendamento não encontrado"
      });

    }

    return res.json({
      mensagem: "Agendamento removido"
    });

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function listarAgendamentosPorEmpresa(
  req,
  res
) {
  try {

    const agendamentos =
      await listarAgendamentosPorEmpresaService(
        req.params.id
      );

    return res.json(
      agendamentos
    );

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}
