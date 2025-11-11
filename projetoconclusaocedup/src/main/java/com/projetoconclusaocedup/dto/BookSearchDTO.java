package com.projetoconclusaocedup.dto;

import com.projetoconclusaocedup.model.Image;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookSearchDTO {
    private String path;
    private String title;
    private Image image;
}
