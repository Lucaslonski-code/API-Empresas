
import {
  listarEmpresasService,
  criarEmpresaService,
  buscarEmpresaPorIdService,
  atualizarEmpresaService,
  deletarEmpresaService
} from "../services/empresaService.js";

export async function criarEmpresa(req, res) {
  try {

    const empresa =
      await criarEmpresaService(req.body);

    return res.status(201).json(empresa);

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function listarEmpresas(
  req,
  res
) {

  try {

    const empresa =
      await buscarEmpresaPorIdService(
        req.empresaId
      );

    return res.json(
      empresa
    );

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }

}

export async function buscarEmpresaPorId(req, res) {
  try {

    const empresa =
      await buscarEmpresaPorIdService(req.params.id);

    if (!empresa) {

      return res.status(404).json({
        erro: "Empresa não encontrada"
      });

    }

    return res.json(empresa);

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function atualizarEmpresa(
  req,
  res
) {
  try {

    const empresa =
      await atualizarEmpresaService(
        req.params.id,
        req.body
      );

    if (!empresa) {

      return res.status(404).json({
        erro: "Empresa não encontrada"
      });

    }

    return res.json(empresa);

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function deletarEmpresa(
  req,
  res
) {
  try {

    const empresa =
      await deletarEmpresaService(
        req.params.id
      );

    if (!empresa) {

      return res.status(404).json({
        erro: "Empresa não encontrada"
      });

    }

    return res.json({
      mensagem: "Empresa removida"
    });

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}