import { useState, useRef, useEffect } from "react";
import "./ModalConfirmacao.css";

export default function ModalConfirmacao({ login, visible, onConfirm, onClose }) {
  const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  // Limpar código quando modal abrir
  useEffect(() => {
    if (visible) {
      setCodigo(["", "", "", "", "", ""]);
      // Focar no primeiro input após um pequeno delay
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  }, [visible]);

  const handleInputChange = (index, value) => {
    // Permitir apenas números
    if (!/^\d*$/.test(value)) return;

    const newCodigo = [...codigo];
    newCodigo[index] = value.slice(-1); // Pegar apenas o último dígito

    setCodigo(newCodigo);

    // Mover para o próximo input se um dígito foi inserido
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace: limpar campo atual e voltar para o anterior
    if (e.key === 'Backspace' && !codigo[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Enter: tentar confirmar se todos os campos estão preenchidos
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    
    if (pastedData.length > 0) {
      const newCodigo = [...codigo];
      for (let i = 0; i < 6; i++) {
        newCodigo[i] = pastedData[i] || "";
      }
      setCodigo(newCodigo);
      
      // Focar no próximo campo vazio ou no último
      const nextEmptyIndex = newCodigo.findIndex(digit => digit === "");
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
    }
  };

  async function handleConfirm() {
    const codigoCompleto = codigo.join("");
    
    if (codigoCompleto.length !== 6) {
      alert("Por favor, insira o código de confirmação completo.");
      return;
    }

    setLoading(true);
    
    try {
      await onConfirm(codigoCompleto);
      setCodigo(["", "", "", "", "", ""]);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // Erro será tratado pelo componente pai
    } finally {
      setLoading(false);
    }
  }

  const handleClose = () => {
    setCodigo(["", "", "", "", "", ""]);
    onClose();
  };

  const isCodeComplete = codigo.every(digit => digit !== "");

  if (!visible) return null;

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose}>
          ✕
        </button>

        <div className="modal-header">
          <div className="modal-icon">
            📧
          </div>
          <h2 className="modal-title">Confirmação de Email</h2>
          <p className="modal-description">
            Enviamos um código de 6 dígitos para o email do usuário{' '}
            <strong>{login}</strong>. Digite o código abaixo para confirmar:
          </p>
        </div>

        <div className="codigo-container">
          <label className="codigo-label">
            Digite o código de confirmação:
          </label>
          
          <div className="codigo-inputs">
            {codigo.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`codigo-input ${digit ? 'filled' : ''}`}
                disabled={loading}
              />
            ))}
          </div>
          
          <p className="codigo-hint">
            Cole o código completo ou digite dígito por dígito
          </p>
        </div>

        <div className="modal-actions">
          <button 
            className="btn-cancel" 
            onClick={handleClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="btn-confirm"
            onClick={handleConfirm}
            disabled={!isCodeComplete || loading}
          >
            {loading ? (
              <>
                ⏳ Confirmando...
              </>
            ) : (
              <>
                ✅ Confirmar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}