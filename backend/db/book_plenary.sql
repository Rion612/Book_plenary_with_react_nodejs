-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: book_plenary
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book_categories`
--

DROP TABLE IF EXISTS `book_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `books_id` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_categories`
--

LOCK TABLES `book_categories` WRITE;
/*!40000 ALTER TABLE `book_categories` DISABLE KEYS */;
INSERT INTO `book_categories` VALUES (1,2,4,'2022-12-24 05:48:02','2022-12-24 05:48:02'),(2,6,5,'2022-12-24 06:02:38','2022-12-24 06:02:38'),(3,4,5,'2022-12-24 06:02:38','2022-12-24 06:02:38'),(4,2,4,'2022-12-24 06:04:56','2022-12-24 06:04:56'),(5,2,6,'2022-12-24 06:11:25','2022-12-24 06:11:25'),(6,8,7,'2022-12-24 06:13:16','2022-12-24 06:13:16'),(7,2,8,'2022-12-24 06:19:40','2022-12-24 06:19:40'),(8,8,9,'2022-12-24 06:23:27','2022-12-24 06:23:27');
/*!40000 ALTER TABLE `book_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `writer` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `bookImage` varchar(200) NOT NULL,
  `bookFile` varchar(200) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (8,'Peacehaven','Peacehaven','Michael hayes','<p>I awoke to a light burning my eyes. Quick short breaths are working my chest hard and the hands around my neck are relentless. I press down on the asthma inhaler and breathe deeply as I suck the cool spray deep into my lungs. The hands let go. My breathing slows. The light above my head is intense. I brush the lamp aside with the back of my hand and place my hand to my chest. It’s there, as it always had been, I roll it in my fingers. Just knowing it’s there comforts me. My breathing becomes normal. It’s there, this is the day and to me that is all that matters.</p><p>In my hand is an old brass key, that has long ago lost its shine, tarnished a deep brown and green. The inscription on the shaft of the key is still legible, ‘Remember Sarah.’ I read it every day, to remember. The key is attached to a thin strap of leather that hangs from my neck. I rarely remove it, except for this special day of the year which is so important.</p><p>The first rays of sunlight are creeping over the Highfields mountains in the eastern distance, displaying a beautiful deep orange, I admire it momentarily, then step off my veranda. I’m carrying a torch, but the sunlight coming is still enough to give me some confidence. A heavy fog is beginning to drift over the small town of Peacehaven.</p>','peacehaven-hayes-obooko.jpg','peacehaven-michael-hayes-obooko.pdf','2022-12-24 06:19:40','2022-12-24 06:19:40'),(9,'অপেক্ষা','','Humayun Ahmed','<p>Humayun Ahmed (Bengali: হুমায়ূন আহমেদ; 13 November 1948 – 19 July 2012) was a Bangladeshi author, dramatist, screenwriter, playwright and filmmaker. He was the most famous and popular author, dramatist and filmmaker ever to grace the cultural world of Bangladesh since its independence in 1971. Dawn referred to him as the cultural legend of Bangladesh. Humayun started his journey to reach fame with the publication of his novel Nondito Noroke (In Blissful Hell) in 1972, which remains one of his most famous works. He wrote over 250 fiction and non-fiction books, all of which were bestsellers in Bangladesh, most of them were number one bestsellers of their respective years by a wide margin. In recognition to the works of Humayun, Times of India wrote, \"Humayun was a custodian of the Bangladeshi literary culture whose contribution single-handedly shifted the capital of Bengali literature from Kolkata to Dhaka without any war or revolution.\" Ahmed\'s writing style was characterized as \"Magic Realism.\" Sunil Gangopadhyay described him as the most popular writer in the Bengali language for a century and according to him, Ahmed was even more popular than Sarat Chandra Chattopadhyay. Ahmed\'s books have been the top sellers at the Ekushey Book Fair during every years of the 1990s and 2000s.</p>','opekkha-by-humayun-ahmed.jpg','opekkha-by-humayun-ahmed-[bdebooks.com]-(bdebooks.com).pdf','2022-12-24 06:23:27','2022-12-24 06:23:27');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(200) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Action','2022-12-24 05:18:52','2022-12-24 05:18:52'),(2,'Horror','2022-12-24 05:18:59','2022-12-24 05:18:59'),(3,'Historical','2022-12-24 05:19:08','2022-12-24 05:19:08'),(4,'Travel','2022-12-24 05:37:06','2022-12-24 05:37:06'),(5,'Nonfiction','2022-12-24 05:37:16','2022-12-24 05:37:16'),(6,' Biography','2022-12-24 05:37:33','2022-12-24 05:37:33'),(7,'Memoir','2022-12-24 05:37:51','2022-12-24 05:37:51'),(8,'Novel','2022-12-24 06:08:05','2022-12-24 06:08:05');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `review` mediumtext NOT NULL,
  `rating` int NOT NULL,
  `user_id` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,9,'One the good book I have read.',5,1,'2022-12-24 06:28:58','2022-12-24 06:28:58');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','admin@gmail.com','$2b$05$.VNEPiTApRbPXsRr/u3u5.yuqfgXDlSEsRb7IyCue1oFDCUt0aq7.',1,'2022-12-24 05:09:32','2022-12-24 05:09:32');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-24 12:36:25
