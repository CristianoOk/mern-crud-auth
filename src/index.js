import app from './app.js';
import { connectDB } from './db.js';

connectDB(); //Es como decirle, que lo primero que debe hacer es concetarse a la base de datos y de ahí continuar con el código.
app.listen(4000) //Como dije que "app" es el 'servidor => ahora le estoy diciendo a dicho 'servidor' que escuche en el puerto "4000"
console.log('Server on port', 4000) //Y ahora le digo que me muestre el mensaje '"Server on port" "4000"'.