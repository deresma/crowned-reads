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

// ============================================
// FEATURE 3: Live Search
// Module 2 (arrays/objects/strings), Module 3 (input event),
// Module 4 (loops, if), Module 5 (functions)
// ============================================

// Book data — in a real app this would come from an API/JSON
const allBooks = [
  {
    title: "Caraval",
    author: "Stephanie Garber",
    icon: "🎭",
    link: "book.html",
    tags: ["magical world", "slow burn", "sisters"]
  },
  {
    title: "Once Upon a Broken Heart",
    author: "Stephanie Garber",
    icon: "🌹",
    link: "book.html",
    tags: ["fated love", "fairy tale", "morally grey"]
  },
  {
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    icon: "⚔️",
    link: "book.html",
    tags: ["dragons", "enemies to lovers", "academy"]
  },
  {
    title: "A Court of Thorns and Roses",
    author: "Sarah J. Maas",
    icon: "👑",
    link: "book.html",
    tags: ["faeries", "love triangle", "retelling"]
  }
];

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

if (searchInput) {
  // Module 3: input event — fires every keystroke
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim().toLowerCase();
    handleSearch(query);
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".search")) {
      searchResults.hidden = true;
    }
  });
}

function handleSearch(query) {
  try {
    // If empty, hide dropdown
    if (query.length === 0) {
      searchResults.hidden = true;
      searchResults.innerHTML = "";
      return;
    }

    // Filter books — Module 4 (for) + Module 2 (string includes)
    const matches = [];
    for (let i = 0; i < allBooks.length; i++) {
      const book = allBooks[i];
      const titleLower = book.title.toLowerCase();
      const authorLower = book.author.toLowerCase();

      if (titleLower.includes(query) || authorLower.includes(query)) {
        matches.push(book);
      }
    }

    renderResults(matches);
    searchResults.hidden = false;
  } catch (error) {
    console.error("Search failed:", error);
  }
}

function renderResults(books) {
  searchResults.innerHTML = "";

  if (books.length === 0) {
    const empty = document.createElement("div");
    empty.className = "search__no-results";
    empty.textContent = "No realms match that name...";
    searchResults.appendChild(empty);
    return;
  }

  // Module 4: loop through matches
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const link = document.createElement("a");
    link.className = "search__result";
    link.href = book.link;

    link.innerHTML =
      '<div class="search__result-cover">' + book.icon + '</div>' +
      '<div class="search__result-info">' +
        '<div class="search__result-title">' + book.title + '</div>' +
        '<div class="search__result-author">by ' + book.author + '</div>' +
      '</div>';

    searchResults.appendChild(link);
  }
}