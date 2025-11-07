import React, { useState } from 'react';

function TaskForm({ onCreateTask, status }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onCreateTask({ title, description, status });
      setTitle('');
      setDescription('');
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="btn-add-task">
        + Adicionar Tarefa
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título da tarefa"
        className="task-input"
        autoFocus
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição (opcional)"
        className="task-textarea"
      />
      <div className="task-actions">
        <button type="submit" className="btn-save">Adicionar</button>
        <button type="button" onClick={() => setIsOpen(false)} className="btn-cancel">
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default TaskForm;