package com.projetoconclusaocedup.controller;

import com.projetoconclusaocedup.dto.BookAuthorsDTO;
import com.projetoconclusaocedup.dto.RateBookDTO;
import com.projetoconclusaocedup.model.Book;
import com.projetoconclusaocedup.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book")
@AllArgsConstructor
public class BookController {
    private final BookService bookService;

    @PostMapping("/createAll")
    public ResponseEntity<?> createAll(@RequestBody List<BookAuthorsDTO> bookAuthors){
        try {
            return ResponseEntity.ok(bookService.createAll(bookAuthors));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody BookAuthorsDTO bookAuthorsDTO){
        try {
            return ResponseEntity.ok(bookService.createWithAuthors(bookAuthorsDTO));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/edit")
    public ResponseEntity<?> edit(@RequestBody Book book){
        try {
            return ResponseEntity.ok(bookService.update(book.getId(), book));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/b={id}")
    public ResponseEntity<?> deleteById(@PathVariable String id){
        try {
            bookService.deleteById(id);

            String msg = "Livro de id: "+id+" deletado com sucesso";
            return ResponseEntity.ok(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/rate")
    public ResponseEntity<?> rateBook(@RequestBody RateBookDTO rateBookDTO){
        try {
            return ResponseEntity.ok(bookService.rating(rateBookDTO.getIdBook(), rateBookDTO.getGrade()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
