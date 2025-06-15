export const validateSchema = (schema) => (req, res, next) =>{
  try {
    schema.parse(req.body) //Utiliza el método "parse" del esquema para validar "req.body". Si los datos no cumplen con el esquema, se lanzará un error.
    next() //Si la validación es exitosa, "next()" se llama para continuar con la siguiente función en la cadena de middleware o la función de la ruta.
  } catch (error) {
    //console.log(error)
    //console.log(error.errors)
    return res.status(400).json(error.errors.map(error => error.message)); //Es una forma peculiar que tiene 'zod' para traer un error. Que lo tiene como un arreglo de errores; si ejecutas antes de esta linea "console.log(error)" vas a poder ver que "zod" te trae arrays llamados "issues" y "errors" con objetos andetro (dichos objetos son los errores). => acá básicamente le digo que, de los errores que me trae "zod" ingrese a el array "errors" y que mapee cada objeto de dicho array, trayendome de cada objeto la propiedad "message". Acordate que "zod" lo instalaste y lo estas usando en "../schemas/auth.schema.js" y "../schema/taks.schema.js", y hay una breve explicación en el archivo "../LEEME!!!.txt".
  }
}