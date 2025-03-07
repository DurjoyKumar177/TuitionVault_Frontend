const getValue = (id) => {
    return document.getElementById(id).value;
};

const handleLogin = (event) => {
    event.preventDefault();
    const username = getValue("username");
    const password = getValue("password");

    if (username && password) {
        fetch("https://tuitionvault.onrender.com/accounts/login/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            // Check if the response contains the expected properties (token and user_id)
            if (data.token && data.user_id) {
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("user_id", data.user_id);
                window.location.href = "index.html";
            } else {
                showError("Invalid username or password. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            showError("An error occurred. Please try again later.");
        });
    } else {
        showError("Please enter both username and password.");
    }
};

// Function to show error messages
const showError = (message) => {
    const alertDiv = document.getElementById("alert");
    alertDiv.classList.remove("hidden");
    alertDiv.textContent = message;
};

// Function to auto-fill demo login credentials
const demoLogin = () => {
    document.getElementById("username").value = "Durjoy188";
    document.getElementById("password").value = "DK*#1234*#";
};
