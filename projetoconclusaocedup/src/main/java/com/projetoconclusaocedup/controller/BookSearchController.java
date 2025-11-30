package com.projetoconclusaocedup.controller;

import com.projetoconclusaocedup.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/book")
@AllArgsConstructor
public class BookSearchController {
    private final BookService bookService;


    @GetMapping("/q={query}")
    public ResponseEntity<?> getSearch(@PathVariable String query){
        try {
            return ResponseEntity.ok(bookService.findAllByPath(query));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/catalog")
    public ResponseEntity<?> getCatalog(){
        try {
            return ResponseEntity.ok(bookService.getAll());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{query}")
    public ResponseEntity<?> getOne(@PathVariable String query){
        try {
            return ResponseEntity.ok(bookService.getByPath(query));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
