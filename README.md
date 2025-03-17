# fastSelectionProject

Esse projeto faz parte de um processo seletivo de estágio para a empresa Fast Soluções.


/colaboradores

Nessa página, temos inicialmente uma lista com todos os colaboradores e antigos colaboradores da empresa.
![image](https://github.com/user-attachments/assets/501debef-25d9-411e-b059-95ae31525730)

Caso o usuário aperte o botão "verificar" de algum colaborador, é possível ver o gráfico de barras de participação do colaborador nos workshops.
![image](https://github.com/user-attachments/assets/399e73ea-fe06-4a2d-85b7-bb872850dfd1)

Caso o usuário aperte o botão "NOVO COLABORADOR", aparece um formulário requerindo informações do nome e a data de chegada desse colaborador, para salvar ao banco de dados.
![image](https://github.com/user-attachments/assets/5332798b-9f27-4dcb-8cf1-9334e8cc9c60)

Caso o usuário aperte o botão "FIM DE UM COLABORADOR", aparece uma lista para selecionar e um botão para confirmar o colaborador que está desvinculado à empresa.
![image](https://github.com/user-attachments/assets/d3797eb1-8089-4c11-aff5-305d5449402c)


/Workshops

Nessa página, temos inicialmente uma lista com todos os workshops, suas datas de realizações e um botão de detalhes para cada um.
![image](https://github.com/user-attachments/assets/7bfd8fc2-1ed2-4143-862e-5db580563473)

Caso o usuário aperte o botão "DETALHES", aparecem mais informações sobre o workshop: uma descrição, os colaboradores participantes e um gráfico de pizza comparando quantos porcento participaram e quantos não.
![image](https://github.com/user-attachments/assets/9aebfc53-345a-4b65-af19-7db34743ffe3)

Caso o usuário aperte o botão "REGISTRAR WORKSHOP", aparece um formulário requerindo informações do nome, uma descrição, a data de realização e os colaboradores participantes desse workshop.
![image](https://github.com/user-attachments/assets/6a921ae4-4e20-4f71-8b76-b505f732e6b3)

-------------------------------------------------------------------------------------------------------

Para conseguir rodar esse projeto, primeiro pegue o código do github(usando "git clone https://github.com/LucasSilvaa0/fastSelectionProject.git"), depois precisamos dividir em 3 partes:

Frontend: entre na pasta "/client", use o comando "npm i ." e depois o comando "npm run dev". Para entrar no site, vá ao url "http://localhost:3000/".

Backend: entre na pasta "/server", use o comando "docker-compose up --build" e depois o comando "dotnet run".

Banco de dados: caso o banco de dados ainda não esteja com nenhuma tabela(acho que estará assim), conecte ao banco de dados no terminal usando "mysql -h localhost -u root -p fastSelectionDatabase", depois complete com a senha "Admin#123", depois crie as 3 tabelas com as funções a seguir:

"""
CREATE TABLE Colaborador (
	id int PRIMARY KEY auto_increment,
    nome VARCHAR(50),
    data_inicial date,
    data_final date
);

CREATE TABLE Workshop (
	id int PRIMARY KEY auto_increment,
    nome VARCHAR(50),
    data_realizacao date,
    descricao text
);

CREATE TABLE Presenca (
	id_colaborador int,
    id_workshop int,
    PRIMARY KEY (id_colaborador, id_workshop),
    CONSTRAINT FOREIGN KEY (id_colaborador) REFERENCES Colaborador(id),
    CONSTRAINT FOREIGN KEY (id_workshop) REFERENCES Workshop(id)
);
"""

Para fazer um povoamento das tabelas, use os comandos a seguir:

"""

INSERT INTO Colaborador(nome, data_inicial, data_final) VALUES ("Lucas", "2025-03-14", "0001-01-01");
INSERT INTO Colaborador(nome, data_inicial, data_final) VALUES ("Helton", "2025-03-14", "0001-01-01");
INSERT INTO Colaborador(nome, data_inicial, data_final) VALUES ("Pedro", "2025-03-15", "0001-01-01");
INSERT INTO Colaborador(nome, data_inicial, data_final) VALUES ("Fast", "2025-03-16", "0001-01-01");

INSERT INTO Workshop(nome, data_realizacao, descricao) VALUES ("A matemática e a tecnologia", "2025-03-15", "Os estudos da matemática trazem a descobertas de grandes algoritmos e teorias que são muito utilizadas para tecnologia. Vamos conhecer algumas?");
INSERT INTO Workshop(nome, data_realizacao, descricao) VALUES ("Os estudos do dia a dia", "2025-03-16", "A tecnologia está sempre inovando, nunca pode ser parada!");
INSERT INTO Workshop(nome, data_realizacao, descricao) VALUES ("A inteligência artificial e o futuro", "2025-03-17", "Com o avanço das IAs, como será o mundo daqui a décadas?");

INSERT INTO Presenca(id_colaborador, id_workshop) VALUES (1,1);
INSERT INTO Presenca(id_colaborador, id_workshop) VALUES (2,1);
INSERT INTO Presenca(id_colaborador, id_workshop) VALUES (4,1);
INSERT INTO Presenca(id_colaborador, id_workshop) VALUES (1,2);
INSERT INTO Presenca(id_colaborador, id_workshop) VALUES (2,2);
INSERT INTO Presenca(id_colaborador, id_workshop) VALUES (1,3);
INSERT INTO Presenca(id_colaborador, id_workshop) VALUES (2,3);
INSERT INTO Presenca(id_colaborador, id_workshop) VALUES (3,3);
INSERT INTO Presenca(id_colaborador, id_workshop) VALUES (4,3);

"""
