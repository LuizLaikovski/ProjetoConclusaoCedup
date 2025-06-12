package tcc.cedup.TCC_Cedup_DS302.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tcc.cedup.TCC_Cedup_DS302.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
