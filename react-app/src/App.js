import React, { useState } from 'react';
import styles from './App.module.css';


import TodoList from './components/TodoList/TodoList';
import Contador from './components/Contador/Contador';
import JogoDaVelha from './components/JogoDaVelha/JogoDaVelha';
import Calculadora from './components/Calculadora/Calculadora';
import BuscadorCEP from './components/BuscadorCEP/BuscadorCEP';

const tabs = [
  { id: 'todo',     label: 'To-Do List' },
  { id: 'contador', label: 'Contador de Cliques' },
  { id: 'velha',    label: 'Jogo da Velha' },
  { id: 'calc',     label: 'Calculadora' },
  { id: 'cep',      label: 'Buscador de CEP' },
];

function App() {
  const [active, setActive] = useState('todo');

  const renderPanel = () => {
    switch (active) {
      case 'todo':     return <TodoList />;
      case 'contador': return <Contador />;
      case 'velha':    return <JogoDaVelha />;
      case 'calc':     return <Calculadora />;
      case 'cep':      return <BuscadorCEP />;
      default:         return null;
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>Asla</div>
        <nav className={styles.nav}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`${styles.navBtn} ${active === tab.id ? styles.active : ''}`}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className={styles.main}>
        {renderPanel()}
      </main>
    </div>
  );
}

export default App;
