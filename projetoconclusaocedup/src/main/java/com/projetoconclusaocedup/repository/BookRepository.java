package com.projetoconclusaocedup.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.projetoconclusaocedup.model.Book;

public interface BookRepository extends MongoRepository<Book, String> {
}
