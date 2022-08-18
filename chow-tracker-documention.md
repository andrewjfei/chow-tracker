# Chow Tracker Documentation

---

## What is Chow Tracker?



### Features

- Protected API



## Technology Stack

- Java (Spring Boot) - Java 17
  - Maven
    - spring-boot-starter (Logging & Auto Configuration Support)
    - spring-boot-starter-data-jpa (JPA & Hibernate)
    - spring-boot-starter-web (Spring MVC)
    - spring-security-core (Spring Security Core)
    - java-jwt (JWT)
    - h2 (H2)
    - spring-boot-starter-test (JUnit & Mockito)
- Javascript (React.js) - ES6
  - Redux Toolkit
- SQL Database (MySQL)

### JPA & Hibernate

Hibernate provides ORM (Object Relational Mapping). 
This allows easy and simple mapping between Java objects and database tables.

JPA (Java Persistence API) provides annotations and APIs for a variety of database tasks.
This includes methods for persisting and fetching data from the database.

### Spring MVC

Spring MVC provides annotations for rest controllers.

### Spring Security Core

Spring Security Core provides classes to encode passwords and to verify them.

### JWT

### H2

### JUnit & Mockito

## Architecture Design



### Database Schemas

```mysql
-- User Table
| id          | username    | first_name  | last_name   | email       | password     | created  |
| ----------- | ----------- | ----------- | ----------- | ----------- | ------------ | -------- |
| VARCHAR(60) | VARCHAR(32) | VARCHAR(16) | VARCHAR(16) | VARCHAR(64) | VARCHAR(128) | DATETIME |

-- Chow Table
| id          | user_id     | name        | cuisine | price_range | area | has_been | created  |
| ----------- | ----------- | ----------- | ------- | ----------- | ---- | -------- | -------- |
| VARCHAR(60) | VARCHAR(60) | VARCHAR(32) | ENUM    | ENUM        | ENUM | INT      | DATETIME |
```



### REST APIs



#### Register

| HTTP Request/Response | Value                                          |
| --------------------- | ---------------------------------------------- |
| **HTTP Method**       | POST                                           |
| **URI**               | /api/user                                      |
| **Headers**           | -                                              |
| **Query Params**      | -                                              |
| **Request Body**      | username, firstName, lastName, email, password |
| **Response Body**     | username, firstName, lastName, email, token    |
| **Response Status**   | `201 CREATED`,  `400 BAD_REQUEST`              |



#### Login

| HTTP Request/Response | Value                                       |
| --------------------- | ------------------------------------------- |
| **HTTP Method**       | GET                                         |
| **URI**               | /api/auth/login                             |
| **Headers**           | -                                           |
| **Query Params**      | -                                           |
| **Request Body**      | username, email, password                   |
| **Response Body**     | username, firstName, lastName, email, token |
| **Response Status**   | `200 OK`,  `401 UNAUTHORIZED`               |



#### Retrieve Chow List

| HTTP Request/Response | Value                                                        |
| --------------------- | ------------------------------------------------------------ |
| **HTTP Method**       | GET                                                          |
| **URI**               | /api/chow                                                    |
| **Headers**           | Authorization                                                |
| **Query Params**      | -                                                            |
| **Request Body**      | searchString, filters (cuisineList, priceRangeList, areaList) |
| **Response Body**     | chowList                                                     |
| **Response Status**   | `200 OK`,  `400 BAD_REQUEST`,  `401 UNAUTHORIZED`            |



#### Create Chow

| HTTP Request/Response | Value                                             |
| --------------------- | ------------------------------------------------- |
| **HTTP Method**       | POST                                              |
| **URI**               | /api/chow                                         |
| **Headers**           | Authorization                                     |
| **Query Params**      | -                                                 |
| **Request Body**      | name, cuisine, priceRange, area                   |
| **Response Body**     | -                                                 |
| **Response Status**   | `201 OK`,  `400 BAD_REQUEST`,  `401 UNAUTHORIZED` |



#### Update Chow

| HTTP Request/Response | Value                                             |
| --------------------- | ------------------------------------------------- |
| **HTTP Method**       | PUT                                               |
| **URI**               | /api/chow/{chowId}                                |
| **Headers**           | Authorization                                     |
| **Query Params**      | -                                                 |
| **Request Body**      | name, cuisine, priceRange, area                   |
| **Response Body**     | -                                                 |
| **Response Status**   | `200 OK`,  `400 BAD_REQUEST`,  `401 UNAUTHORIZED` |



#### Delete Chow

| HTTP Request/Response | Value                                             |
| --------------------- | ------------------------------------------------- |
| **HTTP Method**       | DELETE                                            |
| **URI**               | /api/chow/{chowId}                                |
| **Headers**           | Authorization                                     |
| **Query Params**      | -                                                 |
| **Request Body**      | -                                                 |
| **Response Body**     | -                                                 |
| **Response Status**   | `200 OK`,  `400 BAD_REQUEST`,  `401 UNAUTHORIZED` |



#### Retrieve Chow List Popularity Ranking

| HTTP Request/Response | Value                                             |
| --------------------- | ------------------------------------------------- |
| **HTTP Method**       | GET                                               |
| **URI**               | /api/chow/ranking/popularity                      |
| **Headers**           | Authorization                                     |
| **Query Params**      | limit                                             |
| **Request Body**      | -                                                 |
| **Response Body**     | chowList                                          |
| **Response Status**   | `200 OK`,  `400 BAD_REQUEST`,  `401 UNAUTHORIZED` |



#### Retrieve Chow List Cuisine Ranking

| HTTP Request/Response | Value                                             |
| --------------------- | ------------------------------------------------- |
| **HTTP Method**       | GET                                               |
| **URI**               | /api/chow/ranking/cuisine                         |
| **Headers**           | Authorization                                     |
| **Query Params**      | limit                                             |
| **Request Body**      | -                                                 |
| **Response Body**     | chowList                                          |
| **Response Status**   | `200 OK`,  `400 BAD_REQUEST`,  `401 UNAUTHORIZED` |



#### Retrieve Chow List Price Range Ranking

| HTTP Request/Response | Value                                             |
| --------------------- | ------------------------------------------------- |
| **HTTP Method**       | GET                                               |
| **URI**               | /api/chow/ranking/price-range                     |
| **Headers**           | Authorization                                     |
| **Query Params**      | limit                                             |
| **Request Body**      | -                                                 |
| **Response Body**     | chowList                                          |
| **Response Status**   | `200 OK`,  `400 BAD_REQUEST`,  `401 UNAUTHORIZED` |



#### Retrieve Chow List Area Ranking

| HTTP Request/Response | Value                                             |
| --------------------- | ------------------------------------------------- |
| **HTTP Method**       | GET                                               |
| **URI**               | /api/chow/ranking/area                            |
| **Headers**           | Authorization                                     |
| **Query Params**      | limit                                             |
| **Request Body**      | -                                                 |
| **Response Body**     | chowList                                          |
| **Response Status**   | `200 OK`,  `400 BAD_REQUEST`,  `401 UNAUTHORIZED` |



#### Select Random Chow

| HTTP Request/Response | Value                                                        |
| --------------------- | ------------------------------------------------------------ |
| **HTTP Method**       | POST                                                         |
| **URI**               | /api/chow/random                                             |
| **Headers**           | Authorization                                                |
| **Query Params**      | -                                                            |
| **Request Body**      | searchString, filters (cuisineList, priceRangeList, areaList) |
| **Response Body**     | chow                                                         |
| **Response Status**   | `200 OK`,  `400 BAD_REQUEST`,  `401 UNAUTHORIZED`            |



### UI/UX Design

