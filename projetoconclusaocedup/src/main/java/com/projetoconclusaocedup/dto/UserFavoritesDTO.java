package com.projetoconclusaocedup.dto;

import com.projetoconclusaocedup.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFavoritesDTO {
    private User user;
    private List<BookSearchDTO> booksFavorited = new ArrayList<>();
}
