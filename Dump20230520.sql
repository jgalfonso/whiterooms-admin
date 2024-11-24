CREATE DATABASE  IF NOT EXISTS `orits` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `orits`;
-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: localhost    Database: orits
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `bins`
--

DROP TABLE IF EXISTS `bins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `container_id` int NOT NULL,
  `instrument_id` int NOT NULL,
  `created_by` int NOT NULL,
  `dt_created` datetime NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bins`
--

LOCK TABLES `bins` WRITE;
/*!40000 ALTER TABLE `bins` DISABLE KEYS */;
INSERT INTO `bins` VALUES (1,3,1,1,'2023-05-19 07:44:58','Active'),(2,13,2,1,'2023-05-19 08:32:45','Issued');
/*!40000 ALTER TABLE `bins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `containers`
--

DROP TABLE IF EXISTS `containers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `containers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `udi` varchar(255) NOT NULL,
  `description` text,
  `created_by` int NOT NULL,
  `dt_created` datetime NOT NULL,
  `lupd_by` int DEFAULT NULL,
  `dt_lupd` datetime DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `containers`
--

LOCK TABLES `containers` WRITE;
/*!40000 ALTER TABLE `containers` DISABLE KEYS */;
INSERT INTO `containers` VALUES (1,'01040501230554071004939373321168','Minor Adjustments',1,'2023-05-18 15:31:34',NULL,NULL,'New'),(2,'01040123230554071004939373321168','Major Instruments',1,'2023-05-18 15:35:21',NULL,NULL,'New'),(3,'01040123212354071004939373321168','X-Ray Instruments',1,'2023-05-18 23:05:52',NULL,NULL,'Available'),(4,'01040123789354071004939373321168','OR Instruments',1,'2023-05-18 23:07:34',NULL,NULL,'New'),(5,'01040123230554071004939373321123','Hospital ER',1,'2023-05-18 23:38:14',NULL,NULL,'Reserved'),(6,'01040123230554071004939373321233','Nurse Station',1,'2023-05-19 06:48:54',NULL,NULL,'New'),(7,'01040123230554071004939373321222','Pedia Instruments',1,'2023-05-19 07:07:43',NULL,NULL,'New'),(13,'01040123230554071004939373321111','Sample Instruments',1,'2023-05-19 08:32:22',NULL,NULL,'Issued');
/*!40000 ALTER TABLE `containers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (1,'Dr. Mary Grace Balunsat-Rojas '),(2,'Dr. Paz M. Espineda'),(3,'Dr. Irene C. Descargar');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instruments`
--

DROP TABLE IF EXISTS `instruments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instruments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_no` varchar(100) NOT NULL,
  `catalog_no` varchar(100) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `lot_no` varchar(100) DEFAULT NULL,
  `serial_no` varchar(100) DEFAULT NULL,
  `gtin` varchar(100) DEFAULT NULL,
  `basic_uid_di` varchar(100) DEFAULT NULL,
  `created_by` int NOT NULL,
  `dt_created` datetime NOT NULL,
  `lupd_by` int DEFAULT NULL,
  `dt_lupd` datetime DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instruments`
--

LOCK TABLES `instruments` WRITE;
/*!40000 ALTER TABLE `instruments` DISABLE KEYS */;
INSERT INTO `instruments` VALUES (1,'18-002-16','CN122233090','Mayo-Hegar TC-Needle Holder, 16cm','04393733','1681466560','04050123055407','4050123-17-0080-JF',1,'2023-05-19 03:44:46',NULL,NULL,'Active'),(2,'18-002-17','CN122233091','Mayo-Hegar TC-Needle Holder, 12cm','04393734','1681466561','04050123055408','4050123-17-0080-JH',1,'2023-05-19 04:01:26',NULL,NULL,'Active');
/*!40000 ALTER TABLE `instruments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issuances`
--

DROP TABLE IF EXISTS `issuances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issuances` (
  `id` int NOT NULL AUTO_INCREMENT,
  `container_id` int NOT NULL,
  `udi` varchar(100) NOT NULL,
  `issued_to` int NOT NULL,
  `issued_by` int NOT NULL,
  `dt_issued` datetime NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issuances`
--

LOCK TABLES `issuances` WRITE;
/*!40000 ALTER TABLE `issuances` DISABLE KEYS */;
INSERT INTO `issuances` VALUES (1,5,'01040123230554071004939373321123',1,1,'2023-05-18 23:38:14','New'),(4,13,'01040123230554071004939373321111',1,1,'2023-05-20 05:01:52','Issued');
/*!40000 ALTER TABLE `issuances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dt_created` datetime NOT NULL,
  `lupd_by` int DEFAULT NULL,
  `dt_lupd` datetime DEFAULT NULL,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Alfonso, Jerald DG','jerald.alfonso@gmail.com','$2y$10$uBvsoFczr372x33pNmRp/.xsPWty9D54ADe8371ujINn51Y1t8yba','2023-05-18 00:00:00',NULL,NULL,'Active');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'orits'
--

--
-- Dumping routines for database 'orits'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-20 15:22:50
