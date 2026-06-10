
import { criarClienteService, listarClientesService, buscarClientePorIdService, atualizarClienteService, deletarClienteService, listarClientesPorEmpresaService } from "../services/clienteService.js";

export async function criarCliente(req, res) {
  try {

req.body.empresaId =
  req.empresaId;

const cliente =
  await criarClienteService(
    req.body
  );

    return res.status(201).json(cliente);

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function listarClientes(
  req,
  res
) {
  try {

    const clientes =
      await listarClientesPorEmpresaService(
        req.empresaId
      );

    return res.json(
      clientes
    );

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function buscarClientePorId(
  req,
  res
) {
  try {

    const cliente =
      await buscarClientePorIdService(
        req.params.id
      );

    if (!cliente) {

      return res.status(404).json({
        erro: "Cliente não encontrado"
      });

    }

    return res.json(cliente);

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function atualizarCliente(
  req,
  res
) {
  try {

    const cliente =
      await atualizarClienteService(
        req.params.id,
        req.body
      );

    if (!cliente) {

      return res.status(404).json({
        erro: "Cliente não encontrado"
      });

    }

    return res.json(cliente);

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function deletarCliente(
  req,
  res
) {
  try {

    const cliente =
      await deletarClienteService(
        req.params.id
      );

    if (!cliente) {

      return res.status(404).json({
        erro: "Cliente não encontrado"
      });

    }

    return res.json({
      mensagem: "Cliente removido"
    });

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}

export async function listarClientesPorEmpresa(
  req,
  res
) {
  try {

    const clientes =
      await listarClientesPorEmpresaService(
        req.params.id
      );

    return res.json(
      clientes
    );

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }
}
