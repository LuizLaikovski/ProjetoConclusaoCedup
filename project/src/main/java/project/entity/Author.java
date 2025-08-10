package project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "author")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_author;

    @NotBlank
    @Column(nullable = false)
    private String author_name;

    private LocalDate author_year_born;

    private LocalDate author_year_death;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String author_about;
}
