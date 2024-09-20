import { useState } from 'react';

interface SubTask {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}

interface Task {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  subTasks: SubTask[];
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Desarrollo de Frontend',
    startDate: '2024-09-01',
    endDate: '2024-09-10',
    subTasks: [
      { id: 1, title: 'Diseño de UI', startDate: '2024-09-01', endDate: '2024-09-03' },
      { id: 2, title: 'Implementación de componentes', startDate: '2024-09-04', endDate: '2024-09-07' },
    ],
  },
  {
    id: 2,
    title: 'Backend API',
    startDate: '2024-09-05',
    endDate: '2024-09-15',
    subTasks: [
      { id: 1, title: 'Modelado de base de datos', startDate: '2024-09-05', endDate: '2024-09-06' },
      { id: 2, title: 'Implementación de endpoints', startDate: '2024-09-07', endDate: '2024-09-10' },
    ],
  },
  // Agregar más tareas aquí
];

const Cronograma = () => {
  const [tasks] = useState<Task[]>(initialTasks);

  // Función que calcula el porcentaje de la barra en función del progreso
  const calculateProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const today = Date.now();
    const progress = Math.min(100, ((today - start) / (end - start)) * 100);
    return progress > 0 ? progress : 0;
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Cronograma del Proyecto</h1>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <span className="text-sm">{task.startDate} - {task.endDate}</span>
            </div>
            <div className="relative mt-2">
              <div className="h-4 bg-gray-300 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${calculateProgress(task.startDate, task.endDate)}%` }}
                />
              </div>
            </div>
            <div className="ml-4 mt-4 space-y-2">
              {task.subTasks.map((subTask) => (
                <div key={subTask.id} className="bg-gray-100 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg">{subTask.title}</h3>
                    <span className="text-sm">{subTask.startDate} - {subTask.endDate}</span>
                  </div>
                  <div className="relative mt-2">
                    <div className="h-3 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="bg-green-500 h-full rounded-full"
                        style={{ width: `${calculateProgress(subTask.startDate, subTask.endDate)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cronograma;