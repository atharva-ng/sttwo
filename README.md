BACKEND API Details:

--"/api/auth":

POST-"/signup/society" - Basic society details
Required fields: name, dateOfEstablishment, emailAddress, password, phoneNumber, address, city, state, pincode, numberOfWings, registrationNumber

POST-"/login/society" - To log into a society account
Required fields: emailAddress, password

--"/api/register"

GET-"/" - Get available maintanance heads and room size details
Fields: roomSizes, maintainanceHeads

POST-"/" - To register a with structure and maintenance details
Required fields: Structure similar to the following

{
"wingInformation": {
  "1": {
"name": "wing1",
"floors": 10,
roomsPerFloor": 2,
 "roomDetails": {
1": {
"roomNumber": 101,
"roomSize": "1BHK",
"maintainanceAmount": 5000,
"maintainanceHeadAmount": {
"1": 1500,
"2": 500,
"3": 2000,
"4": 1000,
},
}
}
}
}
}

--"/api/ownersModule":
-GET-"/" - Get all the owner details with room info
Fields- id, wingName, roomsize, roomno, firstname, lastname

-GET- "/get-excel" - Get the excel file with basic wing and room details which is to be downloaded by the user

-POST- "/post-excel" - POST the excel file with basic wing and room details
Fields: excel



--"/api/community-communications":
-POST - "/notices" - Create a new notice for a particular society
Fields: title-255 Chars, content, start_date, end_date
