import React, { useState } from 'react';
import styles from './TodoList.module.css';

function TodoList() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const text = input.trim();
    if (!text) return;
    setItems([...items, { id: Date.now(), text, done: false }]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  const toggleItem = (id) => {
    setItems(items.map(it => it.id === id ? { ...it, done: !it.done } : it));
  };

  const deleteItem = (id) => {
    setItems(items.filter(it => it.id !== id));
  };

  return (
    <div>
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          placeholder="Nova tarefa..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.btnPrimary} onClick={handleAdd}>
          Adicionar
        </button>
      </div>

      <div className={styles.list}>
        {items.length === 0 ? (
          <p className={styles.empty}>Nenhuma tarefa ainda.</p>
        ) : (
          items.map(item => (
            <div key={item.id} className={`${styles.item} ${item.done ? styles.done : ''}`}>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleItem(item.id)}
              />
              <span>{item.text}</span>
              <button className={styles.deleteBtn} onClick={() => deleteItem(item.id)}>
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;
