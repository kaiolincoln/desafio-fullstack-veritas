import React from 'react';
import Board from './components/Board';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>📊 Kanban - Veritas</h1>
        <p>Gerencie suas tarefas de forma simples e eficiente</p>
      </header>
      <Board />
    </div>
  );
}

export default App;