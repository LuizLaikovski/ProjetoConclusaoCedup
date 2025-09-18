package project.service;

import org.springframework.stereotype.Service;
import project.model.Book;
import project.repository.BookRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book create(Book book){
        try {
            if(book.getTitle() != null && !book.getTitle().trim().isBlank()){
                book.setTitle(book.getTitle().trim());
            }
            if(book.getRating() != null && (book.getRating() >= 5 || book.getRating() >= 0)){
                book.setRating(book.getRating());
            }
            if(book.getNumPages() != null && book.getNumPages() > 0){
                book.setNumPages(book.getNumPages());
            }
            if(book.getYearPublished() != null && !book.getYearPublished().isAfter(LocalDate.now())){
                book.setYearPublished(book.getYearPublished());
            }
            if(book.getDescription() != null && !book.getDescription().trim().isBlank()){
                book.setDescription(book.getDescription().trim());
            }

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

    public void deleteById(String id){
        try {
            bookRepository.deleteById(id);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public Book update(String id, Book book){
        try {
            Book newBook = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("livro de id:"+id+" não encontrado!"));

            if(book.getTitle() != null && !book.getTitle().trim().isBlank()){
                newBook.setTitle(book.getTitle().trim());
            }
            if(book.getRating() != null && (book.getRating() >= 5 || book.getRating() >= 0)){
                newBook.setRating(book.getRating());
            }
            if(book.getNumPages() != null && book.getNumPages() > 0){
                newBook.setNumPages(book.getNumPages());
            }
            if(book.getYearPublished() != null && !book.getYearPublished().isAfter(LocalDate.now())){
                newBook.setYearPublished(book.getYearPublished());
            }
            if(book.getDescription() != null && !book.getDescription().trim().isBlank()){
                newBook.setDescription(book.getDescription().trim());
            }

            return bookRepository.save(book);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

}
