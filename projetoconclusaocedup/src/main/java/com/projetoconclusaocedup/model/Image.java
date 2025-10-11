package com.projetoconclusaocedup.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "Images")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    @MongoId
    private String id;
    private String src;
    private String alt;
}
