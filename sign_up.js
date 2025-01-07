const handleSignUp = (event) => {
    event.preventDefault();

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

    clearErrors();

    if (password !== conform_password) {
        showError("conform_password", "Password and confirm password do not match.");
        return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
        showError("password", "Password must contain at least eight characters, one letter, one number, and one special character.");
        return;
    }

    fetch("http://127.0.0.1:8000/accounts/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
    })
        .then(async (res) => {
            if (res.ok) {
                window.location.href = "personal_info.html";
            } else {
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
            console.error("Error:", error);
            document.getElementById("error").innerText = "An unexpected error occurred. Please try again.";
        });
};

const getValue = (id) => document.getElementById(id).value.trim();

const showError = (field, message) => {
    const errorElement = document.getElementById(`${field}-error`);
    errorElement.classList.remove('hidden');
    errorElement.innerText = message;
};

const clearErrors = () => {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach((errorElement) => {
        errorElement.classList.add('hidden');
        errorElement.innerText = '';
    });
};

