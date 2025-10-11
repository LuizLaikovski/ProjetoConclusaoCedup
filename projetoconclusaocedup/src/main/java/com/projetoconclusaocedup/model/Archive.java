package com.projetoconclusaocedup.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Archives")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Archive {
    private String src;
    private String alt;
}
