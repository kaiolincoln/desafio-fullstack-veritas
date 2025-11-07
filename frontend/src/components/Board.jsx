import React, { useState, useEffect } from 'react';
import Column from './Column';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

function Board() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data || []);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar tarefas. Verifique se o backend está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([...tasks, newTask]);
    } catch (err) {
      alert('Erro ao criar tarefa');
      console.error(err);
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      const task = await updateTask(id, updatedTask);
      setTasks(tasks.map(t => t.id === id ? task : t));
    } catch (err) {
      alert('Erro ao atualizar tarefa');
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta tarefa?')) {
      try {
        await deleteTask(id);
        setTasks(tasks.filter(t => t.id !== id));
      } catch (err) {
        alert('Erro ao deletar tarefa');
        console.error(err);
      }
    }
  };

  const handleMoveTask = async (id, newStatus) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      await handleUpdateTask(id, { ...task, status: newStatus });
    }
  };

  if (loading) {
    return <div className="loading">Carregando tarefas...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="board">
      <Column
        title="📋 A Fazer"
        status="todo"
        tasks={tasks}
        onCreateTask={handleCreateTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        onMoveTask={handleMoveTask}
      />
      <Column
        title="🚧 Em Progresso"
        status="in_progress"
        tasks={tasks}
        onCreateTask={handleCreateTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        onMoveTask={handleMoveTask}
      />
      <Column
        title="✅ Concluídas"
        status="done"
        tasks={tasks}
        onCreateTask={handleCreateTask}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        onMoveTask={handleMoveTask}
      />
    </div>
  );
}

export default Board;