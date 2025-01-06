document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "http://127.0.0.1:8000/accounts/profile/";

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

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json"
        },
        credentials: "include" // Ensures cookies like sessionid are sent with the request
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch user profile data: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); 
        
        // Ensure data has the necessary properties
        if (data.user && data.phone_number_1 && data.personal_photo) {

            document.getElementById('profile-img').src = "http://127.0.0.1:8000" + data.personal_photo || "profile_placeholder.jpg";
            document.getElementById('profile-name').textContent = data.user || "N/A";
            document.getElementById('profile-phone').textContent = `Phone: ${data.phone_number_1}, ${data.phone_number_2 || "N/A"}`;
            document.getElementById('profile-dob').textContent = data.date_of_birth || "N/A";
            document.getElementById('profile-address').textContent = data.address || "N/A";
            document.getElementById('profile-degree').textContent = data.achieved_degree || "N/A";
            document.getElementById('profile-running-degree').textContent = data.running_degree || "N/A";
            document.getElementById('profile-org').textContent = data.current_organization || "N/A";
            document.getElementById('certificate-link').href = "http://127.0.0.1:8000" + data.degree_certificate || "#";
        } else {
            console.error("Invalid data structure:", data);
            alert("Profile data is missing some required information.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to load profile data. Please try again later.");
    });
});


