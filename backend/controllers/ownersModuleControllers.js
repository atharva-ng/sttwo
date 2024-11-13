const XLSX = require('xlsx');
const ExcelJS = require('exceljs');
const path = require('path');

const HttpError = require('../models/http-error');

const {  saveOwnerDataQuery } = require('../dbUtils/ownersModuleQueries');
const {getOwnersDataFromSocietyIDQuery, getWingRoomDataQuery}= require('../dbUtils/getters');


const cleanGetData = (data) => {
  const uniqueWings = new Set();
  data.filter(item => {
    if (!uniqueWings.has(item.id)) {
      uniqueWings.add(item.name);
      return true;
    }
    return false;
  });


  const finalObj = {};

  uniqueWings.forEach(wingName => {
    // Attach an empty list to each ID
    finalObj[wingName] = [];
  });

  data.forEach(item => {
    finalObj[item.name].push({ "roomId": item.room_id, "roomNumber": item.room_no });
  });

  Object.keys(finalObj).forEach(id => {
    // Sort each list in ascending order
    finalObj[id].sort((a, b) => a.room_no - b.room_no);
  });

  return finalObj;
}

async function generateGetExcelFile(dataVar) {

  const data = [
    ['XYZ Society'],
  ]

  var mergeCount = 1;

  const mergeList = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }
  ];

  Object.entries(dataVar).forEach(([key, values]) => {
    data.push([key]);
    mergeList.push({ s: { r: mergeCount, c: 0 }, e: { r: mergeCount, c: 7 } });
    data.push(['Sr. No.', 'Room Number', 'First Name', 'Last Name', 'Email', 'Phone Number', 'Date of Purchase', 'Date of selling']);
    mergeCount += 2;
    var count = 1;
    values.forEach(item => {
      data.push([count, item.roomNumber, '', '', '', '', '', '']);
      count++;
      mergeCount++;
    });
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Society Data');

  const baseStyles={
    alignment: { vertical: 'middle', horizontal: 'center' },
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    },
    protection: { locked: true },
  }

  const sectionHeaderStyle = {
    font: { bold: true, size: 14 },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFE0B2' } }, // light yellow fill
  };

  let currentRow = 1;

  data.forEach((row) => {
    const isSectionHeader = row.length === 1 && typeof row[0] === 'string';
    const rowRef = worksheet.addRow(row);

    // Apply section header styles
    if (isSectionHeader) {
      rowRef.font = sectionHeaderStyle.font;
      
      worksheet.mergeCells(`A${currentRow}:H${currentRow}`);
      rowRef.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = baseStyles.border;
        cell.fill=sectionHeaderStyle.fill;
        cell.protection = baseStyles.protection;
      });
      rowRef.alignment = baseStyles.alignment;
    } else {
      // Apply header style to the row if it's the table header
      if (currentRow === 2 || row[0] === 'Sr. No.') {
        rowRef.eachCell({ includeEmpty: true }, (cell) => {
          cell.font = sectionHeaderStyle.font;
          cell.alignment = baseStyles.alignment;
          cell.border = baseStyles.border;
          cell.protection = baseStyles.protection;
        });
      } else {
        // Apply data cell styles for normal rows
        rowRef.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          cell.alignment = baseStyles.alignment;
          cell.border = baseStyles.border;

          if (colNumber === 1 || colNumber === 2) {
            // Lock the Sr. No. and Room Number columns
            cell.protection = { locked: true };
          } else {
            // Other columns can remain unlocked (editable)
            cell.protection = { locked: false };
          }
        });
      }
    }
    currentRow++;
  });
  

  worksheet.columns = [
    { width: 10 },  // Sr. No.
    { width: 20 },  // Room Number
    { width: 15 },  // First Name
    { width: 15 },  // Last Name
    { width: 30 },  // Email
    { width: 20 },  // Phone Number
    { width: 30 },  // Date of Purchase
    { width: 30 },  // Date of Selling
  ];

  worksheet.columns = Array.from({ length: 8 }, (_, i) => ({
    width: 15,  // You can set this dynamically based on column content
  }));

  worksheet.protect('password123', {
    selectLockedCells: true,
    selectUnlockedCells: true,
  });

  // const filePath = path.join(__dirname, 'SocietyDataWithBorders.xlsx');
  // await workbook.xlsx.writeFile(filePath);

  const excelFileBuffer = await workbook.xlsx.writeBuffer();
  return excelFileBuffer;

}

const numberToId = (str, sortedRoomData) => {
  const room = sortedRoomData.find(r => r.roomNumber === str);
  return room ? room.roomId : null;
}

const getOwnersModuleExcel = async (req, res, next) => {
  // const userId = req.userData.userId;
  const userId = 75;
  if (userId === null) {
    throw HttpError("Authentication Failed", 401);
  }
  var excelFileBuffer;
  try {
    const wingData = await getWingRoomDataQuery(userId);
    const sortedWingData = cleanGetData(wingData);

    excelFileBuffer = await generateGetExcelFile(sortedWingData);
    res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  } catch (error) {
    console.log(error);
    throw new HttpError("Something went wrong-getOwnersModule", 500);
  }
  return res.status(200).send(excelFileBuffer);
}


const cleanPostData = (inputData, sortedWingData) => {
  const output = {
    societyName: '',
    roomInfo: []
  };

  let currentWing = '';

  inputData.forEach(item => {
    if (Array.isArray(item) && item.length === 1) {
      if (item[0].startsWith('wing')) {
        currentWing = item[0];
      } else {
        output.societyName = item[0];
      }
    } else if (Array.isArray(item) && item.length > 1 && currentWing) {
      // Skip the header row
      if (item[0] !== 'Sr. No.') {
        output.roomInfo.push({
          roomId: numberToId(item[1], sortedWingData[currentWing]),
          firstName: item[2],
          lastName: item[3],
          email: item[4],
          phoneNumber: item[5],
          dateOfPurchase: item[6],
          dateOfSelling: item[7]
        });
      }
    }
  });

  return output;
}

const postOwnersModuleExcel = async (req, res, next) => {

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  try {
    // Read the uploaded file
    const workbook = XLSX.readFile(req.file.path);

    // Convert the worksheet to JSON
    const inputData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });

    const sortedWingData = cleanGetData(await getWingRoomDataQuery(75));

    var output = cleanPostData(inputData, sortedWingData);

    const result = await saveOwnerDataQuery(output.roomInfo);

    return res.status(200).json({"message":"success"});

  } catch (error) {
    console.log('Error processing file:', error);
    throw new HttpError("Something went wrong- post owners module", 500);
  }
}


const getOwnersData = async (req, res, next) => {
  // const userId = req.userData.userId;
  const userId = 75;
  if (userId === null) {
    throw HttpError("Authentication Failed", 401);
  }
  try {
    const ownersData = await getOwnersDataFromSocietyIDQuery(75);
    console.log(ownersData);
    return res.status(200).json(ownersData);
  } catch (error) {
    console.log(error);
    throw new HttpError("Something went wrong-getOwnersData", 500);
  }
}



exports.getOwnersModuleExcel = getOwnersModuleExcel;
exports.postOwnersModuleExcel = postOwnersModuleExcel;
exports.getOwnersData = getOwnersData;

