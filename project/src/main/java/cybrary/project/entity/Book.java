package cybrary.project.entity;

import jakarta.persistence.*;
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
    @NonNull
    private String title;
    @NonNull
    private Integer author;
    private String genre;
    private Integer quant_pages;
    @NonNull
    private Integer image;
}
