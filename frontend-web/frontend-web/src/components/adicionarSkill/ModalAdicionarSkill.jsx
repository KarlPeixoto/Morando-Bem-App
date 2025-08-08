import React, { useEffect, useState } from "react";
import "./ModalAdicionarSkill.css";

export default function ModalAdicionarSkill({ visible, usuarioId, onAdd, onClose, api }) {
  const [skills, setSkills] = useState([]);
  const [skillSelecionada, setSkillSelecionada] = useState("");
  const [skillPersonalizada, setSkillPersonalizada] = useState("");

  useEffect(() => {
    if (visible) {
      api.get("/skills")
        .then((res) => setSkills(res.data))
        .catch(() => alert("Erro ao carregar skills disponíveis"));
    }
  }, [visible, api]);

  function handleAdicionar() {
    if (skillSelecionada === "" && skillPersonalizada.trim() === "") {
      alert("Selecione uma skill ou crie uma personalizada.");
      return;
    }

    if (skillPersonalizada.trim() !== "") {
      // Criar skill personalizada e associar
      api.post("/skills", { nome: skillPersonalizada })
        .then((res) => associarSkill(res.data.id))
        .catch(() => alert("Erro ao criar skill personalizada"));
    } else {
      associarSkill(skillSelecionada);
    }
  }

  function associarSkill(skillId) {
    api.post(`/usuario-skills/usuario/${usuarioId}`, { skillId, level: 1 })
      .then(() => {
        onAdd();
        setSkillSelecionada("");
        setSkillPersonalizada("");
      })
      .catch(() => alert("Erro ao associar skill ao usuário"));
  }

  if (!visible) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Adicionar Skill</h2>
        <select
          value={skillSelecionada}
          onChange={(e) => setSkillSelecionada(e.target.value)}
        >
          <option value="">-- Selecione uma skill --</option>
          {skills.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.nome}
            </option>
          ))}
        </select>
        <p>Ou crie uma skill personalizada:</p>
        <input
          type="text"
          placeholder="Nome da skill personalizada"
          value={skillPersonalizada}
          onChange={(e) => setSkillPersonalizada(e.target.value)}
        />
        <button onClick={handleAdicionar}>Adicionar</button>
        <button className="btn-cancel" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
