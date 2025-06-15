//Acá creo un modelo para "user", un modelo es una forma de especificarle a 'mongodb' qué es lo que vamos a estar guardando/cómo van a lucir los datos que estamos guardando. Esto es muy útil, 'cause 'mongodb' puede guardar cualquier dato, y todos los datos no tienen que ser iguales. Con esto lo que hacemos es crear una estructura fija, como una especie de tabla para 'mongodb' y así evitar errores. 

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ //Va con "new", porque es una 'instancia'.
  username: {
    type: String,
    required: true, //Con esto le estoy diciendo que siempre es requerido que se pase un "username".
    trim: true //Con esto hago que, en caso de que el usuario ingrese el "username" con espacios en blanco ya sea al inicio o final, lo recorte y solo guarde el texto no los espacios vacíos.
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true //Con esto le digo que no puede haber más de un "email" igual.
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true //Esto sirve para que registre la fecha y hora en la que se agrega un nuevo user en este caso.
})

export default mongoose.model('User', userSchema) //".model('User', userSchema)", le digo que el módelo "User" que va a guardar en 'mongodb', tednrá como esquema "userSchema".