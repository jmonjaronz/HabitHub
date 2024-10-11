// Issues.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { Dialog } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface Issue {
  type: string;
  key: string;
  summary: string;
  assignedTo: string;
  reportedBy: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

const issues: Issue[] = [
  {
    type: 'Bug',
    key: 'ISS-1',
    summary: 'Error al guardar los cambios',
    assignedTo: 'Juan Pérez',
    reportedBy: 'Ana Gómez',
    status: 'To Do',
  },
  {
    type: 'Feature',
    key: 'ISS-2',
    summary: 'Agregar nuevo filtro de búsqueda',
    assignedTo: 'Luis Torres',
    reportedBy: 'Marta Rodríguez',
    status: 'In Progress',
  },
  // Agregar más issues según sea necesario...
];

const IssuesPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const filteredIssues = issues.filter((issue) => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'todo') return issue.status === 'To Do';
    if (selectedTab === 'inprogress') return issue.status === 'In Progress';
    if (selectedTab === 'done') return issue.status === 'Done';
    return false;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Issues</h1>
      <Button onClick={handleOpenModal} className="mb-4">
        Agregar Issue
      </Button>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="todo">Por Hacer</TabsTrigger>
          <TabsTrigger value="inprogress">En Progreso</TabsTrigger>
          <TabsTrigger value="done">Completados</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredIssues.map((issue) => (
          <Card key={issue.key} className="p-4 border rounded-md shadow-md">
            <h2 className="font-bold text-xl">
              {issue.summary}
              <Badge variant="outline" className="ml-2">{issue.type}</Badge>
            </h2>
            <p className="text-gray-600">
              <Tooltip>
                <span className="font-semibold">{issue.key}</span>
                <span className="tooltip-text">Key del issue</span>
              </Tooltip>
            </p>
            <p>Asignado a: {issue.assignedTo}</p>
            <p>Reportado por: {issue.reportedBy}</p>
            <Badge className={`mt-2 ${issue.status === 'Done' ? 'bg-green-500' : issue.status === 'In Progress' ? 'bg-yellow-500' : 'bg-red-500'}`}>
              {issue.status}
            </Badge>
          </Card>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="p-4">
          <h2 className="text-xl font-bold">Agregar Nuevo Issue</h2>
          <p>Formulario para agregar un nuevo issue...</p>
          <Button onClick={handleCloseModal}>Cerrar</Button>
        </div>
      </Dialog>
    </div>
  );
};

export default IssuesPage;