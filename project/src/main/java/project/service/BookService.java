package cybrary.project.service;

import cybrary.project.entity.Book;
import cybrary.project.repository.BookRepository;

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
}
