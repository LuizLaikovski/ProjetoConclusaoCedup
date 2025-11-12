package com.projetoconclusaocedup.controller;

import com.projetoconclusaocedup.dto.BookAuthorsDTO;
import com.projetoconclusaocedup.service.AuthorService;
import com.projetoconclusaocedup.service.BookService;
import com.projetoconclusaocedup.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/book")
@AllArgsConstructor
public class BookAllController {
    private BookService bookService;

    @PostMapping("/createAll")
    public ResponseEntity<?> createAll(@RequestBody List<BookAuthorsDTO> bookAuthors){
        try {
            return ResponseEntity.ok(bookService.createAll(bookAuthors));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
