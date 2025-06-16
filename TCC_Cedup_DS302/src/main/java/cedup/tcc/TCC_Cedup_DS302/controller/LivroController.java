package cedup.tcc.TCC_Cedup_DS302.controller;

import cedup.tcc.TCC_Cedup_DS302.model.Livro;
import cedup.tcc.TCC_Cedup_DS302.service.LivroService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@org.springframework.stereotype.Controller
@RequestMapping("/livro")
public class LivroController {

    public final LivroService service;

    public LivroController(LivroService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public String create(@ModelAttribute Livro livro, Model model){
        Livro new_livro = service.create(livro);

        model.addAttribute("livro", new_livro);

        return "livro/response_create_livro";
    }

    @GetMapping("/list")
    public String list(Model model){
        model.addAttribute("livros", service.list());

        return "livro/list_livro";
    }
}
