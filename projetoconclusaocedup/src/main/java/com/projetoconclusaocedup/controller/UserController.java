package com.projetoconclusaocedup.controller;

import com.projetoconclusaocedup.dto.*;
import com.projetoconclusaocedup.model.Book;
import com.projetoconclusaocedup.model.User;
import com.projetoconclusaocedup.service.BookService;
import com.projetoconclusaocedup.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;
    private final BookService bookService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user){
        try {
            return ResponseEntity.ok(userService.register(user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO){
        try {
            User user = userService.login(loginDTO.getEmail(), loginDTO.getPassword());
            List<BookSearchDTO> booksFavorited = new ArrayList<>();

            for(String idBook : user.getIdBooksFavorited()){
                Book book = bookService.get(idBook);
                booksFavorited.add(new BookSearchDTO(book.getId(), book.getPath(), book.getTitle(), book.getImage()));
            }

            return ResponseEntity.ok(new UserFavoritesDTO(user, booksFavorited));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/one/u={id}")
    public ResponseEntity<?> findOne(@PathVariable String id) {
        try {
            User user = userService.get(id);
            List<BookSearchDTO> booksFavorited = new ArrayList<>();

            for(String idBook : user.getIdBooksFavorited()){
                Book book = bookService.get(idBook);
                booksFavorited.add(new BookSearchDTO(book.getId(), book.getPath(), book.getTitle(), book.getImage()));
            }

            return ResponseEntity.ok(new UserFavoritesDTO(user, booksFavorited));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/exists")
    public ResponseEntity<?> exists(@RequestBody LoginDTO email) {
        try {
            return ResponseEntity.ok(userService.exists(email.getEmail()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/edit/password")
    public ResponseEntity<?> editPassword(@RequestBody LoginDTO newPassword) {
        try {
            return ResponseEntity.ok(userService.editPassword(newPassword));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/edit/oldpassword")
    public ResponseEntity<?> editOldPassword(@RequestBody UpdatePasswordDTO newPassword) {
        try {
            return ResponseEntity.ok(userService.editOldPassword(newPassword));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/edit/admin")
    public ResponseEntity<?> userToAdmin(@RequestBody LoginDTO email) {
        try {
            return ResponseEntity.ok(userService.userToAdmin(email));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> findAll() {
        try {
            List<User> users = userService.findAll();
            List<UserFavoritesDTO> userFavorites = new ArrayList<>();

            for(User user : users){
                List<BookSearchDTO> booksFavorited = new ArrayList<>();
                for(String idBook : user.getIdBooksFavorited()){
                    Book book = bookService.get(idBook);
                    booksFavorited.add(new BookSearchDTO(book.getId(), book.getPath(), book.getTitle(), book.getImage()));
                }

                userFavorites.add(new UserFavoritesDTO(user, booksFavorited));
            }
            
            return ResponseEntity.ok(userFavorites);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/u={id}")
    public ResponseEntity<?> deleteById(@PathVariable String id){
        try {
            userService.deleteById(id);
            String msg = "Objeto de id: "+id+" deletado com sucesso";
            return ResponseEntity.ok(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody User user){
        try {
            return ResponseEntity.ok(userService.update(id, user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/favorite")
    public ResponseEntity<?> favorite(@RequestBody FavoriteDTO favoriteDTO){
        try {
            return ResponseEntity.ok(userService.favorite(favoriteDTO.getIdBook(), favoriteDTO.getIdUser()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/unfavorite")
    public ResponseEntity<?> unfavorite(@RequestBody FavoriteDTO unfavoriteDTO){
        try {
            return ResponseEntity.ok(userService.unfavorite(unfavoriteDTO.getIdBook(), unfavoriteDTO.getIdUser()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
