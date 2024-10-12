import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { z } from 'zod';
import useIssuesStore from '../store/useIssueStore';

// Define el enum para los tipos de issues
const issueTypeEnum = {
  Bug: "Bug" as const,
  Feature: "Feature" as const,
  Task: "Task" as const,
};

// Define el enum para los estados de issues
const issueStatusEnum = {
  Todo: "To Do" as const,
  InProgress: "In Progress" as const,
  Done: "Done" as const,
};

// Define el schema con Zod
const issueSchema = z.object({
  title: z.string().nonempty("El título es obligatorio"),
  assignedTo: z.string().nonempty("Debe asignar a alguien"),
  reportedBy: z.string().nonempty("Debe indicar quién reporta"),
  dueDate: z.date().refine((date) => date >= new Date(), {
    message: "La fecha de entrega no puede ser anterior a la fecha actual",
  }),
  type: z.enum(["Bug", "Feature", "Task"]),
  status: z.enum(["To Do", "In Progress", "Done"]),
});

const Issues1: React.FC = () => {
  const [newIssue, setNewIssue] = useState({
    title: '',
    assignedTo: '',
    reportedBy: '',
    dueDate: '',
    type: issueTypeEnum.Bug,
    status: issueStatusEnum.Todo,
  });
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const { issues, addIssue } = useIssuesStore();

  const handleSaveIssue = () => {
    const validationResult = issueSchema.safeParse({
      ...newIssue,
      dueDate: dueDate,
    });

    if (!validationResult.success) {
      setErrorMessages(validationResult.error.errors.map(error => error.message));
      return;
    }

    const newKey = `ISS-${issues.length + 1}`;
    const issueToAdd = { 
      ...newIssue, 
      key: newKey, 
      dueDate: dueDate ? format(dueDate, 'yyyy-MM-dd') : '', 
    };
    addIssue(issueToAdd);
    setNewIssue({ title: '', assignedTo: '', reportedBy: '', dueDate: '', type: issueTypeEnum.Bug, status: issueStatusEnum.Todo });
    setDueDate(undefined);
    setIsOpen(false);
    setErrorMessages([]);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Issues</h1>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="mb-4 bg-orange-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Agregar Issue
        </DialogTrigger>
        <DialogContent>
          <div className="p-4">
            <h2 className="text-xl font-bold">Agregar Nuevo Issue</h2>
            {errorMessages.length > 0 && (
              <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
                {errorMessages.map((msg, index) => (
                  <p key={index}>{msg}</p>
                ))}
              </div>
            )}
            <form className="mt-4" onSubmit={(e) => { e.preventDefault(); handleSaveIssue(); }}>
              <div className="mb-4">
                <label className="block mb-2">Título</label>
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  placeholder="Ingrese el título del issue"
                  value={newIssue.title}
                  onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Asignar a</label>
                <Select onValueChange={(value) => setNewIssue({ ...newIssue, assignedTo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione a quién asignar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Juan Pérez">Juan Pérez</SelectItem>
                    <SelectItem value="Luis Torres">Luis Torres</SelectItem>
                    <SelectItem value="Jesús Monja">Jesús Monja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Reportado por</label>
                <Select onValueChange={(value) => setNewIssue({ ...newIssue, reportedBy: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione quién reporta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ana Gómez">Ana Gómez</SelectItem>
                    <SelectItem value="Marta Rodríguez">Marta Rodríguez</SelectItem>
                    <SelectItem value="Renatto Farid">Renatto Farid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Fecha de Entrega</label>
                <Calendar 
                  mode="single"
                  selected={dueDate} 
                  onSelect={setDueDate} 
                  className="" 
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="mt-4 ml-2 bg-orange-500 hover:bg-orange-600 text-white">
                  Guardar
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <div className="grid gap-4">
        {issues.map((issue) => (
          <Card key={issue.key} className="p-4">
            <h2 className="text-xl font-bold">{issue.title}</h2>
            <p>Asignado a: {issue.assignedTo}</p>
            <p>Reportado por: {issue.reportedBy}</p>
            <p>Fecha de Entrega: {issue.dueDate}</p>
            <p>Tipo: {issue.type}</p>
            <p>Estado: {issue.status}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Issues1;