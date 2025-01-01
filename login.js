const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};

const handleLogin = (event) => {
    event.preventDefault();
    const username = getValue("username");
    const password = getValue("password");
    console.log(username, password);

    if (username && password) {
        fetch("http://127.0.0.1:8000/accounts/login/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            // Check if the response has the expected properties (token and user_id)
            if (data.token && data.user_id) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user_id", data.user_id);
                window.location.href = "index.html"; // Redirect to homepage or dashboard
            } else {
                // If login is unsuccessful, show error message
                const alertDiv = document.getElementById("alert");
                alertDiv.classList.remove("hidden");
                alertDiv.textContent = "Invalid username or password. Please try again.";
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            const alertDiv = document.getElementById("alert");
            alertDiv.classList.remove("hidden");
            alertDiv.textContent = "An error occurred. Please try again later.";
        });
    } else {
        const alertDiv = document.getElementById("alert");
        alertDiv.classList.remove("hidden");
        alertDiv.textContent = "Please enter both username and password.";
    }
};
