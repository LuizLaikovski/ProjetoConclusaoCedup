package project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import project.entity.Book;
import project.entity.Image;
import project.service.ImageService;

import java.util.List;

@RequestMapping("/image")
@Controller
public class ImageController {

    private final ImageService service;

    public ImageController(ImageService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Image> create(@RequestBody @Validated Image image){
        try {
            Image new_image = service.create(image);

            return ResponseEntity.ok(new_image);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Image>> list_all(){
        try {
            return ResponseEntity.ok(service.list_all());
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Image image){
        try {
            Image image_updated = service.update(id, image);
            return ResponseEntity.ok(image_updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao atualizar a imagem");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete_by_id(@PathVariable Long id){
        try {
            service.delete_by_id(id);
            return ResponseEntity.ok("Imagem de id: "+id+" deletada com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
