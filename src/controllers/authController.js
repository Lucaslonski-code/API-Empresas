
import {
  loginService,
  signupService
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

export async function signup(
  req,
  res
) {

  try {

    const resultado =
      await signupService(
        req.body
      );

    return res.status(201).json(
      resultado
    );

  } catch (error) {

    return res.status(500).json({

      erro:
        error.message

    });

  }

}

