package com.projetoconclusaocedup.controller;

import com.projetoconclusaocedup.service.AuthorService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/author")
@AllArgsConstructor
public class InfoAuthorController {
    private final AuthorService authorService;

    @GetMapping("/{path}")
    public ResponseEntity<?> getByPath(@PathVariable String path){
        try {
            return ResponseEntity.ok(authorService.getByPath(path));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
