document.addEventListener("DOMContentLoaded", function () {
    const detailsContainer = document.getElementById("details-container");

    // Function to get the `id` from URL query parameters
    function getPostIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("id"); // Returns the value of 'id' from ?id=<value>
    }

    // Function to populate the details section
    function populateDetails(post) {
        const googleMapsEmbedURL = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(post.location)}`;

        detailsContainer.innerHTML = `
            <div class="relative">
                <img src="${post.image}" alt="Tuition Image" class="w-full h-64 object-cover">
                <h1 class="absolute bottom-5 left-5 text-white text-3xl font-bold bg-black bg-opacity-50 px-3 py-1 rounded">
                    ${post.title}
                </h1>
            </div>

            <div class="p-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Tuition Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p class="text-gray-600"><strong>Class:</strong> ${post.class_name}</p>
                        <p class="text-gray-600"><strong>Subjects:</strong> ${post.subjects}</p>
                        <div class="flex gap-2 mt-1">
                            ${post.subject_buttons.map(subject => `<span class="px-3 py-1 text-sm bg-blue-500 text-white rounded">${subject}</span>`).join("")}
                        </div>
                    </div>
                    <div>
                        <p class="text-gray-600"><strong>Group:</strong> ${post.group}</p>
                        <p class="text-gray-600"><strong>Monthly Payment:</strong> ৳${post.monthly_payment}</p>
                    </div>
                    <div>
                        <p class="text-gray-600"><strong>Routine:</strong></p>
                        <div class="flex gap-2 mt-1">
                            ${post.routine_buttons.map(day => `<span class="px-3 py-1 text-sm bg-green-500 text-white rounded">${day}</span>`).join("")}
                        </div>
                    </div>
                    <div>
                        <p class="text-gray-600"><strong>Experience:</strong> ${post.experience} years</p>
                        <p class="text-gray-600"><strong>Required Skills:</strong> ${post.required_skills}</p>
                    </div>
                    <div class="col-span-2">
                        <p class="text-gray-600"><strong>Details:</strong></p>
                        <p class="text-gray-800 mt-2">${post.details}</p>
                    </div>
                </div>
            </div>

            <div class="p-6 border-t">
                <h2 class="text-2xl font-semibold text-gray-800 mb-4">Location</h2>
                <div class="bg-gray-100 shadow-md rounded-lg overflow-hidden">
                    <div class="p-4 bg-white">
                        <p class="text-gray-600 mb-2"><strong>Location:</strong> ${post.location}</p>
                        <a href="${post.google_map_link}" target="_blank" 
                           class="inline-block text-blue-500 underline">
                            View Full Map
                        </a>
                    </div>
                </div>
            </div>

            <!-- Apply button -->
            <div class="p-6 text-center">
                <button id="apply-button" class="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Apply for this Tuition
                </button>
            </div>

            <div class="bg-gray-800 text-white py-4 text-center">
                <p class="text-sm">Created at: ${post.created_at}</p>
                <p class="text-sm">Last updated: ${post.updated_at}</p>
            </div>
        `;

        // Add event listener to the apply button
        document.getElementById("apply-button").addEventListener("click", () => {
            applyForTuition(post.id);
        });
    }

    // Function to apply for the tuition post
    function applyForTuition(postId) {
        fetch(`http://127.0.0.1:8000/tutions/apply/${postId}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("authToken")}`, // Get token from localStorage
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    // If there's an error message, show it
                    const errorMessage = data.error || "An error occurred. Please try again later.";
                    alert(errorMessage);
                    throw new Error(errorMessage); // Stop further execution
                });
            }
            return response.json();
        })
        .then(data => {
            alert("Successfully applied for the tuition!");
            window.location.href = "my_applications.html";
        })
        .catch(error => {
            console.error("Error applying for tuition:", error);
            window.location.href = "my_applications.html";
        });
    }

    // Fetch details using the API
    const postId = getPostIdFromUrl();
    if (postId) {
        fetch(`http://127.0.0.1:8000/tutions/posts_details/${postId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch tuition details");
                }
                return response.json();
            })
            .then(post => {
                populateDetails(post);
            })
            .catch(error => {
                console.error("Error fetching tuition details:", error);
                detailsContainer.innerHTML = `<p class="text-red-500 text-center mt-6">Unable to load tuition details. Please try again later.</p>`;
            });
    } else {
        detailsContainer.innerHTML = `<p class="text-red-500 text-center mt-6">Invalid post ID. Please check the link and try again.</p>`;
    }
});
