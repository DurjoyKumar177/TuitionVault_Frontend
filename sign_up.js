const handleSignUp = (event) => {
    event.preventDefault();  // Prevent the default form submission behavior

    // Collect form field values
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const conform_password = getValue("conform_password");

    const info = {
        username,
        first_name,
        last_name,
        email,
        password,
        conform_password,
    };

    // Reset any previous error messages
    clearErrors();

    // Password mismatch validation
    if (password !== conform_password) {
        showError("conform_password", "Password and confirm password do not match.");
        return;
    }

    // Password complexity validation
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
        showError("password", "Password must contain at least eight characters, one letter, one number, and one special character.");
        return;
    }

    // Make the API call to register the user
    fetch("http://127.0.0.1:8000/accounts/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),  // Only send the form data as the body
    })
        .then(async (res) => {
            if (res.ok) {
                // Redirect to the next page on success
                window.location.href = "personal_info.html";
            } else {
                // Show error messages returned by the API
                const errorData = await res.json();

                // Check if the error is related to a specific field
                if (errorData.username) {
                    showError("username", errorData.username);
                }
                
                if (errorData.email) {
                    showError("email", errorData.email);
                }

                if (errorData.password) {
                    showError("password", errorData.password);
                }

                if (errorData.error) {
                    document.getElementById("error").innerText = errorData.error;
                }
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            document.getElementById("error").innerText = "An unexpected error occurred. Please try again.";
        });
};

// Helper function to get the value of an input field
const getValue = (id) => document.getElementById(id).value.trim();

// Show specific error messages for the fields
const showError = (field, message) => {
    const errorElement = document.getElementById(`${field}-error`);
    errorElement.classList.remove('hidden');
    errorElement.innerText = message;
};

// Clear all error messages
const clearErrors = () => {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach((errorElement) => {
        errorElement.classList.add('hidden');
        errorElement.innerText = '';
    });
};
