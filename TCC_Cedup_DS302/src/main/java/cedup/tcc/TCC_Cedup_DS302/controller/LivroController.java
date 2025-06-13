package cedup.tcc.TCC_Cedup_DS302.controller;

import cedup.tcc.TCC_Cedup_DS302.model.Livro;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@org.springframework.stereotype.Controller
@RequestMapping("/usuario")
public class LivroController {

    @PostMapping("/")
    public String create(@ModelAttribute Livro livro){
        return ""; //fazer uma pag simples de html
    }
}
