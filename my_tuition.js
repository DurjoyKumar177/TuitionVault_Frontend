document.addEventListener("DOMContentLoaded", function () {
    const apiURL = "https://tuitionvault.onrender.com/applications/my-approved-tuitions/";
    const cardContainer = document.getElementById("card-container");

    function createCard(post) {
        const tuitionPost = post.tuition_post;
        const card = document.createElement("div");
        card.className = "flex bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-105";

        card.innerHTML = `
            <div class="w-1/3">
                <img src="${tuitionPost.image || 'images/tutor_placeholder.webp'}" alt="Tuition Image" class="w-full h-full object-cover">
            </div>
            <div class="w-2/3 p-4">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${tuitionPost.title || 'N/A'}</h3>
                <p class="text-sm text-gray-600 mb-2"><strong>Class:</strong> ${tuitionPost.class_name || 'N/A'}</p>
                <p class="text-sm text-gray-600 mb-2"><strong>Subjects:</strong> ${tuitionPost.subjects || 'N/A'}</p>
                <p class="text-sm text-gray-600 mb-2"><strong>Group:</strong> ${tuitionPost.group || 'None'}</p>
                <p class="text-sm text-gray-600 mb-2"><strong>Location:</strong> ${tuitionPost.location || 'N/A'}</p>
                <p class="text-sm text-gray-600 mb-2"><strong>Monthly Payment:</strong> ৳${tuitionPost.monthly_payment || 'N/A'}</p>
                <p class="text-sm text-gray-600 mb-2"><strong>Routine:</strong> ${tuitionPost.routine || 'N/A'}</p>
                <p class="text-sm text-gray-600 mb-2"><strong>Details:</strong> ${tuitionPost.details || 'N/A'}</p>
                <a href="${tuitionPost.google_map_link || 'https://www.google.com/maps/'}" target="_blank" class="inline-block text-blue-500 underline text-sm">View on Map</a>
                <a href="details.html?id=${tuitionPost.id}" class="inline-block mt-4 bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600">Details</a>
            </div>
        `;

        return card;
    }

    const fetchApprovedTuitions = () => {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            alert("You are not logged in. Redirecting to login page.");
            window.location.href = "login.html";
            return;
        }

        fetch(apiURL, {
            method: "GET",
            headers: {
                "Authorization": `Token ${authToken}`,
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch data. Please check your authentication.");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            cardContainer.innerHTML = "";
            data.forEach((post) => {
                const card = createCard(post);
                cardContainer.appendChild(card);
            });
        })
        .catch((error) => {
            console.error("Error fetching approved tuitions:", error);
            alert("Failed to fetch tuition posts. Please try again later.");
        });
    };

    fetchApprovedTuitions();
});

