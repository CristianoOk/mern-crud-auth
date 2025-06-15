import {Router} from 'express'; //Traigo la función "Router" de "express".
import {login, register, logout, profile, verifyToken} from '../controllers/auth.controller.js';
import  {authRequired} from '../middlewares/validateToken.js';
import {validateSchema} from '../middlewares/validator.meddleware.js'
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router() //"Router()", de esta forma lo ejecuto; y al ser ejecutado de devuelve un objeto, y dicho objeto lo estoy asignando a "const router".

router.post('/register', validateSchema(registerSchema), register)  //Creo una ruta del tipo "post", con el nombre (que yo elegí) "/register".
router.post('/login', validateSchema(loginSchema), login) //Básicamente le digo que cuando se haga una petición "post" a "/login", se ejecute la función "validateSchema()" que fue importada y después la función "login" que también fue importada.
router.post('/logout', logout)
router.get('/verify', verifyToken);
router.get('/profile', authRequired, profile) //Le digo que cuando se acceda a esta ruta => primero debe pasar por la función "authRequired" y después por "profile".

export default router;