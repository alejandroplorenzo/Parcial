import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";


const putContacto = async (req: Request, res: Response) => {
  try{
    const {dni} = req.params;
    const {nombreApellidos, eMail, codigoPostal, codigoISO } = req.body;

    if(!nombreApellidos || !eMail || !codigoPostal || !codigoISO){
        res.status(400).send("Parametros incorrectamente introducidos");
        return;
    }

    const updatedContacto = await ContactoModel.findOneAndUpdate(
        { _dni: dni }, 
        {nombreApellidos, eMail, codigoPostal, codigoISO },
        { new: true }
    ).exec();

    if (!updatedContacto) {
        res.status(404).send("Conatacto no encontrado");
        return;
    }

    res.status(200).send({
        nombreApellidos: updatedContacto.nombreApellidos,
        eMail: updatedContacto.eMail,
        codigoPostal: updatedContacto.codigoPostal,
        codigoISO: updatedContacto.codigoISO,
        id: updatedContacto._id.toString(),
      });

  }catch(error){
    res.status(500).send(error.message);
    return;
  }
};

export default putContacto;