// Function to get CSRF token from cookies
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

// Fetch user history from the API
const fetchUserHistory = async () => {
    const apiUrl = "http://127.0.0.1:8000/applications/history/";
    const csrfToken = getCSRFToken();

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "X-CSRFToken": csrfToken,
                "Content-Type": "application/json",
            },
            credentials: "include", // Include session cookies for authentication
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user history. Please ensure you are logged in.");
        }

        const data = await response.json();

        const historyBody = document.getElementById("history-body");

        data.forEach(item => {
            const status = item.is_approved
                ? "Approved"
                : item.approved_at === null
                    ? "Pending"
                    : "Not Approved";

            const approvedDate = item.approved_at ? new Date(item.approved_at).toLocaleString() : "N/A";

            const appliedDate = new Date(item.applied_at).toLocaleString();

            const row = `
                <tr class="bg-white hover:bg-gray-50">
                    <td class="border border-gray-300 px-4 py-2 text-center">${item.tuition_post}</td>
                    <td class="border border-gray-300 px-4 py-2">${item.tuition_title}</td>
                    <td class="border border-gray-300 px-4 py-2">${appliedDate}</td>
                    <td class="border border-gray-300 px-4 py-2 text-center font-semibold ${status === 'Approved' ? 'text-green-500' : status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}">
                        ${status}
                    </td>
                    <td class="border border-gray-300 px-4 py-2 text-center">${approvedDate}</td>
                </tr>
            `;

            historyBody.insertAdjacentHTML("beforeend", row);
        });
    } catch (error) {
        console.error("Error fetching user history:", error);
        alert("Error fetching history. Please log in or try again later.");
    }
};

// Ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", fetchUserHistory);
