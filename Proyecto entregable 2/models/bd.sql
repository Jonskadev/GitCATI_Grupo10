-- MySQL Script generated by MySQL Workbench
-- 11/07/16 04:56:33
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema test
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `test`;
-- -----------------------------------------------------
-- Schema test
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8 ;
USE `test` ;

-- -----------------------------------------------------
-- Table `test`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`Usuario` (
  `username` VARCHAR(15) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `permiso` TINYINT(1) NOT NULL,
  PRIMARY KEY (`username`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`Estado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`Estado` (
  `state_name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`state_name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`Llamada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`Llamada` (
  `idLlamada` INT NOT NULL,
  `username` VARCHAR(15) NOT NULL,
  `state_name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idLlamada`),
  INDEX `fk_Llamada_Usuario1_idx` (`username` ASC),
  INDEX `fk_Llamada_Estado1_idx` (`state_name` ASC),
  CONSTRAINT `fk_Llamada_Usuario1`
    FOREIGN KEY (`username`)
    REFERENCES `test`.`Usuario` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Llamada_Estado1`
    FOREIGN KEY (`state_name`)
    REFERENCES `test`.`Estado` (`state_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`Encuestado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`Encuestado` (
  `rut` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `telefono` VARCHAR(45) NOT NULL,
  `idLlamada` INT NOT NULL,
  PRIMARY KEY (`rut`),
  INDEX `fk_Encuestado_Llamada1_idx` (`idLlamada` ASC),
  CONSTRAINT `fk_Encuestado_Llamada1`
    FOREIGN KEY (`idLlamada`)
    REFERENCES `test`.`Llamada` (`idLlamada`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`Proyecto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`Proyecto` (
  `idProyecto` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idProyecto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`Encuesta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`Encuesta` (
  `idEncuesta` INT NOT NULL,
  `idProyecto` INT NOT NULL,
  `link` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEncuesta`, `idProyecto`),
  INDEX `fk_Encuesta_Proyecto1_idx` (`idProyecto` ASC),
  CONSTRAINT `fk_Encuesta_Proyecto1`
    FOREIGN KEY (`idProyecto`)
    REFERENCES `test`.`Proyecto` (`idProyecto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `test`.`Encuesta-Encuestado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `test`.`Encuesta-Encuestado` (
  `Encuestado_rut` INT NOT NULL,
  `Encuesta_id-Encuesta` INT NOT NULL,
  PRIMARY KEY (`Encuestado_rut`, `Encuesta_id-Encuesta`),
  INDEX `fk_Encuestado_has_Encuesta_Encuesta1_idx` (`Encuesta_id-Encuesta` ASC),
  INDEX `fk_Encuestado_has_Encuesta_Encuestado1_idx` (`Encuestado_rut` ASC),
  CONSTRAINT `fk_Encuestado_has_Encuesta_Encuestado1`
    FOREIGN KEY (`Encuestado_rut`)
    REFERENCES `test`.`Encuestado` (`rut`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Encuestado_has_Encuesta_Encuesta1`
    FOREIGN KEY (`Encuesta_id-Encuesta`)
    REFERENCES `test`.`Encuesta` (`idEncuesta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
