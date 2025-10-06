package project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    private List<String> books = new ArrayList<>();
    private List<String> images = new ArrayList<>();
}
