# Rider-Drive Backend 

Base URL: http://localhost:4000/


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
## Captain Endpoints

### 1) Register Captain  
**POST** `/captains/register`

**Request Body (JSON):**
```json
{
  "fullname": {
    "firstname": "test",
    "lastname": "test"
  },
  "email": "test@gmail.com",
  "password": "your password",
  "vehicle": {
    "plate": "vehicle plate number",
    "capacity": "In numbers",
    "color": "vehicle color",
    "vehicleType": "Your vehicle type (car, auto , moto)"
  }
}
```
**Response (JSON):**
```json
{
    "token": "jwt token",
    "captain": {
        "fullname": {
           "firstname": "test",
           "lastname": "test"
        },
        "email": "test@gmail.com",
        "password": "$2b$10$EAR2zF/h9b2vaRpXqmbzh.xJ5c9KvpaOKaNiF0ZWJ.ddFAqb/67cu",
        "status": "inactive",
        "vehicle": {
            "plate": "vehicle plate number",
            "capacity": "In numbers",
            "color": "vehicle color",
            "vehicleType": "Your vehicle type (car, auto , moto)"
            }
        "_id": "699ac8d2552313ae0661c07b",
        "__v": 0
    }
}
```
### 2) Login Captain  
**POST** `/captains/login`

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
     "token": "jwt token",
    "captain": {
        "fullname": {
           "firstname": "test",
           "lastname": "test"
        },
        "location": {
            "lat": ,
            "lng": ,
        },
       "vehicle": {
            "plate": "vehicle plate number",
            "capacity": "In numbers",
            "color": "vehicle color",
            "vehicleType": "Your vehicle type (car, auto , moto)"
            },
        "_id": "698cb996162b39876243d10e",
        "email": "test@gmail.com",
        "password": "$2b$10$j9JxYheHGo3G/iO59AX1e.VfWfxtCKAHO7gF.O7PTXpXUikjJsCAS",
        "status": "inactive",
        "__v": 0,
        "socketId": "7-Y1j_dUBGWztbhzAAAH"
    }
}
```
### 3) Logout User  
**GET** `/captains/logout`

**Request Body :**

**Headers** : 

    Authorization: Bearer JWT_TOKEN

**Response (JSON):**
```json
{
    "message": "Captain Logged out"
}
```
### 3) Get Captain profile  
**GET** `/captains/profile`

**Request Body :**

  **Headers** : 

      Authorization: Bearer JWT_TOKEN

**Response (JSON):**
```json
{
    "captain": {
        "fullname": {
            "firstname": "test",
            "lastname": "test"
        },
        "location": {
            "lat": ,
            "lng": ,
        },
        "vehicle": {
            "plate": "vehicle plate number",
            "capacity": "In numbers",
            "color": "vehicle color",
            "vehicleType": "Your vehicle type (car, auto , moto)"
       },
        "_id": "698cb996162b39876243d10e",
        "email": "test@gmail.com",
        "status": "inactive",
        "__v": 0,
        "socketId": "7-Y1j_dUBGWztbhzAAAH"
    }
}
```




