document.addEventListener("DOMContentLoaded", function () {
  const apiEndpoints = {
    classOptions: "https://tuitionvault.onrender.com/tutions/dropdown_options/class_name/",
    locationOptions: "https://tuitionvault.onrender.com/tutions/dropdown_options/location/",
    filterByClass: "https://tuitionvault.onrender.com/tutions/filter_by_class/",
    filterByLocation: "https://tuitionvault.onrender.com/tutions/filter_by_location/",
    searchByTitle: "https://tuitionvault.onrender.com/tutions/search_by_title/",
    filterByPayment: "https://tuitionvault.onrender.com/tutions/filter_by_payment/",
  };

  const classFilter = document.getElementById("class-filter");
  const locationFilter = document.getElementById("location-filter");
  const titleSearch = document.getElementById("title-search");
  const salaryMin = document.getElementById("salary-min");
  const salaryMax = document.getElementById("salary-max");
  const salaryButton = document.getElementById("salary-button");
  const cardContainer = document.getElementById("card-container");

  function createCard(post) {
    const card = document.createElement("div");
    card.className =
      "flex bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-105";
    
    card.innerHTML = ` 
      <div class="w-1/3">
        <img 
          src="${post.image ? post.image : "/images/tutor_placeholder.webp"}" 
          alt="Tuition Image" 
          class="w-full h-full object-cover" 
          onerror="this.src='/images/tutor_placeholder.webp';">
      </div>
      <div class="w-2/3 p-4">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">${post.title}</h3>
        <p class="text-sm text-gray-600 mb-2"><strong>Class:</strong> ${post.class_name}</p>
        <p class="text-sm text-gray-600 mb-2"><strong>Subjects:</strong> ${post.subjects}</p>
        <p class="text-sm text-gray-600 mb-2"><strong>Location:</strong> ${post.location}</p>
        <p class="text-sm text-gray-600 mb-2"><strong>Monthly Payment:</strong> ৳${post.monthly_payment}</p>
        <a href="${post.google_map_link || "https://www.google.com/maps/"}" target="_blank" class="inline-block text-blue-500 underline text-sm">View on Map</a>
        <a href="details.html?id=${post.id}" class="inline-block mt-4 bg-blue-500 text-white text-sm py-2 px-4 rounded hover:bg-blue-600">Details</a>
      </div>
    `;    
    return card;
  }
  

  function populateDropdown(api, dropdown) {
    fetch(api)
      .then((response) =>
        response.ok
          ? response.json()
          : Promise.reject("Failed to fetch options")
      )
      .then((options) => {
        options.forEach((option) => {
          const opt = document.createElement("option");
          opt.value = option;
          opt.textContent = option;
          dropdown.appendChild(opt);
        });
      })
      .catch((error) => console.error(error));
  }

  function fetchAndDisplayCards(url) {
    fetch(url)
      .then((response) =>
        response.ok ? response.json() : Promise.reject("Failed to fetch data")
      )
      .then((data) => {
        cardContainer.innerHTML = "";
        if (data.length === 0) {
          const noDataImage = document.createElement("img");
          noDataImage.src = "/resource/noDataFound.jpg";
          noDataImage.alt = "No Data Found";
          noDataImage.className = "w-1/5 h-auto mx-auto";           
          cardContainer.className = "flex justify-center items-center ";
          
          cardContainer.appendChild(noDataImage);
        } else {
          data.forEach((post) => cardContainer.appendChild(createCard(post)));
        }
      })
      .catch((error) => console.error(error));
  }

  function updateCardsWithFilters() {
    const selectedClass = classFilter.value;
    const selectedLocation = locationFilter.value;
    const title = titleSearch.value.trim();
    const minPayment = salaryMin.value.trim();
    const maxPayment = salaryMax.value.trim();

    let url = "https://tuitionvault.onrender.com/tutions/posts/";

    if (selectedClass) {
      url = `${apiEndpoints.filterByClass}?class_name=${selectedClass}`;
    } else if (selectedLocation) {
      url = `${apiEndpoints.filterByLocation}?location=${selectedLocation}`;
    } else if (title) {
      url = `${apiEndpoints.searchByTitle}?title=${title}`;
    } else if (minPayment || maxPayment) {
      url = `${apiEndpoints.filterByPayment}?min_payment=${
        minPayment || ""
      }&max_payment=${maxPayment || ""}`;
    }

    fetchAndDisplayCards(url);
  }

  classFilter.addEventListener("change", updateCardsWithFilters);
  locationFilter.addEventListener("change", updateCardsWithFilters);
  titleSearch.addEventListener("input", updateCardsWithFilters);
  salaryButton.addEventListener("click", updateCardsWithFilters);

  populateDropdown(apiEndpoints.classOptions, classFilter);
  populateDropdown(apiEndpoints.locationOptions, locationFilter);

  fetchAndDisplayCards("https://tuitionvault.onrender.com/tutions/posts/");
});

const filterToggle = document.getElementById('filter-toggle');
const filterSection = document.getElementById('filter-section');

filterToggle.addEventListener('click', () => {
  filterSection.classList.toggle('hidden');
});
