document.addEventListener("DOMContentLoaded", function () {
    const apiURL = "http://127.0.0.1:8000/tutions/posts/";
    const cardContainer = document.getElementById("card-container");

    // Function to create a card
    function createCard(post) {
      const card = document.createElement("div");
      card.className = "flex bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-105";

      card.innerHTML = `
        <!-- Image Section -->
        <div class="w-1/3">
          <img src="${post.image}" alt="Tuition Image" class="w-full h-full object-cover">
        </div>

        <!-- Details Section -->
        <div class="w-2/3 p-4">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">${post.title}</h3>
          <p class="text-sm text-gray-600 mb-2"><strong>Class:</strong> ${post.class_name}</p>
          <p class="text-sm text-gray-600 mb-2"><strong>Subjects:</strong> ${post.subjects}</p>
          <p class="text-sm text-gray-600 mb-2"><strong>Location:</strong> ${post.location}</p>
          <p class="text-sm text-gray-600 mb-2"><strong>Monthly Payment:</strong> ৳${post.monthly_payment}</p>
          <a href="${post.google_map_link}" target="_blank" class="inline-block text-blue-500 underline text-sm">View on Map</a>
          <a href="details.html?id=${post.id}" class="inline-block mt-4 bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600">Details</a>
        </div>
      `;

      return card;
    }

    // Fetch data and populate cards
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
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