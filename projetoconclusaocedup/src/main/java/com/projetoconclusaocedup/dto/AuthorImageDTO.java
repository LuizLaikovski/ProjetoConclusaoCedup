package com.projetoconclusaocedup.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.projetoconclusaocedup.model.Author;
import com.projetoconclusaocedup.model.Image;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthorImageDTO {
    private Author author;
    private Image image;
}
