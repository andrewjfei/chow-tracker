# Chow Tracker Documentation

## Table of Contents

- [What is Chow Tracker](#what-is-chow-tracker)
  - [Features](#features)
  - [Future Plans](#future-plans)
- [Technology Stack](#technology-stack)
- [Architecture Design](#architecture-design)
  - [Database Schemas](#database-schemas)
  - [REST APIs](#rest-apis)
- [UI/UX Design](#uiux-design)
- [Running Locally](#running-locally)
  - [Running the Server](#running-the-server-using-intellij)
  - [Running the Client](#running-the-client)

## What is Chow Tracker?

Chow Tracker is a simple web application to help you track and decide your next meal. It provides a simple overview of your most visited chow venues to help you understand your current food choices, while also providing a storage system to help you track all the chow venues you have been to or is on your wishlist. A unique feautre that Chow Tracker provides, is a custom randomiser, to help you decide which chow venue you should go to for you next meal.

### Features

- Protected API
- Authentication
- Input Validation
- Chow Ranking List
- Chow List
- Chow Randomiser
- Visit Chow

### Future Plans

- Chow Audit History
- Add Chow Pictures
- Create Lists
- Share List
  ...

## Technology Stack

- **Java (Spring Boot)** - Java 17
  - Maven
    - spring-boot-starter (Logging & Auto Configuration Support)
    - spring-boot-starter-data-jpa (JPA & Hibernate)
    - spring-boot-starter-web (Spring MVC)
    - spring-security-core (Spring Security Core)
    - java-jwt (JWT)
    - h2 (H2)
    - spring-boot-starter-test (JUnit & Mockito)
    - mockito-inline (Mockito)
    - httpclient (Http Client)
- **Javascript (React.js)** - ES6
  - Ant Design
  - React Router
  - Redux Toolkit
- **SQL Database (MySQL)**

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

<table>
  
<tr>
  <td> <b>HTTP Method</b> </td> 
  <td> POST </td>
</tr>
  
<tr>
  <td> <b>URI</b> </td> 
  <td> /api/auth/register </td>
</tr>
  
<tr>
  <td> <b>Headers</b> </td> 
  <td> - </td>
</tr>
  
<tr>
  <td> <b>Query Params</b> </td> 
  <td> - </td>
</tr>
  
<tr>
  <td> <b>Request Body</b> </td>
  <td>
    
```json
{
  "username": "bobbyjones",
  "firstName": "Bobby",
  "lastName": "Jones",
  "email": "bobbyjones@test.com",
  "password": "PASSWORD",
  "confirmedPassword": "PASSWORD"
}
```
  </td>
</tr>
  
<tr>
  <td> <b>Response Body</b> </td>
  <td>
    
```json
{
  "username": "bobbyjones",
  "firstName": "Bobby",
  "lastName": "Jones",
  "email": "bobbyjones@test.com",
  "token": "TOKEN"
}
```

  </td>
</tr>
  
<tr>
  <td> <b>Response Status</b> </td> 
  <td> <code>201 CREATED</code>,  <code>400 BAD_REQUEST</code> </td>
</tr>
  
</table>

#### Login

<table>
  
<tr>
  <td> <b>HTTP Method</b> </td> 
  <td> POST </td>
</tr>
  
<tr>
  <td> <b>URI</b> </td> 
  <td> /api/auth/login </td>
</tr>
  
<tr>
  <td> <b>Headers</b> </td> 
  <td> - </td>
</tr>
  
<tr>
  <td> <b>Query Params</b> </td> 
  <td> - </td>
</tr>
  
<tr>
  <td> <b>Request Body</b> </td>
  <td>
    
```json
{
  "username": "bobbyjones",
  "email": "bobbyjones@test.com",
  "password": "PASSWORD"
}
```
  </td>
</tr>
  
<tr>
  <td> <b>Response Body</b> </td>
  <td>
    
```json
{
  "username": "bobbyjones",
  "firstName": "Bobby",
  "lastName": "Jones",
  "email": "bobbyjones@test.com",
  "token": "TOKEN"
}
```

  </td>
</tr>
  
<tr>
  <td> <b>Response Status</b> </td> 
  <td> <code>201 CREATED</code>,  <code>401 UNAUTHORIZED</code> </td>
</tr>
  
</table>

#### Retrieve Chow List

<table>

<tr>
  <td> <b>HTTP Method</b> </td> 
  <td> GET </td>
</tr>

<tr>
  <td> <b>URI</b> </td> 
  <td> /api/chow </td>
</tr>

<tr>
  <td> <b>Headers</b> </td> 
  <td> Authorization </td>
</tr>

<tr>
  <td> <b>Query Params</b> </td> 
  <td> searchString, cuisineList, priceRangeList, areaList </td>
</tr>

<tr>
  <td> <b>Request Body</b> </td>
  <td> - </td>
</tr>

<tr>
  <td> <b>Response Body</b> </td>
  <td>

```json
[
  {
    "id": "ID",
    "name": "Stomp Chomp",
    "cuisine": "AMERICAN",
    "priceRange": "LOW",
    "area": "CENTRAL_AUCKLAND"
  },
  {
    "id": "ID",
    "name": "Lamire Zire",
    "cuisine": "GREEK",
    "priceRange": "HIGH",
    "area": "CENTRAL_AUCKLAND"
  },
  {
    "id": "ID",
    "name": "Dumpling Galore",
    "cuisine": "CHINESE",
    "priceRange": "MEDIUM",
    "area": "EAST_AUCKLAND"
  }
]
```

  </td>
</tr>

<tr>
  <td> <b>Response Status</b> </td> 
  <td> <code>201 CREATED</code>,  <code>400 BAD_REQUEST</code>, <code>401 UNAUTHORIZED</code> </td>
</tr>

</table>

#### Create Chow

<table>

<tr>
  <td> <b>HTTP Method</b> </td> 
  <td> POST </td>
</tr>

<tr>
  <td> <b>URI</b> </td> 
  <td> /api/chow </td>
</tr>

<tr>
  <td> <b>Headers</b> </td> 
  <td> Authorization </td>
</tr>

<tr>
  <td> <b>Query Params</b> </td> 
  <td> - </td>
</tr>

<tr>
  <td> <b>Request Body</b> </td>
  <td>

```json
{
  "name": "Stomp Chomp",
  "cuisine": "AMERICAN",
  "priceRange": "LOW",
  "area": "CENTRAL_AUCKLAND"
}
```

  </td>
</tr>

<tr>
  <td> <b>Response Body</b> </td>
  <td>

```json
{
  "id": "ID",
  "name": "Stomp Chomp",
  "cuisine": "AMERICAN",
  "priceRange": "LOW",
  "area": "CENTRAL_AUCKLAND"
}
```

  </td>
</tr>

<tr>
  <td> <b>Response Status</b> </td> 
  <td> <code>201 CREATED</code>,  <code>400 BAD_REQUEST</code>, <code>401 UNAUTHORIZED</code> </td>
</tr>

</table>

#### Update Chow

| HTTP Request/Response | Value                                           |
| --------------------- | ----------------------------------------------- |
| **HTTP Method**       | PUT                                             |
| **URI**               | /api/chow/{chowId}                              |
| **Headers**           | Authorization                                   |
| **Query Params**      | -                                               |
| **Request Body**      | name, cuisine, priceRange, area                 |
| **Response Body**     | -                                               |
| **Response Status**   | `200 OK`, `400 BAD_REQUEST`, `401 UNAUTHORIZED` |

<table>

<tr>
  <td> <b>HTTP Method</b> </td> 
  <td> PUT </td>
</tr>

<tr>
  <td> <b>URI</b> </td> 
  <td> /api/chow/{chowId} </td>
</tr>

<tr>
  <td> <b>Headers</b> </td> 
  <td> Authorization </td>
</tr>

<tr>
  <td> <b>Query Params</b> </td> 
  <td> - </td>
</tr>

<tr>
  <td> <b>Request Body</b> </td>
  <td>

```json
{
  "name": "Stomp Chomp",
  "cuisine": "AMERICAN",
  "priceRange": "LOW",
  "area": "CENTRAL_AUCKLAND"
}
```

  </td>
</tr>

<tr>
  <td> <b>Response Body</b> </td>
  <td>

```json
{
  "id": "ID",
  "name": "Stomp Chomp",
  "cuisine": "AMERICAN",
  "priceRange": "LOW",
  "area": "CENTRAL_AUCKLAND"
}
```

  </td>
</tr>

<tr>
  <td> <b>Response Status</b> </td> 
  <td> <code>201 CREATED</code>,  <code>400 BAD_REQUEST</code>, <code>401 UNAUTHORIZED</code> </td>
</tr>

</table>

#### Delete Chow

<table>

<tr>
  <td> <b>HTTP Method</b> </td> 
  <td> DELETE </td>
</tr>

<tr>
  <td> <b>URI</b> </td> 
  <td> /api/chow/{chowId} </td>
</tr>

<tr>
  <td> <b>Headers</b> </td> 
  <td> Authorization </td>
</tr>

<tr>
  <td> <b>Query Params</b> </td> 
  <td> - </td>
</tr>

<tr>
  <td> <b>Request Body</b> </td>
  <td> - </td>
</tr>

<tr>
  <td> <b>Response Body</b> </td>
  <td> - </td>
</tr>

<tr>
  <td> <b>Response Status</b> </td> 
  <td> <code>201 CREATED</code>,  <code>400 BAD_REQUEST</code>, <code>401 UNAUTHORIZED</code> </td>
</tr>

</table>

#### Visit Chow

<table>

<tr>
  <td> <b>HTTP Method</b> </td> 
  <td> PATCH </td>
</tr>

<tr>
  <td> <b>URI</b> </td> 
  <td> /api/chow/{chowId}/visit </td>
</tr>

<tr>
  <td> <b>Headers</b> </td> 
  <td> Authorization </td>
</tr>

<tr>
  <td> <b>Query Params</b> </td> 
  <td> - </td>
</tr>

<tr>
  <td> <b>Request Body</b> </td>
  <td> - </td>
</tr>

<tr>
  <td> <b>Response Body</b> </td>
  <td> - </td>
</tr>

<tr>
  <td> <b>Response Status</b> </td> 
  <td> <code>201 CREATED</code>,  <code>400 BAD_REQUEST</code>, <code>401 UNAUTHORIZED</code> </td>
</tr>

</table>

#### Retrieve Chow List Popularity Ranking

<table>

<tr>
  <td> <b>HTTP Method</b> </td> 
  <td> GET </td>
</tr>

<tr>
  <td> <b>URI</b> </td> 
  <td> /api/chow/ranking/popularity </td>
</tr>

<tr>
  <td> <b>Headers</b> </td> 
  <td> Authorization </td>
</tr>

<tr>
  <td> <b>Query Params</b> </td> 
  <td> limit </td>
</tr>

<tr>
  <td> <b>Request Body</b> </td>
  <td> - </td>
</tr>

<tr>
  <td> <b>Response Body</b> </td>
  <td>

```json
[
  {
    "id": "ID",
    "name": "Stomp Chomp",
    "cuisine": "AMERICAN",
    "priceRange": "LOW",
    "area": "CENTRAL_AUCKLAND"
  },
  {
    "id": "ID",
    "name": "Lamire Zire",
    "cuisine": "GREEK",
    "priceRange": "HIGH",
    "area": "CENTRAL_AUCKLAND"
  },
  {
    "id": "ID",
    "name": "Dumpling Galore",
    "cuisine": "CHINESE",
    "priceRange": "MEDIUM",
    "area": "EAST_AUCKLAND"
  }
]
```

  </td>
</tr>

<tr>
  <td> <b>Response Status</b> </td> 
  <td> <code>201 CREATED</code>,  <code>400 BAD_REQUEST</code>, <code>401 UNAUTHORIZED</code> </td>
</tr>

</table>

#### Retrieve Chow List Cuisine Ranking

<table>

<tr>
  <td> <b>HTTP Method</b> </td> 
  <td> GET </td>
</tr>

<tr>
  <td> <b>URI</b> </td> 
  <td> /api/chow/ranking/cuisine </td>
</tr>

<tr>
  <td> <b>Headers</b> </td> 
  <td> Authorization </td>
</tr>

<tr>
  <td> <b>Query Params</b> </td> 
  <td> limit </td>
</tr>

<tr>
  <td> <b>Request Body</b> </td>
  <td> - </td>
</tr>

<tr>
  <td> <b>Response Body</b> </td>
  <td>

```json
[
  {
    "id": "ID",
    "name": "Stomp Chomp",
    "cuisine": "AMERICAN",
    "priceRange": "LOW",
    "area": "CENTRAL_AUCKLAND"
  },
  {
    "id": "ID",
    "name": "Lamire Zire",
    "cuisine": "GREEK",
    "priceRange": "HIGH",
    "area": "CENTRAL_AUCKLAND"
  },
  {
    "id": "ID",
    "name": "Dumpling Galore",
    "cuisine": "CHINESE",
    "priceRange": "MEDIUM",
    "area": "EAST_AUCKLAND"
  }
]
```

  </td>
</tr>

<tr>
  <td> <b>Response Status</b> </td> 
  <td> <code>201 CREATED</code>,  <code>400 BAD_REQUEST</code>, <code>401 UNAUTHORIZED</code> </td>
</tr>

</table>

#### Retrieve Chow List Price Range Ranking

<table>

<tr>
  <td> <b>HTTP Method</b> </td> 
  <td> GET </td>
</tr>

<tr>
  <td> <b>URI</b> </td> 
  <td> /api/chow/ranking/price-range </td>
</tr>

<tr>
  <td> <b>Headers</b> </td> 
  <td> Authorization </td>
</tr>

<tr>
  <td> <b>Query Params</b> </td> 
  <td> limit </td>
</tr>

<tr>
  <td> <b>Request Body</b> </td>
  <td> - </td>
</tr>

<tr>
  <td> <b>Response Body</b> </td>
  <td>

```json
[
  {
    "id": "ID",
    "name": "Stomp Chomp",
    "cuisine": "AMERICAN",
    "priceRange": "LOW",
    "area": "CENTRAL_AUCKLAND"
  },
  {
    "id": "ID",
    "name": "Lamire Zire",
    "cuisine": "GREEK",
    "priceRange": "HIGH",
    "area": "CENTRAL_AUCKLAND"
  },
  {
    "id": "ID",
    "name": "Dumpling Galore",
    "cuisine": "CHINESE",
    "priceRange": "MEDIUM",
    "area": "EAST_AUCKLAND"
  }
]
```

  </td>
</tr>

<tr>
  <td> <b>Response Status</b> </td> 
  <td> <code>201 CREATED</code>,  <code>400 BAD_REQUEST</code>, <code>401 UNAUTHORIZED</code> </td>
</tr>

</table>

#### Retrieve Chow List Area Ranking

<table>

<tr>
  <td> <b>HTTP Method</b> </td> 
  <td> GET </td>
</tr>

<tr>
  <td> <b>URI</b> </td> 
  <td> /api/chow/ranking/area </td>
</tr>

<tr>
  <td> <b>Headers</b> </td> 
  <td> Authorization </td>
</tr>

<tr>
  <td> <b>Query Params</b> </td> 
  <td> limit </td>
</tr>

<tr>
  <td> <b>Request Body</b> </td>
  <td> - </td>
</tr>

<tr>
  <td> <b>Response Body</b> </td>
  <td>

```json
[
  {
    "id": "ID",
    "name": "Stomp Chomp",
    "cuisine": "AMERICAN",
    "priceRange": "LOW",
    "area": "CENTRAL_AUCKLAND"
  },
  {
    "id": "ID",
    "name": "Lamire Zire",
    "cuisine": "GREEK",
    "priceRange": "HIGH",
    "area": "CENTRAL_AUCKLAND"
  },
  {
    "id": "ID",
    "name": "Dumpling Galore",
    "cuisine": "CHINESE",
    "priceRange": "MEDIUM",
    "area": "EAST_AUCKLAND"
  }
]
```

  </td>
</tr>

<tr>
  <td> <b>Response Status</b> </td> 
  <td> <code>201 CREATED</code>,  <code>400 BAD_REQUEST</code>, <code>401 UNAUTHORIZED</code> </td>
</tr>

</table>

#### Select Random Chow

<table>

<tr>
  <td> <b>HTTP Method</b> </td> 
  <td> POST </td>
</tr>

<tr>
  <td> <b>URI</b> </td> 
  <td> /api/chow/random </td>
</tr>

<tr>
  <td> <b>Headers</b> </td> 
  <td> Authorization </td>
</tr>

<tr>
  <td> <b>Query Params</b> </td> 
  <td> - </td>
</tr>

<tr>
  <td> <b>Request Body</b> </td>
  <td>

```json
[
  {
    "id": "ID",
    "name": "Stomp Chomp",
    "cuisine": "AMERICAN",
    "priceRange": "LOW",
    "area": "CENTRAL_AUCKLAND"
  },
  {
    "id": "ID",
    "name": "Lamire Zire",
    "cuisine": "GREEK",
    "priceRange": "HIGH",
    "area": "CENTRAL_AUCKLAND"
  },
  {
    "id": "ID",
    "name": "Dumpling Galore",
    "cuisine": "CHINESE",
    "priceRange": "MEDIUM",
    "area": "EAST_AUCKLAND"
  }
]
```

</td>
</tr>

<tr>
  <td> <b>Response Body</b> </td>
  <td>

```json
{
  "id": "ID",
  "name": "Stomp Chomp",
  "cuisine": "AMERICAN",
  "priceRange": "LOW",
  "area": "CENTRAL_AUCKLAND"
}
```

  </td>
</tr>

<tr>
  <td> <b>Response Status</b> </td> 
  <td> <code>201 CREATED</code>,  <code>400 BAD_REQUEST</code>, <code>401 UNAUTHORIZED</code> </td>
</tr>

</table>

## UI/UX Design

## Running Locally

### Running the Server (Using IntelliJ)

Firstly, ensure that you have **IntelliJ** installed on your machine. As we will be using the IDE to run the server.

Secondly, ensure that you have **Java 18** installed, specifcally **JDK (Java Development Kit) 18**. As this is the verison of Java which the server uses.

Once you have **IntelliJ** and **JDK 18** installed and the server up and running follow the steps below:

1. Open the `service` folder in **IntelliJ** and wait for all the dependencies to be installed.

2. Confirm that the server builds successfully by running `mvn clean install`, executing the command by pressing `CMD + ENTER` (MacOS) to run the command via the IDE.

3. If the build is successful proceed to step 4, otherwise fix the service until it builds successfully.

4. Navigate to `src/main/java/dev/andrewjfei/service/ChowTrackerServiceApplication.java` and right click the file and `run`.

5. Go to `localhost:8080/api/chow`, you should see something similar to below. Your server is now up and running.

```json
{
  "code": 7,
  "description": "User does not have the right permissions to make this request."
}
```

### Running the Client

Firstly, ensure that you have **Node** installed on your machine. The client side requires `npm` **(Node Package Manager)**, which comes installed with **Node**.

Secondly, ensure that the server is up and running on `localhost:8080`.

Once you have **Node** installed and the server up and running follow the steps below:

1. Install all client dependencies by running `npm ci`.
2. Start the client by running `npm start`.
3. Go to `localhost:3000` to start using the web application.
