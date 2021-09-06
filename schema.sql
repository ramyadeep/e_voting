DROP TABLE voters;
CREATE TABLE voters(
    voterId INT PRIMARY KEY AUTO_INCREMENT,
    voterName VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(16),
    isVoted BOOLEAN DEFAULT FALSE
);


INSERT INTO voters (voterName,email,password) VALUES ('Ramyadeep Das','ramyadip97717@gmail.com','abcd1234');

DROP TABLE candidates;
CREATE TABLE candidates(
    candidateId INT PRIMARY KEY AUTO_INCREMENT,
    candidateName VARCHAR(50) NOT NULL,
    candidateParty VARCHAR(50) NOT NULL,
    description VARCHAR(100),
    gender ENUM('M','F') DEFAULT 'M'
);


DROP TABLE casting_chain;
CREATE TABLE casting_chain(
    id INT PRIMARY KEY AUTO_INCREMENT,
    record TEXT,
    castingTime TIMESTAMP DEFAULT NOW(),
    hash VARCHAR(100),
    previousHash VARCHAR(100),
    nonce BIGINT
);

