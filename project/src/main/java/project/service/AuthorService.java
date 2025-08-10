package project.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import project.entity.Author;
import project.repository.AuthorRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class AuthorService {
    private final AuthorRepository repository;

    public AuthorService(AuthorRepository repository) {
        this.repository = repository;
    }

    public Author create(Author author){
        try {
            if(author.getAuthor_name() != null && !author.getAuthor_name().trim().isBlank()){
                author.setAuthor_name(author.getAuthor_name().trim());
            }
            if(author.getAuthor_year_born() != null && !author.getAuthor_year_born().isAfter(LocalDate.now())){
                author.setAuthor_year_born(author.getAuthor_year_born());
            }
            if(author.getAuthor_year_death() != null && !author.getAuthor_year_death().isAfter(LocalDate.now())){
                author.setAuthor_year_death(author.getAuthor_year_death());
            }
            if(author.getAuthor_about() != null && !author.getAuthor_about().trim().isBlank()){
                author.setAuthor_about(author.getAuthor_about().trim());
            }
            return repository.save(author);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<Author> list_all(){
        try {
            return repository.findAll();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public Author update(Long id, Author author){
        try {
            Author author_updated = repository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Autor com id: "+id+" não encontrado!"));

            if(author.getAuthor_name() != null && !author.getAuthor_name().trim().isBlank()){
                author_updated.setAuthor_name(author.getAuthor_name().trim());
            }
            if(author.getAuthor_year_born() != null && !author.getAuthor_year_born().isAfter(LocalDate.now())){
                author_updated.setAuthor_year_born(author.getAuthor_year_born());
            }
            if(author.getAuthor_year_death() != null && !author.getAuthor_year_death().isAfter(LocalDate.now())){
                author_updated.setAuthor_year_death(author.getAuthor_year_death());
            }
            if(author.getAuthor_about() != null && !author.getAuthor_about().trim().isBlank()){
                author_updated.setAuthor_about(author.getAuthor_about().trim());
            }

            return repository.save(author_updated);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void delete_by_id(Long id){
        try {
            Author deleted_author = repository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Autor com id: "+id+" não encontrado!"));

            repository.delete(deleted_author);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
