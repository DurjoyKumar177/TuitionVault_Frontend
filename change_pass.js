document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const oldPassword = document.getElementById("old_password").value;
    const newPassword1 = document.getElementById("new_password1").value;
    const newPassword2 = document.getElementById("new_password2").value;

    // Function to display error messages
    const showError = (field, message) => {
        alert(`${field}: ${message}`);
    };

    // Validate new password
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(newPassword1)) {
        showError("New Password", "Password must contain at least eight characters, one letter, one number, and one special character.");
        return;
    }

    // Confirm passwords match
    if (newPassword1 !== newPassword2) {
        showError("Confirm Password", "Passwords do not match.");
        return;
    }

    // Fetch the auth token from local storage
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
        showError("Authorization", "User is not authenticated. Please log in.");
        return;
    }

    // API call to change password
    try {
        const response = await fetch("http://127.0.0.1:8000/accounts/change-password/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${authToken}`
            },
            body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword1
            })
        });

        if (response.ok) {
            alert("Password changed successfully!");
            window.location.href = "profile.html"; // Redirect to the profile page
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.detail || "Failed to change password. Please try again.";
            showError("API Error", errorMessage);
        }
    } catch (error) {
        console.error("Error:", error);
        showError("Network Error", "Failed to connect to the server.");
    }
});
