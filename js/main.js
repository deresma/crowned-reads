// ============================================
// CROWNED READS — Main JavaScript
// Author: Esmanur Dere
// Course: YBS226 Advanced Web Design
// ============================================

console.log("✦ Crowned Reads loaded ✦");


// ============================================
// FEATURE 1: Thematic Book Rating
// Module 2 (variables, arrays), Module 4 (loops, if),
// Module 5 (functions), Module 6 (try/catch)
// ============================================

// Object to store user ratings (key: book name, value: 1-5)
const userRatings = {};

// Find all rating containers on the page
const ratingContainers = document.querySelectorAll(".book-rating");

// Loop through each rating block and set up its behavior
ratingContainers.forEach(function (container) {
  setupRating(container);
});


/**
 * Attaches click + hover behavior to one rating block.
 * @param {HTMLElement} container — the .book-rating element
 */
function setupRating(container) {
  try {
    const icons = container.querySelectorAll(".rating-icon");
    const text = container.querySelector(".rating-text");
    const bookName = container.dataset.book;

    // Loop through each icon and add listeners
    icons.forEach(function (icon) {
      // CLICK — set permanent rating
      icon.addEventListener("click", function () {
        const value = parseInt(icon.dataset.value);
        setRating(container, value);
        userRatings[bookName] = value;
        console.log("Rated", bookName, "→", value, "of 5");
      });

      // MOUSE ENTER — show preview
      icon.addEventListener("mouseenter", function () {
        const value = parseInt(icon.dataset.value);
        previewRating(container, value);
      });
    });

    // MOUSE LEAVE — restore actual rating
    container.addEventListener("mouseleave", function () {
      const currentRating = userRatings[bookName] || 0;
      setRating(container, currentRating);
    });
  } catch (error) {
    console.error("Could not set up rating block:", error);
  }
}


/**
 * Visually fills icons up to the given value.
 * @param {HTMLElement} container
 * @param {number} value — how many icons should be filled (0-5)
 */
function setRating(container, value) {
  const icons = container.querySelectorAll(".rating-icon");
  const text = container.querySelector(".rating-text");

  // Use a classic for loop — Module 4
  for (let i = 0; i < icons.length; i++) {
    icons[i].classList.remove("rating-icon--preview");

    if (i < value) {
      icons[i].classList.add("rating-icon--filled");
    } else {
      icons[i].classList.remove("rating-icon--filled");
    }
  }

  // Update the text label
  if (value > 0) {
    text.textContent = "Your rating: " + value + " of 5";
  } else {
    text.textContent = "Click to rate";
  }
}


/**
 * Hover preview — same as setRating but uses preview class.
 * @param {HTMLElement} container
 * @param {number} value
 */
function previewRating(container, value) {
  const icons = container.querySelectorAll(".rating-icon");

  for (let i = 0; i < icons.length; i++) {
    icons[i].classList.remove("rating-icon--filled");

    if (i < value) {
      icons[i].classList.add("rating-icon--preview");
    } else {
      icons[i].classList.remove("rating-icon--preview");
    }
  }
}