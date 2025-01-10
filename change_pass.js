document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();  

    const oldPassword = document.getElementById("old_password").value;
    const newPassword1 = document.getElementById("new_password1").value;
    const newPassword2 = document.getElementById("new_password2").value;

    // Function to display error messages
    const showError = (field, message) => {
        const errorSpan = document.getElementById(`${field}_error`);
        errorSpan.textContent = message;
        errorSpan.classList.remove("hidden"); // Show the error message
        errorSpan.style.color = "red"; // Set the color to red for visibility
        errorSpan.style.fontWeight = "bold"; // Make the error bold for emphasis
    };

    // Clear previous error messages
    const clearErrors = () => {
        document.querySelectorAll(".error-message").forEach((element) => {
            element.classList.add("hidden");
            element.textContent = ""; // Clear error message text
        });
    };
    
    clearErrors();

    // Validate new password
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(newPassword1)) {
        showError("new_password1", "Password must contain at least eight characters, one letter, one number, and one special character.");
        return;
    }

    // Confirm passwords match
    if (newPassword1 !== newPassword2) {
        showError("new_password2", "Passwords do not match.");
        return;
    }

    // Fetch the auth token from local storage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
        showError("old_password", "User is not authenticated. Please log in.");
        return;
    }

    // Prepare the data to send
    const data = {
        old_password: oldPassword,
        new_password: newPassword1,
        confirm_new_password: newPassword2
    };

    // API call to change password
    try {
        const response = await fetch("https://tuitionvault.onrender.com/accounts/change-password/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Ensure it's JSON
                "Authorization": `Token ${authToken}` // Include the token in the header
            },
            body: JSON.stringify(data) // Send the data as JSON
        });

        const responseData = await response.json();

        if (response.ok) {
            alert("Password changed successfully!");
            window.location.href = "profile.html"; // Redirect to the profile page
        } else {
            // Show error messages based on the response from the API
            if (typeof responseData === "object") {
                Object.keys(responseData).forEach((field) => {
                    if (document.getElementById(`${field}_error`)) {
                        showError(field, responseData[field]); // Display API error under the correct field
                    }
                });
            }
        }
    } catch (error) {
        console.error("Error:", error);
        showError("old_password", "Network error. Failed to connect to the server.");
    }
});
