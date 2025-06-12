package cedup.tcc.TCC_Cedup_DS302.repository;

import cedup.tcc.TCC_Cedup_DS302.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroRepository extends JpaRepository<Livro, Long> {
}
