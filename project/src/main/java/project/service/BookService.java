package project.service;

import project.entity.Book;
import project.repository.BookRepository;

import java.util.List;

@org.springframework.stereotype.Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book create(Book book){
        try {
            return bookRepository.save(book);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Book> listAll(){
        return bookRepository.findAll();
    }
}
