const logoutUser = () => {
    const token = localStorage.getItem("token");
  
    fetch("https://tuitionvault.onrender.com/accounts/logout/", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Remove the token and user ID from localStorage
        localStorage.removeItem("authToken");
        localStorage.removeItem("user_id");
  
        // Reload the page 
        window.location.reload(); 
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };
  