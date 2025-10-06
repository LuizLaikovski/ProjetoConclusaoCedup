package project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.model.Author;
import project.model.Book;
import project.model.Image;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthorBooksDTO {
    private Author author;
    private List<Book> books;
    private List<Image> imagesAuthor;
    private List<Image> imagesBook;
}
