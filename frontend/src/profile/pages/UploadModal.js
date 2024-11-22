import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./uploadmodal.css";

const UploadModalComp = ({ uploadModal, setUploadModal, token }) => {
  const history = useHistory(); // Hook for navigation

  const [isUploading, setIsUploading] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // To handle drag state

  const API_URL = 'http://3.109.108.99:5007/api/ownersModule/post-excel';
  // const API_URL = 'http://localhost:5007/api/ownersModule/post-excel';

  // Function to handle file drop
  const handleDrop = (event) => {
    event.preventDefault(); // Prevent default behavior (open file in browser)
    setIsDragging(false); // Reset drag state

    const file = event.dataTransfer.files[0]; // Get the dropped file
    if (file) {
      setSelectedFile(file); // Set the selected file
      setIsFileSelected(true); // Mark file as selected
      console.log("Dropped file:", file);
    }
  };

  // Function to handle file drag over (required to allow dropping)
  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default to allow drop
    setIsDragging(true); // Set dragging state to true
  };

  // Function to handle drag leave (reset drag state)
  const handleDragLeave = () => {
    setIsDragging(false); // Reset drag state when leaving drop area
  };

  const handleUpload = async () => {
    setIsUploading(true);
    console.log("Uploading:", selectedFile);
  
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
  
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData, 
        });
  
        if (!response.ok) {
          const data = await response.text();
          throw new Error(data.message || "Something went wrong");
        } else {
          toast.success("File Uploaded");
          localStorage.setItem('isUploaded', true);
          
          localStorage.setItem('fileUpload', selectedFile);
          console.log("Form Submitted:", selectedFile);
          setUploadModal(false);
          history.push("/community-communications/helpdesk");
          
          // setUploadModal(false);
        }
      } catch (err) {
        console.log('Error posting notice:', err);
        toast.error("Error Uploading File.");
        // window.location.reload();
        
        
      } finally {
        setIsUploading(false);
      }
    } else {
      toast.error("No file selected.");
      setIsUploading(false);
      console.log('No file selected.');
    }
  };

  // Function to handle file selection via input
  const handleFileChange = (event) => {
    setIsFileSelected(true);
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      setSelectedFile(file);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        aria-hidden="true"
      >
        <ToastContainer />
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow ">
            <button
              onClick={() => setUploadModal(false)}
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <X />
              <span className="sr-only">Close modal</span>
            </button>

            <div className="p-4 md:p-5">
              <h3 className="mb-1 text-xl font-bold text-gray-900 ">
                Upload Excel File
              </h3>

              <div
                className={`flex items-center justify-center w-full mb-5 mt-3 border-2 ${
                  isDragging ? 'border-blue-500' : 'border-gray-300'
                } border-dashed rounded-lg cursor-pointer bg-gray-50`}
                onDrop={handleDrop} // Handle file drop
                onDragOver={handleDragOver} // Handle drag over
                onDragLeave={handleDragLeave} // Handle drag leave
              >
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 ">
                      {!isFileSelected ? (
                        <>
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </>
                      ) : (
                        <>{selectedFile.name}</>
                      )}
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                </label>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5 ">
                <div
                  className={`bg-green-500 h-2.5 rounded-full ${
                    isUploading ? 'loadingbar' : 'nun'
                  }`}
                  style={{ width: '0%' }}
                ></div>
              </div>
              
              {/* Modal footer */}
              <div className="flex items-center mt-6 space-x-4 rtl:space-x-reverse">
                <button
                  onClick={handleUpload}
                  type="button"
                  className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                >
                  Upload
                </button>
                <button
                  onClick={() => setUploadModal(false)}
                  type="button"
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadModalComp;
