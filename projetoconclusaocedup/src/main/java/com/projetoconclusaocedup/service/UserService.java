package com.projetoconclusaocedup.service;

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
}
