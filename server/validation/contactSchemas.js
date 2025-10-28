import { z } from './zod.js';

export const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty('El nombre es obligatorio')
    .max(100, 'El nombre no puede superar los 100 caracteres'),
  email: z
    .string()
    .trim()
    .nonempty('El correo es obligatorio')
    .email('Ingrese un correo electrónico válido')
    .max(255, 'El correo no puede superar los 255 caracteres'),
  message: z
    .string()
    .trim()
    .nonempty('El mensaje es obligatorio')
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede superar los 1000 caracteres')
});
