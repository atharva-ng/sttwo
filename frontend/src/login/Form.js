import { React, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from 'react-router-dom';

const Form = (props) => {
  // State variables to store the form data
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });

  const history = useHistory(); // Hook for navigation

  const [isSubmitting, setIsSubmitting] = useState(false); // To manage loading state
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleNext = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting to true
    setErrorMessage(""); // Reset error message

    try {
      const response = await fetch(props.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to login");
      }

      props.login(responseData.isAdmin, responseData.token);
    } catch (error) {
      setErrorMessage(error.message || "There was a problem with the fetch operation");
      toast.error(error.message);
    } finally {
      history.push("/");
      setIsSubmitting(false); // Reset submitting status
    }
  };

  return (
    <form className="max-w-[60vw] w-[45vw] mt-2 bg-white p-4" onSubmit={handleNext}>
      <ToastContainer />
      <div className="mb-6">
        <label className="block mb-2 text-gray-500">Email</label>
        <input
          type="email"
          name="emailAddress"
          placeholder="Enter Email"
          value={formData.emailAddress}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1  hover:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-gray-500">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md text-base transition-colors duration-300 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1  hover:border-blue-500"
        />
      </div>
      {/* {errorMessage} */}
      <button
        className={`w-full p-3 bg-blue-600 text-white font-bold rounded-md transition-colors duration-300 hover:bg-blue-700 focus:outline-none ${
          isSubmitting ? "opacity-75 cursor-not-allowed" : ""
        }`}
        type="submit"
        disabled={isSubmitting}
      >
        
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Form;
