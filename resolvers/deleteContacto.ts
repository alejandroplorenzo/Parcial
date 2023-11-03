import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

const deletePerson = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;
    const contacto = await ContactoModel.findOneAndDelete({ dni }).exec();
    if (!contacto) {
      res.status(404).send("Contacto no encontrado");
      return;
    }
    res.status(200).send("Contacto eliminado");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deletePerson;