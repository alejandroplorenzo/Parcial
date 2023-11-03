import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

const getContacto = async (req: Request, res: Response) => {
    try{
        const { dni } = req.params;
        //const {codigoISO, postal_code} = req.params;
        const contacto = await ContactoModel.findOne().exec();
        if (!contacto) {
          res.status(404).send("Contacto no encontrado");
          return;
        }
    
        res.status(200).send({
          dni: contacto.dni,
          nombreApellidos: contacto.nombreApellidos,
        });
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

export default getContacto;

