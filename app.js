const notificationBell = document.getElementById("notification-bell");
const notificationMessage = document.getElementById("notification-message");
const profileToggle = document.getElementById("profile-toggle");
const profileMenu = document.getElementById("profile-menu");
const authButtons = document.getElementById("auth-buttons");
const myTuition = document.getElementById("my-tuition");
const myApplications = document.getElementById("my-applications");
const profileOption = document.getElementById("profile-option");
const historyOption = document.getElementById("history-option");
const signoutOption = document.getElementById("signout-option");
const unauthMessage = document.getElementById("unauth-message");
const loginButton = document.getElementById("login-button");
const userProfileIcon = document.getElementById("user-profile-icon");

// Function to check if the user is authenticated by the token in localStorage
function checkAuthStatus() {
  const token = localStorage.getItem("token");
  return !!token; 
}

// Function to fetch user profile image from the API
async function fetchUserProfileImage() {
  const token = localStorage.getItem("token");

  if (!token) {
    userProfileIcon.src = "images/user.png";
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:8000/accounts/profile/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();

      if (data.personal_photo) {
        
        const profileImageUrl = `http://127.0.0.1:8000/${data.personal_photo}`;
        userProfileIcon.src = profileImageUrl;
      } else {
        console.warn("Profile image not found, using default placeholder.");
        userProfileIcon.src = "images/user.png";
      }
    } 
    else {
      console.error("Failed to fetch profile image:", response.statusText);
      userProfileIcon.src = "images/user.png";
    }
  } catch (error) {
    console.error("Error fetching profile image:", error);
    userProfileIcon.src = "images/user.png";
  }
}

// Function to initialize the UI based on authentication status
function initializeUI() {
  const isAuthenticated = checkAuthStatus();

  if (isAuthenticated) {
    // Show authenticated user options
    authButtons.classList.add("hidden");
    myTuition.classList.remove("hidden");
    myApplications.classList.remove("hidden");
    profileOption.classList.remove("hidden");
    historyOption.classList.remove("hidden");
    signoutOption.classList.remove("hidden");
    unauthMessage.classList.add("hidden");
    loginButton.classList.add("hidden");

    // Fetch and display the user's profile image
    fetchUserProfileImage();
  } else {
    // Show unauthorized user options
    authButtons.classList.remove("hidden");
    myTuition.classList.add("hidden");
    myApplications.classList.add("hidden");
    profileOption.classList.add("hidden");
    historyOption.classList.add("hidden");
    signoutOption.classList.add("hidden");
    unauthMessage.classList.remove("hidden");
    loginButton.classList.remove("hidden");

    // Set default image for unauthorized user
    userProfileIcon.src = "images/user.png";
  }
}

// Toggle notification message visibility
notificationBell.addEventListener("click", () => {
  notificationMessage.classList.toggle("hidden");
});

// Toggle profile menu visibility
profileToggle.addEventListener("click", () => {
  profileMenu.classList.toggle("hidden");
});

// Close notification and profile menus when clicking outside
document.addEventListener("click", (event) => {
  if (!notificationBell.contains(event.target) && !notificationMessage.contains(event.target)) {
    notificationMessage.classList.add("hidden");
  }
  if (!profileToggle.contains(event.target) && !profileMenu.contains(event.target)) {
    profileMenu.classList.add("hidden");
  }
});

initializeUI();
