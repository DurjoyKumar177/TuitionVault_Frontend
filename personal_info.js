const handlePersonalInfoSubmission = (event) => {
  event.preventDefault();

  const user_id = localStorage.getItem("user_id");

  if (!user_id) {
      document.getElementById("error").innerText = "User ID is missing. Please log in again.";
      return;
  }

  const formData = new FormData();
  formData.append("user_id", user_id);
  formData.append("phone_number_1", getValue("phone_number_1"));
  formData.append("phone_number_2", getValue("phone_number_2"));
  formData.append("date_of_birth", getValue("date_of_birth"));
  formData.append("address", getValue("address"));
  formData.append("achieved_degree", getValue("achieved_degree"));
  formData.append("running_degree", getValue("running_degree"));
  formData.append("current_organization", getValue("current_organization"));

  const degreeCertificate = document.getElementById("degree_certificate").files[0];
  const personalPhoto = document.getElementById("personal_photo").files[0];

  if (degreeCertificate) {
      formData.append("degree_certificate", degreeCertificate);
  }

  if (personalPhoto) {
      formData.append("personal_photo", personalPhoto);
  }

  clearErrors();

  // Send data to the backend
  fetch("https://tuitionvault.onrender.com/accounts/personal-info/", {
      method: "POST",
      body: formData,
  })
      .then(async (res) => {
          if (res.ok) {

              window.location.href = "sign_up_successfull.html";
          } else {
              // Handle validation errors from the backend
              const errorData = await res.json();
              Object.keys(errorData).forEach((key) => {
                  showError(key, errorData[key]);
              });
          }
      })
      .catch((error) => {
          // Handle unexpected errors
          console.error("Error:", error);
          document.getElementById("error").innerText = "An unexpected error occurred. Please try again.";
          alert("An unexpected error occurred. Please try again.");
      });
};

// Helper function to get input values
const getValue = (id) => document.getElementById(id)?.value.trim();

// Helper function to show error messages
const showError = (field, message) => {
  const errorElement = document.querySelector(`[data-error="${field}"]`);
  if (errorElement) {
      errorElement.innerText = message;
  } else {
      console.warn(`No error element found for field: ${field}`);
  }
};

// Helper function to clear all error messages
const clearErrors = () => {
  const errorElements = document.querySelectorAll("[data-error]");
  errorElements.forEach((errorElement) => {
      errorElement.innerText = "";
  });
};

const form = document.getElementById("personalInfoForm");
if (form) {
  form.addEventListener("submit", handlePersonalInfoSubmission);
}

