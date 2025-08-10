package project.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import project.entity.Book;
import project.repository.BookRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookService {
    private final BookRepository repository;

    public BookService(BookRepository repository) {
        this.repository = repository;
    }

    public Book create(Book book){
        try {
            if(book.getBook_title() != null && !book.getBook_title().trim().isBlank()){
                book.setBook_title(book.getBook_title().trim());
            }
            if(book.getBook_rating() != null && (book.getBook_rating() >= 5 || book.getBook_rating() >= 0)){
                book.setBook_rating(book.getBook_rating());
            }
            if(book.getBook_quant_pages() != null && book.getBook_quant_pages() > 0){
                book.setBook_quant_pages(book.getBook_quant_pages());
            }
            if(book.getBook_date_published() != null && !book.getBook_date_published().isAfter(LocalDate.now())){
                book.setBook_date_published(book.getBook_date_published());
            }
            if(book.getBook_description() != null && !book.getBook_description().trim().isBlank()){
                book.setBook_description(book.getBook_description().trim());
            }
            return repository.save(book);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<Book> list_all(){
        try {
            return repository.findAll();
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public Book update(Long id, Book book){
        try {
            Book book_updated = repository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Livro com id: "+id+" não encontrado!"));

            if(book.getBook_title() != null && !book.getBook_title().trim().isBlank()){
                book_updated.setBook_title(book.getBook_title().trim());
            }
            if(book.getBook_rating() != null && (book.getBook_rating() >= 5 || book.getBook_rating() >= 0)){
                book_updated.setBook_rating(book.getBook_rating());
            }
            if(book.getBook_quant_pages() != null && book.getBook_quant_pages() > 0){
                book_updated.setBook_quant_pages(book.getBook_quant_pages());
            }
            if(book_updated.getBook_date_published() != null && !book.getBook_date_published().isAfter(LocalDate.now())){
                book_updated.setBook_date_published(book.getBook_date_published());
            }
            if(book_updated.getBook_description() != null && !book_updated.getBook_description().trim().isBlank()){
                book_updated.setBook_description(book.getBook_description().trim());
            }
            return repository.save(book_updated);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void delete_by_id(Long id){
        try {
            Book delete_book = repository.findById(id)
                            .orElseThrow(() -> new RuntimeException("Livro com id: "+id+" não encontrado!"));
            repository.delete(delete_book);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
