package project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

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
    @Column(nullable = false)
    private String book_title;

    @Column(nullable = false)
    private Integer book_quant_pages;

    private LocalDate book_date_published;

    private Double book_rating;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String book_description;
}
