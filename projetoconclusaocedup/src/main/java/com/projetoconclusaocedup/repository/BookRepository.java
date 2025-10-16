package com.projetoconclusaocedup.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.projetoconclusaocedup.model.Book;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {
    @Query("{ ?0: { $regex: ?1, $options: 'i' } }")
    List<Book> searchBy(String where,String query);
}
