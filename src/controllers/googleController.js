
import Empresa from "../models/Empresa.js";

import oauth2Client from "../integrations/google/googleAuth.js";

export async function googleAuth(
  req,
  res
) {

  const { empresaId } =
    req.params;

  const url =
    oauth2Client.generateAuthUrl({

      access_type: "offline",

      prompt: "consent",

      state: empresaId,

      scope: [
        "https://www.googleapis.com/auth/calendar"
      ]

    });

  return res.redirect(url);

}

export async function googleCallback(
  req,
  res
) {

  try {

    const {
      code,
      state
    } = req.query;

    const { tokens } =
      await oauth2Client.getToken(
        code
      );

    await Empresa.findByIdAndUpdate(

      state,

      {

        googleConnected: true,

        googleRefreshToken:
          tokens.refresh_token,

        googleCalendarId:
          "primary"

      }

    );

    console.log(
      "Empresa:"
    );

    console.log(state);

    console.log(
      "TOKENS:"
    );

    console.log(tokens);

return res.json({
  sucesso: true,
  mensagem:
    "Google Calendar conectado"
});

  } catch (error) {

    return res.status(500).json({
      erro: error.message
    });

  }

}
