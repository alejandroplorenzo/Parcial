import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

const getContactoDni = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;
    //const {codigoISO, postal_code} = req.params;
    const contacto = await ContactoModel.findOne({ dni }).exec();
    if (!contacto) {
      res.status(404).send("Contacto no encontrado");
      return;
    }

    /*const getLocation = async (
      postal_code: string,
      codigoISO: string = "ES"
    ): Promise<Location> => {
      const BASE_URL = "https://zip-api.eu/api/v1";
      const url = `${BASE_URL}/info/${codigoISO}-${postal_code}`;
      const response = await fetch(url);
      if (response.status !== 200) {
        throw new Error("Cannot fetch location");
      }
      const data = await response.json();    
      return {
        ciudad: data.place_name,
      };*/

    res.status(200).send({
      dni: contacto.dni,
      nombreApellidos: contacto.nombreApellidos,
      eMail: contacto.eMail,
      codigoPostal: contacto.codigoPostal,
      codigoISO: contacto.codigoISO,
    });

  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getContactoDni;