const XLSX = require('xlsx');
const path = require('path');

const HttpError = require('../models/http-error');

const { getWingDataQuery } = require('../dbUtils/ownersModuleQueries');

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
      data.push([count, item, '', '', '', '', '', '']);
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

  // Define the output file path
  const outputPath = path.join(__dirname, 'XYZ_Society_Wing_1.xlsx');

  // Write the workbook to a file
  XLSX.writeFile(wb, outputPath);

  console.log(`Excel file has been generated at: ${outputPath}`);
}

const cleanData = (data) => {
  const uniqueIds = new Set();
  data.filter(item => {
    if (!uniqueIds.has(item.id)) {
      uniqueIds.add(item.name);
      return true;
    }
    return false;
  });


  const finalObj = {};

  uniqueIds.forEach(id => {
    // Attach an empty list to each ID
    finalObj[id] = [];
  });

  data.forEach(item => {
    finalObj[item.name].push(item.room_no);
  });

  Object.keys(finalObj).forEach(id => {
    // Sort each list in ascending order
    finalObj[id].sort((a, b) => a - b);
  });

  return finalObj;
}


const getOwnersModule = async (req, res, next) => {
  // const userId = req.userData.userId;
  const userId = 75;
  if (userId === null) {
    throw HttpError("Authentication Failed", 401);
  }
  try {
    const wingData = await getWingDataQuery(userId);
    const sortedWingData = cleanData(wingData);

    generateGetExcelFile(sortedWingData);
  } catch (error) {
    console.log(error);
    throw new HttpError("Something went wrong-getOwnersModule", 500);
  }

  return res.status(200).json({
    "message": "Success"
  });
}


exports.getOwnersModule = getOwnersModule;