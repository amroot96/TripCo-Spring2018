-- MySQL dump 10.16  Distrib 10.1.30-MariaDB, for Linux (x86_64)
--
-- Host: faure    Database: cs314
-- ------------------------------------------------------
-- Server version	10.1.30-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `airports`
--

DROP TABLE IF EXISTS `airports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `airports` (
  `index` int(11) NOT NULL,
  `id` varchar(30) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `latitude` varchar(1000) DEFAULT NULL,
  `longitude` varchar(1000) DEFAULT NULL,
  `elevation` varchar(1000) DEFAULT NULL,
  `continent` varchar(1000) DEFAULT NULL,
  `iso_country` varchar(1000) DEFAULT NULL,
  `iso_region` varchar(1000) DEFAULT NULL,
  `municipality` varchar(1000) DEFAULT NULL,
  `scheduled_service` varchar(1000) DEFAULT NULL,
  `gps_code` varchar(1000) DEFAULT NULL,
  `iata_code` varchar(1000) DEFAULT NULL,
  `local_code` varchar(1000) DEFAULT NULL,
  `home_link` varchar(1000) DEFAULT NULL,
  `wikipedia_link` varchar(1000) DEFAULT NULL,
  `keywords` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `airports_name_idx` (`name`),
  FULLTEXT KEY `airpots_municipality_idx` (`municipality`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airports`
--
-- WHERE:  iso_region='US-RI'

