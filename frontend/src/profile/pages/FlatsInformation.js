import React, { useState } from 'react';
import { useAuth } from '../../shared/hooks/auth-hook'; // Import the useAuth hook
import { BrowserRouter as Router } from 'react-router-dom';
import './FlatsInformation.css'; // Import the CSS file if needed
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import xlsx library

const FlatsInformation = () => {
  const { token } = useAuth(); // Access the token from context
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]); // Initialize data as an empty array
  const [error, setError] = useState(null); // State to manage error messages
  const [successMessage, setSuccessMessage] = useState(''); // State to manage success messages
  const [isUploading, setIsUploading] = useState(false); // State to manage upload status
  const [logs, setLogs] = useState([]); // State to manage logs

  const addLog = (message) => {
    console.log(message); // Log to the console
    setLogs((prevLogs) => [...prevLogs, message]); // Add log to the state
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    addLog(`Selected file: ${selectedFile.name}`);

    // Read the Excel file and set data
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Read as array of arrays
      const headers = jsonData[0]; // First row as headers
      const rows = jsonData.slice(1); // Remaining rows as data

      // Convert rows to objects with headers as keys
      const formattedData = rows.map((row) => {
        return headers.reduce((acc, header, index) => {
          acc[header] = row[index]; // Map header to corresponding row value
          return acc;
        }, {});
      });

      addLog(`Formatted Data: ${JSON.stringify(formattedData)}`);
      setData(formattedData); // Set the formatted data to state
    };
    reader.readAsBinaryString(selectedFile);
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data); // Convert JSON data to worksheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Flats Data'); // Append the worksheet to the workbook

    // Generate a download link for the Excel file
    XLSX.writeFile(workbook, 'uploaded_data.xlsx'); // Specify the file name
    addLog('Downloaded Excel file: uploaded_data.xlsx');
  };

  const handleUploadExcel = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append('excel', file);

    setIsUploading(true); // Set uploading state to true
    setSuccessMessage(''); // Clear previous success message
    setError(null); // Clear previous error message

    try {
      addLog(`Uploading file: ${file.name}`);
      const response = await axios.post('http://3.109.108.99:5007/api/ownersModule/post-excel', formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the Bearer token
        },
      });

      addLog(`Server Response: ${JSON.stringify(response.data)}`);

      // Check if response.data is defined and has roomInfo
      if (response.data && Array.isArray(response.data.roomInfo)) {
        setData(response.data.roomInfo); // Assuming the response contains roomInfo
        setSuccessMessage('Data saved successfully in the backend!'); // Set success message
      } else if (response.data) {
        console.error('Unexpected response structure:', response.data);
        addLog(`Unexpected response structure: ${JSON.stringify(response.data)}`);
        setError('Unexpected response structure from the server.'); // Handle unexpected structure
      } else {
        console.error('Empty response from the server.');
        addLog('Empty response from the server.');
        setError('Empty response from the server.');
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      addLog(`Error uploading file: ${err.message}`);
      // Improved error handling based on backend response
      let errorMessage = 'Failed to upload the Excel file. Please check the file format and try again.';
      if (err.response && err.response.data) {
        // Check if the error response has a message
        if (typeof err.response.data === 'object' && err.response.data.message) {
          errorMessage = err.response.data.message; // Use the message from the error object
        } else {
          errorMessage = err.response.data; // Fallback to the raw response if it's not an object
        }
      }
      setError(errorMessage);
    } finally {
      setIsUploading(false); // Reset uploading state
    }
  };

  const handleEdit = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  return (
    <Router>
      <div className='app-container'>
        <div className='main-content'>
          <h1 className='homepage-title'>Flats Information</h1>
          <p className='homepage-description'>
            Download and upload Excel files to manage flats details.
          </p>
          <div>
            <button onClick={handleDownloadExcel}>Download Excel</button>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUploadExcel} disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload Excel'}
            </button>
          </div>

          {error && <h1 className="error-message">{error}</h1>} {/* Display error message */}
          {successMessage && <h1 className="success-message">{successMessage}</h1>} {/* Display success message */}

          {data.length > 0 && (
            <div>
              <h2>Uploaded Data</h2>
              <table>
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      {Object.values(item).map((value, idx) => (
                        <td key={idx}>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => handleEdit(index, Object.keys(item)[idx], e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
};

export default FlatsInformation;