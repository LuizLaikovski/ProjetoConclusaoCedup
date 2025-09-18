package project.service;

import org.springframework.stereotype.Service;
import project.model.Author;
import project.repository.AuthorRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class AuthorService {
    private AuthorRepository authorRepository;

    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public Author create(Author author){
        try {
            if(author.getName() != null && !author.getName().trim().isBlank()){
                author.setName(author.getName().trim());
            }
            if(author.getYearBorn() != null && !author.getYearBorn().isAfter(LocalDate.now())){
                author.setYearBorn(author.getYearBorn());
            }
            if(author.getYearDeath() != null && !author.getYearDeath().isAfter(LocalDate.now())){
                author.setYearDeath(author.getYearDeath());
            }
            if(author.getDescription() != null && !author.getDescription().trim().isBlank()){
                author.setDescription(author.getDescription().trim());
            }

            return authorRepository.save(author);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Author> listAll(){
        try {
            return authorRepository.findAll();
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteById(String id){
        try {
            authorRepository.deleteById(id);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public Author update(String id, Author author){
        try {
            Author newAuthor = authorRepository.findById(id).orElseThrow(() -> new RuntimeException("autor de id:"+id+" não encontrado!"));

            if(author.getName() != null && !author.getName().trim().isBlank()){
                newAuthor.setName(author.getName().trim());
            }
            if(author.getYearBorn() != null && (author.getYearBorn().isAfter(LocalDate.now()))){
                newAuthor.setYearBorn(author.getYearBorn());
            }
            if(author.getYearDeath() != null && !author.getYearDeath().isAfter(LocalDate.now())){
                newAuthor.setYearDeath(author.getYearDeath());
            }
            if(author.getDescription() != null && !author.getDescription().trim().isBlank()){
                newAuthor.setDescription(author.getDescription().trim());
            }

            return authorRepository.save(author);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
