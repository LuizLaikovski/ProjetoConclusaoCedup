package cedup.tcc.TCC_Cedup_DS302.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "livro")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_livro;
    @NotBlank
    private String titulo;
    private String genero;
    private String descricao;
    @NotBlank
    private Integer num_paginas;
}
