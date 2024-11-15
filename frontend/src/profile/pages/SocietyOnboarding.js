import React, { useState, useContext } from 'react';

import DownloadModalComp from "./DownloadModal.js";
import UploadModalComp from "./UploadModal.js";
import { toast, ToastContainer } from 'react-toastify';

import { AuthContext } from "./../../shared/context/auth-context";

const SocietyOnboarding = () => {
    const { token } = useContext(AuthContext);
    const [uploadModal, setUploadModal] = useState(false);
    const [downloadModal,setDownloadModal] = useState(false);

    const [isDownloading, setIsDownloading] = useState(false);

    const API_URL = 'http://3.109.108.99:5007/api/ownersModule/get-excel';
    // const API_URL = 'http://localhost:5007/api/ownersModule/get-excel';


    

const downloadExcel = async () => {
  setIsDownloading(true);

  // Create a promise to handle the download
  const downloadPromise = new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', 
        },
      });

      console.log(response);

      if (!response.ok) {
        reject(new Error("Something went wrong while fetching the file."));
        return; // Exit if the request fails
      }

      // Log the response headers to check if the correct content type is sent
      console.log(response.headers.get('Content-Type'));

      // If the response is OK, proceed to download the file as Blob
      const blob = await response.blob();

      // Check if the blob has content or is empty
      console.log("Blob size:", blob.size);  // Should not be 0

      // Create a URL for the Blob object
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = downloadUrl;

      // Set the download attribute with the desired file name
      link.download = 'file.xlsx'; 

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Remove the link from the DOM after triggering the download
      document.body.removeChild(link);

      console.log("File downloaded successfully");
      resolve();  // Resolve the promise when the download is successful
    } catch (err) {
      reject(err);  // Reject the promise if an error occurs
    }
  });

  // Use toast.promise to handle different states of the promise
  toast.promise(
    downloadPromise,
    {
      pending: 'Downloading file...',
      success: 'File downloaded started successfully! 🎉',
      error: 'Error downloading file. 😢'
    }
  );

  try {
    await downloadPromise;  // Await the promise to handle success/failure
    setIsDownloading(false);
  } catch (err) {
    setIsDownloading(false);
  }
};

    
    
    

  return (
    <>
    {/* {
        downloadModal && <DownloadModalComp downloadModal = {downloadModal} setDownloadModal = {setDownloadModal} />
}
{
        uploadModal && <UploadModalComp uploadModal = {uploadModal} setDownloadModal = {setUploadModal}/>
} */}
{
  // isDownloading && <ToastContainer />
}
    <div className="flex justify-center min-h-screen">                
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Society Onboarding</h1>
        <div className="space-y-8">
        {
                downloadModal && <DownloadModalComp downloadModal = {downloadModal} setDownloadModal = {setDownloadModal} />
        }
        {
                uploadModal && <UploadModalComp uploadModal = {uploadModal} setUploadModal = {setUploadModal} token={token}/>
        }
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          onClick={() => downloadExcel()}
          >
            Owner/Member Data Download
            
          </button>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          onClick={() => {setUploadModal(true)}}
          >
            Owner/Member Data Upload
          </button>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default SocietyOnboarding;
