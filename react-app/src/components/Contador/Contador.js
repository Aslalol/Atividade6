import React, { useState } from 'react';
import styles from './Contador.module.css';

function Contador() {
  const [count, setCount] = useState(0);
  const [bump, setBump] = useState(false);

  const increment = () => {
    setCount(c => c + 1);
    setBump(true);
    setTimeout(() => setBump(false), 120);
  };

  return (
    <div>
      <div className={styles.box}>
        <div className={`${styles.number} ${bump ? styles.bump : ''}`}>
          {count}
        </div>

        <div className={styles.btns}>
          <button className={styles.btnIcon} onClick={increment}>+</button>
        </div>
      </div>
    </div>
  );
}

export default Contador;