LOCK TABLES `airports` WRITE;
/*!40000 ALTER TABLE `airports` DISABLE KEYS */;
INSERT INTO `airports` VALUES (7006,'08R','small_airport','Richmond Airport','41.489498138427734','-71.62059783935547','130','NA','US','US-RI','West Kingston','no','08R',NULL,'08R',NULL,NULL,NULL),(9273,'29RI','heliport','Vaucluse Farm Heliport','41.542198181152344','-71.23609924316406','40','NA','US','US-RI','Portsmouth','no','29RI',NULL,'29RI',NULL,NULL,NULL),(9739,'2RI7','heliport','Malbone Estate Heliport','41.506401062','-71.3113021851','83','NA','US','US-RI','Newport','no','2RI7',NULL,'2RI7',NULL,NULL,NULL),(13870,'75RI','heliport','Hopedene Heliport','41.480499267578125','-71.29720306396484','64','NA','US','US-RI','Newport','no','75RI',NULL,'75RI',NULL,NULL,NULL),(16500,'KBID','small_airport','Block Island State Airport','41.1680984497','-71.577796936','108','NA','US','US-RI','Block Island','yes','KBID','BID','BID','http://www.blockislandri.net/blockislandairport.htm','http://en.wikipedia.org/wiki/Block_Island_State_Airport',NULL),(300161,'KNLW','heliport','Naval Station Newport Helipad','41.5038888889','-71.3258333333','1','NA','US','US-RI','Newport','no','KNLW',NULL,NULL,NULL,NULL,NULL),(3753,'KOQU','medium_airport','Quonset State Airport','41.597099304199','-71.412101745605','18','NA','US','US-RI','North Kingstown','no','KOQU','NCO','OQU',NULL,'http://en.wikipedia.org/wiki/Quonset_State_Airport','Quonset Point NAS'),(3795,'KPVD','medium_airport','Theodore Francis Green State Airport','41.732601165771484','-71.42040252685547','55','NA','US','US-RI','Providence','yes','KPVD','PVD','PVD',NULL,'http://en.wikipedia.org/wiki/T._F._Green_Airport',NULL),(21060,'KSFZ','small_airport','North Central State Airport','41.9207992554','-71.49140167239999','441','NA','US','US-RI','Pawtucket','no','KSFZ','SFZ','SFZ',NULL,'http://en.wikipedia.org/wiki/North_Central_State_Airport',NULL),(21305,'KUUU','small_airport','Newport State Airport','41.5323982239','-71.28150177','172','NA','US','US-RI','Newport','no','KUUU','NPT','UUU',NULL,'http://en.wikipedia.org/wiki/Newport_State_Airport_(Rhode_Island)',NULL),(21382,'KWST','small_airport','Westerly State Airport','41.3496017456','-71.8033981323','81','NA','US','US-RI','Westerly','yes','KWST','WST','WST',NULL,'http://en.wikipedia.org/wiki/Westerly_State_Airport',NULL),(24341,'RI01','heliport','Kent County Memorial Hospital Heliport','41.70539855957031','-71.47699737548828','104','NA','US','US-RI','Warwick','no','RI01',NULL,'RI01',NULL,NULL,NULL),(45776,'RI02','heliport','Grayrock Ridge Heliport','41.949311','-71.415397','314','NA','US','US-RI','Cumberland','no','RI02',NULL,'RI02',NULL,NULL,NULL),(24342,'RI05','heliport','Port Edgewood Marine Heliport','41.78310012817383','-71.3917007446289','10','NA','US','US-RI','Cranston','no','RI05',NULL,'RI05',NULL,NULL,NULL),(24343,'RI06','seaplane_base','Tiverton Seaplane Base','41.64820098876953','-71.15390014648438','205','NA','US','US-RI','Tiverton','no','RI06',NULL,'RI06',NULL,NULL,NULL),(24344,'RI07','small_airport','Wing-Over Farm Airport','41.57899856567383','-71.1417007446289','113','NA','US','US-RI','Tiverton','no','RI07',NULL,'RI07',NULL,NULL,NULL),(24345,'RI08','heliport','South County Hospital Heliport','41.43090057373047','-71.49590301513672','38','NA','US','US-RI','Wakefield','no','RI08',NULL,'RI08',NULL,NULL,NULL),(24346,'RI09','heliport','Portsmouth Ramada Heliport','41.63199996948242','-71.24030303955078','50','NA','US','US-RI','Portsmouth','no','RI09',NULL,'RI09',NULL,NULL,NULL),(24347,'RI11','small_airport','Riconn Airport','41.696800231933594','-71.78369903564453','385','NA','US','US-RI','Greene','no','RI11',NULL,'RI11',NULL,NULL,NULL),(24348,'RI12','heliport','Quonset State Air Reserve National Guard Helipad','41.5994987488','-71.4167022705','18','NA','US','US-RI','North Kingstown','no','RI12',NULL,'RI12',NULL,NULL,NULL),(24349,'RI13','heliport','Foxridge Farm Heliport','41.49449920654297','-71.55619812011719','140','NA','US','US-RI','West Kingston','no','RI13',NULL,'RI13',NULL,NULL,NULL),(24350,'RI14','heliport','H. Chambers Cadillac Heliport','41.792301177978516','-71.41729736328125','40','NA','US','US-RI','Providence','no','RI14',NULL,'RI14',NULL,NULL,NULL),(24351,'RI15','heliport','One Hospital Trust Heliport','41.825401306152344','-71.41010284423828','406','NA','US','US-RI','Providence','no','RI15',NULL,'RI15',NULL,NULL,NULL),(24352,'RI16','balloonport','Keskinen Balloonport','41.71480178833008','-71.63729858398438','255','NA','US','US-RI','Coventry Center','no','RI16',NULL,'RI16',NULL,NULL,NULL),(24353,'RI20','small_airport','Mystery Farm Airport','41.739498138427734','-71.52449798583984','310','NA','US','US-RI','Cranston','no','RI20',NULL,'RI20',NULL,NULL,NULL),(24354,'RI21','heliport','Goat Island Heliport','41.48820114135742','-71.3279037475586','8','NA','US','US-RI','Newport','no','RI21',NULL,'RI21',NULL,NULL,NULL),(24355,'RI22','heliport','Capital Center Heliport','41.82899856567383','-71.4136962890625','36','NA','US','US-RI','Providence','no','RI22',NULL,'RI22',NULL,NULL,NULL),(24356,'RI23','heliport','Westerly Hospital Heliport','41.36259841918945','-71.82369995117188','120','NA','US','US-RI','Westerly','no','RI23',NULL,'RI23',NULL,NULL,NULL),(24357,'RI24','heliport','Duke Heliport','41.45589828491211','-71.30509948730469','34','NA','US','US-RI','Newport','no','RI24',NULL,'RI24',NULL,NULL,NULL),(24358,'RI25','heliport','Rhode Island Hospital Heliport','41.810699462890625','-71.40889739990234','22','NA','US','US-RI','Providence','no','RI25',NULL,'RI25',NULL,NULL,NULL),(24359,'RI26','heliport','Landmark Medical Center Heliport','42.00429916381836','-71.49420166015625','202','NA','US','US-RI','Woonsocket','no','RI26',NULL,'RI26',NULL,NULL,NULL),(24360,'RI28','seaplane_base','Plouffe Landing Seaplane Base','41.87530136','-71.59030151','328','NA','US','US-RI','Glocester','no','RI28',NULL,'RI28',NULL,NULL,NULL),(24361,'RI30','heliport','East Arnolda Farm Heliport','41.3787','-71.641218','30','NA','US','US-RI','Charlestown','no','RI30',NULL,'RI30',NULL,NULL,NULL),(24362,'RI9','heliport','Downtown Providence Helistop','41.82419967651367','-71.40859985351562','7','NA','US','US-RI','Providence','no','RI9',NULL,'RI9',NULL,NULL,NULL),(312231,'US-0250','closed','Newport Naval Air Facility','41.53','-71.345','0','NA','US','US-RI','Gould Island','no',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `airports` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-23 16:52:17

