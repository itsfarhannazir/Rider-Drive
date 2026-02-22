# Rider-Drive Backend 

Base URL: 


## User Endpoints

### 1) Register User  
**POST** `/users/register`

**Request Body (JSON):**
```json
{
  "fullname": {
    "firstname": "test",
    "lastname": "test"
  },
  "email": "test@gmail.com",
  "password": "Your password"
}
```
**Response (JSON):**
```json
{
    "token": "Jwt token",
    "user": {
        "fullname": {
            "firstname": "test",
            "lastname": "test"
        },
        "email": "test@gmail.com",
        "password": "$2b$10$gzSuPrFZrxp8VRoKkUQzrO.D9iZFv/AX0X4eXUTZCxuwIaXRJt6pu", 
        "_id": "mongo id",
        "__v": 0
    }
}
```
### 2) Login User  
**POST** `/users/login`

**Request Body (JSON):**
```json
{
  "email": "test@gmail.com",
  "password": "Your password"
}
```
**Response (JSON):**
```json
{
    "token": "Jwt token",
    "user": {
        "fullname": {
            "firstname": "test",
            "lastname": "test"
        },
        "email": "test@gmail.com",
        "password": "$2b$10$gzSuPrFZrxp8VRoKkUQzrO.D9iZFv/AX0X4eXUTZCxuwIaXRJt6pu", 
        "_id": "mongo id",
        "__v": 0
        "socketId": "0p6W15NtTtkT8x0_AAAF"
    }
}
```
### 3) Logout User  
**GET** `/users/logout`

**Request Body :**

**Headers** : 

    Authorization: Bearer JWT_TOKEN

**Response (JSON):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```
### 3) Get User profile  
**GET** `/users/profile`

**Request Body :**

  **Headers** : 

      Authorization: Bearer JWT_TOKEN

**Response (JSON):**
```json
{
    "fullname": {
        "firstname": "test",
        "lastname": "test"
    },
    "_id": "mongo id",
    "email": "test@gmail.com",
    "__v": 0,
    "socketId": "0p6W15NtTtkT8x0_AAAF"
}
```




