package project.controller;

import org.springframework.http.ResponseEntity;
import project.entity.Book;
import project.service.BookService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/book")
@org.springframework.stereotype.Controller
public class BookController {

    public final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping()
    public ResponseEntity<Book> create(@Validated @RequestBody Book book){
        try {
            Book new_book = bookService.create(book);
            return ResponseEntity.ok(new_book);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping()
    public ResponseEntity<List<Book>> list(){
        try {
            return ResponseEntity.ok(bookService.listAll());
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Book book){
        try {
            Book book_updated = bookService.update(id, book);
            return ResponseEntity.ok(book_updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erro ao atualizar livro");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete_by_id(@PathVariable Long id){
        try {
            bookService.delete_by_id(id);

            return ResponseEntity.ok("O objeto de id: "+id+" foi deletado com sucesso");
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
