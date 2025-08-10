package project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project.entity.Author;
import project.service.AuthorService;

import java.util.List;

@RequestMapping("/author")
@Controller
public class AuthorController {
    private final AuthorService service;

    public AuthorController(AuthorService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Author> create(@Validated @RequestBody Author author){
        try {
            Author new_author = service.create(author);
            return ResponseEntity.ok(new_author);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Author>> list_all(){
        try {
            return ResponseEntity.ok(service.list_all());
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Author author){
        try {
            Author author_updated = service.update(id, author);
            return ResponseEntity.ok(author_updated);
        } catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch(Exception e){
            return ResponseEntity.internalServerError().body("Erro ao atualizar livro");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete_by_id(@PathVariable Long id){
        try {
            service.delete_by_id(id);

            return ResponseEntity.ok("O author de id: "+id+" foi deletado com sucesso");
        } catch(RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }
}
