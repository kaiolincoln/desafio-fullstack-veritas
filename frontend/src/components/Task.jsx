import React, { useState } from 'react';

function Task({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    if (title.trim()) {
      onUpdate(task.id, { ...task, title, description });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="task editing">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título da tarefa"
          className="task-input"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição (opcional)"
          className="task-textarea"
        />
        <div className="task-actions">
          <button onClick={handleSave} className="btn-save">Salvar</button>
          <button onClick={handleCancel} className="btn-cancel">Cancelar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="task">
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <div className="task-actions">
        <button onClick={() => setIsEditing(true)} className="btn-edit">✏️ Editar</button>
        <button onClick={() => onDelete(task.id)} className="btn-delete">🗑️ Deletar</button>
      </div>
    </div>
  );
}

export default Task;