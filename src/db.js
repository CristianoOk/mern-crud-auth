import mongoose from 'mongoose'; //Para poder hacer esto previamente instalé en el terminal "npm i mongoos".

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/merndb') //Le digo a 'mongoose' que se conecte a lo que está dentro de paréntesis. "/merndb", es el nombre que le doy a la base de datos; si bien todavía no cree dicha base de datos, esto es porque 'mongodb' crea una automáticamente cuando insertemos nuestro primer dato.
    console.log(">>> DB is connected")
  }catch(error) {
    console.log(error);
  }
};