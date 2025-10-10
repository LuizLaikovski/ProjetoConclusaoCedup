package project.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.dto.AuthorImagesDTO;
import project.model.Author;
import project.model.Book;
import project.dto.BookAuthorsDTO;
import project.model.Image;
import project.service.AuthorService;
import project.service.BookService;
import project.service.ImageService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/book/authors")
@AllArgsConstructor
public class BookAuthorsController {
    private final BookService bookService;
    private final AuthorService authorService;
    private final ImageService imageService;

    @PostMapping
    public ResponseEntity<BookAuthorsDTO> create(@RequestBody BookAuthorsDTO bookAuthorsDTO){
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
            throw new RuntimeException(e);
        }
    }

    @GetMapping
    public ResponseEntity<?> listAll(){
        try {
            return null;
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
