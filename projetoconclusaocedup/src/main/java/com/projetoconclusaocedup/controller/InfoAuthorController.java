package com.projetoconclusaocedup.controller;

import com.projetoconclusaocedup.dto.AuthorBooksDTO;
import com.projetoconclusaocedup.model.Author;
import com.projetoconclusaocedup.model.Book;
import com.projetoconclusaocedup.model.Image;
import com.projetoconclusaocedup.service.AuthorService;
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
@RequestMapping("/author")
@AllArgsConstructor
public class InfoAuthorController {
    private final AuthorService authorService;
    private final BookService bookService;
    private final ImageService imageService;

    @GetMapping("/{path}")
    public ResponseEntity<?> get(@PathVariable String path){
        try {
            Author author = authorService.getByPath(path);
            List<Book> books = new ArrayList<>();
            Image imageBook = null;
            Image imageAuthor = null;

            if(author.getBooks() != null && !author.getBooks().isEmpty()){
                for(String idBook : author.getBooks()){
                    books.add(bookService.get(idBook));
                }
                for(Book book : books){
                    imageBook = imageService.find(book.getImage());
                }
            }
            if(author.getImage() != null && !author.getImage().trim().isBlank()){
                imageAuthor = imageService.find(author.getImage());
            }

            AuthorBooksDTO authorBooksDTO = new AuthorBooksDTO(author, books, imageBook, imageAuthor);

            return ResponseEntity.ok(authorBooksDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
