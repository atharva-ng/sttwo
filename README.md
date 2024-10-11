
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

## Community Communications

### POST `/api/community-communications/notices`
Create a new notice for a particular society.

**Required Fields:**
- `title`: Title of the notice (string, max 255 characters)
- `content`: Content of the notice (string)
- `start_date`: Start date of the notice (string, YYYY-MM-DD)
- `end_date`: End date of the notice (string, YYYY-MM-DD)

---
a
### GET `/api/community-communications/notices`
Retrieve a list of all the notices made by the society.

- `/notices/true`: Retrieve all active notices.
- `/notices/false`: Retrieve all inactive notices.
- `/notices/{id}`: Retrieve a specific notice by its ID.
