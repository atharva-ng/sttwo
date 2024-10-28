
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

# Community Communications API

## Notices

### GET `/api/community-communications/notices`
Retrieve notices for a society with optional filtering parameters.

#### Query Parameters
- `id` (number, optional): Filter by specific notice ID
- `active` (boolean, optional): Filter by notice status
  - `true`: Get active notices
  - `false`: Get inactive notices
- `start_date` (string, optional): Filter by start date (format: YYYY-MM-DD)
- `end_date` (string, optional): Filter by end date (format: YYYY-MM-DD)
- `categoryId` (number, optional): Filter by category ID

#### Response
##### Success Response (200 OK)
```json
{
  "categories": [...],  // List of available notice categories
  "notices": [...]      // List of notices matching the filter criteria
}
```

##### Not Found Response (404)
```json
{
  "categories": [...],  // List of available notice categories
  "notices": "No Notices Found for the given filters"
}
```

##### Error Responses
- `400 Bad Request`: Invalid input for active parameter
- `500 Internal Server Error`: Server-side error occurred

### POST `/api/community-communications/notices`
Create a new notice for a society.

#### Request Body
- `title` (string, required): Title of the notice
- `content` (string, required): Content of the notice
- `start_date` (string, required): Start date of the notice (format: YYYY-MM-DD)
- `end_date` (string, required): End date of the notice (format: YYYY-MM-DD)
- `categoryId` (number, required): Category ID for the notice

#### Response
##### Success Response (201 Created)
```json
{
  "title": "string",
  "content": "string",
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD",
  "category": "number"
}
```

##### Error Responses
- `422 Unprocessable Entity`: Invalid inputs with validation errors
- `500 Internal Server Error`: Server-side error occurred

### PATCH `/api/community-communications/notices/:id`
Update an existing notice.

#### Path Parameters
- `id` (number, required): ID of the notice to update

#### Request Body
- `title` (string, optional): Updated title
- `content` (string, optional): Updated content
- `start_date` (string, optional): Updated start date (format: YYYY-MM-DD)
- `end_date` (string, optional): Updated end date (format: YYYY-MM-DD)
- `categoryId` (number, optional): Updated category ID

#### Response
##### Success Response (200 OK)
```json
{
  "title": "string",
  "content": "string",
  "start_date": "YYYY-MM-DD",
  "end_date": "YYYY-MM-DD",
  "category": "number"
}
```

##### Error Responses
- `400 Bad Request`: Invalid notice ID
- `404 Not Found`: Notice not found
- `500 Internal Server Error`: Server-side error occurred

### DELETE `/api/community-communications/notices/:id`
Delete a notice.

#### Path Parameters
- `id` (number, required): ID of the notice to delete

#### Response
##### Success Response (200 OK)
```json
{
  "message": "Successfully Deleted"
}
```

##### Error Responses
- `400 Bad Request`: Invalid notice ID
- `403 Forbidden`: User doesn't have permission to delete the notice
- `500 Internal Server Error`: Server-side error occurred



# Complaints

## Endpoints

### Get Complaints
#### GET `/api/complaints`
Retrieve complaints for a society based on provided filters.

#### Query Parameters
- `socid`: Society ID (string)
- `active`: Active status of the complaint (string: "true" or "false")
- `start_date`: Start date to filter complaints (string, format: YYYY-MM-DD)
- `end_date`: End date to filter complaints (string, format: YYYY-MM-DD)
- `category`: Category ID to filter complaints (number)
- `complaintId`: Specific complaint ID to retrieve (number)

#### Response
- `200 OK`: Successfully retrieved the complaints
  ```json
  {
    "complaints": [
      // Array of complaint objects
    ]
  }
  ```

#### Error Responses
- `400 Bad Request`: Invalid `active` parameter (not "true" or "false")
- `500 Internal Server Error`: Something went wrong while retrieving the complaints

### Create Complaint
#### POST `/api/complaints`
Create a new complaint in the system.

#### Request Body
```json
{
  "society_id": number,
  "title": string,
  "description": string,
  "category_id": number
}
```

#### Response
- `201 Created`: Successfully created the complaint
  ```json
  {
    "complaintId": number
  }
  ```

#### Error Responses
- `500 Internal Server Error`: Something went wrong while creating the complaint

### Update Complaint
#### PUT `/api/complaints/:id`
Update an existing complaint.

#### URL Parameters
- `id`: ID of the complaint to update (number)

#### Request Body
```json
{
  "title": string (optional),
  "description": string (optional),
  "categoryId": number (optional)
}
```

#### Response
- `201 Created`: Successfully updated the complaint
  ```json
  {
    // Updated complaint object
  }
  ```

#### Error Responses
- `400 Bad Request`: Invalid complaint ID format
- `403 Forbidden`: User does not have permission to update this complaint
- `500 Internal Server Error`: Something went wrong while updating the complaint

### Delete Complaint
#### DELETE `/api/complaints/:id`
Delete an existing complaint.

#### URL Parameters
- `id`: ID of the complaint to delete (number)

#### Response
- `204 Created`: Successfully deleted the complaint
  ```json
  {
    "message": "Successfully Deleted"
  }
  ```

#### Error Responses
- `400 Bad Request`: Invalid complaint ID format
- `403 Forbidden`: User does not have permission to delete this complaint
- `500 Internal Server Error`: Something went wrong while deleting the complaint

### Create Comment
#### POST `/api/complaints/comment`
Add a comment to an existing complaint.

#### Request Body
```json
{
  "complaint_id": number,
  "society_id": number,
  "room_transaction_id": number,
  "content": string
}
```

#### Response
- `200 OK`: Successfully added the comment
  ```json
  {
    "message": "Success"
  }
  ```

#### Error Responses
- `500 Internal Server Error`: Something went wrong while creating the comment

## Authentication
All endpoints require authentication. The user ID is extracted from the authentication token and available as `req.userData.userId`.

## Error Handling
The API uses a custom `HttpError` class for error handling. All endpoints wrap their logic in try-catch blocks to handle both expected errors (like validation errors) and unexpected errors (like database failures).

## Query Construction
Database queries are constructed using utility functions from the `communityCommunicationQuery` module:
- `createComplaintQuery`
- `getComplaintsQuery`
- `deleteComplaintQuery`
- `updateComplaintQuery`
- `createCommentQuery`

## Authorization
The API implements authorization checks for update and delete operations:
1. Users can only modify complaints they have access to
2. Attempting to modify unauthorized complaints returns a 403 Forbidden error
3. The system verifies permissions before executing update or delete operations

