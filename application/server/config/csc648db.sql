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
  `first_name` VARCHAR(255) NULL,
  `last_name` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `item` ;

CREATE TABLE IF NOT EXISTS `item` (
  `item_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `item_name` VARCHAR(45) NOT NULL,
  `item_desc` VARCHAR(255) NULL,
  `item_price` DECIMAL(7,2) NOT NULL,
  `item_pic` VARCHAR(255) NULL,
  `item_category` INT UNSIGNED NULL,
  `seller_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`item_id`),
  INDEX `category_fk_idx` (`item_category` ASC) VISIBLE,
  INDEX `seller_fk_idx` (`seller_id` ASC) VISIBLE,
  UNIQUE INDEX `item_pic_UNIQUE` (`item_pic` ASC) VISIBLE,
  CONSTRAINT `category_fk`
    FOREIGN KEY (`item_category`)
    REFERENCES `category` (`category_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `seller_fk`
    FOREIGN KEY (`seller_id`)
    REFERENCES `user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
