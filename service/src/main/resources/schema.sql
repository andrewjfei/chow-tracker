CREATE TABLE IF NOT EXISTS user (
    id              VARCHAR(60)     DEFAULT     RANDOM_UUID()   PRIMARY KEY,
    username        VARCHAR(32)     NOT NULL    UNIQUE,
    first_name      VARCHAR(16)     NOT NULL,
    last_name       VARCHAR(16)     NOT NULL,
    email           VARCHAR(64)     NOT NULL    UNIQUE,
    password        VARCHAR(128)    NOT NULL,
    created         DATETIME        NOT NULL
);

CREATE TABLE IF NOT EXISTS chow (
    id              VARCHAR(60)     DEFAULT     RANDOM_UUID()   PRIMARY KEY,
    user_id         VARCHAR(60)     NOT NULL,
    name            VARCHAR(16)     NOT NULL    UNIQUE,
    cuisine         ENUM            (
                                                'OTHER',
                                                'CHINESE',
                                                'KOREAN',
                                                'MEXICAN',
                                                'ITALIAN',
                                                'JAPANESE',
                                                'GREEK',
                                                'THAI',
                                                'INDIAN',
                                                'AMERICAN'
                                    )           DEFAULT         'OTHER',
    price_range     ENUM            (
                                                'LOW',
                                                'MEDIUM',
                                                'HIGH'
                                    )           DEFAULT         'LOW',
    area            ENUM            (
                                                'EAST_AUCKLAND',
                                                'SOUTH_AUCKLAND',
                                                'NORTH_AUCKLAND',
                                                'WEST_AUCKLAND',
                                                'CENTRAL_AUCKLAND',
                                                'HAMILTON',
                                                'CHRISTCHURCH'
                                    )           DEFAULT         'CENTRAL_AUCKLAND',
    has_been        INT             NOT NULL,
    created         DATETIME        NOT NULL,
    FOREIGN KEY     (user_id)       REFERENCES  user(id)
);
