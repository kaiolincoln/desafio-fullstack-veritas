import React from 'react';
import Task from './Task';
import TaskForm from './TaskForm';

function Column({ title, status, tasks, onCreateTask, onUpdateTask, onDeleteTask, onMoveTask }) {
  const columnTasks = tasks.filter(task => task.status === status);

  const moveTask = (taskId, direction) => {
    const statusFlow = {
      todo: { next: 'in_progress', prev: null },
      in_progress: { next: 'done', prev: 'todo' },
      done: { next: null, prev: 'in_progress' }
    };

    const newStatus = direction === 'next' 
      ? statusFlow[status].next 
      : statusFlow[status].prev;

    if (newStatus) {
      onMoveTask(taskId, newStatus);
    }
  };

  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>
      <div className="column-content">
        {columnTasks.map(task => (
          <div key={task.id} className="task-wrapper">
            <Task 
              task={task} 
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
            <div className="move-buttons">
              {status !== 'todo' && (
                <button 
                  onClick={() => moveTask(task.id, 'prev')}
                  className="btn-move"
                >
                  ← Voltar
                </button>
              )}
              {status !== 'done' && (
                <button 
                  onClick={() => moveTask(task.id, 'next')}
                  className="btn-move"
                >
                  Avançar →
                </button>
              )}
            </div>
          </div>
        ))}
        <TaskForm onCreateTask={onCreateTask} status={status} />
      </div>
      <div className="column-footer">
        {columnTasks.length} {columnTasks.length === 1 ? 'tarefa' : 'tarefas'}
      </div>
    </div>
  );
}

export default Column;