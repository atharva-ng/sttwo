import { React,useState } from "react";


const Form = (props) => {
  // State variables to store the form data
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // To manage loading state
  const [errorMessage, setErrorMessage] = useState(""); // To display error messages
  const [successMessage, setSuccessMessage] = useState(""); // To display success messages

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
    setSuccessMessage(""); // Reset success message

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
      // localStorage.setItem('token',responseData.data.token);
      console.log(responseData);
      setSuccessMessage("Login successful!");

    } catch (error) {
      setErrorMessage(error.message || "There was a problem with the fetch operation");
    } finally {
      setIsSubmitting(false); // Reset submitting status
    }
  };

  return(<form className="form" onSubmit={handleNext}>
    <div className="form-group">
      <label>Email Address</label>
      <input
        type="email"
        name="emailAddress"
        placeholder="EMAIL ADDRESS"
        value={formData.emailAddress}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-group">
      <label>Password</label>
      <input
        type="password"
        name="password"
        placeholder="PASSWORD"
        value={formData.password}
        onChange={handleChange}
        required
      />
    </div>

    {errorMessage && <div className="error-message">{errorMessage}</div>}
    {successMessage && <div className="success-message">{successMessage}</div>}

    <button className="next-button" type="submit" disabled={isSubmitting}>
      {isSubmitting ? "Logging in..." : "Login"}
    </button>
  </form>);
}

export default Form;