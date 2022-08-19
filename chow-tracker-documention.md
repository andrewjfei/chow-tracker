# Chow Tracker Documentation



## What is Chow Tracker?



### Features

- Protected API
- Authentication
- Input Validation
- Chow Ranking List 
- Chow List
- Chow Randomiser

### Future Plans

- Chow Audit History



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
  - Redux Toolkit
- SQL Database (MySQL)



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

| HTTP Request/Response | Value                                             |
| --------------------- | ------------------------------------------------- |
| **HTTP Method**       | PUT                                               |
| **URI**               | /api/chow/{chowId}                                |
| **Headers**           | Authorization                                     |
| **Query Params**      | -                                                 |
| **Request Body**      | name, cuisine, priceRange, area                   |
| **Response Body**     | -                                                 |
| **Response Status**   | `200 OK`,  `400 BAD_REQUEST`,  `401 UNAUTHORIZED` |

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

### UI/UX Design

