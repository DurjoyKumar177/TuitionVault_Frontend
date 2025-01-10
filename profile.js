document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://tuitionvault.onrender.com/accounts/profile/";

    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        alert("You are not logged in. Please log in to access your profile.");
        window.location.href = "login.html";
        return;
    }

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Authorization": `Token ${authToken}`,
            "Content-Type": "application/json"
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch user profile data: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); 
        
        // Ensure data contains necessary fields before updating the DOM
        if (data.user && data.phone_number_1 && data.personal_photo) {
            document.getElementById('profile-img').src = "https://tuitionvault.onrender.com" + data.personal_photo || "profile_placeholder.jpg";
            document.getElementById('profile-name').textContent = data.user || "N/A";
            document.getElementById('profile-phone').textContent = `Phone: ${data.phone_number_1}, ${data.phone_number_2 || "N/A"}`;
            document.getElementById('profile-dob').textContent = data.date_of_birth || "N/A";
            document.getElementById('profile-address').textContent = data.address || "N/A";
            document.getElementById('profile-degree').textContent = data.achieved_degree || "N/A";
            document.getElementById('profile-running-degree').textContent = data.running_degree || "N/A";
            document.getElementById('profile-org').textContent = data.current_organization || "N/A";
            document.getElementById('certificate-link').href = "https://tuitionvault.onrender.com" + data.degree_certificate || "#";
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
