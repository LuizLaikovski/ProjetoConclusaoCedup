package project.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import project.model.Book;

public interface BookRepository extends MongoRepository<Book, String> {
}
