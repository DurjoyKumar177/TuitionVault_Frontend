window.onload = function () {
  fetch("https://tuitionvault.onrender.com");
};

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const speed = 100; // The lower the number, the faster the count

    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  });

//   FAQ section
  document.addEventListener("DOMContentLoaded", () => {
    const toggles = document.querySelectorAll(".faq-toggle");
    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const answer = toggle.nextElementSibling;
        answer.classList.toggle("hidden");
        const icon = toggle.querySelector(".faq-icon");
        icon.textContent = icon.textContent === "+" ? "−" : "+";
      });
    });
  });

//   review

 // Tailwind animation class to scroll the carousel
 document.querySelector('.animate-scroll').classList.add('animate-marquee');

 // Tailwind keyframes and animation
 tailwind.config = {
   theme: {
     extend: {
       animation: {
         marquee: 'marquee 40s linear infinite',
       },
       keyframes: {
         marquee: {
           '0%': { transform: 'translateX(0)' },
           '100%': { transform: 'translateX(-100%)' },
         },
       },
     },
   },
 };

 // Select the form element
const form = document.querySelector("form");

// Add a submit event listener to the form
form.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Display a success message using an alert
    alert("Your message has been successfully submitted!. Thank you for reaching out");

    // Optionally, reset the form after submission
    form.reset();
});



