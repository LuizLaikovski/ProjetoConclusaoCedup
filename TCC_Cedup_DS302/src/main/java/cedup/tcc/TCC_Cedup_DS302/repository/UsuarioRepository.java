package cedup.tcc.TCC_Cedup_DS302.repository;

import cedup.tcc.TCC_Cedup_DS302.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
