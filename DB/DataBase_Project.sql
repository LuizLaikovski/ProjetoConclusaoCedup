CREATE SCHEMA PROJETO_CONCLUSAO_DS302;

USE PROJETO_CONCLUSAO_DS302;

CREATE TABLE `author` (
  `id_author` int NOT NULL AUTO_INCREMENT,
  `author_name` varchar(255) NOT NULL,
  `author_year_born` date DEFAULT NULL,
  `author_year_death` date DEFAULT NULL,
  `author_about` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_author`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `book` (
  `id_book` int NOT NULL AUTO_INCREMENT,
  `book_title` varchar(255) NOT NULL,
  `book_quant_pages` int DEFAULT NULL,
  `book_rating` double DEFAULT NULL,
  `book_date_published` date DEFAULT NULL,
  PRIMARY KEY (`id_book`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `genre` (
  `id_genre` int NOT NULL AUTO_INCREMENT,
  `genre_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_genre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `image` (
  `id_image` int NOT NULL AUTO_INCREMENT,
  `image_src` varchar(255) NOT NULL,
  `image_alt` varchar(255) NOT NULL,
  PRIMARY KEY (`id_image`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `book_image` (
  `id_book` int NOT NULL,
  `id_image` int NOT NULL,
  PRIMARY KEY (`id_book`,`id_image`),
  KEY `id_image_book_idx` (`id_image`),
  CONSTRAINT `id_book_image` FOREIGN KEY (`id_book`) REFERENCES `book` (`id_book`),
  CONSTRAINT `id_image_book` FOREIGN KEY (`id_image`) REFERENCES `image` (`id_image`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `book_genre` (
  `id_book` int NOT NULL,
  `id_genre` int NOT NULL,
  PRIMARY KEY (`id_book`,`id_genre`),
  KEY `id_genre_idx` (`id_genre`),
  CONSTRAINT `id_book_genre` FOREIGN KEY (`id_book`) REFERENCES `book` (`id_book`),
  CONSTRAINT `id_genre_book` FOREIGN KEY (`id_genre`) REFERENCES `genre` (`id_genre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `book_author` (
  `id_book` int NOT NULL,
  `id_author` int NOT NULL,
  PRIMARY KEY (`id_book`,`id_author`),
  KEY `id_author_idx` (`id_author`),
  CONSTRAINT `id_author_book` FOREIGN KEY (`id_author`) REFERENCES `author` (`id_author`),
  CONSTRAINT `id_book_author` FOREIGN KEY (`id_book`) REFERENCES `book` (`id_book`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
