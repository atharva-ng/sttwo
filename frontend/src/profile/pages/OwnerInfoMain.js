import React, { useEffect, useState, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import SocietyOnboarding from './SocietyOnboarding';
import OwnerInfo from './OwnerInfo';

import { AuthContext } from "./../../shared/context/auth-context";

const OwnerInfoMain = () => {
  const { token } = useContext(AuthContext);

    const [formData, setFormData] = useState([]);
    const[isError, setIsError] = useState(false);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const API_URL = 'http://3.109.108.99:5007/api/ownersModule/';
    

    useEffect(()=>{
        fetchOwnerData()
    },[])

    const fetchOwnerData = async () => {
        
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

      if (!response.ok) {
        reject(new Error("Something went wrong while fetching the file."));
        setIsError(true);
        return; // Exit if the request fails
      }
      const data = await response.json();

      // Log the response headers to check if the correct content type is sent
      console.log(data);

      setIsDataFetched(true);    
      if(data.length!==0){
        console.log("File downloaded successfully");
      }
      setFormData(data);

      resolve();  // Resolve the promise when the download is successful
    } catch (err) {
      reject(err);  // Reject the promise if an error occurs
    }
  });

  // Use toast.promise to handle different states of the promise
  toast.promise(
    downloadPromise,
    {
      pending: 'Fetching Data...',
      success: 'Data Recieved successfully! 🎉',
      error: 'Error Recieving Data. 😢'
    }
  );

  try {
    await downloadPromise;  // Await the promise to handle success/failure
  } catch (err) {
    setIsError(true);
  }
    };

    return (
        <>
        <ToastContainer />
    {
        isDataFetched ? 
        (formData.length===0 || isError) ?
        <SocietyOnboarding />
        :
        <OwnerInfo formData = {formData} setFormData={setFormData}/> 
        : 
        // <button onClick={() => fetchOwnerData()}>fetch data</button>
        <span>data is being fetched.</span>
    }
        </>
    );

};




export default OwnerInfoMain;