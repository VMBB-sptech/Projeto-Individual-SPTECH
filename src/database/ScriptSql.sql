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
(DEFAULT, 1, "veryHard", 9, 1, 120.25, DEFAULT),
(DEFAULT, 1, "Hard", 10, 0, 40, DEFAULT),
(DEFAULT, 1, "Normal", 7, 3, 12, DEFAULT),
(DEFAULT, 2, "veryHard", 6, 4, 82.25, DEFAULT),
(DEFAULT, 2, "Hard", 8, 2, 32, DEFAULT),
(DEFAULT, 2, "Normal", 10, 0, 20, DEFAULT);
