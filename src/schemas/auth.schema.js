import {z} from 'zod' //Para poder hacer esta importación, previo instalé en el terminal "npm i zod".

export const registerSchema = z.object({ //Esto será usado para que se ralicen las validadciones, en este caso, cuando el usurio se esté registrando.
  username: z.string({
    required_error: "Username is required" //Si al registrarse omite ingresar un nombre de usuario => le mandará este mensaje.
  }),
  email: z.string({
    required_error: 'Email is required',
  })
  .email({
    message: 'Invalid email',
  }),
  password: z.string({required_error: "Password is required",})
  .min(6, {message: 'Password must be at least 6 characters',}), //"6", el mínimo de caracteres requeridos.
});

export const loginSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
  })
  .email({
    message: 'Invalid email',
  }),
  password: z.string({required_error: "Password is required",})
  .min(6, {message: 'Password must be at least 6 characters',}),
})