package project.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
            List<Author> newAuthors = authorService.createAll(bookAuthorsDTO.getAuthors());
            List<Image> newImagesBook = imageService.createAll(bookAuthorsDTO.getImagesBook());
            List<Image> newImagesAuthor = imageService.createAll(bookAuthorsDTO.getImagesAuthor());
            //precisa separar cada imagem de cada autor ebaaaaaaaaaaaaaaaaaa

            for(Author author : newAuthors){
                newBook.getAuthors().add(author.getId());
            }

            for(Image image : newImagesBook){
                newBook.getImages().add(image.getId());
            }

            for(Author author : newAuthors){
                author.getBooks().add(newBook.getId());
            }

            for(Author author : newAuthors){
                for(Image image : newImagesAuthor){
                    author.getImages().add(image.getId());
                }
            }

            bookService.update(newBook.getId(), newBook);

            for(Author author : newAuthors){
                authorService.update(author.getId(), author);
            }

            BookAuthorsDTO newBookAuthorsDTO = new BookAuthorsDTO(newBook, newAuthors, newImagesBook, newImagesAuthor);

            return ResponseEntity.ok().body(newBookAuthorsDTO);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping
    public ResponseEntity<?> listAll(){
        try {
            List<Book> books =  bookService.getAll();
            List<BookAuthorsDTO> bookAuthorImages = new ArrayList<>();

            for (Book book : books) {
                if (book.getAuthors() != null && !book.getAuthors().isEmpty()){
                    List<Author> authors = new ArrayList<>();
                    List<Image> imagesBook = new ArrayList<>();
                    List<Image> imagesAuthor = new ArrayList<>();
                    for (int i = 0; i < book.getAuthors().size(); i++) {
                        List<String> idAuthors = book.getAuthors();
                        if (idAuthors.get(i) != null && !idAuthors.get(i).trim().isBlank()){
                            authors.add(authorService.get(idAuthors.get(i).trim()));
                        }
                    }
                    for (int i = 0; i < book.getImages().size(); i++) {
                        List<String> idImages = book.getImages();
                        if (idImages.get(i) != null && !idImages.get(i).trim().isBlank()){
                            imagesBook.add(imageService.get(idImages.get(i).trim()));
                        }
                    }
                    for(Author author : authors){
                        for (int i = 0; i < author.getImages().size(); i++) {
                            List<String> idImages = author.getImages();
                            if (idImages.get(i) != null && !idImages.get(i).trim().isBlank()){
                                imagesAuthor.add(imageService.get(idImages.get(i).trim()));
                            }
                        }
                    }

                    bookAuthorImages.add(new BookAuthorsDTO(book, authors, imagesBook, imagesAuthor));
                }
            }

            return ResponseEntity.ok(bookAuthorImages);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
