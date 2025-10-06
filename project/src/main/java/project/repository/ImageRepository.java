package project.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import project.model.Image;

public interface ImageRepository extends MongoRepository<Image, String> {
}
