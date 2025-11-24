package com.projetoconclusaocedup.service;

import com.projetoconclusaocedup.dto.BookAuthorsDTO;
import com.projetoconclusaocedup.dto.BookSearchDTO;
import com.projetoconclusaocedup.model.Author;
import com.projetoconclusaocedup.model.Image;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.projetoconclusaocedup.model.Book;
import com.projetoconclusaocedup.repository.BookRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final ImageService imageService;
    private final AuthorService authorService;

    public Book create(Book book){
        try {
            if(book.getTitle() != null && !book.getTitle().trim().isBlank()){
                book.setTitle(book.getTitle().trim());
            }
            if(book.getPath() != null && !book.getPath().trim().isBlank()){
                book.setPath(book.getPath().trim());
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
            if(book.getAuthors() != null && !book.getAuthors().isEmpty()){
                book.setAuthors(book.getAuthors());
            }
            if(book.getImage() != null){
                book.setImage(book.getImage());
            }
            if(book.getArchive() != null){
                book.setArchive(book.getArchive());
            }

            return bookRepository.save(book);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public BookAuthorsDTO createWithAuthors(BookAuthorsDTO bookAuthorsDTO){
        Book newBook = create(bookAuthorsDTO.getBook());
        Image newBookImage = imageService.create(bookAuthorsDTO.getBook().getImage());
        List<Author> newAuthors = new ArrayList<>();

        newBook.setImage(newBookImage);

        for(Author author : bookAuthorsDTO.getAuthors()){
            Author newAuthor = authorService.create(author);
            newBook.getAuthors().add(newAuthor.getId());
            newAuthor.getBooks().add(newBook.getId());
            authorService.update(newAuthor.getId(), newAuthor);
            newAuthors.add(newAuthor);
        }

        update(newBook.getId(), newBook);

        return new BookAuthorsDTO(newBook, newAuthors);
    }

    public List<BookAuthorsDTO> createAll(List<BookAuthorsDTO> bookAuthors){
        try {
            List<BookAuthorsDTO> newBookAuthorsDTOS = new ArrayList<>();
            for(BookAuthorsDTO bookAuthorsDTO : bookAuthors){
                newBookAuthorsDTOS.add(createWithAuthors(bookAuthorsDTO));
            }

            return newBookAuthorsDTOS;
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<BookSearchDTO> getAll(){
        try {
            List<Book> books = bookRepository.findAll();
            List<BookSearchDTO> bookSearchDTOS = new ArrayList<>();

            if(!books.isEmpty()){
                for(Book book : books){
                    Image image = book.getImage();

                    bookSearchDTOS.add(new BookSearchDTO(book.getId(), book.getPath(), book.getTitle(), image));
                }
            }

            return bookSearchDTOS;
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public Book get(String id){
        try {
            return bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Livro de id: "+id+" não encontrado"));
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<BookSearchDTO> findAllByPath(String query){
        try {
            List<Book> books = bookRepository.searchByPath(query);
            List<BookSearchDTO> bookSearchDTOS = new ArrayList<>();

            if(books != null && !books.isEmpty()){
                for(Book book : books){
                    Image image = book.getImage();

                    bookSearchDTOS.add(new BookSearchDTO(book.getId(), book.getPath(), book.getTitle(), image));
                }
            }

            return bookSearchDTOS;
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public BookAuthorsDTO getByPath(String query){
        try {
            Book book = bookRepository.getByPath(query);
            List<Author> authors = new ArrayList<>();

            for(String idAuthor : book.getAuthors()){
                Author author = authorService.get(idAuthor);
                authors.add(author);
            }

            return new BookAuthorsDTO(book, authors);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void deleteById(String id){
        try {
            Book book = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Livro de id: "+id+" não encontrado"));

            bookRepository.delete(book);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public Book update(String id, Book book){
        try {
            Book bookUpdated = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("livro de id:"+id+" não encontrado!"));

            if(book.getTitle() != null && !book.getTitle().trim().isBlank()){
                bookUpdated.setTitle(book.getTitle().trim());
            }
            if(book.getPath() != null && !book.getPath().trim().isBlank()){
                bookUpdated.setPath(book.getPath().trim());
            }
            if(book.getGrades() != null){
                bookUpdated.setGrades(book.getGrades());
            }
            if(book.getRating() != null){
                bookUpdated.setRating(book.getRating());
            }
            if(book.getNumPages() != null && book.getNumPages() > 0){
                bookUpdated.setNumPages(book.getNumPages());
            }
            if(book.getYearPublished() != null && !book.getYearPublished().isAfter(LocalDate.now())){
                bookUpdated.setYearPublished(book.getYearPublished());
            }
            if(book.getDescription() != null && !book.getDescription().trim().isBlank()){
                bookUpdated.setDescription(book.getDescription().trim());
            }
            if(book.getAuthors() != null && !book.getAuthors().isEmpty()){
                bookUpdated.setAuthors(book.getAuthors());
            }
            if(book.getImage() != null){
                bookUpdated.setImage(book.getImage());
            }
            if(book.getArchive() != null){
                bookUpdated.setArchive(book.getArchive());
            }

            return bookRepository.save(bookUpdated);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public Book rating(String idBook, Double grade){
        try {
            Book book = get(idBook);

            if(grade != null && (grade <= 5 || grade >= 0)){
                book.getGrades().add(grade);
                Double sumGrades = 0.0;

                for(Double grades : book.getGrades()){
                    sumGrades += grades;
                }

                double bookRating = sumGrades / book.getGrades().size();

                book.setRating(String.format("%.2f", bookRating).replace(",", "."));
            }

            return update(book.getId(), book);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
