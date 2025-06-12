package tcc.cedup.TCC_Cedup_DS302.service;

import org.springframework.stereotype.Service;
import tcc.cedup.TCC_Cedup_DS302.repository.LivroRepository;

@Service
public class LivroService {
    public final LivroRepository livroRepository;

    public LivroService(LivroRepository livroRepository) {
        this.livroRepository = livroRepository;
    }
}
