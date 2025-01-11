const handleSignUp = (event) => {
    event.preventDefault();

    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const conform_password = getValue("conform_password");
    const terms = document.getElementById("terms").checked;

    const info = {
        username,
        first_name,
        last_name,
        email,
        password,
        conform_password,
    };

    clearErrors();

    // Validate terms and conditions acceptance
    if (!terms) {
        showError("terms", "You must accept the Terms and Conditions.");
        return;
    }

    // Validate password and confirm password match
    if (password !== conform_password) {
        showError("conform_password", "Password and confirm password do not match.");
        return;
    }

    // Validate password strength
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
        showError("password", "Password must contain at least eight characters, one letter, one number, and one special character.");
        return;
    }

    // Send registration data to the backend
    fetch("https://tuitionvault.onrender.com/accounts/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
    })
        .then(async (res) => {
            if (res.ok) {
                // Extract response JSON
                const data = await res.json();

                // Store the user ID in localStorage
                localStorage.setItem("user_id", data.user_id);
                console.log("User ID saved:", data.user_id);

                // Redirect to the personal information page
                window.location.href = "personal_info.html";
            } else {
                // Handle validation errors from the backend
                const errorData = await res.json();

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
            // Handle unexpected errors
            console.error("Error:", error);
            document.getElementById("error").innerText = "An unexpected error occurred. Please try again.";
        });
};

// Helper function to get input values
const getValue = (id) => document.getElementById(id).value.trim();

// Helper function to show error messages
const showError = (field, message) => {
    const errorElement = document.getElementById(`${field}-error`);
    errorElement.classList.remove('hidden');
    errorElement.innerText = message;
};

// Helper function to clear all error messages
const clearErrors = () => {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach((errorElement) => {
        errorElement.classList.add('hidden');
        errorElement.innerText = '';
    });
};
