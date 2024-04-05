-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.36 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- test 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `test`;

-- 테이블 test.es_sns_board 구조 내보내기
CREATE TABLE IF NOT EXISTS `es_sns_board` (
  `BOARDNO` int NOT NULL AUTO_INCREMENT,
  `USERID` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TITLE` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CONTENTS` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `HIT` int NOT NULL DEFAULT '0',
  `LIKE` int NOT NULL DEFAULT '0',
  `KIND` varchar(50) DEFAULT NULL,
  `CDATETIME` datetime DEFAULT NULL,
  `UDATETIME` datetime DEFAULT NULL,
  PRIMARY KEY (`BOARDNO`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 test.es_sns_board:~11 rows (대략적) 내보내기
INSERT INTO `es_sns_board` (`BOARDNO`, `USERID`, `TITLE`, `CONTENTS`, `HIT`, `LIKE`, `KIND`, `CDATETIME`, `UDATETIME`) VALUES
	(1, 'TEST', '제목으로두긴했는데여기가능하면사진링크를넣고싶은데말이야', '인스타보면설명은여기대충나오는거잖아요', 0, 0, '1', '2024-04-04 14:33:45', '2024-04-04 14:33:45'),
	(2, 'TEST', 'etew', 'vbcxzb', 0, 0, '1', '2024-04-04 15:05:26', '2024-04-04 15:05:26'),
	(3, 'TEST', 'etew', 'vbcxzb', 0, 0, '1', '2024-04-04 15:05:26', '2024-04-04 15:05:26'),
	(4, 'TEST', 'etew', 'vbcxzb', 0, 0, '1', '2024-04-04 15:05:26', '2024-04-04 15:05:26'),
	(5, 'TEST', 'etew', 'vbcxzb', 0, 0, '1', '2024-04-04 15:05:27', '2024-04-04 15:05:27'),
	(6, 'TEST', 'etew', 'vbcxzb', 0, 0, '1', '2024-04-04 15:05:27', '2024-04-04 15:05:27'),
	(7, 'TEST', 'etew', 'vbcxzb', 0, 0, '1', '2024-04-04 15:05:27', '2024-04-04 15:05:27'),
	(8, 'SET', 'etew', 'vbcxzb', 0, 0, '1', '2024-04-04 15:05:27', '2024-04-04 15:05:27'),
	(9, 'TEST', 'etew', 'vbcxzb', 0, 0, '1', '2024-04-04 15:05:27', '2024-04-04 15:05:27'),
	(10, 'TEST', 'etew', 'vbcxzb', 0, 0, '1', '2024-04-04 15:05:27', '2024-04-04 15:05:27'),
	(11, 'TEST', 'etew', 'vbcxzb', 0, 0, '1', '2024-04-04 15:05:27', '2024-04-04 15:05:27');

-- 테이블 test.es_sns_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `es_sns_user` (
  `USERID` varchar(50) NOT NULL,
  `PWD` varchar(50) NOT NULL,
  `USERNAME` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ADDR` varchar(50) NOT NULL,
  `AGE` int DEFAULT NULL,
  `PHONE1` varchar(50) DEFAULT NULL,
  `PHONE2` varchar(50) DEFAULT NULL,
  `PHONE3` varchar(50) DEFAULT NULL,
  `FOLLOWER` int NOT NULL DEFAULT '0',
  `FOLLOWING` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 test.es_sns_user:~1 rows (대략적) 내보내기
INSERT INTO `es_sns_user` (`USERID`, `PWD`, `USERNAME`, `ADDR`, `AGE`, `PHONE1`, `PHONE2`, `PHONE3`, `FOLLOWER`, `FOLLOWING`) VALUES
	('TEST', '1234', '사람이름이 이렇게 길 수가 있어요? 진짜 레전드', '어딘가', 22, '010', '5444', '5444', 200, 178);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
