import React, { useState } from 'react';

interface Task {
  id: number;
  name: string;
  start: Date;
  end: Date;
}

const initialTasks: Task[] = [
  { id: 1, name: 'Tarea 1', start: new Date(2024, 8, 1), end: new Date(2024, 8, 3) },
  { id: 2, name: 'Tarea 2', start: new Date(2024, 8, 2), end: new Date(2024, 8, 5) },
  { id: 3, name: 'Tarea 3', start: new Date(2024, 8, 4), end: new Date(2024, 8, 8) },
];

const Cronograma: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [startDate, setStartDate] = useState(new Date(2024, 8, 1));
  const [endDate, setEndDate] = useState(new Date(2024, 8, 10));

  const days: Date[] = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d));
  }

  const handleAddTask = () => {
    const newTask: Task = {
      id: tasks.length + 1,
      name: `Tarea ${tasks.length + 1}`,
      start: new Date(startDate),
      end: new Date(startDate.setDate(startDate.getDate() + 2)),
    };
    setTasks([...tasks, newTask]);
  };

  const monthAbbreviation = days[0].toLocaleString('es-ES', { month: 'short' }).toUpperCase();

  return (
    <div className="overflow-x-auto">
      <div className="flex mb-4">
        <input
          type="date"
          value={startDate.toISOString().substr(0, 10)}
          onChange={(e) => setStartDate(new Date(e.target.value))}
          className="mr-2 border border-gray-300 p-2 rounded"
        />
        <input
          type="date"
          value={endDate.toISOString().substr(0, 10)}
          onChange={(e) => setEndDate(new Date(e.target.value))}
          className="mr-2 border border-gray-300 p-2 rounded"
        />
        <button 
          onClick={handleAddTask} 
          className="bg-blue-500 text-white p-2 rounded">
          Agregar Tarea
        </button>
      </div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Tareas</th>
            {days.map((day, index) => (
              <th key={index} className="border border-gray-300 p-2 text-center">
                {index === 0 || day.getDate() === 1 ? monthAbbreviation : ''}
              </th>
            ))}
          </tr>
          <tr>
            {days.map((day, index) => (
              <th key={index} className="border border-gray-300 p-2 text-center text-sm">
                {day.getDate()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td className="border border-gray-300 p-2">{task.name}</td>
              {days.map((day, index) => {
                const isInRange = day >= task.start && day <= task.end;
                return (
                  <td key={index} className="border border-gray-300 p-0">
                    {isInRange && (
                      <div className="h-4 bg-blue-500" style={{ width: '100%' }} />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cronograma;