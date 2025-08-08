package project.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "image")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_image;

    @NotBlank
    @Column(nullable = false)
    private String image_src;

    @NotBlank
    @Column(nullable = false)
    private String image_alt;
}
