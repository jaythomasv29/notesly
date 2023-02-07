CREATE DATABASE IF NOT EXISTS blog;
SHOW DATABASES;
USE blog;

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL UNIQUE,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `img` VARCHAR(255)
);

DROP TABLE IF EXISTS posts;
CREATE TABLE IF NOT EXISTS posts (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `category` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `desc` VARCHAR(1000) NOT NULL,
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uid` INT NOT NULL,
  `img` VARCHAR(255),
  FOREIGN KEY (`uid`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- TEST INSERT and DELETE ON CASCADE WHEN A USER IS DELETED, ALL RELATED POSTS ARE DELETED
INSERT into users (username, email, password, img) VALUES ("james", "james@email.com", "james123", "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png");

INSERT INTO posts (`category`, `title`, `desc`, `uid`, `img`) VALUES ("Food", "Herbes de Provence Grilled Flank Steak
", "The herbs and spices used in Herbes de Provence are almost identical to those used in Italian seasoning — except for the addition of lavender. As a result, Herbes de Provence have a lovely, light floral aroma that perfectly complements steak.", 13, "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2017/5/2/0/FN_DASM-Herbes-de-Provence-Grilled-Flank-Steak_s4x3.jpg.rend.hgtvcom.966.725.suffix/1493749379639.jpeg");

INSERT INTO posts (`category`, `title`, `desc`, `uid`, `img`) VALUES ("Food", "Our Best Flank Steak Recipes
", "We love cooking with flank steak. It’s affordable, leaner than other cuts of beef and packed full of meaty flavor. Plus, it’s incredibly versatile. After cooking, slice against the grain (into thin strips) and it’s ready for tacos, salads, grain bowls and more.", 13, "https://media.istockphoto.com/id/628582456/photo/roast-duck-with-beetroot-sauce.jpg?s=612x612&w=0&k=20&c=Iyqga0db0TNbJQREMwbfKsOwO872Aw5O4sYCa3Qzzaw=");