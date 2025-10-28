package com.projetoconclusaocedup.repository;

import com.projetoconclusaocedup.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.projetoconclusaocedup.model.Author;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface AuthorRepository extends MongoRepository<Author, String> {
    @Query("{ 'path': ?0 }")
    Author getByPath(String query);
}
