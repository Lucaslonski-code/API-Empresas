
import {
  criarServicoService,
  listarServicosService,
  buscarServicoPorIdService,
  atualizarServicoService,
  deletarServicoService,
  listarServicosPorEmpresaService
} from "../services/servicoService.js";

export async function criarServico(req, res) {
  try {

req.body.empresaId =
  req.empresaId;

const servico =
  await criarServicoService(
    req.body
  );

    return res.status(201).json(servico);

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function listarServicos(
  req,
  res
) {
  try {

    const servicos =
      await listarServicosPorEmpresaService(
        req.empresaId
      );

    return res.json(
      servicos
    );

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function buscarServicoPorId(
  req,
  res
) {
  try {

    const servico =
await buscarServicoPorIdService(

  req.params.id,

  req.empresaId

);
    if (!servico) {

      return res.status(404).json({
        erro: "Serviço não encontrado"
      });

    }

    return res.json(servico);

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function atualizarServico(
  req,
  res
) {
  try {

    const servico =
      await atualizarServicoService(
        req.params.id,
        req.body
      );

    if (!servico) {

      return res.status(404).json({
        erro: "Serviço não encontrado"
      });

    }

    return res.json(servico);

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function deletarServico(
  req,
  res
) {
  try {

    const servico =
      await deletarServicoService(
        req.params.id
      );

    if (!servico) {

      return res.status(404).json({
        erro: "Serviço não encontrado"
      });

    }

    return res.json({
      mensagem: "Serviço removido"
    });

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function listarServicosPorEmpresa(
  req,
  res
) {
  try {

    const servicos =
      await listarServicosPorEmpresaService(
        req.params.id
      );

    return res.json(
      servicos
    );

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

