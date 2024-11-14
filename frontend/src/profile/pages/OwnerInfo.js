import React, { useEffect, useState } from 'react';

const OwnerInfo = ({formData, setFormData}) => {
    const [isTable, setIsTable] = useState(false);

  const toggleState = () => {
    setIsTable(!isTable);
  };
  const [roomData, setRoomData] = useState([]);

  // Fetch the data (assuming you have an API to fetch)
  useEffect(() => {
    // Example data (replace this with your API call)
    const fetchedData = [
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "101",
            "firstname": "Name 1",
            "lastname": "LastName 1"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "201",
            "firstname": "Name 5",
            "lastname": "LastName 5"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "301",
            "firstname": "Name 9",
            "lastname": "LastName 9"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "401",
            "firstname": "Name 13",
            "lastname": "LastName 13"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "501",
            "firstname": "Name 17",
            "lastname": "LastName 17"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "601",
            "firstname": "Name 21",
            "lastname": "LastName 21"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "701",
            "firstname": "Name 25",
            "lastname": "LastName 25"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "801",
            "firstname": "Name 29",
            "lastname": "LastName 29"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "901",
            "firstname": "Name 33",
            "lastname": "LastName 33"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "1001",
            "firstname": "Name 37",
            "lastname": "LastName 37"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "102",
            "firstname": "Name 2",
            "lastname": "LastName 2"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "202",
            "firstname": "Name 6",
            "lastname": "LastName 6"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "302",
            "firstname": "Name 10",
            "lastname": "LastName 10"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "402",
            "firstname": "Name 14",
            "lastname": "LastName 14"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "502",
            "firstname": "Name 18",
            "lastname": "LastName 18"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "602",
            "firstname": "Name 22",
            "lastname": "LastName 22"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "702",
            "firstname": "Name 26",
            "lastname": "LastName 26"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "802",
            "firstname": "Name 30",
            "lastname": "LastName 30"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "902",
            "firstname": "Name 34",
            "lastname": "LastName 34"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "1002",
            "firstname": "Name 38",
            "lastname": "LastName 38"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "103",
            "firstname": "Name 3",
            "lastname": "LastName 3"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "203",
            "firstname": "Name 7",
            "lastname": "LastName 7"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "303",
            "firstname": "Name 11",
            "lastname": "LastName 11"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "403",
            "firstname": "Name 15",
            "lastname": "LastName 15"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "503",
            "firstname": "Name 19",
            "lastname": "LastName 19"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "603",
            "firstname": "Name 23",
            "lastname": "LastName 23"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "703",
            "firstname": "Name 27",
            "lastname": "LastName 27"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "803",
            "firstname": "Name 31",
            "lastname": "LastName 31"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "903",
            "firstname": "Name 35",
            "lastname": "LastName 35"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "1BHK",
            "roomno": "1003",
            "firstname": "Name 39",
            "lastname": "LastName 39"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "104",
            "firstname": "Name 4",
            "lastname": "LastName 4"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "204",
            "firstname": "Name 8",
            "lastname": "LastName 8"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "304",
            "firstname": "Name 12",
            "lastname": "LastName 12"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "404",
            "firstname": "Name 16",
            "lastname": "LastName 16"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "504",
            "firstname": "Name 20",
            "lastname": "LastName 20"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "604",
            "firstname": "Name 24",
            "lastname": "LastName 24"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "704",
            "firstname": "Name 28",
            "lastname": "LastName 28"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "804",
            "firstname": "Name 32",
            "lastname": "LastName 32"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "904",
            "firstname": "Name 36",
            "lastname": "LastName 36"
        },
        {
            "id": 205,
            "wingName": "wing1",
            "roomsize": "2BHK",
            "roomno": "1004",
            "firstname": "Name 40",
            "lastname": "LastName 40"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "101",
            "firstname": "Name 1",
            "lastname": "LastName 1"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "201",
            "firstname": "Name 5",
            "lastname": "LastName 5"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "301",
            "firstname": "Name 9",
            "lastname": "LastName 9"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "401",
            "firstname": "Name 13",
            "lastname": "LastName 13"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "501",
            "firstname": "Name 17",
            "lastname": "LastName 17"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "601",
            "firstname": "Name 21",
            "lastname": "LastName 21"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "701",
            "firstname": "Name 25",
            "lastname": "LastName 25"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "801",
            "firstname": "Name 29",
            "lastname": "LastName 29"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "901",
            "firstname": "Name 33",
            "lastname": "LastName 33"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "1001",
            "firstname": "Name 37",
            "lastname": "LastName 37"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "102",
            "firstname": "Name 2",
            "lastname": "LastName 2"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "202",
            "firstname": "Name 6",
            "lastname": "LastName 6"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "302",
            "firstname": "Name 10",
            "lastname": "LastName 10"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "402",
            "firstname": "Name 14",
            "lastname": "LastName 14"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "502",
            "firstname": "Name 18",
            "lastname": "LastName 18"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "602",
            "firstname": "Name 22",
            "lastname": "LastName 22"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "702",
            "firstname": "Name 26",
            "lastname": "LastName 26"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "802",
            "firstname": "Name 30",
            "lastname": "LastName 30"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "902",
            "firstname": "Name 34",
            "lastname": "LastName 34"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "1002",
            "firstname": "Name 38",
            "lastname": "LastName 38"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "103",
            "firstname": "Name 3",
            "lastname": "LastName 3"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "203",
            "firstname": "Name 7",
            "lastname": "LastName 7"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "303",
            "firstname": "Name 11",
            "lastname": "LastName 11"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "403",
            "firstname": "Name 15",
            "lastname": "LastName 15"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "503",
            "firstname": "Name 19",
            "lastname": "LastName 19"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "603",
            "firstname": "Name 23",
            "lastname": "LastName 23"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "703",
            "firstname": "Name 27",
            "lastname": "LastName 27"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "803",
            "firstname": "Name 31",
            "lastname": "LastName 31"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "903",
            "firstname": "Name 35",
            "lastname": "LastName 35"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "1BHK",
            "roomno": "1003",
            "firstname": "Name 39",
            "lastname": "LastName 39"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "104",
            "firstname": "Name 4",
            "lastname": "LastName 4"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "204",
            "firstname": "Name 8",
            "lastname": "LastName 8"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "304",
            "firstname": "Name 12",
            "lastname": "LastName 12"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "404",
            "firstname": "Name 16",
            "lastname": "LastName 16"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "504",
            "firstname": "Name 20",
            "lastname": "LastName 20"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "604",
            "firstname": "Name 24",
            "lastname": "LastName 24"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "704",
            "firstname": "Name 28",
            "lastname": "LastName 28"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "804",
            "firstname": "Name 32",
            "lastname": "LastName 32"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "904",
            "firstname": "Name 36",
            "lastname": "LastName 36"
        },
        {
            "id": 206,
            "wingName": "wing2",
            "roomsize": "2BHK",
            "roomno": "1004",
            "firstname": "Name 40",
            "lastname": "LastName 40"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "101",
            "firstname": "Name 1",
            "lastname": "LastName 1"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "201",
            "firstname": "Name 5",
            "lastname": "LastName 5"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "301",
            "firstname": "Name 9",
            "lastname": "LastName 9"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "401",
            "firstname": "Name 13",
            "lastname": "LastName 13"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "501",
            "firstname": "Name 17",
            "lastname": "LastName 17"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "601",
            "firstname": "Name 21",
            "lastname": "LastName 21"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "701",
            "firstname": "Name 25",
            "lastname": "LastName 25"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "801",
            "firstname": "Name 29",
            "lastname": "LastName 29"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "901",
            "firstname": "Name 33",
            "lastname": "LastName 33"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "1001",
            "firstname": "Name 37",
            "lastname": "LastName 37"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "102",
            "firstname": "Name 2",
            "lastname": "LastName 2"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "202",
            "firstname": "Name 6",
            "lastname": "LastName 6"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "302",
            "firstname": "Name 10",
            "lastname": "LastName 10"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "402",
            "firstname": "Name 14",
            "lastname": "LastName 14"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "502",
            "firstname": "Name 18",
            "lastname": "LastName 18"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "602",
            "firstname": "Name 22",
            "lastname": "LastName 22"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "702",
            "firstname": "Name 26",
            "lastname": "LastName 26"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "802",
            "firstname": "Name 30",
            "lastname": "LastName 30"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "902",
            "firstname": "Name 34",
            "lastname": "LastName 34"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "1002",
            "firstname": "Name 38",
            "lastname": "LastName 38"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "103",
            "firstname": "Name 3",
            "lastname": "LastName 3"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "203",
            "firstname": "Name 7",
            "lastname": "LastName 7"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "303",
            "firstname": "Name 11",
            "lastname": "LastName 11"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "403",
            "firstname": "Name 15",
            "lastname": "LastName 15"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "503",
            "firstname": "Name 19",
            "lastname": "LastName 19"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "603",
            "firstname": "Name 23",
            "lastname": "LastName 23"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "703",
            "firstname": "Name 27",
            "lastname": "LastName 27"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "803",
            "firstname": "Name 31",
            "lastname": "LastName 31"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "903",
            "firstname": "Name 35",
            "lastname": "LastName 35"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "1BHK",
            "roomno": "1003",
            "firstname": "Name 39",
            "lastname": "LastName 39"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "104",
            "firstname": "Name 4",
            "lastname": "LastName 4"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "204",
            "firstname": "Name 8",
            "lastname": "LastName 8"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "304",
            "firstname": "Name 12",
            "lastname": "LastName 12"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "404",
            "firstname": "Name 16",
            "lastname": "LastName 16"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "504",
            "firstname": "Name 20",
            "lastname": "LastName 20"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "604",
            "firstname": "Name 24",
            "lastname": "LastName 24"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "704",
            "firstname": "Name 28",
            "lastname": "LastName 28"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "804",
            "firstname": "Name 32",
            "lastname": "LastName 32"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "904",
            "firstname": "Name 36",
            "lastname": "LastName 36"
        },
        {
            "id": 207,
            "wingName": "wing3",
            "roomsize": "2BHK",
            "roomno": "1004",
            "firstname": "Name 40",
            "lastname": "LastName 40"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "101",
            "firstname": "Name 1",
            "lastname": "LastName 1"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "201",
            "firstname": "Name 5",
            "lastname": "LastName 5"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "301",
            "firstname": "Name 9",
            "lastname": "LastName 9"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "401",
            "firstname": "Name 13",
            "lastname": "LastName 13"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "501",
            "firstname": "Name 17",
            "lastname": "LastName 17"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "601",
            "firstname": "Name 21",
            "lastname": "LastName 21"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "701",
            "firstname": "Name 25",
            "lastname": "LastName 25"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "801",
            "firstname": "Name 29",
            "lastname": "LastName 29"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "901",
            "firstname": "Name 33",
            "lastname": "LastName 33"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "1001",
            "firstname": "Name 37",
            "lastname": "LastName 37"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "102",
            "firstname": "Name 2",
            "lastname": "LastName 2"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "202",
            "firstname": "Name 6",
            "lastname": "LastName 6"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "302",
            "firstname": "Name 10",
            "lastname": "LastName 10"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "402",
            "firstname": "Name 14",
            "lastname": "LastName 14"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "502",
            "firstname": "Name 18",
            "lastname": "LastName 18"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "602",
            "firstname": "Name 22",
            "lastname": "LastName 22"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "702",
            "firstname": "Name 26",
            "lastname": "LastName 26"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "802",
            "firstname": "Name 30",
            "lastname": "LastName 30"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "902",
            "firstname": "Name 34",
            "lastname": "LastName 34"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "1002",
            "firstname": "Name 38",
            "lastname": "LastName 38"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "103",
            "firstname": "Name 3",
            "lastname": "LastName 3"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "203",
            "firstname": "Name 7",
            "lastname": "LastName 7"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "303",
            "firstname": "Name 11",
            "lastname": "LastName 11"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "403",
            "firstname": "Name 15",
            "lastname": "LastName 15"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "503",
            "firstname": "Name 19",
            "lastname": "LastName 19"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "603",
            "firstname": "Name 23",
            "lastname": "LastName 23"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "703",
            "firstname": "Name 27",
            "lastname": "LastName 27"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "803",
            "firstname": "Name 31",
            "lastname": "LastName 31"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "903",
            "firstname": "Name 35",
            "lastname": "LastName 35"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "1BHK",
            "roomno": "1003",
            "firstname": "Name 39",
            "lastname": "LastName 39"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "104",
            "firstname": "Name 4",
            "lastname": "LastName 4"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "204",
            "firstname": "Name 8",
            "lastname": "LastName 8"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "304",
            "firstname": "Name 12",
            "lastname": "LastName 12"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "404",
            "firstname": "Name 16",
            "lastname": "LastName 16"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "504",
            "firstname": "Name 20",
            "lastname": "LastName 20"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "604",
            "firstname": "Name 24",
            "lastname": "LastName 24"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "704",
            "firstname": "Name 28",
            "lastname": "LastName 28"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "804",
            "firstname": "Name 32",
            "lastname": "LastName 32"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "904",
            "firstname": "Name 36",
            "lastname": "LastName 36"
        },
        {
            "id": 208,
            "wingName": "wing4",
            "roomsize": "2BHK",
            "roomno": "1004",
            "firstname": "Name 40",
            "lastname": "LastName 40"
        }
    ];

    setRoomData(formData);
  }, []);

  // Function to group rooms by wingName
  const groupByWing = (data) => {
    return data.reduce((acc, room) => {
      const wing = room.wingName;
      if (!acc[wing]) acc[wing] = [];
      acc[wing].push(room);
      return acc;
    }, {});
  };

  const groupedRooms = groupByWing(roomData);

