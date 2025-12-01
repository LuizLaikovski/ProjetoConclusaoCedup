package com.projetoconclusaocedup.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.projetoconclusaocedup.model.Author;
import com.projetoconclusaocedup.model.Book;
import com.projetoconclusaocedup.model.Image;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthorBooksDTO {
    private Author author;
    private List<Book> books;
}
