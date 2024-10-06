import React, { useState, useEffect } from 'react';
import { Task } from '../pages/TaskManager';
import { taskSchema } from '../schemas/taskSchema';

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  isEditing: boolean;
  taskCount: number;
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

  const [errors, setErrors] = useState<Record<string, string>>({});

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
    const result = taskSchema.safeParse({
      name: taskName,
      description, // La descripción no será validada
      assignedTo,
      startDate: startDate ? new Date(startDate) : null,
      dueDate: dueDate ? new Date(dueDate) : null,
      reportTo,
      objective,
      status,
    });

    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors;
      setErrors({
        name: errorMessages.name?.[0] || "",
        assignedTo: errorMessages.assignedTo?.[0] || "",
        startDate: errorMessages.startDate?.[0] || "",
        dueDate: errorMessages.dueDate?.[0] || "",
      });
      return;
    }

    const updatedTask: Task = {
      id: task ? task.id : `TSK - ${taskCount}`,
      name: taskName,
      description,
      assignedTo,
      startDate: startDate ? new Date(startDate) : null,
      dueDate: dueDate ? new Date(dueDate) : null,
      reportTo,
      objective,
      status,
    };

    onSave(updatedTask);
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
          {errors.name && <p className="text-red-500">{errors.name}</p>}
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
          {errors.assignedTo && <p className="text-red-500">{errors.assignedTo}</p>}
          <input
            type="date"
            value={startDate || ''}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
          {errors.startDate && <p className="text-red-500">{errors.startDate}</p>}
          <input
            type="date"
            value={dueDate || ''}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
          {errors.dueDate && <p className="text-red-500">{errors.dueDate}</p>}
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
            <option value="To do">Por hacer</option>
            <option value="In Progress">En progreso</option>
            <option value="In Review">En revisión</option>
            <option value="Done">Completada</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-blue-500 hover:font-bold"
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