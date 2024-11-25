const XLSX = require('xlsx');
const ExcelJS = require('exceljs');

const pool = require('../dbUtils/db');

const HttpError = require('../models/http-error');

const { saveOwnerDataQuery } = require('../dbUtils/ownersModuleQueries');
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
    finalObj[id].sort((a, b) => {
      return Number(a.roomNumber) - Number(b.roomNumber)
    });
  });

  return finalObj;
}

async function generateGetExcelFile(dataVar) {
  const data = [
    ['XYZ Society'],
  ];

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

  const baseStyles = {
    alignment: { vertical: 'middle', horizontal: 'center' },
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    },
    protection: { locked: true },
  };

  const sectionHeaderStyle = {
    font: { bold: true, size: 14 },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFE0B2' } }, // light yellow fill
  };

  // Define date format
  const dateFormat = {
    numFmt: 'yyyy-mm-dd'
  };

  let currentRow = 1;

  data.forEach((row) => {
    const isSectionHeader = row.length === 1 && typeof row[0] === 'string';
    const rowRef = worksheet.addRow(row);

    if (isSectionHeader) {
      rowRef.font = sectionHeaderStyle.font;
      worksheet.mergeCells(`A${currentRow}:H${currentRow}`);
      rowRef.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = baseStyles.border;
        cell.fill = sectionHeaderStyle.fill;
        cell.protection = baseStyles.protection;
      });
      rowRef.alignment = baseStyles.alignment;
    } else {
      if (currentRow === 2 || row[0] === 'Sr. No.') {
        rowRef.eachCell({ includeEmpty: true }, (cell) => {
          cell.font = sectionHeaderStyle.font;
          cell.alignment = baseStyles.alignment;
          cell.border = baseStyles.border;
          cell.protection = baseStyles.protection;
        });
      } else {
        rowRef.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          cell.alignment = baseStyles.alignment;
          cell.border = baseStyles.border;

          // Apply date formatting to date columns (7 and 8)
          if (colNumber === 7 || colNumber === 8) {
            cell.numFmt = dateFormat.numFmt;
            if (cell.value) {
              // Convert date string to Excel date
              if (typeof cell.value === 'string' && cell.value.match(/^\d{4}-\d{2}-\d{2}$/)) {
                cell.value = new Date(cell.value);
              }
            }
          }

          // Phone number formatting
          if (colNumber === 6 && cell.value) {
            cell.numFmt = '@'; // Treat as text to preserve leading zeros
          }

          if (colNumber === 1 || colNumber === 2) {
            cell.protection = { locked: true };
          } else {
            cell.protection = { locked: false };
          }
        });
      }
    }
    currentRow++;
  });

  // Set column widths
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

  worksheet.protect('password123', {
    selectLockedCells: true,
    selectUnlockedCells: true,
  });

  const excelFileBuffer = await workbook.xlsx.writeBuffer();
  return excelFileBuffer;
}

const numberToId = (str, sortedRoomData) => {
  const room = sortedRoomData.find(r => r.roomNumber === str);
  return room ? room.roomId : null;
}

const getOwnersModuleExcel = async (req, res, next) => {
  const userId = req.userData.userId;
  // const userId = 75;
  if (userId === null) {
    next( HttpError("Authentication Failed", 401));
  }
  var excelFileBuffer;

  var client;
  try{
    client = await pool.connect();
    await client.query('BEGIN');
  }catch(err){
    console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }

  try {
    const wingData = await getWingRoomDataQuery(client, userId);
    const sortedWingData = cleanGetData(wingData);
    excelFileBuffer = await generateGetExcelFile(sortedWingData);
    res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    await client.query('COMMIT');

    return res.status(200).send(excelFileBuffer);

  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error);
    next(new HttpError("Something went wrong-getOwnersModule", 500));
  }finally {
    client.release();
  }

}

function serialToDate(serial) {
  if (typeof serial !== 'number') return serial;
  
  // Convert Excel serial to date (Excel starts at 1899-12-30)
  const date = new Date(Date.UTC(1899, 11, 30) + (serial * 86400000)); // 86400000 = 24*60*60*1000
  
  return date.toISOString().split('T')[0];
}

const cleanPostData = (inputData, sortedWingData) => {
  const output = {
    societyName: '',
    roomInfo: []
  };

  let currentWing = '';

  output.societyName = inputData[0][0];
  inputData.forEach(item => {
    if (Array.isArray(item) && item.length === 1) {
      currentWing = item[0];
    } else if (Array.isArray(item) && item.length > 1 && currentWing) {
      // Skip the header row
      if (item[0] !== 'Sr. No.') {
        output.roomInfo.push({
          roomId: numberToId(item[1], sortedWingData[currentWing]),
          firstName: item[2],
          lastName: item[3],
          email: item[4],
          phoneNumber: item[5],
          dateOfPurchase: serialToDate(item[6]),
          dateOfSelling: item[7]
        });
      }
    }
  });
  return output;
}

const postOwnersModuleExcel = async (req, res, next) => {

  const userId = req.userData.userId;
  // const userId = 75;
  if (userId === null) {
    next( HttpError("Authentication Failed", 401));
  }

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  var client;
  try{
    client = await pool.connect();
    await client.query('BEGIN');
  }catch(err){
    console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }
  try {
    // Read the uploaded file
    const workbook = XLSX.readFile(req.file.path);

    // Convert the worksheet to JSON
    const inputData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });

    const sortedWingData = cleanGetData(await getWingRoomDataQuery(client, userId));

    var output = cleanPostData(inputData, sortedWingData);

    const result = await saveOwnerDataQuery(client, output.roomInfo);
    
    await client.query('COMMIT');

    if(result.idList.length>0){
      return res.status(200).json({"message":"success"});
    }else{
      return res.status(400).json({"message":"No new owners were created. Please check the provided data for issues."});
    }



  } catch (error) {
    await client.query('ROLLBACK');
    console.log('Error processing file:', error);
    next(new HttpError("Something went wrong- post owners module", 500));
  }finally {
    client.release(); 
  }
  return res.status(200).json();
}


const getOwnersData = async (req, res, next) => {
  const userId = req.userData.userId;
  // const userId = 75;
  if (userId === null) {
    next( HttpError("Authentication Failed", 401));
  }

  var client;
  try{
    client = await pool.connect();
    await client.query('BEGIN');
  }catch(err){
    console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }

  try {
    
    const ownersData = await getOwnersDataFromSocietyIDQuery(client, userId);
    console.log(ownersData);

    await client.query('COMMIT');
    return res.status(200).json(ownersData);
  } catch (error) {
    await client.query('ROLLBACK'); 
    console.log(error);
    next( new HttpError("Something went wrong-getOwnersData", 500));
  }finally {
    client.release();
  }
}



exports.getOwnersModuleExcel = getOwnersModuleExcel;
exports.postOwnersModuleExcel = postOwnersModuleExcel;
exports.getOwnersData = getOwnersData;