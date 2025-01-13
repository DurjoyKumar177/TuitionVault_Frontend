document.addEventListener("DOMContentLoaded", function () {
    const detailsContainer = document.getElementById("details-container");

    function getPostIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("id");
    }

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

            ${post.availability ? `
                <div class="p-6 text-center">
                    <button id="apply-button" class="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Apply for this Tuition
                    </button>
                </div>
            ` : `
                <div class="p-6 text-center">
                    <button id="review-button" class="w-full md:w-auto px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                        Give Review
                    </button>
                </div>
            `}

            <div class="bg-gray-800 text-white py-4 text-center">
                <p class="text-sm">Created at: ${post.created_at}</p>
                <p class="text-sm">Last updated: ${post.updated_at}</p>
            </div>
        `;

        if (post.availability) {
            document.getElementById("apply-button").addEventListener("click", () => {
                applyForTuition(post.id);
            });
        } else {
            document.getElementById("review-button").addEventListener("click", () => {
                window.location.href = `review.html?id=${post.id}`;
            });
        }

        // Fetch reviews for the post
        fetch(`https://tuitionvault.onrender.com/reviews/view-reviews/${post.id}/`)
            .then(response => response.json())
            .then(reviews => {
                // Sort reviews by the reviewed date (most recent first)
                reviews.sort((a, b) => new Date(b.reviewed_at) - new Date(a.reviewed_at));

                const reviewsContainer = document.createElement("div");
                reviewsContainer.classList.add("p-6", "border-t", "bg-gray-50");
                reviewsContainer.innerHTML = `
                    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Reviews</h2>
                    ${reviews.map(review => `
                        <div class="mb-6 p-6 border rounded-lg shadow-lg bg-white">
                            <div class="flex items-center mb-2">
                                <span class="font-semibold text-gray-700">${review.reviewer_name}</span>
                                <div class="flex ml-3">
                                    ${generateStars(review.rating)}
                                </div>
                            </div>
                            <p class="text-gray-800 mt-2">${review.comment}</p>
                            <p class="text-gray-500 text-sm mt-2">Reviewed on: ${new Date(review.reviewed_at).toLocaleDateString()}</p>
                        </div>
                    `).join("")}
                `;
                detailsContainer.appendChild(reviewsContainer);
            })
            .catch(error => {
                console.error("Error fetching reviews:", error);
            });
    }

    function generateStars(rating) {
        const fullStars = '★';
        const emptyStars = '☆';
        let stars = '';
        
        // Add full stars based on the rating
        for (let i = 0; i < Math.floor(rating); i++) {
            stars += fullStars;
        }
        
        // Add empty stars for the remaining
        for (let i = Math.floor(rating); i < 5; i++) {
            stars += emptyStars;
        }
        
        return stars;
    }

    function applyForTuition(postId) {
        fetch(`https://tuitionvault.onrender.com/tutions/apply/${postId}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("authToken")}`,
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    alert("You need to login to apply for the tuition. Please login first.");
                    throw new Error(data.error || "Error applying for tuition");
                });
            }
            return response.json();
        })
        .then(() => {
            alert("Successfully applied for the tuition!");
            window.location.href = "my_application.html";
        })
        .catch(error => {
            console.error("Error applying for tuition:", error);
        });
    }

    const postId = getPostIdFromUrl();
    if (postId) {
        fetch(`https://tuitionvault.onrender.com/tutions/posts_details/${postId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch tuition details");
                }
                return response.json();
            })
            .then(post => populateDetails(post))
            .catch(error => {
                console.error("Error fetching tuition details:", error);
                detailsContainer.innerHTML = `<p class="text-red-500 text-center mt-6">Unable to load tuition details. Please try again later.</p>`;
            });
    } else {
        detailsContainer.innerHTML = `<p class="text-red-500 text-center mt-6">Invalid post ID. Please check the link and try again.</p>`;
    }
});
