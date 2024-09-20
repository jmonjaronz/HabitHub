import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  assignedTo: string;
  startDate: string;
  dueDate: string;
  reportTo: string;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [reportTo, setReportTo] = useState('');
  const [taskCount, setTaskCount] = useState(1);

  const addTask = () => {
    const newTask: Task = {
      id: `TSK - ${taskCount}`,
      name: taskName,
      description: description,
      status: 'To do',
      assignedTo: assignedTo,
      startDate: startDate,
      dueDate: dueDate,
      reportTo: reportTo,
    };

    setTasks([...tasks, newTask]);
    setTaskName('');
    setDescription('');
    setAssignedTo('');
    setStartDate('');
    setDueDate('');
    setReportTo('');
    setTaskCount(taskCount + 1);
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Tareas</h1>

      {/* Formulario para agregar tarea */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nombre de la tarea"
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Persona asignada"
            value={assignedTo}
            onChange={e => setAssignedTo(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="date"
            placeholder="Fecha de inicio"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="date"
            placeholder="Fecha de fin"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="text"
            placeholder="A quién informa"
            value={reportTo}
            onChange={e => setReportTo(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <button
          onClick={addTask}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Agregar tarea
        </button>
      </div>

      {/* Tabla de tareas */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Clave</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Persona asignada</th>
              <th className="p-2">F. Inicio</th>
              <th className="p-2">F. Vencimiento</th>
              <th className="p-2">Informador</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{task.id}</td>
                <td className="p-2">{task.name}</td>
                <td className="p-2">{task.status}</td>
                <td className="p-2">{task.assignedTo}</td>
                <td className="p-2">{task.startDate}</td>
                <td className="p-2">{task.dueDate}</td>
                <td className="p-2">{task.reportTo}</td>
                <td className="p-2 text-center">
                  <button className="text-blue-500 hover:text-blue-700 mx-2">
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 mx-2"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskManager;