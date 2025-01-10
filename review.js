document.addEventListener("DOMContentLoaded", function () {
    const ratingStars = document.querySelectorAll(".star");
    const submitButton = document.getElementById("submit-button");
    const feedbackMessage = document.getElementById("feedback-message");

    let selectedRating = 0;

    ratingStars.forEach(star => {
        star.addEventListener("click", function () {
            selectedRating = parseInt(this.getAttribute("data-value"), 10);
            ratingStars.forEach(s => {
                if (parseInt(s.getAttribute("data-value"), 10) <= selectedRating) {
                    s.classList.add("text-yellow-400");
                    s.classList.remove("text-gray-400");
                } else {
                    s.classList.add("text-gray-400");
                    s.classList.remove("text-yellow-400");
                }
            });
        });
    });

    submitButton.addEventListener("click", function () {
        const reviewText = document.getElementById("reviewText").value;

        if (!reviewText || selectedRating === 0) {
            feedbackMessage.textContent = "Please provide a rating and review.";
            feedbackMessage.classList.add("text-red-500");
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get("id");

        if (!postId) {
            feedbackMessage.textContent = "Invalid tuition post.";
            feedbackMessage.classList.add("text-red-500");
            return;
        }

        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            feedbackMessage.textContent = "You need to log in to submit a review.";
            feedbackMessage.classList.add("text-red-500");
            return;
        }

        fetch(`https://tuitionvault.onrender.com/reviews/give-review/${postId}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${authToken}`,
            },
            body: JSON.stringify({
                rating: selectedRating,
                comment: reviewText,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                feedbackMessage.textContent = data.error;
                feedbackMessage.classList.add("text-red-500");
            } else {
                feedbackMessage.textContent = "Review submitted successfully!";
                feedbackMessage.classList.remove("text-red-500");
                feedbackMessage.classList.add("text-green-500");
                window.location.href = `details.html?id=${postId}`;
            }
        })
        .catch(error => {
            console.error("Error:", error);
            feedbackMessage.textContent = "Error occurred while submitting the review.";
            feedbackMessage.classList.add("text-red-500");
        });
    });
});
