package com.projetoconclusaocedup.service;

import com.projetoconclusaocedup.config.PasswordEncoder;
import com.projetoconclusaocedup.dto.BookSearchDTO;
import com.projetoconclusaocedup.model.Book;
import com.projetoconclusaocedup.model.Image;
import com.projetoconclusaocedup.model.User;
import com.projetoconclusaocedup.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BookService bookService;
    private final ImageService imageService;
    private PasswordEncoder passwordEncoder;

    public User register(User user){
        try {
            User existingUser = findByEmail(user.getEmail());

            if(existingUser != null){
                if(user.getName() != null && !user.getName().trim().isBlank()){
                    user.setName(user.getName().trim());
                }
                if(user.getEmail() != null && !user.getEmail().trim().isBlank()){
                    user.setEmail(user.getEmail().trim());
                }
                if(user.getPassword() != null && !user.getPassword().trim().isBlank()){
                    String encryptedPassword = passwordEncoder.encrypt(user.getPassword());
                    user.setPassword(encryptedPassword);
                }
                if(user.getBooksFavorited() != null && !user.getBooksFavorited().isEmpty()){
                    user.setBooksFavorited(user.getBooksFavorited());
                }

                return userRepository.save(user);
            } else {
                throw new RuntimeException();
            }
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public Boolean login(String email, String password){
        try {
            User user = userRepository.findByEmail(email);

            if (user == null) {
                return false;
            }

            return passwordEncoder.verify(password, user.getPassword());
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public User find(String id){
        try {
            return userRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário de id: "+id+" não encontrado"));
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public User findByEmail(String email){
        try {
            return userRepository.findByEmail(email);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteById(String id){
        try {
            userRepository.deleteById(id);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public User update(String id, User user){
        try {
            User newUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário de id:"+id+" não encontrado!"));

            if (user.getName() != null && !user.getName().trim().isBlank()){
                newUser.setName(user.getName().trim());
            }
            if(user.getEmail() != null && !user.getEmail().trim().isBlank()){
                newUser.setEmail(user.getEmail().trim());
            }
            if(user.getPassword() != null && !user.getPassword().trim().isBlank()){
                newUser.setPassword(user.getPassword().trim());
            }
            if(user.getBooksFavorited() != null && !user.getBooksFavorited().isEmpty()){
                for(BookSearchDTO bookSearchDTO : user.getBooksFavorited()){
                    newUser.getBooksFavorited().add(bookSearchDTO);
                }
            }

            return userRepository.save(newUser);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public void favorite(String idBook, String idUser){
        try {
            Book book = bookService.get(idBook);
            User user = find(idUser);
            List<Image> images = new ArrayList<>();

            for(String idImage : book.getImages()){
                images.add(imageService.get(idImage));
            }

            BookSearchDTO bookSearchDTO = new BookSearchDTO(book.getPath(), book.getTitle(), images);

            List<BookSearchDTO> bookSearchDTOS = new ArrayList<>();
            bookSearchDTOS.add(bookSearchDTO);


            user.setBooksFavorited(bookSearchDTOS);

            update(user.getId(), user);

        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