//   return (
//     <div className="container mx-auto p-4">

//       {Object.keys(groupedRooms).map((wing) => (
//         <div key={wing} className="mb-8">
//           <h2 className="text-2xl font-semibold mb-4">Wing: {wing}</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {groupedRooms[wing].map((room) => (
//               <div
//                 key={room.roomno}
//                 className="p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-200"
//               >
//                 <h3 className="text-xl font-bold mb-2">
//                   Room No: {room.roomno}
//                 </h3>
//                 <p className="text-gray-700 mb-1"><b>Size:</b> {room.roomsize}</p>
//                 <p className="text-gray-700">
//                   <b>Tenant:</b> {room.firstname} {room.lastname}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );

  return (
    <div className="container mx-auto p-4">
        {/* <input type="checkbox" value="" className="" /> */}
        {/* <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600">
        </div> */}
        <div className='flex'>
        
      <button
        onClick={toggleState}
        className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
          isTable ? 'bg-blue-500' : 'bg-gray-300'
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white shadow-md transform duration-300 ease-in-out ${
            isTable ? 'translate-x-6' : ''
          }`}
        />
      </button>
      <span className="ml-2 text-sm">
        {isTable ? 'Table View' : 'List View'}
      </span>
      </div>
    
    {
    isTable ?
    Object.keys(groupedRooms).map((wing, index) => (
        <div key={wing} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 px-2 text-gray-700">{wing}</h2>
          <table className="table-auto w-full text-left text-sm rtl:text-right text-gray-500">
            <thead className='text-sm text-gray-700 uppercase bg-gray-100 '>
              <tr>
                <th className="border px-4 py-4">Sr. No.</th>
                <th className="border px-4 py-4">Room Number</th>
                <th className="border px-4 py-4">Tenant Name</th>
                <th className="border px-4 py-4">Room Size</th>
              </tr>
            </thead>
            <tbody>
              {groupedRooms[wing].map((room, idx) => (
                <tr key={room.roomno} className='bg-white border-b  hover:bg-gray-50'>
                  <td className="border px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{idx + 1}</td>
                  <td className="border px-4 py-2">{room.roomno}</td>
                  <td className="border px-4 py-2">
                    {room.firstname} {room.lastname}
                  </td>
                  <td className="border px-4 py-2">{room.roomsize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))

      :

      Object.keys(groupedRooms).map((wing) => (
        <div key={wing} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Wing: {wing}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedRooms[wing].map((room) => (
              <div
                key={room.roomno}
                className="p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-200"
              >
                <h3 className="text-xl font-bold mb-2">
                  Room No: {room.roomno}
                </h3>
                <p className="text-gray-700 mb-1"><b>Size:</b> {room.roomsize}</p>
                <p className="text-gray-700">
                  <b>Tenant:</b> {room.firstname} {room.lastname}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))


    }
  
      
    </div>
  );
};

export default OwnerInfo;
