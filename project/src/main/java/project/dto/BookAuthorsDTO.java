package project.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.model.Author;
import project.model.Book;
import project.model.Image;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookAuthorsDTO {
    private Book book;
    private List<Author> authors;
    private List<Image> imagesBook;
    private List<Image> imagesAuthor;
}
