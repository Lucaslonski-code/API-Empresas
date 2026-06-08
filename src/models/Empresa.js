
import mongoose from "mongoose";

const empresaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },

    telefone: String,

    email: String,

    promptSistema: String,

    sheetId: String,

    calendarId: String,

    ativa: {
      type: Boolean,
      default: true
    },

    googleCalendarId: {
      type: String,
      default: ""
    },

    googleRefreshToken: {
      type: String,
      default: ""
    },

    googleConnected: {
      type: Boolean,
      default: false
    }

  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Empresa",
  empresaSchema
);