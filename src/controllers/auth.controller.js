import User from '../modules/user.model.js';
import bcrypt from 'bcryptjs'; //Para poder importar el módulo de "bcryptjs" con el nombre "bcrypt", previamente instalé en la terminal "npm i bcryptjs". SIRVE PARA ENCRIPTAR LAS CONSTRASEÑAS.
import jwt from 'jsonwebtoken'; //Le digo que importe "jsonwebtoken", con el nombre de "jwt". Para que funcione previamente instalé en el terminal "npm i jsonwebtoken".
import {createAccessToken} from '../libs/jwt.js';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
  console.log(req.body)


  const {email, password, username} = req.body //Acá el "req.body", va a traer 'propiedades' (ya que debería haberse escrito en el request con el formato de un objeto, por ejemplo, digamos que lo que trae el "body" es algo así: "{"email": "thiago@gmail.com","password": "T27","username": "Thiaguis"}) => le digo que lo que traiga se asigne a cada uno de "const {email, password, username}" respectivamente. claramente los nombres coinciden, o sea es como que se tuviera "const {email, password, username} = {"email": "thiago@gmail.com","password": "T27","username": "Thiaguis"}) => le digo que lo que traiga se asigne a cada uno de "const {email, password, username}", pero obviamente podría haber definido mis "const" con cualquier nombre, pero se respetaría el orden de asignación, por ejemplo si tuviera: const {antiojita, gruinguin, nena} = req.body => dentro de antiojita se guardaría "thiago@gmail.com" , de gringuin "T27" y de nena "Thiaguis".

  //console.log(email, password, username)


  const passwordHash = await bcrypt.hash(password, 10) //"bcrypt", es ejecutado y llama al método "hash" que sirve para en este caso conertir "password" en una serie de caracteres sin mucho sentido, o sea, encripta la contraseña. Digamos que la contraseña es "T274" => aparecería algo así "$2a$10$.d5C8x0rpctLp/N5IBZzhuFX8VykW7rI7ZDI6YZnBtIn1vSh9Z14W". Y el número 10 representa el "factor de costo" o "salt rounds" para el algoritmo de hashing bcrypt. Este número indica cuántas veces se realizará el proceso de hashing sobre la contraseña. El factor de costo determina la complejidad y el tiempo que tomará generar el hash. Un valor más alto significa que el proceso será más lento y consumirá más recursos, pero también hará que el hash sea más seguro contra ataques de fuerza bruta. la contraseña ya encriptada se guardará en "const passwordHash".

  try {

    const userFound = await User.findOne({email});
    if(userFound) return res.status(400).json(["The email already exists"])

    const newUser = new User({ //Le digo que cuando cree un nuevo usuario "new User", le voy a pasar todos los datos que estan dentro de estas llaves "{}"; y lo vy a guardar en "const newUser".
      username,
      email,
      password: passwordHash, //Le estoy diciendo que cuando se cree el usuario => la contraseña ("password") va a tener como valor "passwordHash".
    })
  
    const userSaved = await newUser.save(); //"newUser.save()", sirve para que una vez recibidos (por eso el "await") los datos => se guarde en la base de datos "mongodb".

    /*TODO LO QUE ESTÁ COMENTADO ACÁ LO LLEVE A "../libs/jwt.js", para mejararlo (o sea, que algunas cosas van a cambiar) y tener acá un código más limpio.
    jwt.sign({ //Uso el método "sign" de "jwt" (que importé al principio, FIJATE LA IMPORTACIÓN!).
      id: userSaved._id, //Este el dato que quiero guardar dentro del 'token', o sea, este es el 'payload'.
    }, "secret123", //Esto es el "secretOrPrivateKey", que básicamente es la llave que estría usando para cifrar como también para descifrar lo que hay dentro del 'token'.
    {
      expiresIn: "1d", //Es una opción que define cuánto tiempo será válido el token antes de expirar. En este caso expirará en 1 día (24 horas) desde el momento en que se genera.
    }, (err, token) => { //Genero un 'callback' de toda la vida.
      if(err) console.log(err);
    }); 
    */
    
    const token = await createAccessToken({id: userSaved._id})


    res.cookie('token', token); //".cookie", es un método que ya trae "express". => le digo que establezca una "cookie" que se va a llamar "'token'", y como valor va a tener el "token"

    res.json({ //Le estoy aclarondo que lo único que quiero que devuelva como respuesta es lo que está dentro de estas llaves.
      id: userSaved._id, //"_id", tiene un guion bajo porque cuando crea el user en la base de datos, también crea automáticamente esta proiedad en cada registro de la colleción "user" dentro de la base de datos "merndb" en el gestor base de datos que estoy usando que es 'mongodb'. => el nombre de la propiedad es "_id".
      username: userSaved.username, //Cabe aclarar que lo que está a la derecha "userSaved.username", es la propiedad que estoy trayendo de "userSaved" y le estoy asignando a lo que está en lado izquierdo a "username:", a lo que voy hago coincidir el nombre a propósito pero tranquilamente pude haber puesto 'TUKI-TUKI-lol: userSaved.username,'.
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved. updatedAt,
    })
  } catch (error) {
    //console.log(error);
    res.status(500).json({message: error.message});
  }


  //res.send('Registrando')
};

export const login = async (req, res) => {
  console.log(req.body)

  const {email, password} = req.body 

  try {
    const userFound = await User.findOne({email}); //Es muy textual lo que hace esta línea
    if(!userFound) return res.status(400).json({message: "User not found"}); //Básicamente se esta expresando que, si no encontro un usuario "!userFound", o sea si "suerFound" está bacío => retorna un estado con el mensaje.

    const isMatch = await bcrypt.compare(password, userFound.password); //Usando este método "compare" de "bcrypt", podemos comparar entre "password" y "userFound.password". Este método devuelve un 'true' o 'false'.
    if(!isMatch) return res.status(400).json({message: "Incorrect password"});

    const token = await createAccessToken({id: userFound._id}); //Le digo que de "userFound", tome el "_id" y lo guarde en "id" y que cree un 'token' de este.

    res.cookie('token', token); 

    res.json({ 
      id: userFound._id, 
      username: userFound.username, 
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound. updatedAt,
    })
  } catch (error) {
    res.status(500).json({message: error.message});
  }

};


//El "logout" de un usuario funciona al eliminar la cookie del token, configurando su valor como una cadena vacía y estableciendo una fecha de expiración pasada. Esto es una forma efectiva de "borrar" la cookie del navegador del usuario:
export const logout = (req, res) => {
  res.cookie('token', "", { //Establece la 'cookie token' con un valor vacío. Esto es para asegurar que cualquier intento de leer la 'cookie' después del logout no encontrará un token válido.
    expires: new Date(0) //Acá básicamente le digo que no va a haber 'token'. Configura la fecha de expiración de la cookie a una fecha en el pasado (el 1 de enero de 1970). Esto le dice al navegador que la 'cookie' ya ha expirado, lo que efectivamente la elimina.
  })
  return res.sendStatus(200); //Indicación de que la operación de logout fue exitosa.
}

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)

  if(!userFound) return res.status(400).json({message: "User not found"});

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updateAt: userFound.updatedAt,
  })
}

export const verifyToken = async (req, res) => {
  const {token} = req.cookies

  if(!token) return res.status(401).json({message: "Unautorized"});

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if(err) return res.status(401).json({message: "Unautorized"});

    const userFound = await User.findById(user.id)
    if(!userFound) return res.status(401).json({message: "Unautorized"});

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    })
  })
}