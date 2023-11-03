import mongoose from "npm:mongoose@7.6.3";
import { contacto } from "../types.ts";

const Schema = mongoose.Schema;

const contactoSchema = new Schema(
    {
      dni: { type: String, required: true, unique: true},
      nombreApellidos: { type: String, required: true},
      eMail: { type: String, required: true},
      codigoPostal: { type: Number, required: true},
      codigoISO: { type: String, required: true},
      /*ciudad: { type: String, required: true},
      pais: { type: String, required: true},
      hora: { type: String, required: true},
      condicionesMeteorologicas: { type: String, required: true},*/
    },
    { timestamps: true }
  );
  
  export type contactoModelType = mongoose.Document & Omit<contacto, "id">;
  
  export default mongoose.model<contactoModelType>("Contacto", contactoSchema);
