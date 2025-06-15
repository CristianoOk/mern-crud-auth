import express from 'express'; //Importo "express", para poder crear un 'servidor'.
import morgan from 'morgan'; //Para poder hacerlo previamente en la teminal ejecuté "npm i morgan".
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser'; //Para poder importar esto, previamente instalé "npm i cookie-parser" en la terminal.
import taskRoutes from './routes/tasks.routes.js';
import cors from 'cors'; //Previo tuve que instalar "npm i cors".

const app = express(); //"express()", así inicializo 'express'; y una vez inicializado esto nos devuelve un objeto, el cual guardo en "const app". El "app" ahora es básicamente el 'servidor'. "Credential: true", es para que el fronEnd también tenga acceso a las 'cookies'.

app.use(cors({origin: 'http://localhost:5173', credentials: true})); //Básicamente es como decirle que quiero permitir que todos los dominios se puedan comunicar en este servidor. Si quisiera que se comunique mi frontEnd específico => pondría 'app.use(cors({origin: 'http://localhost:5173',}));', pero bueno lo que puse es más general y funciona.

app.use(morgan('dev')); //Le digo a "app", que use el módulo "morgan" con su configuración "dev". La configuración "dev", es solamente para que nos muestre un mensaje corto por consola. ESTO SE LLAMA MIDDLEWARE.

app.use(express.json()) //"express.json()", con esto le digo que de "express" quiero usar su método "json". que sirve para que pueda convertir los 'request.body' (como el que uso en "auth.cotrollers.js", "req.body") en formato "json". ESTO SE LLAMA MIDDLEWARE. Es un tema de 'Express' por si querés investigar más al respecto, no me refiero a 'middleware', sino a porque me vi obligado a hacer "app.use(express.json())". Te explico un poquito: si yo llegase a hacer un request, o sea, una petición y a dicha petición la escribo como un objeto (ya que así se ven los archivos .json, como meros objetos), esa petición escrita como un objeto (entendiendo que en realidad quiero escribirlo como algo de un .json, no si un objeto de .js) => "express" no lo reconoce; por eso le digo que la petición que yo le mande (que lo interpreta como 'body') lo 'convierta' a .json con "app.use(express.json())" y de esta forma si lo reconoce.

app.use(cookieParser());

app.use("/api", authRoutes); //con "/api", le digo que todas las rutas de "authRoutes" van a empezar con "/api".

app.use("/api", taskRoutes);

export default app;