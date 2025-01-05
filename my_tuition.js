document.addEventListener("DOMContentLoaded", function () {
    const apiURL = "http://127.0.0.1:8000/applications/my-approved-tuitions/";
    const cardContainer = document.getElementById("card-container");

    // Function to create a card
    function createCard(post) {
        const tuitionPost = post.tuition_post; // Access the nested tuition_post object
        const card = document.createElement("div");
        card.className = "flex bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-105";

        card.innerHTML = `
            <!-- Image Section -->
            <div class="w-1/3">
                <img src="${tuitionPost.image || 'https://via.placeholder.com/150'}" alt="Tuition Image" class="w-full h-full object-cover">
            </div>

            <!-- Details Section -->
            <div class="w-2/3 p-4">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${tuitionPost.title || 'N/A'}</h3>
                <p class="text-sm text-gray-600 mb-2"><strong>Class:</strong> ${tuitionPost.class_name || 'N/A'}</p>
                <p class="text-sm text-gray-600 mb-2"><strong>Subjects:</strong> ${tuitionPost.subjects || 'N/A'}</p>
                <p class="text-sm text-gray-600 mb-2"><strong>Group:</strong> ${tuitionPost.group || 'None'}</p>
                <p class="text-sm text-gray-600 mb-2"><strong>Location:</strong> ${tuitionPost.location || 'N/A'}</p>
                <p class="text-sm text-gray-600 mb-2"><strong>Monthly Payment:</strong> ৳${tuitionPost.monthly_payment || 'N/A'}</p>
                <p class="text-sm text-gray-600 mb-2"><strong>Routine:</strong> ${tuitionPost.routine || 'N/A'}</p>
                <p class="text-sm text-gray-600 mb-2"><strong>Details:</strong> ${tuitionPost.details || 'N/A'}</p>
                <a href="${tuitionPost.google_map_link || '#'}" target="_blank" class="inline-block text-blue-500 underline text-sm">View on Map</a>
                <a href="details.html?id=${tuitionPost.id}" class="inline-block mt-4 bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600">Details</a>
            </div>
        `;

        return card;
    }

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

    fetch(apiURL, {
        method: "GET",
        headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json"
        },
        credentials: "include" // Ensures cookies like sessionid are sent with the request
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((data) => {
        console.log(data); // Log the response to verify structure
        cardContainer.innerHTML = ""; // Clear existing cards
        data.forEach((post) => {
            const card = createCard(post);
            cardContainer.appendChild(card);
        });
    })
    .catch((error) => {
        console.error("Error fetching tuition posts:", error);
    });
});
