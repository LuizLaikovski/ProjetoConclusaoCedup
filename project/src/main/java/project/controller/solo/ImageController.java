package project.controller.solo;

//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import project.model.Image;
//import project.service.ImageService;
//
//import java.util.List;

//@RestController
//@RequestMapping("/image")
public class ImageController {
//    private final ImageService imageService;
//
//    public ImageController(ImageService imageService) {
//        this.imageService = imageService;
//    }
//
//    @PostMapping
//    public ResponseEntity<Image> create(@RequestBody Image image){
//        try {
//            return ResponseEntity.ok().body(imageService.create(image));
//        } catch (RuntimeException e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Image>> listAll(){
//        try {
//            return ResponseEntity.ok(imageService.getAll());
//        } catch (RuntimeException e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteById(@PathVariable String id){
//        try {
//            imageService.deleteById(id);
//
//            return ResponseEntity.ok().build();
//        } catch (RuntimeException e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<?> update(@PathVariable String id, @RequestBody Image image){
//        try {
//            return ResponseEntity.ok().body(imageService.update(id, image));
//        } catch (RuntimeException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        } catch (Exception e) {
//            return ResponseEntity.internalServerError().body("Erro ao atualizar imagem");
//        }
//    }
}
