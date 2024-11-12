import React, { useState } from 'react';

import DownloadModalComp from "./DownloadModal.js";
import UploadModalComp from "./UploadModal.js";

const SocietyOnboarding = ({token}) => {
    const [uploadModal, setUploadModal] = useState(false);
    const [downloadModal,setDownloadModal] = useState(false);
  return (
    <>
    {/* {
        downloadModal && <DownloadModalComp downloadModal = {downloadModal} setDownloadModal = {setDownloadModal} />
}
{
        uploadModal && <UploadModalComp uploadModal = {uploadModal} setDownloadModal = {setUploadModal}/>
} */}
    <div className="flex justify-center min-h-screen">
        
                
      <div className="text-center mt-10">




        <h1 className="text-4xl font-bold text-gray-900 mb-8">Society Onboarding</h1>
        <div className="space-y-4">
        {
                downloadModal && <DownloadModalComp downloadModal = {downloadModal} setDownloadModal = {setDownloadModal} />
        }
        {
                uploadModal && <UploadModalComp uploadModal = {uploadModal} setUploadModal = {setUploadModal} token={token}/>
        }
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          onClick={() => {setDownloadModal(true)}}
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
    </>
  );
};

export default SocietyOnboarding;
