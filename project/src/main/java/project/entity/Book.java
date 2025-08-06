package project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "book")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_book;
    @NotBlank
    private String book_title;
//    @NonNull
    private Integer book_author;
    private String book_genre;
    private Integer book_quant_pages;
    private Double book_rating;
//    @NonNull
    private Integer book_image;
}
