package com.projetoconclusaocedup.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.projetoconclusaocedup.model.Book;
import com.projetoconclusaocedup.repository.BookRepository;

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
            if(book.getPath() != null && !book.getPath().trim().isBlank()){
                book.setPath(book.getPath().trim());
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
            if(book.getAuthors() != null && !book.getAuthors().isEmpty()){
                book.setAuthors(book.getAuthors());
            }
            if(book.getImages() != null && !book.getImages().isEmpty()){
                book.setImages(book.getImages());
            }
            if(book.getArchive() != null){
                book.setArchive(book.getArchive());
            }

            return bookRepository.save(book);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Book> getAll(){
        try {
            return bookRepository.findAll();
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public Book get(String id){
        try {
            return bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Livro de id: "+id+" não encontrado"));
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteById(String id){
        try {
            Book book = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Livro de id: "+id+" não encontrado"));

            bookRepository.delete(book);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
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
            if(book.getRating() != null && (book.getRating() >= 5 || book.getRating() >= 0)){
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
            if(book.getImages() != null && !book.getImages().isEmpty()){
                bookUpdated.setImages(book.getImages());
            }
            if(book.getArchive() != null){
                bookUpdated.setArchive(book.getArchive());
            }

            return bookRepository.save(bookUpdated);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
