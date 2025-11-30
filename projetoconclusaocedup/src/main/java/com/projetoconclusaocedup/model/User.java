package com.projetoconclusaocedup.model;

import com.projetoconclusaocedup.dto.BookSearchDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @MongoId
    private String id;
    private String name;
    private String email;
    private String password;
    private String type;
    private List<String> idBooksFavorited = new ArrayList<>();
}
