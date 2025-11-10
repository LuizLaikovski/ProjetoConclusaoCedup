package com.projetoconclusaocedup.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.projetoconclusaocedup.dto.AuthorImagesDTO;
import com.projetoconclusaocedup.model.Author;
import com.projetoconclusaocedup.model.Book;
import com.projetoconclusaocedup.dto.BookAuthorsDTO;
import com.projetoconclusaocedup.model.Image;
import com.projetoconclusaocedup.service.AuthorService;
import com.projetoconclusaocedup.service.BookService;
import com.projetoconclusaocedup.service.ImageService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/book/all")
@AllArgsConstructor
public class AllInfoFromBookController {
    private final BookService bookService;
    private final AuthorService authorService;
    private final ImageService imageService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody BookAuthorsDTO bookAuthorsDTO){
        try {
            Book newBook = bookService.create(bookAuthorsDTO.getBook());
            List<Image> newBookImages = imageService.createAll(bookAuthorsDTO.getImagesBook());
            List<AuthorImagesDTO> newAuthorImages = bookAuthorsDTO.getAuthorsImages();

            for(Image image : newBookImages){
                newBook.getImages().add(image.getId());
            }

            for(AuthorImagesDTO authorImagesDTO : newAuthorImages){
                authorService.create(authorImagesDTO.getAuthor());
                imageService.createAll(authorImagesDTO.getImages());
                newBook.getAuthors().add(authorImagesDTO.getAuthor().getId());
                authorImagesDTO.getAuthor().getBooks().add(newBook.getId());
                for (Image image : authorImagesDTO.getImages()){
                    authorImagesDTO.getAuthor().getImages().add(image.getId());
                }
            }

            bookService.update(newBook.getId(), newBook);

            for(AuthorImagesDTO authorImagesDTO : newAuthorImages){
                authorService.update(authorImagesDTO.getAuthor().getId(), authorImagesDTO.getAuthor());
            }

            BookAuthorsDTO newBookAuthorsDTO = new BookAuthorsDTO(newBook, newBookImages, newAuthorImages);

            return ResponseEntity.ok(newBookAuthorsDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/createAll")
    public ResponseEntity<?> createAll(@RequestBody List<BookAuthorsDTO> bookAuthorsDTOS){
        try {
            List<BookAuthorsDTO> newBookAuthorsDTOS = new ArrayList<>();
            for(BookAuthorsDTO bookAuthorsDTO : bookAuthorsDTOS){
                Book newBook = bookService.create(bookAuthorsDTO.getBook());
                List<Image> newBookImages = imageService.createAll(bookAuthorsDTO.getImagesBook());
                List<AuthorImagesDTO> newAuthorImages = bookAuthorsDTO.getAuthorsImages();

                for(Image image : newBookImages){
                    newBook.getImages().add(image.getId());
                }

                for(AuthorImagesDTO authorImagesDTO : newAuthorImages){
                    authorService.create(authorImagesDTO.getAuthor());
                    imageService.createAll(authorImagesDTO.getImages());
                    newBook.getAuthors().add(authorImagesDTO.getAuthor().getId());
                    authorImagesDTO.getAuthor().getBooks().add(newBook.getId());
                    for (Image image : authorImagesDTO.getImages()){
                        authorImagesDTO.getAuthor().getImages().add(image.getId());
                    }
                }

                bookService.update(newBook.getId(), newBook);

                for(AuthorImagesDTO authorImagesDTO : newAuthorImages){
                    authorService.update(authorImagesDTO.getAuthor().getId(), authorImagesDTO.getAuthor());
                }

                newBookAuthorsDTOS.add(new BookAuthorsDTO(newBook, newBookImages, newAuthorImages));
            }

            return ResponseEntity.ok(newBookAuthorsDTOS);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAll(){
        try {
            List<Book> books = bookService.getAll();
            List<BookAuthorsDTO> bookAuthorsDTO = new ArrayList<>();

            for(Book book : books){
                List<Image> bookImages = new ArrayList<>();
                List<AuthorImagesDTO> authorImagesDTO = new ArrayList<>();

                for(String idImage : book.getImages()){
                    if(idImage != null && !idImage.trim().isBlank()){
                        bookImages.add(imageService.find(idImage));
                    }
                }

                for(String idAuthor : book.getAuthors()){
                    if(idAuthor != null && !idAuthor.trim().isBlank()){
                        Author author = authorService.get(idAuthor);
                        List<Image> authorImages = new ArrayList<>();

                        for(String idImage : author.getImages()){
                            if(idImage != null && !idImage.trim().isBlank()){
                                authorImages.add(imageService.find(idImage));
                            }
                        }

                        authorImagesDTO.add(new AuthorImagesDTO(author, authorImages));
                    }
                }

                bookAuthorsDTO.add(new BookAuthorsDTO(book, bookImages, authorImagesDTO));
            }

            return ResponseEntity.ok(bookAuthorsDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable String id){
        try {
            Book book = bookService.find(id);

            bookService.deleteById(book.getId());

            for(String idImages : book.getImages()){
                imageService.deleteById(idImages);
            }

            return ResponseEntity.ok("Objeto de id: "+id+" deletado com sucesso!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody BookAuthorsDTO bookAuthorsDTO){
        try {
            for(AuthorImagesDTO authorImagesDTO : bookAuthorsDTO.getAuthorsImages()){
                if(authorImagesDTO.getAuthor().getId() != null){
                    authorService.update(authorImagesDTO.getAuthor().getId(), authorImagesDTO.getAuthor());
                } else {
                    Author newAuthor = authorService.create(authorImagesDTO.getAuthor());
                    bookAuthorsDTO.getBook().getAuthors().add(newAuthor.getId());
                }

                for(Image authorImages : authorImagesDTO.getImages()){
                    if(authorImages.getId() != null){
                        imageService.update(authorImages.getId(), authorImages);
                    } else {
                        Image newImage = imageService.create(authorImages);
                        authorImagesDTO.getAuthor().getImages().add(newImage.getId());
                    }
                }
            }

            for(Image bookImages : bookAuthorsDTO.getImagesBook()){
                if(bookImages.getId() != null){
                    imageService.update(bookImages.getId(), bookImages);
                } else {
                    Image newImage = imageService.create(bookImages);
                    bookAuthorsDTO.getBook().getImages().add(newImage.getId());
                }
            }

            bookService.update(bookAuthorsDTO.getBook().getId(), bookAuthorsDTO.getBook());

            return ResponseEntity.ok(bookAuthorsDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
