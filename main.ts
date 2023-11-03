import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts";

import postContacto from "./resolvers/postContacto.ts";
import getContacto from "./resolvers/getContacto.ts";
import getContactoDni from "./resolvers/getContactoDni.ts";
import putContacto from "./resolvers/putContacto.ts";
import deleteContacto from "./resolvers/deleteContacto.ts";


const env = await load();
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

try{
  await mongoose.connect(MONGO_URL);
  console.info("Se conecta bien a Mongo");
}catch(e){
  console.error(e);
}

const app = express();
app.use(express.json());

app
  .get("/api/contactos", getContacto)
  .get("/api/contactos/:dni", getContactoDni)
  .post("/api/contactos", postContacto)
  .put("/api/contactos/:dni", putContacto)
  .delete("/api/contactos/:dni", deleteContacto);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});