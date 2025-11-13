package com.projetoconclusaocedup.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "Books")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    @MongoId
    private String id;
    private String title;
    private String path;
    private Integer numPages;
    private List<Double> grades = new ArrayList<>();
    private String rating;
    private LocalDate yearPublished;
    private String description;
    private List<String> authors = new ArrayList<>();
    private String image;
    private Archive archive;
}
