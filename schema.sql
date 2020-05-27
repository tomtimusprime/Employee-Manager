
-- ---
-- Table 'employees'
-- 
-- ---
DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

DROP TABLE IF EXISTS `employee`;
		
CREATE TABLE `employee` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` VARCHAR(30) NOT NULL,
  `role_id` INTEGER DEFAULT NULL,
  `manager_id` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'role'
-- 
-- ---

DROP TABLE IF EXISTS `role`;
		
CREATE TABLE `role` (
  `id` INTEGER AUTO_INCREMENT NOT NULL,
  `title` VARCHAR(30),
  `salary` INT,
  `department_id` INTEGER DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'department'
-- 
-- ---

DROP TABLE IF EXISTS `department`;
		
CREATE TABLE `department` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30),
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `employee` ADD FOREIGN KEY (role_id) REFERENCES `role` (`id`);
ALTER TABLE `employee` ADD FOREIGN KEY (manager_id) REFERENCES `employee` (`id`);
ALTER TABLE `role` ADD FOREIGN KEY (department_id) REFERENCES `department` (`id`);

