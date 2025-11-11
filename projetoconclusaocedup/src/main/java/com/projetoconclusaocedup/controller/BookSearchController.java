package com.projetoconclusaocedup.controller;

import com.projetoconclusaocedup.dto.BookSearchDTO;
import com.projetoconclusaocedup.model.Book;
import com.projetoconclusaocedup.model.Image;
import com.projetoconclusaocedup.service.BookService;
import com.projetoconclusaocedup.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/book")
@AllArgsConstructor
public class BookSearchController {
    private final BookService bookService;
    private final ImageService imageService;

    @GetMapping("/q={query}")
    public ResponseEntity<?> getSearch(@PathVariable String query){
        try {
            List<Book> books = bookService.findByTitle(query);
            List<BookSearchDTO> bookSearchDTOS = new ArrayList<>();

            if(books != null && !books.isEmpty()){
                for(Book book : books){
                    Image image = imageService.find(book.getImage());

                    bookSearchDTOS.add(new BookSearchDTO(book.getPath(), book.getTitle(), image));
                }
            }

            return ResponseEntity.ok(bookSearchDTOS);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/catalog")
    public ResponseEntity<?> getAll(){
        try {
            List<Book> books = bookService.getAll();
            List<BookSearchDTO> bookSearchDTOS = new ArrayList<>();

            if(books != null && !books.isEmpty()){
                for(Book book : books){
                    Image image = imageService.find(book.getImage());

                    bookSearchDTOS.add(new BookSearchDTO(book.getPath(), book.getTitle(), image));
                }
            }

            return ResponseEntity.ok(bookSearchDTOS);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
