CREATE SCHEMA CYBRARY_TCC_DS302;
USE CYBRARY_TCC_DS302;

CREATE TABLE book (
  id_book int NOT NULL AUTO_INCREMENT,
  book_title varchar(100) NOT NULL,
  book_author int NOT NULL,
  book_genre varchar(60) DEFAULT NULL,
  book_quant_pags int NOT NULL,
  book_rating decimal(2,2) DEFAULT NULL,
  book_image int NOT NULL,
  PRIMARY KEY (id_book),
  KEY book_id_author_idx (book_author),
  KEY book_id_image_idx (book_image),
  CONSTRAINT book_id_author FOREIGN KEY (book_author) REFERENCES author (id_author),
  CONSTRAINT book_id_image FOREIGN KEY (book_image) REFERENCES image (id_image)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE author (
  id_author int NOT NULL AUTO_INCREMENT,
  author_name varchar(75) NOT NULL,
  author_year_born date DEFAULT NULL,
  author_year_death date DEFAULT NULL,
  author_about text,
  PRIMARY KEY (id_author)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE image (
  id_image int NOT NULL AUTO_INCREMENT,
  image_src varchar(45) NOT NULL,
  image_alt varchar(45) NOT NULL,
  PRIMARY KEY (id_image)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;