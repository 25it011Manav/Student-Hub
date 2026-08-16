/* =========================================================
   STUDENTHUB PORTAL
   Interactive Homepage JavaScript
   ========================================================= */


/* =========================================================
   1. PAGE LOADED
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();

    initializeFeatureCards();

    initializeButtons();

    initializeScrollEffects();

    initializeHeroAnimation();

});


/* =========================================================
   2. NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const header = document.querySelector("header");
    const nav = document.querySelector("nav");

    if (!header || !nav) {
        return;
    }


    /* -----------------------------------------
       Create Mobile Menu Button
       ----------------------------------------- */

    const menuButton = document.createElement("button");

    menuButton.className = "mobile-menu-btn";

    menuButton.innerHTML = "☰";

    menuButton.setAttribute("aria-label", "Open navigation menu");

    menuButton.setAttribute("aria-expanded", "false");

    header.appendChild(menuButton);


    /* -----------------------------------------
       Mobile Menu Toggle
       ----------------------------------------- */

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("mobile-active");

        const isOpen = nav.classList.contains("mobile-active");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuButton.innerHTML = isOpen ? "✕" : "☰";

    });


    /* -----------------------------------------
       Close Menu After Clicking Link
       ----------------------------------------- */

    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("mobile-active");

            menuButton.innerHTML = "☰";

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* -----------------------------------------
       Highlight Current Page
       ----------------------------------------- */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    navLinks.forEach(link => {

        const linkPage =
            link.getAttribute("href")
                .split("/")
                .pop();


        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });

}


/* =========================================================
   3. FEATURE CARD INTERACTION
   ========================================================= */

function initializeFeatureCards() {

    const cards =
        document.querySelectorAll(".feature-card");


    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.setProperty(
                "--card-scale",
                "1.01"
            );

        });


        card.addEventListener("mouseleave", () => {

            card.style.setProperty(
                "--card-scale",
                "1"
            );

        });


        /* Keyboard accessibility */

        card.addEventListener("focus", () => {

            card.classList.add("card-focused");

        });


        card.addEventListener("blur", () => {

            card.classList.remove("card-focused");

        });

    });

}


/* =========================================================
   4. BUTTON INTERACTION
   ========================================================= */

function initializeButtons() {

    const buttons =
        document.querySelectorAll(".btn");


    buttons.forEach(button => {

        button.addEventListener("click", function () {

            /* Small click animation */

            this.classList.add("button-clicked");


            setTimeout(() => {

                this.classList.remove("button-clicked");

            }, 200);

        });

    });

}


/* =========================================================
   5. SCROLL EFFECTS
   ========================================================= */

function initializeScrollEffects() {

    const header =
        document.querySelector("header");


    if (!header) {
        return;
    }


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 20) {

                header.classList.add(
                    "header-scrolled"
                );

            } else {

                header.classList.remove(
                    "header-scrolled"
                );

            }

        },
        { passive: true }
    );

}


/* =========================================================
   6. HERO ANIMATION
   ========================================================= */

function initializeHeroAnimation() {

    const heroContent =
        document.querySelector(".hero-content");

    const heroVisual =
        document.querySelector(".hero-visual");


    if (!heroContent || !heroVisual) {
        return;
    }


    heroContent.classList.add(
        "hero-content-loaded"
    );


    setTimeout(() => {

        heroVisual.classList.add(
            "hero-visual-loaded"
        );

    }, 150);

}


/* =========================================================
   7. SCROLL TO TOP BUTTON
   ========================================================= */

function createScrollTopButton() {

    const button =
        document.createElement("button");


    button.className =
        "scroll-top-btn";


    button.innerHTML = "↑";


    button.setAttribute(
        "aria-label",
        "Scroll to top"
    );


    document.body.appendChild(button);


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );

            }

        },
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* Activate Scroll-To-Top */

createScrollTopButton();


/* =========================================================
   8. WELCOME MESSAGE
   ========================================================= */

function showWelcomeMessage() {

    const isHomePage =
        window.location.pathname
            .split("/")
            .pop() === "index.html";


    if (!isHomePage) {
        return;
    }


    const alreadyShown =
        sessionStorage.getItem(
            "studentHubWelcome"
        );


    if (alreadyShown) {
        return;
    }


    sessionStorage.setItem(
        "studentHubWelcome",
        "true"
    );


    setTimeout(() => {

        console.log(
            "Welcome to StudentHub Portal!"
        );

    }, 1000);

}


showWelcomeMessage();
// =========================================================
// REGISTER PAGE INTERACTION
// =========================================================

function initializeRegisterPage() {

    const registerForm =
        document.getElementById("registerForm");

    const password =
        document.getElementById("password");

    const passwordToggle =
        document.getElementById("passwordToggle");

    const message =
        document.getElementById("registerMessage");


    // Stop if this is not the register page

    if (!registerForm) {
        return;
    }


    // Show / Hide Password

    if (passwordToggle && password) {

        passwordToggle.addEventListener("click", () => {

            if (password.type === "password") {

                password.type = "text";

                passwordToggle.innerHTML = "🙈";

                passwordToggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                password.type = "password";

                passwordToggle.innerHTML = "👁";

                passwordToggle.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        });

    }


    // Registration Form

    registerForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const fullName =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const passwordValue =
            password.value;


        if (!fullName || !email || !passwordValue) {

            message.textContent =
                "Please fill in all fields.";

            message.style.color =
                "#dc2626";

            return;
        }


        if (passwordValue.length < 6) {

            message.textContent =
                "Password must contain at least 6 characters.";

            message.style.color =
                "#dc2626";

            return;
        }


        // Demo success message

        message.textContent =
            "Registration successful!";

        message.style.color =
            "#16a34a";


        registerForm.reset();


        setTimeout(() => {

            message.textContent = "";

        }, 3000);

    });

}


// Initialize register page

initializeRegisterPage();