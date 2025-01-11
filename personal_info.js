const handlePersonalInfo = async (event) => {
  event.preventDefault(); 

  const userId = localStorage.getItem("user_id");

  if (!userId) {
    document.getElementById("error").innerText =
      "User ID is missing. Please register again.";
    return;
  }

  const formData = new FormData();
  formData.append("user_id", userId);
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
    const response = await fetch("https://tuitionvault.onrender.com/accounts/personal-info/", {
      method: "POST",
      body: formData, // Send FormData as the body
    });

    if (response.ok) {
      // Redirect to the success page after successful personal information update
      window.location.href = "sign_up_successfull.html";
    } else if (response.status === 400) {
      // Handle validation errors from the backend
      const errorData = await response.json();
      handleErrorMessages(errorData);
    } else if (response.status === 404) {
      // Handle user not found case
      const errorData = await response.json();
      document.getElementById("error").innerText =
        errorData.message || "User not found.";
    } else {
      throw new Error("Unexpected response from the server.");
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
  for (const [field, messages] of Object.entries(errorData)) {
    if (field !== "message") {
      showError(field, messages.join(", ")); // Display specific field errors
    } else {
      document.getElementById("error").innerText = messages; // Display generic error messages
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
