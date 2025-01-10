document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://tuitionvault.onrender.com/accounts/profile/update/";

    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        alert("Authentication token not found. Please log in again.");
        return;
    }

    const updateProfileForm = document.getElementById("personalInfoForm");

    // Populate the profile data
    const loadProfileData = () => {
        fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Token ${authToken}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch user profile data: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Populate form fields
                document.getElementById("phone_number_1").value = data.phone_number_1 || "";
                document.getElementById("phone_number_2").value = data.phone_number_2 || "";
                document.getElementById("date_of_birth").value = data.date_of_birth || "";
                document.getElementById("address").value = data.address || "";
                document.getElementById("achieved_degree").value = data.achieved_degree || "";
                document.getElementById("running_degree").value = data.running_degree || "";
                document.getElementById("current_organization").value = data.current_organization || "";
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Failed to load profile data. Please try again later.");
            });
    };

    updateProfileForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = {
            phone_number_1: document.getElementById("phone_number_1").value,
            phone_number_2: document.getElementById("phone_number_2").value,
            date_of_birth: document.getElementById("date_of_birth").value,
            address: document.getElementById("address").value,
            achieved_degree: document.getElementById("achieved_degree").value,
            running_degree: document.getElementById("running_degree").value,
            current_organization: document.getElementById("current_organization").value,
        };

        fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `Token ${authToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => {
                        throw new Error(err.detail || `Failed to update profile: ${response.status}`);
                    });
                }
                return response.json();
            })
            .then((data) => {
                alert("Profile updated successfully!");
                window.location.href = "profile.html";
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Failed to update profile. Please try again later.");
            });
    });

    loadProfileData();
});
