import { z } from 'zod';

export const taskSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  assignedTo: z.string().min(1, "La persona asignada es obligatoria"),
  startDate: z.date().optional(), // Puede ser opcional por ahora, la validaremos más tarde.
  dueDate: z.date().optional(), // Puede ser opcional por ahora, la validaremos más tarde.
  reportTo: z.string().optional(),
  objective: z.string().optional(),
  status: z.enum(["To do", "In Progress", "In Review", "Done"]),
}).refine((data) => {
  if (data.startDate && data.dueDate) {
    return data.startDate <= data.dueDate;
  }
  return true; // Si no se han proporcionado fechas, no hay error
}, {
  message: "La fecha de inicio no puede ser mayor que la fecha de vencimiento",
  path: ["startDate"], // Puede especificar el campo que se usará para el mensaje
});