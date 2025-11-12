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

            if (existingUser != null){
                String msg = "bah guri";
                throw new RuntimeException(msg);
            }

            return userRepository.save(user);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public User login(String email, String password){
        try {
            User user = userRepository.findByEmail(email);

            if (user == null) {
                String msg = "usuário não existe";
                throw new RuntimeException(msg);
            }
            if(!passwordEncoder.verify(password, user.getPassword())){
                String msg = "senha incorreta";
                throw new RuntimeException(msg);
            }
            return user;
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

    public List<User> findAll(){
        try {
            return userRepository.findAll();
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
            User userUpdated = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário de id:"+id+" não encontrado!"));

            if (user.getName() != null && !user.getName().trim().isBlank()){
                userUpdated.setName(user.getName().trim());
            }
            if(user.getEmail() != null && !user.getEmail().trim().isBlank()){
                userUpdated.setEmail(user.getEmail().trim());
            }
            if(user.getPassword() != null && !user.getPassword().trim().isBlank()){
                String encryptedPassword = passwordEncoder.encrypt(user.getPassword());
                userUpdated.setPassword(encryptedPassword);
            }
            if(user.getBooksFavorited() != null && !user.getBooksFavorited().isEmpty()){
                for(BookSearchDTO bookSearchDTO : userUpdated.getBooksFavorited()){
                    user.getBooksFavorited().add(bookSearchDTO);
                }

                userUpdated.setBooksFavorited(user.getBooksFavorited());
            }

            return userRepository.save(userUpdated);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public void favorite(String idBook, String idUser){
        try {
            Book book = bookService.get(idBook);
            User user = find(idUser);
            Image image = imageService.find(book.getImage());

            BookSearchDTO bookSearchDTO = new BookSearchDTO(book.getId(), book.getPath(), book.getTitle(), image);

            user.getBooksFavorited().add(bookSearchDTO);

            update(idUser, user);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public void unfavorite(BookSearchDTO bookUnfavorited, String idUser){
        try {
            User user = find(idUser);
            List<BookSearchDTO> favorites = user.getBooksFavorited();

            for(BookSearchDTO bookSearch : favorites){
                if(bookUnfavorited.getPath().equals(bookSearch.getPath())){
                    favorites.remove(bookUnfavorited);
                }
            }

            user.setBooksFavorited(favorites);

            update(idUser, user);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
