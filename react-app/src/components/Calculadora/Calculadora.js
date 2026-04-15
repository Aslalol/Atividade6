import React, { useState } from 'react';
import styles from './Calculadora.module.css';

const BUTTONS = [
  ['C', 'clr'], ['±', 'op'], ['%', 'op'], ['÷', 'op'],
  ['7', ''],    ['8', ''],   ['9', ''],   ['×', 'op'],
  ['4', ''],    ['5', ''],   ['6', ''],   ['−', 'op'],
  ['1', ''],    ['2', ''],   ['3', ''],   ['+', 'op'],
  ['0', 'span2'],            ['.', ''],   ['=', 'eq'],
];

function Calculadora() {
  const [display, setDisplay] = useState('0');
  const [expr, setExpr] = useState('');
  const [operand, setOperand] = useState(null);
  const [op, setOp] = useState(null);
  const [shouldReset, setShouldReset] = useState(false);

  const handleInput = (key) => {
    if (key === 'C') {
      setDisplay('0');
      setExpr('');
      setOperand(null);
      setOp(null);
      setShouldReset(false);
      return;
    }

    if (key === '=') {
      if (op === null || operand === null) return;
      const b = parseFloat(display);
      const ops = { '+': operand + b, '−': operand - b, '×': operand * b, '÷': operand / b };
      const result = ops[op];
      setExpr(`${operand} ${op} ${b} =`);
      setDisplay(String(parseFloat(result.toFixed(10))));
      setOperand(null);
      setOp(null);
      setShouldReset(true);
      return;
    }

    if (['+', '−', '×', '÷'].includes(key)) {
      const current = parseFloat(display);
      setOperand(current);
      setOp(key);
      setExpr(`${current} ${key}`);
      setShouldReset(true);
      return;
    }

    if (key === '±') {
      setDisplay(String(parseFloat(display) * -1));
      return;
    }

    if (key === '%') {
      setDisplay(String(parseFloat(display) / 100));
      return;
    }

    if (key === '.') {
      if (shouldReset) { setDisplay('0.'); setShouldReset(false); }
      else if (!display.includes('.')) setDisplay(display + '.');
      return;
    }

    // digit
    if (shouldReset || display === '0') {
      setDisplay(key);
      setShouldReset(false);
    } else {
      if (display.length < 12) setDisplay(display + key);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.display}>
          <div className={styles.expr}>{expr}</div>
          <div className={styles.value}>{display}</div>
        </div>

        <div className={styles.grid}>
          {BUTTONS.map(([label, type], i) => (
            <button
              key={i}
              className={[
                styles.btn,
                type === 'op'   ? styles.op   : '',
                type === 'eq'   ? styles.eq   : '',
                type === 'clr'  ? styles.clr  : '',
                type === 'span2'? styles.span2 : '',
              ].join(' ')}
              onClick={() => handleInput(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calculadora;
