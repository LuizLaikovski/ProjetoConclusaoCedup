package com.projetoconclusaocedup.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.projetoconclusaocedup.model.Author;
import com.projetoconclusaocedup.model.Book;
import com.projetoconclusaocedup.model.Image;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookAuthorsDTO {
    private Book book;
    private List<Author> authors;
}

