import React from 'react';

const WingTable = ({ wingName, data }) => {
  return (
    <div>
      <h2>{wingName}</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={headerStyle}>Sr No</th>
            <th style={headerStyle}>Room Number</th>
            <th style={headerStyle}>Name</th>
            <th style={headerStyle}>Room Size</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
              <td style={cellStyle}>{index + 1}</td>
              <td style={cellStyle}>{row.roomNumber}</td>
              <td style={cellStyle}>{row.name}</td>
              <td style={cellStyle}>{row.roomSize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const headerStyle = {
  backgroundColor: '#f2f2f2',
  padding: '10px',
  border: '1px solid #ddd',
  fontWeight: 'bold',
  textAlign: 'left',
};

const cellStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

const evenRowStyle = {
  backgroundColor: '#ffffff',
};

const oddRowStyle = {
  backgroundColor: '#f9f9f9',
};

const App = () => {
  const wings = [
    {
      wingName: 'Wing A',
      data: [
        { roomNumber: '101', name: 'Gaurav Kapoor', roomSize: '1 BHK' },
        { roomNumber: '102', name: 'Abhilasha Kumari', roomSize: '1 BHK' },
        { roomNumber: '103', name: 'Happy Singh', roomSize: '2 BHK' },
      ],
    },
    {
      wingName: 'Wing B',
      data: [
        { roomNumber: '201', name: 'John Doe', roomSize: '2 BHK' },
        { roomNumber: '202', name: 'Jane Smith', roomSize: '1 BHK' },
      ],
    },
  ];

  return (
    <div>
      {wings.map((wing, index) => (
        <WingTable key={index} wingName={wing.wingName} data={wing.data} />
      ))}
    </div>
  );
};

export default App;
