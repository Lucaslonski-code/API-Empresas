
import jwt from "jsonwebtoken";

export default function authMiddleware(
  req,
  res,
  next
) {

  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      return res.status(401).json({

        erro:
          "Token não informado"

      });

    }

    const token =
      authHeader.replace(
        "Bearer ",
        ""
      );

    const payload =
      jwt.verify(

        token,

        process.env.JWT_SECRET

      );

    req.usuarioId =
      payload.usuarioId;

    req.empresaId =
      payload.empresaId;

    next();

  } catch {

    return res.status(401).json({

      erro:
        "Token inválido"

    });

  }

}

