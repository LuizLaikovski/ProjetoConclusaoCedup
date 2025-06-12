package tcc.cedup.TCC_Cedup_DS302.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "livro")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Livro {
    private Long idLivro;
    private String titulo;
    private String genero;
    private String descricao;
    private int numPaginas;
}
