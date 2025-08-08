import { useState } from "react";
import "./ModalConfirmacao.css";

export default function ModalConfirmacao({ login , visible, onConfirm, onClose }) {
    const [codigo, setCodigo] = useState("");
    
    if(!visible) return null;

    function handleConfirm() {
    if (codigo.trim() === "") {
      alert("Por favor, insira o código de confirmação.");
      return;
    }
    onConfirm(codigo);
    setCodigo("");
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Confirmação de Email</h2>
        <p>
          Usuário <strong>{login}</strong>, verifique seu email e digite o código
          de confirmação abaixo:
        </p>
        <input
          type="text"
          placeholder="Código de confirmação"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
        <button onClick={handleConfirm}>Confirmar</button>
        <button className="btn-cancel" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}