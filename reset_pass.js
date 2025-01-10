document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reset-password-form");
  const errorMessage = document.getElementById("error-message");

  // Get UID and Token from URL
  const urlParams = new URLSearchParams(window.location.search);
  const uid = urlParams.get("uid");
  const token = urlParams.get("token");

  if (!uid || !token) {
    errorMessage.textContent = "Invalid reset link.";
    errorMessage.classList.remove("hidden");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();


    const newPassword = document.getElementById("new_password").value;
    const confirmPassword = document.getElementById("confirm_password").value;


    if (newPassword !== confirmPassword) {
      errorMessage.textContent = "Passwords do not match.";
      errorMessage.classList.remove("hidden");
      return;
    }


    try {
      const response = await fetch(
        `https://tuitionvault.onrender.com/accounts/reset-password/${uid}/${token}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            new_password: newPassword,
            confirm_password: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        
        alert(
          "Password has been reset successfully. Redirecting to login page..."
        );
        window.location.href = "login.html";
      } else {
        errorMessage.textContent =
          data.error || "An error occurred. Please try again.";
        errorMessage.classList.remove("hidden");
      }
    } catch (error) {
      errorMessage.textContent = "An error occurred. Please try again.";
      errorMessage.classList.remove("hidden");
    }
  });
});
