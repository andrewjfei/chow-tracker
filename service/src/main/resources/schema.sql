CREATE TABLE IF NOT EXISTS user (
    id              VARCHAR(60)         DEFAULT     RANDOM_UUID()   PRIMARY KEY,
    username        VARCHAR(16)         NOT NULL    UNIQUE,
    first_name      VARCHAR(16)         NOT NULL,
    last_name       VARCHAR(16)         NOT NULL,
    email           VARCHAR(64)         NOT NULL    UNIQUE,
    password        VARCHAR(128)        NOT NULL,
    created         DATETIME            NOT NULL
);