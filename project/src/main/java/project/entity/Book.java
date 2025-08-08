package project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.math.BigDecimal;

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

//    @Column(columnDefinition = "DECIMAL(2,2)")
    private Double book_rating;
}
