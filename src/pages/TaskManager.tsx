import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import TaskModal from '../components/TaskModal';

export interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  assignedTo: string;
  startDate: Date | null;
  dueDate: Date | null;
  reportTo: string;
  objective: string;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskCount, setTaskCount] = useState(1);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
    setTaskCount(taskCount + 1);
  };

  const updateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
    setTasks(updatedTasks);
    setSelectedTask(null); // Limpiar la tarea seleccionada después de editar
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    setSelectedTask(null); // Para diferenciar cuando es una nueva tarea
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Tareas</h1>

      <button
        onClick={handleAddTask}
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Agregar tarea
      </button>

      {/* Modal para agregar/editar tarea */}
      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          isOpen={isModalOpen} // Aquí pasamos isOpen
          onClose={() => setIsModalOpen(false)}
          onSave={(task: Task) => {
            if (selectedTask) {
              updateTask(task);
            } else {
              addTask(task);
            }
            setIsModalOpen(false);
          }}
          taskCount={taskCount} // Pasamos el contador de tareas para autogenerar la clave
          isEditing={selectedTask !== null} // Determinamos si se está editando
        />
      )}

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
                <td className="p-2">{task.startDate ? task.startDate.toLocaleDateString() : '-'}</td>
                <td className="p-2">{task.dueDate ? task.dueDate.toLocaleDateString() : '-'}</td>
                <td className="p-2">{task.reportTo}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="text-blue-500 hover:text-blue-700 mx-2"
                  >
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