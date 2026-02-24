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
# Rides API Documentation

This section documents all **Ride-related endpoints** for creating, pricing, confirming, starting, and completing rides in the Rider-Drive application.

All endpoints require authentication using a **Bearer Token**.


## 1) Create Ride  

Create a new ride request from pickup to destination.

**POST** `/rides/create`

**Request Body**

```json
{
  "pickup": "Faisalabad Pakistan",
  "destination": "Lahore Pakistan",
  "vehicletype": "Moto"
}
```
**Request **
   * pickup (string, required)
   * destination (string, required)
   * vehicletype (string, required)

**Response (Success – 200):**
```json
{
  "message": "Ride created successfully",
  "ride": {
    "_id": "6990326c9c1112a5dc7bf6be",
    "pickup": "Faisalabad Pakistan",
    "destination": "Lahore Pakistan",
    "vehicletype": "Moto",
    "fare": 1250,
    "status": "pending",
    "user": "699028da12672ca0a8536f86"
  }
}
```
## 2) Get Fare Estimate

Calculate estimated fare before creating a ride.

**GET** `/rides/get-fare`

**Query Params:**
   * pickup (string, required)
   * destination (string, required)

**Response (Success – 200):**
```json
{
  "distanceKm": 375.42,
  "durationMinutes": 275,
  "fare": {
    "Moto": 3200,
    "Car": 5200,
    "Auto": 4100
  }
}
```

## 3) Confirm Ride

Captain confirms a ride request.

**POST** `/rides/confirm-ride`

**Request :**
```json
{
  "rideId": "6990326c9c1112a5dc7bf6be"
}
```
**Response (success 200) :**
```json
{
  "message": "Ride confirmed",
  "ride": {
    "_id": "6990326c9c1112a5dc7bf6be",
    "status": "confirmed",
    "captain": "698cb996162b39876243d10e"
  }
}
```
## 4) Start Ride

Marks the ride as started.

**GET** `/rides/start-ride`

**Query Params:**
   * rideId (string, required)

**Request :**
```json
{
  "rideId": "6990326c9c1112a5dc7bf6be"
}
```
**Response (success 200) :**
```json
{
  "message": "Ride started successfully",
  "ride": {
    "_id": "6993f988dcc72aec2be07eeb",
    "status": "ongoing",
    "startedAt": "2026-02-24T08:30:12.000Z"
  }
}
```
## 5) Captain Arrived

Captain marks that he has arrived at pickup location.

**POST** `/rides/captain-arrived`

**Request :**
```json
{
  "rideId": "6990326c9c1112a5dc7bf6be"
}
```
**Response (success 200) :**
```json
{
  "message": "Captain arrived at pickup point",
  "ride": {
    "_id": "6996d5057af64c26ea4ec6e4",
    "status": "arrived"
  }
}
```
## 5) Complete Ride

Mark the ride as completed after reaching destination.

**POST** `/rides/ride-completed`

**Request :**
```json
{
  "rideId": "6990326c9c1112a5dc7bf6be"
}
```
**Response (success 200) :**
```json
{
  "message": "Ride completed successfully",
  "ride": {
    "_id": "69974028de77ab279d244f58",
    "status": "completed",
    "endedAt": "2026-02-24T09:10:44.000Z",
    "fare": 1250
  }
}
```
**Ride Flow**

    Create Ride → Get Fare (optional) → Confirm Ride → Captain Arrived → Start Ride → Complete Ride
    
**Distance & Fare Calculation**

Distance and time are calculated using OpenRouteService API, which provides real road distance instead of straight-line distance.

** Notes **
 * All endpoints are protected
 * User must be logged in to create rides
 * Captain must be logged in to confirm/start/complete rides
 * Vehicle types must match allowed values
 * Distance and duration are auto-calculated from locations
   
    


