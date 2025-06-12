package tcc.cedup.TCC_Cedup_DS302.controller;

import tcc.cedup.TCC_Cedup_DS302.service.LivroService;

@org.springframework.stereotype.Controller
public class Controller {
    public final LivroService livroService;

    public Controller(LivroService livroService) {
        this.livroService = livroService;
    }

}
