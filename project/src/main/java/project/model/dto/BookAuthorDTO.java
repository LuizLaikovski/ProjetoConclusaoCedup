package project.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.model.Author;
import project.model.Book;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookAuthorDTO {
    private Book book;
    private Author author;
}
