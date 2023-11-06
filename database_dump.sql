-- MySQL dump 10.13  Distrib 8.1.0, for macos13.3 (arm64)
--
-- Host: localhost    Database: photo_db
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` VALUES (1,'Dog Album','An album for dog photos',1),(2,' Album',NULL,1),(3,'hors Album','hh',1),(4,'Confetti\'R\'Us',NULL,1),(5,'Buffy the vampire slayer',NULL,2),(6,'Cats Cats',NULL,1);
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `album_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `image_url` varchar(2048) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (1,'When life gives you confetti, celebrate','Yolo',1,2,'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'),(2,'When life gives you confetti, celebrate','Yolo',3,1,'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'),(3,'Confetti Photo #3','Confetti',1,1,'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'),(4,'Horses','Confetti',5,2,'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'),(5,'dog','Confetti',NULL,2,'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'),(6,'Cats be ninja','Yolo',6,1,'https://images.unsplash.com/photo-1492684223066-81342ee5ff30');
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'hs','test@gmail.com','$2b$10$9hkBSx.qc3FhC3iWTq.aPuSuGAMgh/ToON5NzFotqZyQmvRdXSMWG','heidi','sjoberg'),(2,'dh','log@gmail.com','$2b$10$GIeDaU2tbKH0LFpS1u.k8.bhI0.Sg.oh3iTKdOaCjAry/y1K6FnKa','daniel','leve'),(3,'dh','log@gmail.com','$2b$10$IrZjhAT2HaoIyTU4kAMtb.bdsmFEr2aGnb.An9qYWLN1fTA9Q5DM.','daniel','leve'),(4,'dh','log@gmail.com','$2b$10$R90RfWrwvBtw6eTB25S/cuV1PlToHdVhaN2cXR9txK9URh3XpfGtG','daniel','leve'),(5,'dh','log@gmail.com','$2b$10$QAIQ.oJH.76CLOG6w8qkWO1cuV4YOJvDl6WhfEhEyHWjFJyvYwQjK','daniel','leve'),(6,'dh','log@gmail.com','$2b$10$snJrxeixx2xPb22l7ND6iO05IYTHO76Hq6IOpAn.Sld9.gUhd15fG','daniel','leve'),(7,'dh','log@gmail.com','$2b$10$xXc6rIXMIobg40M0s3XcVuwo4Iak81vUHUqNVzHhPe4SfleKjnbzO','daniel','leve'),(8,'dh','log@gmail.com','$2b$10$cFY1SGtlwbvBrEtE5z9eVOci4MmyuYqI5kss/ai1bcEC/bXfLV4X2','daniel','leve'),(9,'dh','log@gmail.com','$2b$10$o9iS2ApJrBY/nw.N1k9tzOWollFUmrHDt.KQamo/H1ASxJvpvf1Gm','daniel','leve'),(10,'dh','log@gmail.com','$2b$10$um04o2l3mLT2hNYeey3GP.DZ4v3kM/KBiviivuRgBwpD5DEwC2Bvy','daniel','leve'),(11,'Max','max@gmail.com','$2b$10$21Xjuy3j83upYRDLHyHQrO9ndliSTnPIV9TagtO4VSIUcbrTFtzYq','Mamimilian','Sjoberg');
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

-- Dump completed on 2023-10-24 12:53:14
