package project.repository;

//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
import project.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

//import java.math.BigDecimal;

public interface BookRepository extends JpaRepository<Book, Long> {

//    @Modifying
//    @Query("UPDATE Book b SET b.book_rating = :rating WHERE (b.id_book = :id)")
//    Double save_rating(@Param("rating") Double rating, @Param("id") Long id);
//
//    @Modifying
//    @Query("UPDATE Book b SET b.book_title = :title WHERE (b.id_book = :id)")
//    String save_title(@Param("title") String title, @Param("id") Long id);
//
//    @Modifying
//    @Query("UPDATE Book b SET b.book_quant_pages = :quant_pages WHERE (b.id_book = :id)")
//    Integer save_quant_pages(@Param("quant_pages") Integer quant_pages, @Param("id") Long id);
}
