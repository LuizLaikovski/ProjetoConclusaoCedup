package cedup.tcc.TCC_Cedup_DS302.service;

import cedup.tcc.TCC_Cedup_DS302.model.Usuario;
import cedup.tcc.TCC_Cedup_DS302.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioService {

    public final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public Usuario create(Usuario usuario){
        return repository.save(usuario);
    }

    public List<Usuario> list(){
        return repository.findAll();
    }

    public void deleteById(Long id){
        repository.deleteById(id);
    }

    @Transactional
    public Usuario update(Usuario usuario, Long id){
        Usuario usuarioAtualizado = repository.findById(id).orElseThrow(() -> new RuntimeException("O id: "+id+" não foi encontrado"));

        usuarioAtualizado.setNome(usuario.getNome());
        usuarioAtualizado.setEmail(usuario.getEmail());
        usuarioAtualizado.setCpf(usuario.getCpf());
        usuarioAtualizado.setTipoUser(usuario.getTipoUser());
        usuarioAtualizado.setSenha(usuario.getSenha());

        return repository.save(usuarioAtualizado);
    }
}
