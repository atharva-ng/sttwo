
# Society Management API Documentation

For testing, use 1@1.com and 123456. It has all the data setup.
Alternative would be 6@1.com and 123456. 

## Authentication

### POST `/api/auth/login/society`
Log into a society account.

**Required Fields:**
- `emailAddress`: Society's email address (string)
- `password`: Society's password (string)

---
### PATCH `/api/auth/edit`
Update society details, specifically the admin status.

#### Request Body:
- `isadmin` (boolean): Specifies if the user should be an admin.

#### Response:
- `200 OK`: Successfully updated society details.
  - `message`: "Success".

#### Error Responses:
- `500 Internal Server Error`: Something went wrong while updating the society details.

---

## Registration

### GET `/api/register`
Retrieve available maintenance heads and room size details.

**Response Fields:**
- `roomSizes`: List of available room sizes (array)
- `maintenanceHeads`: List of maintenance heads (array)

---

### POST `/api/register`
Register a society with basic details, structure and maintenance details.

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
      },
      "2": {
        "roomNumber": 102,
        "roomSize": "2BHK",
        "maintainanceAmount": 7500,
        "maintainanceHeadAmount": {
          "1": 1500,
          "2": 500,
          "3": 2000,
          "4": 1000,
          "5": 2500
        }
      },
      "3": {
        "roomNumber": 103,
        "roomSize": "1BHK",
        "maintainanceAmount": 5000,
        "maintainanceHeadAmount": {
          "1": 1500,
          "2": 500,
          "3": 2000,
          "4": 1000
        }
      },
      "4": {
        "roomNumber": 104,
        "roomSize": "2BHK",
        "maintainanceAmount": 7500,
        "maintainanceHeadAmount": {
          "1": 1500,
          "2": 500,
          "3": 2000,
          "4": 1000,
          "5": 2500
        }
      }
    }
  }
}
Wing 2, 3, 4
Similar to Wing 1, but the name and room details may vary as shown above.

Notes
Each wing contains details about its rooms and the maintenance amounts.
The structure allows adding multiple wings, with each wing having its own room details and maintenance breakdown.
Usage Example
You can use this JSON structure to create or retrieve society-related data such as the number of wings, room details, and maintenance calculations. This format ensures that all relevant details are organized hierarchically for easy processing and access.

css
Copy code

This markdown file provides a detailed and structured documentation of the JSON object, ensuring clear explanation of each field and the possible values they can have.





You said:
Give all in a single file
ChatGPT said:
ChatGPT
Here is the entire markdown documentation in a single .md file format:

md
Copy code
# JSON Structure Documentation

## Society Details

This section describes the information related to the society.

### `societyDetails` Object

- **`name`** (string): The name of the society.
- **`dateOfEstablishment`** (string, date): The date the society was established in `YYYY-MM-DD` format.
- **`emailAddress`** (string): The email address of the society.
- **`password`** (string): The password associated with the society account.
- **`phoneNumber`** (string): The phone number of the society.
- **`address`** (string): The address of the society.
- **`city`** (string): The city where the society is located.
- **`state`** (string): The state where the society is located.
- **`pincode`** (string): The postal code (PIN code) of the society.
- **`numberOfWings`** (string): The number of wings in the society.
- **`registrationNumber`** (string): The registration number of the society.

### Example:

```json
{
  "name": "name",
  "dateOfEstablishment": "2024-08-11",
  "emailAddress": "emaixdxx6lAddjdress@email.com",
  "password": "123456",
  "phoneNumber": "8879806920",
  "address": "address",
  "city": "city",
  "state": "state",
  "pincode": "400012",
  "numberOfWings": "4",
  "registrationNumber": "registrationNumber"
}

**Required Fields:**
```json
{ "societyDetails":{
  "name": "name",
  "dateOfEstablishment": "2024-08-11",
  "emailAddress": "emaixdxx6lAddjdress@email.com",
  "password": "123456",
  "phoneNumber": "8879806920",
  "address": "address",
  "city": "city",
  "state": "state",
  "pincode": "400012",
  "numberOfWings": "4",
  "registrationNumber": "registrationNumber"
},
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

#Notices

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

### DELETE `/api/community-communications/notices/{id}`
Delete a notice by its ID.

#### Path Parameters:
- `id` (number): The ID of the notice to delete.

#### Response:
- `200 OK`: Successfully deleted the notice.
  - `message`: "Successfully Deleted".

#### Error Responses:
- `400 Bad Request`: Invalid notice ID.
- `403 Forbidden`: User does not have permission to delete this notice.
- `500 Internal Server Error`: Something went wrong while deleting the notice.


#Complaints

### GET `/api/complaints`
Retrieve complaints for a society based on provided filters.

#### Query Parameters:

-   `socid`: Society ID (string)
-   `active`: Active status of the complaint (string: "true" or "false")
-   `start_date`: Start date to filter complaints (string, format: YYYY-MM-DD)
-   `end_date`: End date to filter complaints (string, format: YYYY-MM-DD)

#### Response:

-   `200 OK`: Successfully retrieved the complaints.
    -   `complaints`: List of complaints matching the provided filters.

#### Error Responses:

-   `400 Bad Request`: Invalid `active` parameter (not "true" or "false").
-   `500 Internal Server Error`: Something went wrong while retrieving the complaints.

