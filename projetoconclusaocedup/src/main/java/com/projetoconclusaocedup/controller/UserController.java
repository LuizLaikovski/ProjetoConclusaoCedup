package com.projetoconclusaocedup.controller;

import com.projetoconclusaocedup.dto.IdsDTO;
import com.projetoconclusaocedup.dto.LoginDTO;
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

    @DeleteMapping("/u={id}")
    public ResponseEntity<?> deleteById(@PathVariable String id){
        try {
            userService.deleteById(id);
            return ResponseEntity.ok("Objeto de id: "+id+" deletado com sucesso");
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
    public ResponseEntity<?> favorite(@RequestBody IdsDTO idsDTO){
        try {
            userService.favorite(idsDTO.getIdBook(), idsDTO.getIdUser());

            String msg = "foi meu patrão";
            return ResponseEntity.ok(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/unfavorite")
    public ResponseEntity<?> unfavorite(@RequestBody IdsDTO idsDTO){
        try {
            userService.unfavorite(idsDTO.getIdBook(), idsDTO.getIdUser());

            String msg = "foi meu patrão";
            return ResponseEntity.ok(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
