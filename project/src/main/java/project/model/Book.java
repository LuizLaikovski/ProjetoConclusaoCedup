package project.model;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;
import java.util.Set;

@Document(collection = "Books")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {

    @MongoId
    private String id;
//    @NotBlank
    private String title;
//    @NotBlank
    private Integer numPages;
    private Double rating;
    private LocalDate yearPublished;
    private String description;
    private Set<Integer> authorsId;
}
