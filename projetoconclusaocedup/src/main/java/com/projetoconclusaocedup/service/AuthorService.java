package com.projetoconclusaocedup.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.projetoconclusaocedup.model.Author;
import com.projetoconclusaocedup.repository.AuthorRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AuthorService {
    private final AuthorRepository authorRepository;

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
            if(author.getBooks() != null && !author.getBooks().isEmpty()){
                author.setBooks(author.getBooks());
            }
            if(author.getImage() != null && !author.getImage().isEmpty()){
                author.setImage(author.getImage());
            }

            return authorRepository.save(author);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<Author> createAll(List<Author> authors){
        try {
            List<Author> newAuthors = new ArrayList<>();
            for (Author author : authors) {
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
                if(author.getBooks() != null && !author.getBooks().isEmpty()){
                    author.setBooks(author.getBooks());
                }
                if(author.getImage() != null && !author.getImage().trim().isBlank()){
                    author.setImage(author.getImage());
                }

                newAuthors.add(author);
            }

            return authorRepository.saveAll(newAuthors);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<Author> getAll(){
        try {
            return authorRepository.findAll();
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public Author get(String id){
        try {
            return authorRepository.findById(id).orElseThrow(() -> new RuntimeException("Autor de id: "+id+" não encontrado"));
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public Author getByPath(String path){
        try {
            return authorRepository.getByPath(path);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void deleteById(String id){
        try {
            authorRepository.deleteById(id);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
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
            if(author.getBooks() != null && !author.getBooks().isEmpty()){
                newAuthor.setBooks(author.getBooks());
            }
            if(author.getImage() != null && !author.getImage().trim().isBlank()){
                newAuthor.setImage(author.getImage());
            }

            return authorRepository.save(author);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
