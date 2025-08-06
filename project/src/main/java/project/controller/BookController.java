package project.controller;

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
    public String create(@Validated @RequestBody Book book){
        bookService.create(book);
        return "";
    }

    @GetMapping()
    public List<Book> list(){
        List<Book> list = bookService.listAll();
        return list;
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
