package project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.model.dto.BookAuthorDTO;
import project.service.AuthorService;
import project.service.BookService;

@RestController
@RequestMapping("/book/author")
public class BookAuthorController {
    private final BookService bookService;
    private final AuthorService authorService;

    public BookAuthorController(BookService bookService, AuthorService authorService) {
        this.bookService = bookService;
        this.authorService = authorService;
    }

    @PostMapping
    public ResponseEntity<BookAuthorDTO> create(@RequestBody BookAuthorDTO bookAuthorDTO){
        try {
            BookAuthorDTO newBookAuthor = new BookAuthorDTO(bookService.create(bookAuthorDTO.getBook()),
                                                        authorService.create(bookAuthorDTO.getAuthor()));
            return ResponseEntity.ok().body(newBookAuthor);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
