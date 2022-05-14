-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema csc648
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `csc648` ;

-- -----------------------------------------------------
-- Schema csc648
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `csc648` DEFAULT CHARACTER SET utf8 ;
USE `csc648` ;

-- -----------------------------------------------------
-- Table `category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `category` ;

CREATE TABLE IF NOT EXISTS `category` (
  `category_id` INT UNSIGNED NOT NULL,
  `category_name` VARCHAR(45) NULL,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_username` VARCHAR(64) NULL,
  `user_fname` VARCHAR(64) NULL,
  `user_lname` VARCHAR(64) NULL,
  `user_email` VARCHAR(128) NULL,
  `user_registrationrecord` VARCHAR(16) NULL,
  `user_password` VARCHAR(64) NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_username_UNIQUE` (`user_username` ASC) VISIBLE,
  UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `item` ;

CREATE TABLE IF NOT EXISTS `item` (
  `item_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `item_seller_id` INT UNSIGNED NOT NULL,
  `item_category` INT UNSIGNED NOT NULL,
  `item_name` VARCHAR(64) NOT NULL,
  `item_desc` VARCHAR(2048) NULL,
  `item_price` DECIMAL(7,2) NOT NULL,
  `item_pic` VARCHAR(255) NOT NULL,
  `item_thumbnail` VARCHAR(255) NOT NULL,
  `item_created` DATETIME NOT NULL DEFAULT NOW(),
  `item_golive_time` DATETIME NULL,
  `item_course` VARCHAR(45) NULL,
  `item_postexpires` DATETIME NULL,
  `item_approved` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`item_id`),
  INDEX `category_fk_idx` (`item_category` ASC) VISIBLE,
  INDEX `seller_fk_idx` (`item_seller_id` ASC) VISIBLE,
  CONSTRAINT `item_category_fk`
    FOREIGN KEY (`item_category`)
    REFERENCES `category` (`category_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `item_seller_fk`
    FOREIGN KEY (`item_seller_id`)
    REFERENCES `user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `message` ;

CREATE TABLE IF NOT EXISTS `message` (
  `msg_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `msg_sender` INT UNSIGNED NULL,
  `msg_recipient` INT UNSIGNED NULL,
  `msg_meet_time` DATETIME NULL,
  `msg_location` VARCHAR(64) NULL,
  `msg_contactinfo` VARCHAR(45) NULL,
  `msg_body` VARCHAR(512) NULL,
  `msg_timestamp` DATETIME NULL DEFAULT NOW(),
  PRIMARY KEY (`msg_id`),
  INDEX `sender_FK_idx` (`msg_sender` ASC) VISIBLE,
  INDEX `recipient_FK_idx` (`msg_recipient` ASC) VISIBLE,
  CONSTRAINT `msg_sender_FK`
    FOREIGN KEY (`msg_sender`)
    REFERENCES `user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `msg_recipient_FK`
    FOREIGN KEY (`msg_recipient`)
    REFERENCES `user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `review`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `review` ;

CREATE TABLE IF NOT EXISTS `review` (
  `review_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `review_item` INT UNSIGNED NOT NULL,
  `review_recipient` INT UNSIGNED NOT NULL,
  `review_contributor` INT UNSIGNED NOT NULL,
  `review_rating` SMALLINT(1) NOT NULL,
  `review_body` VARCHAR(45) NULL,
  `review_timestamp` TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`review_id`),
  INDEX `review_item_FK_idx` (`review_item` ASC) VISIBLE,
  INDEX `review_recipient_FK_idx` (`review_recipient` ASC) VISIBLE,
  INDEX `review_contributor_FK_idx` (`review_contributor` ASC) VISIBLE,
  CONSTRAINT `review_item_FK`
    FOREIGN KEY (`review_item`)
    REFERENCES `item` (`item_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `review_recipient_FK`
    FOREIGN KEY (`review_recipient`)
    REFERENCES `user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `review_contributor_FK`
    FOREIGN KEY (`review_contributor`)
    REFERENCES `user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `itemmsgs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `itemmsgs` ;

CREATE TABLE IF NOT EXISTS `itemmsgs` (
  `im_item` INT UNSIGNED NOT NULL,
  `im_msg` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`im_item`, `im_msg`),
  INDEX `im_msg_FK_idx` (`im_msg` ASC) VISIBLE,
  CONSTRAINT `im_item_FK`
    FOREIGN KEY (`im_item`)
    REFERENCES `item` (`item_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `im_msg_FK`
    FOREIGN KEY (`im_msg`)
    REFERENCES `message` (`msg_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
