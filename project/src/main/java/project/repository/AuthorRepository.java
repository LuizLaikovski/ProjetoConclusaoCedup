package project.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import project.model.Author;

public interface AuthorRepository extends MongoRepository<Author, String> {
}
