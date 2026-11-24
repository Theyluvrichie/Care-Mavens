
// MOBILE NAVIGATION
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  // Close the menu after a navigation link is selected.
  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
      menuToggle.textContent = "☰";
    });
  });
}

// AUTOMATIC COPYRIGHT YEAR
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// CONTACT FORM



console.log("Website JavaScript is running!");

const contactForm = document.getElementById("contact-form");

console.log("Contact form found:", !!contactForm);

if (contactForm) {

    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        console.log("Enquiry form submitted!");

        const submitBtn = document.getElementById("submit-btn");
        const status = document.getElementById("form-status");

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        status.textContent = "Sending your enquiry...";

        try {

            const formData = new FormData(contactForm);

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(
                        Object.fromEntries(formData.entries())
                    )
                }
            );

            const result = await response.json();

            console.log("Web3Forms response:", result);

            if (!response.ok || result.success !== true) {
                throw new Error(
                    result.message ||
                    result.body?.message ||
                    "Submission failed."
                );
            }

            status.textContent =
                "Your enquiry has been sent successfully!";

            status.style.color = "green";

            contactForm.reset();

        } catch (error) {

            console.error("Enquiry error:", error);

            status.textContent =
                "Error: " + error.message;

            status.style.color = "red";

        } finally {

            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Enquiry";

        }

    });

} else {

    console.error(
        "The contact form was not found. Check its HTML ID."
    );

}
