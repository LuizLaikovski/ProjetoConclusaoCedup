package com.projetoconclusaocedup.controller;

import com.projetoconclusaocedup.dto.FavoriteDTO;
import com.projetoconclusaocedup.dto.LoginDTO;
import com.projetoconclusaocedup.dto.UnfavoriteDTO;
import com.projetoconclusaocedup.model.User;
import com.projetoconclusaocedup.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping()
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
            return ResponseEntity.ok(userService.login(loginDTO.getEmail(), loginDTO.getPassword()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/one/u={id}")
    public ResponseEntity<?> findOne(@PathVariable String id) {
        try {
            return ResponseEntity.ok(userService.find(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> finAll() {
        try {
            return ResponseEntity.ok(userService.findAll());
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
            userService.favorite(favoriteDTO.getIdBook(), favoriteDTO.getIdUser());

            String msg = "foi meu patrão";
            return ResponseEntity.ok(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/unfavorite")
    public ResponseEntity<?> unfavorite(@RequestBody UnfavoriteDTO unfavoriteDTO){
        try {
            userService.unfavorite(unfavoriteDTO.getBookRemoved(), unfavoriteDTO.getIdUser());

            String msg = "foi meu patrão";
            return ResponseEntity.ok(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
