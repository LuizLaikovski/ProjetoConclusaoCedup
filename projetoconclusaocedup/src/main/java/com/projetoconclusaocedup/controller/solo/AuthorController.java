//package project.controller.solo;
//
//import lombok.AllArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import project.model.Author;
//import project.service.AuthorService;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/author")
//@AllArgsConstructor
//public class AuthorController {
//    private final AuthorService authorService;
//
////    public AuthorController(AuthorService authorService) {
////        this.authorService = authorService;
////    }
//
//    @PostMapping
//    public ResponseEntity<Author> create(@RequestBody Author book){
//        try {
//            return ResponseEntity.ok().body(authorService.create(book));
//        } catch (RuntimeException e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Author>> getAll(){
//        try {
//            return ResponseEntity.ok(authorService.getAll());
//        } catch (RuntimeException e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Author> get(@PathVariable String id){
//        try {
//            return ResponseEntity.ok(authorService.get(id));
//        } catch (RuntimeException e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteById(@PathVariable String id){
//        try {
//            authorService.deleteById(id);
//
//            return ResponseEntity.ok().build();
//        } catch (RuntimeException e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<?> update(@PathVariable String id, @RequestBody Author book){
//        try {
//            return ResponseEntity.ok().body(authorService.update(id, book));
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.internalServerError().body("Erro ao atualizar autor");
//        }
//    }
//}
