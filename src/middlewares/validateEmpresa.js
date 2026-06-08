
import Empresa from "../models/Empresa.js";

export default async function validateEmpresa(
  req,
  res,
  next
) {

  try {

    const empresa =
      await Empresa.findById(
        req.params.id
      );

    if (!empresa) {

      return res.status(404).json({
        erro: "Empresa não encontrada"
      });

    }

    req.empresa = empresa;

    next();

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }

}
