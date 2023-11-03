import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts"; 

const postContacto = async (req: Request, res: Response) => {
    try{
        const {dni, nombreApellidos, eMail, codigoPostal, codigoISO } = req.body;
        if(!dni || !nombreApellidos || !eMail || !codigoPostal || !codigoISO  ){
            res.status(500).send("Datos no introducidos correctamente");
            return;
        }

        const alreadyExists = await ContactoModel.findOne({ dni }).exec();
        if (alreadyExists) {
          res.status(400).send("Client already exists");
          return;
        }

        const newContacto = new ContactoModel({ dni, nombreApellidos, eMail, codigoPostal, codigoISO});
        await newContacto.save();

        res.status(200).send({
            dni: newContacto.dni,
            nombreApellidos: newContacto.nombreApellidos,
            eMail: newContacto.eMail,
            codigoPostal: newContacto.codigoPostal,
            codigoISO: newContacto.codigoISO,
            id: newContacto._id.toString(),
          });

    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default postContacto;