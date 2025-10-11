package com.projetoconclusaocedup.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.projetoconclusaocedup.model.Image;

public interface ImageRepository extends MongoRepository<Image, String> {
}
