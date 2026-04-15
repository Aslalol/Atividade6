import React, { useState } from 'react';
import styles from './BuscadorCEP.module.css';

function BuscadorCEP() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMask = (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5);
    setInput(v);
  };

  const handleSearch = async () => {
    const raw = input.replace(/\D/g, '');
    if (raw.length !== 8) {
      setError('Digite os 8 dígitos do CEP.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
      const data = await res.json();
      if (data.erro) {
        setError('CEP não encontrado.');
      } else {
        setResult(data);
      }
    } catch {
      setError('Erro ao buscar o CEP. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="00000-000"
          maxLength={9}
          value={input}
          onChange={handleMask}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          className={styles.btnPrimary}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      {result && (
        <div className={styles.addressCard}>
          <div className={styles.mainInfo}>
            <h4>{result.logradouro || 'Logradouro não informado'}</h4>
            {result.complemento && (
              <span className={styles.complemento}>({result.complemento})</span>
            )}
          </div>

          <div className={styles.secondaryInfo}>
            <p>{result.bairro || 'Bairro não informado'}</p>
            <p>{result.localidade} - {result.uf}</p>
          </div>

          <div className={styles.metaInfo}>
            <span className={styles.badge}>CEP: {result.cep}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuscadorCEP;