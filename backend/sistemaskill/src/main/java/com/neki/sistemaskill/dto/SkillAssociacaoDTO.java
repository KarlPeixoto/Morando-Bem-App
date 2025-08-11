package com.neki.sistemaskill.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class SkillAssociacaoDTO {

    @NotNull(message="ID da Skill é obrigatório")
    private Long skillId;

    @NotNull(message = "Level é obrigatório")
    @Min(value = 1, message = "Level deve ser entre 1 e 10")
    @Max(value = 10, message = "Level deve ser entre 1 e 10")
    private Integer level;

    public SkillAssociacaoDTO() {
    }

    public SkillAssociacaoDTO(@NotNull(message = "ID da Skill é obrigatório") Long skillId,
            @NotNull(message = "Level é obrigatório") @Min(value = 1, message = "Level deve ser entre 1 e 10") @Max(value = 10, message = "Level deve ser entre 1 e 10") Integer level) {
        this.skillId = skillId;
        this.level = level;
    }

    public Long getSkillId() {
        return skillId;
    }

    public void setSkillId(Long skillId) {
        this.skillId = skillId;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    
}
