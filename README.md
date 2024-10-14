
# Society Management API Documentation

## Authentication

### POST `/api/auth/signup/society`
Register a new society with basic details.

**Required Fields:**
- `name`: Society name (string)
- `dateOfEstablishment`: Date of establishment (string, YYYY-MM-DD)
- `emailAddress`: Society's email address (string)
- `password`: Society's password (string)
- `phoneNumber`: Contact number (string)
- `address`: Society's address (string)
- `city`: City name (string)
- `state`: State name (string)
- `pincode`: Postal code (string)
- `numberOfWings`: Number of wings in the society (integer)
- `registrationNumber`: Society registration number (string)

---

### POST `/api/auth/login/society`
Log into a society account.

**Required Fields:**
- `emailAddress`: Society's email address (string)
- `password`: Society's password (string)

---

## Registration

### GET `/api/register`
Retrieve available maintenance heads and room size details.

**Response Fields:**
- `roomSizes`: List of available room sizes (array)
- `maintenanceHeads`: List of maintenance heads (array)

---

### POST `/api/register`
Register a society with structure and maintenance details.

**Required Fields:**
```json
{
  "wingInformation": {
    "1": {
      "name": "wing1",
      "floors": 10,
      "roomsPerFloor": 2,
      "roomDetails": {
        "1": {
          "roomNumber": 101,
          "roomSize": "1BHK",
          "maintainanceAmount": 5000,
          "maintainanceHeadAmount": {
            "1": 1500,
            "2": 500,
            "3": 2000,
            "4": 1000
          }
        }
      }
    }
  }
}
```
---

## Owners Module

### GET `/api/ownersModule/`
Retrieve all owner details with room information.

**Response Fields:**
- `id`: Owner ID (integer)
- `wingName`: Wing name (string)
- `roomsize`: Room size (string)
- `roomno`: Room number (integer)
- `firstname`: Owner's first name (string)
- `lastname`: Owner's last name (string)

---

### GET `/api/ownersModule/get-excel`
Download an Excel file containing basic wing and room details.

---

### POST `/api/ownersModule/post-excel`
Upload an Excel file with basic wing and room details.

**Required Fields:**
- `excel`: Excel file (file)

---

## Community Communications API

### POST `/api/community-communications/notices`
Create a new notice for a particular society.

#### Request Body:
- `title` (string, max 255 characters): Title of the notice.
- `content` (string): Content of the notice.
- `start_date` (string, format: YYYY-MM-DD): Start date of the notice.
- `end_date` (string, format: YYYY-MM-DD): End date of the notice.

#### Response:
- `201 Created`: Notice created successfully.
- `400 Bad Request`: Missing or invalid required fields.
- `422 Incorrect Format` : Invalid format of the submitted fields.
- `500 Internal Server Error`: Something went wrong while creating the notice.

---

### GET `/api/community-communications/notices`
Retrieve a list of all the notices made by the society.

#### Routes:
- `/notices/true`: Retrieve all active notices.
- `/notices/false`: Retrieve all inactive notices.
- `/notices/{id}`: Retrieve a specific notice by its ID.

#### Response:
- `200 OK`: Successfully retrieved the notices.
- `400 Bad Request`: Invalid ID.
- `500 Internal Server Error`: Something went wrong while fetching the notices.

---

### PATCH `/api/community-communications/notices/{id}`
Update a notice by its ID.

#### Path Parameters:
- `id` (number): The ID of the notice to update.

#### Request Body:
- `title` (string, max 255 characters): Updated title of the notice.
- `content` (string): Updated content of the notice.
- `start_date` (string, format: YYYY-MM-DD): Updated start date of the notice.
- `end_date` (string, format: YYYY-MM-DD): Updated end date of the notice.

#### Response:
- `200 OK`: Successfully updated the notice.
  - `title`: Updated title of the notice.
  - `content`: Updated content of the notice.
  - `start_date`: Updated start date of the notice.
  - `end_date`: Updated end date of the notice.
  
#### Error Responses:
- `404 Bad Request`: Invalid notice ID or missing required fields.
- `500 Internal Server Error`: Something went wrong while updating the notice.
