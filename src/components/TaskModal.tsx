import React, { useState, useEffect } from 'react';
import { Task } from '../pages/TaskManager';

interface TaskModalProps {
  task: Task | null; // Se recibe la tarea cuando es editar
  isOpen: boolean; // Controla si el modal está abierto
  onClose: () => void; // Cierra el modal
  onSave: (task: Task) => void; // Guarda la tarea (nueva o editada)
  isEditing: boolean; // Indica si se está editando o agregando
  taskCount: number; // Contador de tareas para generar la clave
}

const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose, onSave, isEditing, taskCount }) => {
  const [taskName, setTaskName] = useState(task?.name || '');
  const [description, setDescription] = useState(task?.description || '');
  const [assignedTo, setAssignedTo] = useState(task?.assignedTo || '');
  const [startDate, setStartDate] = useState<string | null>(task?.startDate ? task.startDate.toISOString().split('T')[0] : '');
  const [dueDate, setDueDate] = useState<string | null>(task?.dueDate ? task.dueDate.toISOString().split('T')[0] : '');
  const [reportTo, setReportTo] = useState(task?.reportTo || '');
  const [objective, setObjective] = useState(task?.objective || '');
  const [status, setStatus] = useState(task?.status || 'To do');

  useEffect(() => {
    if (task) {
      setTaskName(task.name);
      setDescription(task.description);
      setAssignedTo(task.assignedTo);
      setStartDate(task.startDate ? task.startDate.toISOString().split('T')[0] : null);
      setDueDate(task.dueDate ? task.dueDate.toISOString().split('T')[0] : null);
      setReportTo(task.reportTo);
      setObjective(task.objective);
      setStatus(task.status);
    } else {
      setTaskName('');
      setDescription('');
      setAssignedTo('');
      setStartDate(null);
      setDueDate(null);
      setReportTo('');
      setObjective('');
      setStatus('To do');
    }
  }, [task, isOpen]);

  const handleSave = () => {
    const updatedTask: Task = {
      id: task ? task.id : `TSK - ${taskCount}`, // Genera ID automáticamente si es nueva
      name: taskName,
      description,
      assignedTo,
      startDate: startDate ? new Date(startDate) : null,
      dueDate: dueDate ? new Date(dueDate) : null,
      reportTo,
      objective,
      status,
    };
    onSave(updatedTask); // Guardar la tarea (crear o editar)
  };

  return isOpen ? (
    <div className="modal-overlay fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="modal-content bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Editar Tarea' : 'Agregar Tarea'}</h2>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            value={task ? task.id : `TSK - ${taskCount}`}
            disabled
            className="border p-2 rounded-md w-full bg-gray-100"
            placeholder="Clave de la tarea"
          />
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="border p-2 rounded-md w-full"
            placeholder="Nombre de la tarea"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded-md w-full"
            placeholder="Descripción"
          />
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="border p-2 rounded-md w-full"
            placeholder="Persona asignada"
          />
          <input
            type="date"
            value={startDate || ''}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="date"
            value={dueDate || ''}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="text"
            value={reportTo}
            onChange={(e) => setReportTo(e.target.value)}
            className="border p-2 rounded-md w-full"
            placeholder="A quién informa"
          />
          <input
            type="text"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="border p-2 rounded-md w-full"
            placeholder="Objetivo"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded-md w-full"
          >
            <option value="To do">To do</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {isEditing ? 'Guardar cambios' : 'Agregar tarea'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default TaskModal;