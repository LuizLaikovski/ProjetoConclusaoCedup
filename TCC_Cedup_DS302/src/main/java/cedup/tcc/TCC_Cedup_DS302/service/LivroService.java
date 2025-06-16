package cedup.tcc.TCC_Cedup_DS302.service;

import cedup.tcc.TCC_Cedup_DS302.model.Livro;
import cedup.tcc.TCC_Cedup_DS302.repository.LivroRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LivroService {
    public final LivroRepository repository;

    public LivroService(LivroRepository repository) {
        this.repository = repository;
    }

    public Livro create(Livro livro){
        return repository.save(livro);
    }

    public List<Livro> list(){
        return repository.findAll();
    }

    public void deleteById(Long id){
        repository.deleteById(id);
    }

    @Transactional
    public Livro update(Livro livro, Long id){
        Livro livroAtualizado = repository.findById(id).orElseThrow(() -> new RuntimeException("O id: "+id+" não foi encontrado"));

        livroAtualizado.setTitulo(livro.getTitulo());
        livroAtualizado.setGenero(livro.getGenero());
        livroAtualizado.setDescricao(livro.getDescricao());
        livroAtualizado.setNum_paginas(livro.getNum_paginas());

        return repository.save(livroAtualizado);
    }
}
