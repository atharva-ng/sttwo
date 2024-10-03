const XLSX = require('xlsx');
const path = require('path');

const HttpError = require('../models/http-error');

const { getWingDataQuery } = require('../dbUtils/ownersModuleQueries');

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

function generateGetExcelFile(dataVar) {

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

  console.log(mergeList);

  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Create a worksheet
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Set column widths
  const colWidths = [10, 15, 15, 15, 25, 15, 15, 15];
  ws['!cols'] = colWidths.map(width => ({ width }));

  // Merge cells for the title and subtitle
  ws['!merges'] = mergeList;

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'XYZ Society');
  // XLSX.writeFile(wb, 'example.xlsx');
  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
}

const numberToId = (str, sortedRoomData) => {
  const room = sortedRoomData.find(r => r.roomNumber === str);
  return room ? room.roomId : null;
}

const getOwnersModule = async (req, res, next) => {
  // const userId = req.userData.userId;
  const userId = 75;
  if (userId === null) {
    throw HttpError("Authentication Failed", 401);
  }
  var excelFileBuffer;
  try {
    const wingData = await getWingDataQuery(userId);
    const sortedWingData = cleanGetData(wingData);

    excelFileBuffer = generateGetExcelFile(sortedWingData);
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
    wingInfo: {}
  };

  let currentWing = '';

  inputData.forEach(item => {
    if (Array.isArray(item) && item.length === 1) {
      if (item[0].startsWith('wing')) {
        currentWing = item[0];
        output.wingInfo[currentWing] = [];
      } else {
        output.societyName = item[0];
      }
    } else if (Array.isArray(item) && item.length > 1 && currentWing) {
      // Skip the header row
      if (item[0] !== 'Sr. No.') {
        output.wingInfo[currentWing].push({
          roomNumber: numberToId(item[1], sortedWingData[currentWing]),
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

const postOwnersModule = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  try {
    // Read the uploaded file
    const workbook = XLSX.readFile(req.file.path);

    // Convert the worksheet to JSON
    const inputData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });

    const sortedWingData = cleanGetData(await getWingDataQuery(75));

    var output = cleanPostData(inputData, sortedWingData);

    console.log(output.wingInfo.wing1);

  } catch (error) {
    console.log('Error processing file:', error);
    throw new HttpError("Something went wrong- post owners module", 500);
  }
  return res.status(200).json();
}

exports.getOwnersModule = getOwnersModule;
exports.postOwnersModule = postOwnersModule;