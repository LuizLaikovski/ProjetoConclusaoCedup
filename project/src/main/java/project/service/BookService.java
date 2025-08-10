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
            if(book.getBook_title() != null && !book.getBook_title().trim().isEmpty()){
                book.setBook_title(book.getBook_title().trim());
            }
            if(book.getBook_rating() != null && (book.getBook_rating() >= 5 || book.getBook_rating() >= 0)){
                book.setBook_rating(book.getBook_rating());
            }
            if(book.getBook_quant_pages() != null && book.getBook_quant_pages() > 0){
                book.setBook_quant_pages(book.getBook_quant_pages());
            }

            return bookRepository.save(book);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Book> listAll(){
        try {
            if(bookRepository.findAll().isEmpty()){
                throw new RuntimeException();
            }
            return bookRepository.findAll();
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public Book update(Long id, Book book){
        try {
            Book book_updated = bookRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Livro com id: "+id+" não encontrado!"));
            if(book.getBook_title() != null && !book.getBook_title().trim().isEmpty()){
                book_updated.setBook_title(book.getBook_title().trim());
            }
            if(book.getBook_rating() != null && (book.getBook_rating() >= 5 || book.getBook_rating() >= 0)){
                book_updated.setBook_rating(book.getBook_rating());
            }
            if(book.getBook_quant_pages() != null && book.getBook_quant_pages() > 0){
                book_updated.setBook_quant_pages(book.getBook_quant_pages());
            }
            return bookRepository.save(book_updated);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void delete_by_id(Long id){
        try {
            Book delete_book = bookRepository.findById(id)
                            .orElseThrow(() -> new RuntimeException("Livro com id: "+id+" não encontrado!"));
            bookRepository.delete(delete_book);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
