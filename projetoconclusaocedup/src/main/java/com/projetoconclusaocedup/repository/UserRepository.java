package com.projetoconclusaocedup.repository;

import com.projetoconclusaocedup.model.Author;
import com.projetoconclusaocedup.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String> {
    @Query("{ 'email': ?0 }")
    User findByEmail(String query);
}
