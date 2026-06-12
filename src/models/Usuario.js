
import mongoose from "mongoose";

const usuarioSchema =
  new mongoose.Schema(
    {

      nome: {
        type: String,
        required: true
      },

      email: {
        type: String,
        required: true,
        unique: true
      },

      senha: {
        type: String,
        required: true
      },

      empresaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empresa",
        required: true
      },

      role: {
  type: String,
  enum: [
    "user",
    "admin"
  ],
  default: "user"
}

    },
    {
      timestamps: true
    }
  );

export default mongoose.model(
  "Usuario",
  usuarioSchema
);
