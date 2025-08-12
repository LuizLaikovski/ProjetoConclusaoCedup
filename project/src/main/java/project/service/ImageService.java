package project.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import project.entity.Image;
import project.repository.ImageRepository;

import java.util.List;

@Service
public class ImageService {
    private final ImageRepository repository;

    public ImageService(ImageRepository repository) {
        this.repository = repository;
    }

    public Image create(Image image){
        try {
            if(image.getImage_alt() != null && !image.getImage_alt().trim().isBlank()){
                image.setImage_alt(image.getImage_alt().trim());
            }
            if(image.getImage_src() != null && !image.getImage_src().trim().isBlank()){
                image.setImage_src(image.getImage_src().trim());
            }

            return repository.save(image);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public List<Image> list_all(){
        try {
            return repository.findAll();
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public Image update(Long id, Image image){
        try {
            Image image_updated = repository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Imagem com id: "+id+" não encontrada!"));

            if(image.getImage_alt() != null && !image.getImage_alt().trim().isBlank()){
                image_updated.setImage_alt(image.getImage_alt().trim());
            }
            if(image.getImage_src() != null && !image.getImage_src().trim().isBlank()){
                image_updated.setImage_src(image.getImage_src().trim());
            }
            return repository.save(image_updated);
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void delete_by_id(Long id){
        try {
            Image image_delete = repository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Imagem com id: "+id+" não encontrada!"));

            repository.delete(image_delete);
        } catch(RuntimeException e){
            throw new RuntimeException(e.getMessage());
        }
    }
}
