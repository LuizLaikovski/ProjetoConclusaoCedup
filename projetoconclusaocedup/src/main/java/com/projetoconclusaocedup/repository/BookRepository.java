package com.projetoconclusaocedup.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.projetoconclusaocedup.model.Book;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {
    @Query("{ 'path': { $regex: ?0, $options: 'i' } }")
    List<Book> searchByPath(String query);

    @Query("{ 'path': ?0 }")
    Book getByPath(String query);
}
