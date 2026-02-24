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
        "password": "Encrypted Password", 
        "_id": "User Id",
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
        "password": "Encrypted Password", 
        "_id": "User Id",
        "__v": 0
        "socketId": "Socket Id"
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
    "socketId": "Socket Id"
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
    "vehicleType": "Your vehicle type (Car, Auto , Moto)"
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
        "password": "Encrypted Password",
        "status": "inactive",
        "vehicle": {
            "plate": "vehicle plate number",
            "capacity": "In numbers",
            "color": "vehicle color",
            "vehicleType": "Your vehicle type (car, auto , moto)"
            }
        "_id": "Captain Id",
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
            "vehicleType": "Your vehicle type (Car, Auto , Moto)"
            },
        "_id": "Captain Id",
        "email": "test@gmail.com",
        "password": "Encrypted Pass",
        "status": "inactive",
        "__v": 0,
        "socketId": "Socket Id"
    }
}
```
### 3) Logout Captain  
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
            "vehicleType": "Your vehicle type (Car, Auto , Moto)"
       },
        "_id": "Captain Id ",
        "email": "test@gmail.com",
        "status": "inactive",
        "__v": 0,
        "socketId": "Socket Id"
    }
}
```
## Maps Endpoints

> All Maps endpoints require authentication.  
> Add JWT token in headers:  
> `Authorization: Bearer <JWT_TOKEN>`

---

### 1) Get Address Latitude & Longitude  
**GET** `/maps/get-coordinates`

**Query Params:**
- `address` (string, required)

**Example:**

     /maps/get-coordinates?address=Lahore Pakistan

**Headers:**

     Authorization: Bearer JWT_TOKEN
     
**Response (Success – 200):**
```json
{
  "success": true,
  "coordinates": {
    "lat": 31.5204,
    "lng": 74.3587
  }
}
```
**Response (Error – 400):**
```json
{
  "success": false,
  "message": "Address is required"
}
```
### 2) Get Distance & Time Between Two Locations

**GET** `/maps/get-distance-time`
**Query Params:**
   * origin (string, required)
   * destination (string, required)
     
**Example:**

    /maps/get-distance-time?origin=Faisalabad Pakistan&destination=Islamabad Pakistan

**Headers:**

    Authorization: Bearer JWT_TOKEN

**Response (Success – 200):**
```json
{
  "success": true,
  "distance": {
    "text": "320 km",
    "value": 320000
  },
  "duration": {
    "text": "4 hours 30 mins",
    "value": 16200
  }
}
```
**Response (Error – 400):**
```json
{
  "success": false,
  "message": "Origin and destination are required"
}
```
### 3) Get Place Suggestions (Autocomplete)

**GET** `/maps/get-suggestions`
**Query Params:**
   * input (string, required)
     
**Example:**

     /maps/get-distance-time?origin=Faisalabad Pakistan&destination=Islamabad Pakistan

**Headers:**

    Authorization: Bearer JWT_TOKEN

**Response (Success – 200):**
```json
{
  "success": true,
  "suggestions": [
    "Islamabad, Pakistan",
    "Islamgarh, Pakistan",
    "Islamkot, Pakistan"
  ]
}
```
**Response (Error – 400):**
```json
{
  "success": false,
  "message": "Input query is required"
}
```



