package com.projetoconclusaocedup.controller;

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
    public ResponseEntity<?> create(@RequestBody User user){
        try {
            return ResponseEntity.ok(userService.create(user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping()
    public ResponseEntity<?> getAll() {
        try {
            return ResponseEntity.ok(userService.getAll());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/one/u={id}")
    public ResponseEntity<?> getOne(@PathVariable String id) {
        try {
            return ResponseEntity.ok(userService.get(id));
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

    @PutMapping("/")
    public ResponseEntity<?> update(@RequestBody User user){
        try {
            return ResponseEntity.ok(userService.update(user.getId(), user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
