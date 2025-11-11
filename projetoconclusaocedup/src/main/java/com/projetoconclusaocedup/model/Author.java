package com.projetoconclusaocedup.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "Authors")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Author {
    @MongoId
    private String id;
    private String name;
    private LocalDate yearBorn;
    private LocalDate yearDeath;
    private String description;
    private String path;
    private List<String> books = new ArrayList<>();
    private String image;
}
