import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { z } from 'zod';

// Define the schema with Zod
const issueSchema = z.object({
  title: z.string().nonempty("El título es obligatorio"),
  assignedTo: z.string().nonempty("Debe asignar a alguien"),
  reportedBy: z.string().nonempty("Debe indicar quién reporta"),
  dueDate: z.date().refine((date) => date >= new Date(), {
    message: "La fecha de entrega no puede ser anterior a la fecha actual",
  }),
  type: z.string(),
  status: z.string(),
});

interface Issue {
  type: string;
  key: string;
  title: string;
  assignedTo: string;
  reportedBy: string;
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

const issues: Issue[] = [
  {
    type: 'Bug',
    key: 'ISS-1',
    title: 'Error al guardar los cambios',
    assignedTo: 'Juan Pérez',
    reportedBy: 'Ana Gómez',
    dueDate: '2024-10-15',
    status: 'To Do',
  },
  {
    type: 'Feature',
    key: 'ISS-2',
    title: 'Agregar filtro de búsqueda',
    assignedTo: 'Luis Torres',
    reportedBy: 'Marta Rodríguez',
    dueDate: '2024-10-18',
    status: 'In Progress',
  },
  {
    type: 'Feature',
    key: 'ISS-3',
    title: 'Agregar Shadcn',
    assignedTo: 'Jesús Monja',
    reportedBy: 'Renatto Farid',
    dueDate: '2024-10-20',
    status: 'Done',
  },
];

const IssuesPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [newIssue, setNewIssue] = useState({
    title: '',
    assignedTo: '',
    reportedBy: '',
    dueDate: '',
    type: 'Bug', //  tipo por defecto
    status: 'To Do', //  estado por defecto
  });
  const [issuesList, setIssuesList] = useState(issues);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar el modal
  const [errorMessages, setErrorMessages] = useState<string[]>([]); // Para almacenar mensajes de error

  const handleSaveIssue = () => {
    const validationResult = issueSchema.safeParse({
      ...newIssue,
      dueDate: dueDate,
    });

    if (!validationResult.success) {
      // Si la validación falla, guarda los errores
      setErrorMessages(validationResult.error.errors.map(error => error.message));
      return;
    }

    const newKey = `ISS-${issuesList.length + 1}`;
    const issueToAdd: Issue = { 
      ...newIssue, 
      key: newKey, 
      dueDate: dueDate ? format(dueDate, 'yyyy-MM-dd') : '', 
      status: 'To Do', // Establece el estado por defecto
    };
    setIssuesList([...issuesList, issueToAdd]);
    setNewIssue({ title: '', assignedTo: '', reportedBy: '', dueDate: '', type: 'Bug', status: 'To Do' });
    setDueDate(undefined);
    setIsOpen(false); // Cierra el modal al guardar
    setErrorMessages([]); // Limpia los mensajes de error
  };

  const filteredIssues = issuesList.filter((issue) => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'todo') return issue.status === 'To Do';
    if (selectedTab === 'inprogress') return issue.status === 'In Progress';
    if (selectedTab === 'done') return issue.status === 'Done';
    return false;
  });

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
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="todo">Por Hacer</TabsTrigger>
          <TabsTrigger value="inprogress">En Progreso</TabsTrigger>
          <TabsTrigger value="done">Completados</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredIssues.map((issue) => (
          <Card key={issue.key} className="p-4 border rounded-md shadow-md transition-transform transform hover:scale-105">
            <h2 className="font-bold text-lg">
              {issue.title}
              <Badge variant="outline" className="ml-2">{issue.type}</Badge>
            </h2>
            <p className="text-gray-600">
              <Tooltip>
                <span className="tooltip-text">Key del issue: </span>
                <span className="font-semibold">{issue.key}</span>
              </Tooltip>
            </p>
            <p>Asignado a: {issue.assignedTo}</p>
            <p>Reportado por: {issue.reportedBy}</p>
            <p>Fecha de Entrega: {issue.dueDate}</p>
            <Badge className={`mt-2 ${issue.status === 'Done' ? 'bg-green-500' 
              : issue.status === 'In Progress' 
              ? 'bg-yellow-500' : 'bg-red-500'}`}>
              {issue.status}
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IssuesPage;