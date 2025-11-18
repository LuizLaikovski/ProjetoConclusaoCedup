package com.projetoconclusaocedup.service;

import com.projetoconclusaocedup.config.PasswordEncoder;
import com.projetoconclusaocedup.dto.BookSearchDTO;
import com.projetoconclusaocedup.model.Book;
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

            if (existingUser != null){
                String msg = "usuário com este email já existe";
                throw new RuntimeException(msg);
            }

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
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public User login(String email, String password){
        try {
            User user = userRepository.findByEmail(email);

            if (user == null) {
                String msg = "usuário não existe";
                throw new RuntimeException(msg);
            }
            if(passwordEncoder.verify(password.trim(), user.getPassword().trim())){
                String msg = "senha incorreta";
                throw new RuntimeException(msg);
            }
            return user;
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public User get(String id){
        try {
            return userRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário de id: "+id+" não encontrado"));
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<User> findAll(){
        try {
            return userRepository.findAll();
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public User findByEmail(String email){
        try {
            return userRepository.findByEmail(email);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void deleteById(String id){
        try {
            userRepository.deleteById(id);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public User update(String id, User user){
        try {
            User userExisting = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário de id:"+id+" não encontrado!"));

            if (user.getName() != null && !user.getName().trim().isBlank()){
                userExisting.setName(user.getName().trim());
            }
            if(user.getEmail() != null && !user.getEmail().trim().isBlank()){
                userExisting.setEmail(user.getEmail().trim());
            }
            if(user.getPassword() != null && !user.getPassword().trim().isBlank()){
                String encryptedPassword = passwordEncoder.encrypt(user.getPassword());
                userExisting.setPassword(encryptedPassword);
            }
            if(user.getBooksFavorited() != null){
                userExisting.setBooksFavorited(user.getBooksFavorited());
            }

            return userRepository.save(userExisting);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public User favorite(String idBook, String idUser){
        try {
            Book book = bookService.get(idBook);
            User user = get(idUser);
            boolean bookInList = false;

            for(BookSearchDTO bookFavorited : user.getBooksFavorited()){
                if(book.getPath().equals(bookFavorited.getPath())){
                    bookInList = true;
                    break;
                }
            }

            if(!bookInList){
                BookSearchDTO bookWillFavorite = new BookSearchDTO(
                        book.getId(), book.getPath(),
                        book.getTitle(), imageService.find(book.getImage())
                );

                user.getBooksFavorited().add(bookWillFavorite);
            }

            return update(user.getId(), user);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public User unfavorite(String idBook, String idUser){
        try {
            Book book = bookService.get(idBook);
            User user = get(idUser);

            user.getBooksFavorited().removeIf(bookFavorited ->
                    book.getPath().equals(bookFavorited.getPath())
            );

            return update(user.getId(), user);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
