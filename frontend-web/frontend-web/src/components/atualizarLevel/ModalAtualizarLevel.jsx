import { useState, useEffect } from "react"
import "./ModalAtualizarLevel.css"

export default function ModalAtualizarLevel({ visible, associacaoId, levelAtual, onUpdate, onClose, api }) {
  const [level, setLevel] = useState(levelAtual || 1)

  useEffect(() => {
    setLevel(levelAtual || 1)
  }, [levelAtual])

  if (!visible) return null

  function handleAtualizar() {
    if (level < 1 || level > 10) {
      alert("Nível deve estar entre 1 e 10.")
      return
    }

    api
      .put(`/usuario-skills/${associacaoId}?level=${level}`)
      .then(() => {
        onUpdate()
      })
      .catch(() => alert("Erro ao atualizar nível."))
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Atualizar Nível da Skill</h2>

        <div className="level-slider-container">
          <label className="level-label">Nível: {level}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="level-slider"
          />
          <div className="level-markers">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <span key={num} className={`marker ${level === num ? "active" : ""}`}>
                {num}
              </span>
            ))}
          </div>
        </div>

        <button onClick={handleAtualizar}>Atualizar</button>
        <button className="btn-cancel" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  )
}
