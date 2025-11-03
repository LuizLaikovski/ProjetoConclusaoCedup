package com.projetoconclusaocedup.service;

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

    public User create(User user){
        try {
            if(user.getName() != null && !user.getName().trim().isBlank()){
                user.setName(user.getName().trim());
            }
            if(user.getEmail() != null && !user.getEmail().trim().isBlank()){
                user.setEmail(user.getEmail().trim());
            }
            if(user.getPassword() != null && !user.getPassword().trim().isBlank()){
                user.setPassword(user.getPassword().trim());
            }
            if(user.getBooksFavorited() != null && !user.getBooksFavorited().isEmpty()){
                user.setBooksFavorited(user.getBooksFavorited());
            }

            return userRepository.save(user);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public List<User> getAll(){
        try {
            return userRepository.findAll();
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public User get(String id){
        try {
            return userRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário de id: "+id+" não encontrado"));
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
                newUser.setBooksFavorited(user.getBooksFavorited());
            }

            return userRepository.save(user);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    public List<BookSearchDTO> favorite(String idBook, String idUser){
        try {
            Book book = bookService.get(idBook);
            User user = get(idUser);
            List<Image> images = new ArrayList<>();

            for(String idImage : book.getImages()){
                images.add(imageService.get(idImage));
            }

            BookSearchDTO bookSearchDTO = new BookSearchDTO(book.getPath(), book.getTitle(), images);

            List<BookSearchDTO> bookSearchDTOS = new ArrayList<>();
            bookSearchDTOS.add(bookSearchDTO);


            user.setBooksFavorited(bookSearchDTOS);

            update(user.getId(), user);

            return user.getBooksFavorited();
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }
    }
}
