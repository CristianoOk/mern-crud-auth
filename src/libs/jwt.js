import {TOKEN_SECRET} from '../config.js';
import jwt from 'jsonwebtoken'; //Le digo que importe "jsonwebtoken", con el nombre de "jwt". Para que funcione previamente instalé en el terminal "npm i jsonwebtoken".

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign( //Uso el método "sign" de "jwt" (que importé al principio, FIJATE LA IMPORTACIÓN!).

      //{id: userSaved._id,},
      payload,

      //"secret123", //Esto es el "secretOrPrivateKey", que básicamente es la llave que estría usando para cifrar como también para descifrar lo que hay dentro del 'token'.
      TOKEN_SECRET, //Esto reemplaza a lo que está comentado acá arriba ("secret123")

      {
        expiresIn: "1d", //Es una opción que define cuánto tiempo será válido el token antes de expirar. En este caso expirará en 1 día (24 horas) desde el momento en que se genera.
      }, (err, token) => { //Genero un 'callback' de toda la vida.
        if(err) reject(err);
        resolve(token)
      });
  })
}

