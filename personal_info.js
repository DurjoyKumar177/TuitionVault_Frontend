const handlePersonalInfo = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Collect form data
  const formData = new FormData();
  formData.append("phone_number_1", getValue("phone_number_1"));
  formData.append("phone_number_2", getValue("phone_number_2"));
  formData.append("date_of_birth", getValue("date_of_birth"));
  formData.append("address", getValue("address"));
  formData.append("achieved_degree", getValue("achieved_degree"));
  formData.append("running_degree", getValue("running_degree"));
  formData.append("current_organization", getValue("current_organization"));

  // Handle file uploads
  const degreeCertificate = document.getElementById("degree_certificate").files[0];
  const personalPhoto = document.getElementById("personal_photo").files[0];
  if (degreeCertificate) {
    formData.append("degree_certificate", degreeCertificate);
  }
  if (personalPhoto) {
    formData.append("personal_photo", personalPhoto);
  }

  // Reset any previous error messages
  clearErrors();

  try {
    const response = await fetch("http://127.0.0.1:8000/accounts/personal-info/", {
      method: "POST",
      credentials: "include", // Ensure cookies (session ID) are sent with the request
      body: formData, // Use FormData for file uploads
    });

    if (response.ok) {
      // Redirect to success page
      window.location.href = "sign_up_successfull.html";
    } else {
      // Show error messages from the API
      const errorData = await response.json();
      handleErrorMessages(errorData);
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("error").innerText =
      "An unexpected error occurred. Please try again.";
  }
};

// Helper function to get the value of an input field
const getValue = (id) => document.getElementById(id).value.trim();

// Handle error messages returned by the backend
const handleErrorMessages = (errorData) => {
  for (const [field, message] of Object.entries(errorData)) {
    if (field !== "error") {
      showError(field, message);
    } else {
      document.getElementById("error").innerText = message;
    }
  }
};

// Show specific error messages for the fields
const showError = (field, message) => {
  const errorElement = document.getElementById(`${field}-error`);
  if (errorElement) {
    errorElement.classList.remove("hidden");
    errorElement.innerText = message;
  }
};

// Clear all error messages
const clearErrors = () => {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((errorElement) => {
    errorElement.classList.add("hidden");
    errorElement.innerText = "";
  });
};

// Add event listener to the form
document
  .getElementById("personalInfoForm")
  .addEventListener("submit", handlePersonalInfo);
