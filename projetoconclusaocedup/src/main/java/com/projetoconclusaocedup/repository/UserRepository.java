package com.projetoconclusaocedup.repository;

import com.projetoconclusaocedup.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
