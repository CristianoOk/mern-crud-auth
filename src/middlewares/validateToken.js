//Cree este archivo en la carpeta "middlewares", 'cause los 'middlewares' son funciones que se van a ejecutar antes de que lleguen a una ruta especifica, funciona como intermediario; por ejemplo, si un usuario tiene un logeo exitoso => puede acceder a ciertas rutas a las que esté autorizado.

import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js';

export const authRequired = (req, res, next) => { //Para considerarse una función 'middleware', precisa estos tres parámetros.
  const {token} = req.cookies; //Extrae lo que tengan las cookies del usuario. En este caso lo único que continen es un 'token', por eso A PROPOSITO recivo dicha extración con el mismo nombre (ya que, obiamente pude haber elegido cualquier nombre diferente acá) "const {token}".
  if(!token) return res.status(401).json({message: "No token, authorization denied"}); //Si no hay token, responde con un estado 401 Unauthorized.

  jwt.verify(token, TOKEN_SECRET, (err, user) => { //"user" es lo que contine/oculta el "TOKEN_SECRET", algunos le llaman "decoded" instead of "user".
    if(err) return res.status(403).json({message: "Invalid token"});
    
    req.user = user //A verrr, el request ("req") ya viene claramente con una estructura => lo que hago acá es definirle un nuevo campo (si se puede llamar así) que se va a llamar "user" ("req.user"), y a esto le asingo el valor de "user" (del lado derecho del signo "=").

    next() //Con esto le indico que continue a la ruta que se desea acceder. por ejemplo en "../routes/authroutes.js" se tiene: "router.get('/profile', authRequired, profile)", o sea, en este caso la ruta a la que se permitira el acceso es a "profile".
  })
}