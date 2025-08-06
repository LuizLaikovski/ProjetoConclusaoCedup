package cybrary.project.controller;

import cybrary.project.entity.Book;
import cybrary.project.service.BookService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/book")
@org.springframework.stereotype.Controller
public class BookController {

    public final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping()
    public String create(@Validated @RequestBody Book book){
        bookService.create(book);
        return "";
    }

    @GetMapping()
    public String list(){
        return "";
    }

    @PutMapping()
    public String update(){
        return "";
    }

    @DeleteMapping()
    public String deleteById(){
        return "";
    }
}
