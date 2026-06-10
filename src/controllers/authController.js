
import {
  loginService
}
from "../services/authService.js";

export async function login(
  req,
  res
) {

  try {

    const {
      email,
      senha
    } = req.body;

    const resultado =
      await loginService(
        email,
        senha
      );

    return res.json(
      resultado
    );

  } catch (error) {

    return res.status(401).json({

      erro:
        error.message

    });

  }

}

