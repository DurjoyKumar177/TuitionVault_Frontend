const handlePersonalInfo = (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Collect form field values
  const phone_number_1 = getValue("phone_number_1");
  const phone_number_2 = getValue("phone_number_2");
  const date_of_birth = getValue("date_of_birth");
  const address = getValue("address");
  const achieved_degree = getValue("achieved_degree");
  const running_degree = getValue("running_degree");
  const current_organization = getValue("current_organization");
  const degree_certificate = getValue("degree_certificate");
  const personal_photo = getValue("personal_photo");

  const info = {
    phone_number_1,
    phone_number_2,
    date_of_birth,
    address,
    achieved_degree,
    running_degree,
    current_organization,
    degree_certificate,
    personal_photo,
  };

  // Reset any previous error messages
  clearErrors();

  // Get CSRF token from cookies
  const getCSRFToken = () => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "csrftoken") {
        return value;
      }
    }
    return null;
  };

  const csrfToken = getCSRFToken();

  // Make the API call to submit personal information
  fetch("http://127.0.0.1:8000/accounts/personal-info/", {
    method: "POST",
    headers: {
      "X-CSRFToken": csrfToken,
      "Content-Type": "application/json",
    },
    credentials: "include", // Ensure cookies (like sessionid) are sent with the request
  })
    .then(async (res) => {
      if (res.ok) {
        window.location.href = "sign_up_successfull.html";
      } else {
        // Show error messages returned by the API
        const errorData = await res.json();
        handleErrorMessages(errorData);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("error").innerText =
        "An unexpected error occurred. Please try again.";
    });
};

// Helper function to get the value of an input field
const getValue = (id) => document.getElementById(id).value.trim();

// Handle error messages returned by the backend
const handleErrorMessages = (errorData) => {
  if (errorData.phone_number_1) {
    showError("phone_number_1", errorData.phone_number_1);
  }

  if (errorData.phone_number_2) {
    showError("phone_number_2", errorData.phone_number_2);
  }

  if (errorData.date_of_birth) {
    showError("date_of_birth", errorData.date_of_birth);
  }

  if (errorData.address) {
    showError("address", errorData.address);
  }

  if (errorData.achieved_degree) {
    showError("achieved_degree", errorData.achieved_degree);
  }

  if (errorData.running_degree) {
    showError("running_degree", errorData.running_degree);
  }

  if (errorData.current_organization) {
    showError("current_organization", errorData.current_organization);
  }

  if (errorData.degree_certificate) {
    showError("degree_certificate", errorData.degree_certificate);
  }

  if (errorData.personal_photo) {
    showError("personal_photo", errorData.personal_photo);
  }

  if (errorData.error) {
    document.getElementById("error").innerText = errorData.error;
  }
};

// Show specific error messages for the fields
const showError = (field, message) => {
  const errorElement = document.getElementById(`${field}-error`);
  errorElement.classList.remove("hidden");
  errorElement.innerText = message;
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
