package com.projetoconclusaocedup.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.projetoconclusaocedup.model.Author;

public interface AuthorRepository extends MongoRepository<Author, String> {
}
