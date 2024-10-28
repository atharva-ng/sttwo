import React from 'react';
import { Check, Info } from 'lucide-react';

const SubmittedModal = ({isSubmitted, setIsSubmitted, isError, setIsError}) => {
    const message = "Your details have been successfully submitted. Thanks!";
    const messageError = "There was some Error. Please try again.";
  return (
    <>
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex flex-col items-center p-6 space-y-4">
          {/* Green circle with checkmark */}
          
          <div className="rounded-full bg-blue-500 p-3">
          <Check className="w-6 h-6 text-white" />
        </div>
          
          
          {/* Thank You text */}
           <h2 className="text-xl font-semibold text-gray-800">
            Thank You!
          </h2>
          
          
          {/* Success message */}

           <p className="text-gray-600 text-center">
            {message}
          </p>
          
          
          
          {/* OK button */}
          <button
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default SubmittedModal;