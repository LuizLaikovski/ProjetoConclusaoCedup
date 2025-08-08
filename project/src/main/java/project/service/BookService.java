package project.service;

import jakarta.transaction.Transactional;
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
        try {
            return bookRepository.findAll();
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public Book update(Long id, Book book){
        try {
            Book book_updated = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Livro com id: "
                                                                                            +id+" não encontrado!"));
            if(book.getBook_title() != null){
                book_updated.setBook_title(book.getBook_title());
            }
            if(book.getBook_rating() != null){
                book_updated.setBook_rating(book.getBook_rating());
            }
            if(book.getBook_quant_pages() != null){
                book_updated.setBook_quant_pages(book.getBook_quant_pages());
            }
//            book_updated.setBook_rating(book.getBook_rating());
//            book_updated.setBook_quant_pages(book.getBook_quant_pages());
            return bookRepository.save(book_updated);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void delete_by_id(Long id){
        try {
            bookRepository.deleteById(id);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
