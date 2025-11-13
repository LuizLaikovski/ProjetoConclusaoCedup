package com.projetoconclusaocedup.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.projetoconclusaocedup.model.Image;
import com.projetoconclusaocedup.repository.ImageRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;

    public Image create(Image image){
        try {
            if (image.getAlt() != null && !image.getAlt().trim().isBlank()){
                image.setAlt(image.getAlt().trim());
            }
            if (image.getSrc() != null && !image.getSrc().trim().isBlank()){
                image.setSrc(image.getSrc().trim());
            }

            return imageRepository.save(image);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
    public List<Image> createAll(List<Image> images){
        try {
            List<Image> newImages = new ArrayList<>();
            for (Image image : images) {
                if(image.getSrc() != null && !image.getSrc().trim().isBlank()){
                    image.setSrc(image.getSrc().trim());
                }
                if(image.getAlt() != null && !image.getAlt().trim().isBlank()){
                    image.setAlt(image.getAlt().trim());
                }

                newImages.add(image);
            }

            return imageRepository.saveAll(newImages);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<Image> findAll(){
        try {
            return imageRepository.findAll();
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public Image find(String id){
        try {
            return imageRepository.findById(id).orElseThrow(() -> new RuntimeException("Imagem de id: "+id+" não encontrado"));
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void deleteById(String id){
        try {
            imageRepository.deleteById(id);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public Image update(String id, Image image){
        try {
            Image newImage = imageRepository.findById(id).orElseThrow(() -> new RuntimeException("imagem de id:"+id+" não encontrado!"));

            if (image.getAlt() != null && !image.getAlt().trim().isBlank()){
                newImage.setAlt(image.getAlt().trim());
            }
            if (image.getSrc() != null && !image.getSrc().trim().isBlank()){
                newImage.setSrc(image.getSrc().trim());
            }

            return imageRepository.save(image);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
