-- Active: 1772210126809@@localhost@3307@projindividual
-- criação do database
CREATE DATABASE projIndividual;
USE projIndividual;

-- criação das tabelas
CREATE TABLE usuario (
id INT PRIMARY KEY AUTO_INCREMENT, 
nome VARCHAR(45), 
email VARCHAR(45), 
senha VARCHAR(45)
);

CREATE TABLE tentativa (
id INT PRIMARY KEY AUTO_INCREMENT, 
fkUsuario INT,
dificuldade VARCHAR(12), 
acertos INT,
erros INT, 
playerPoints DECIMAL(5,2), 
data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fkUsuarioid FOREIGN KEY (fkUsuario) REFERENCES usuario (id)
);

-- Select para testes
SELECT * FROM usuario;
SELECT * FROM tentativa;

-- Criando Inserts em usuarios
INSERT INTO usuario VALUES
(DEFAULT, "Victor Mendes", "Victormbbertolino@gmail.com", "senhaDahora"),
(DEFAULT, "Julio Cesar", "julioCesarFalcao@gmail.com", "umaSenhaPlaceholderBemLegal");

INSERT INTO tentativa VALUES
(DEFAULT, 1, "normal", 2, 8, 4.50, DEFAULT),
(DEFAULT, 1, "normal", 5, 5, 12.25, DEFAULT),
(DEFAULT, 1, "normal", 8, 2, 36.50, DEFAULT),
(DEFAULT, 1, "hard", 8, 2, 35.00, DEFAULT),
(DEFAULT, 1, "hard", 8, 2, 43.00, DEFAULT),
(DEFAULT, 1, "hard", 9, 1, 49.50, DEFAULT),
(DEFAULT, 1, "veryHard", 6, 4, 40, DEFAULT),
(DEFAULT, 1, "veryHard", 7, 3, 73.75, DEFAULT),
(DEFAULT, 1, "veryHard", 9, 1, 138.75, DEFAULT);
