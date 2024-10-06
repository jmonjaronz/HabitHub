import { z } from 'zod';

export const taskSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  assignedTo: z.string().min(5, "La persona asignada es obligatoria"),
  startDate: z.date({ invalid_type_error: "La fecha de inicio es obligatoria" }).optional(),
  dueDate: z.date({ invalid_type_error: "La fecha de vencimiento es obligatoria" }).optional(),
  reportTo: z.string().min(5, "La persona asignada es obligatoria"),
  objective: z.string().min(5, "Debe indicar un objetivo"),
  status: z.enum(["To do", "In Progress", "In Review", "Done"]),
}).refine((data) => {
  // Si ambas fechas están presentes, validamos que la fecha de inicio sea menor o igual a la de vencimiento
  if (data.startDate && data.dueDate) {
    return data.startDate <= data.dueDate;
  }
  return true; // Si no se han proporcionado ambas fechas, no hay error
}, {
  message: "La fecha de inicio no puede ser mayor que la fecha de vencimiento",
  path: ["startDate"], // Asignamos el error al campo "startDate"
})
.refine((data) => {
  // Validación adicional: Si startDate o dueDate están vacías, lanzar error personalizado
  return data.startDate || data.dueDate; // Verificamos si alguna fecha es proporcionada
}, {
  message: "Debe proporcionar al menos una fecha válida (inicio o vencimiento)",
  path: ["startDate"], // Puedes ajustar el path según dónde quieras que aparezca el error
});