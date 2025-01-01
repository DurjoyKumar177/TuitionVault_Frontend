// Select elements
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

// Function to check if the user is authenticated by the token in localStorage
function checkAuthStatus() {
  const token = localStorage.getItem("token");

  if (token) {
    return true;  // User is authenticated
  }
  return false;  // User is not authenticated
}

// Function to initialize the UI based on authentication status
function initializeUI() {
  const isAuthenticated = checkAuthStatus(); // Check the authentication status using the token

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

// Initialize the UI on page load
initializeUI();

