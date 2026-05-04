// ============================================
// CROWNED READS — Main JavaScript
// Author: Esmanur Dere
// Course: YBS226 Advanced Web Design
//
// Module 2 (variables, arrays, objects, strings),
// Module 3 (events, user input),
// Module 4 (loops, conditional execution),
// Module 5 (functions),
// Module 6 (try/catch error handling)
// ============================================

console.log("✦ Crowned Reads loaded ✦");


// ============================================
// FEATURE 1: Live Search
// ============================================

// Book data with proper IDs for routing
const allBooks = [
  {
    id: "caraval",
    title: "Caraval",
    author: "Stephanie Garber",
    icon: "🎭"
  },
  {
    id: "once-upon",
    title: "Once Upon a Broken Heart",
    author: "Stephanie Garber",
    icon: "🌹"
  },
  {
    id: "fourth-wing",
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    icon: "⚔️"
  },
  {
    id: "acotar",
    title: "A Court of Thorns and Roses",
    author: "Sarah J. Maas",
    icon: "👑"
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
    if (query.length === 0) {
      searchResults.hidden = true;
      searchResults.innerHTML = "";
      return;
    }

    // Module 4: filter books with for loop
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

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const link = document.createElement("a");
    link.className = "search__result";
    // FIX: route to correct book using URL parameter
    link.href = "book.html?id=" + book.id;

    link.innerHTML =
      '<div class="search__result-cover">' + book.icon + '</div>' +
      '<div class="search__result-info">' +
        '<div class="search__result-title">' + book.title + '</div>' +
        '<div class="search__result-author">by ' + book.author + '</div>' +
      '</div>';

    searchResults.appendChild(link);
  }
}


// ============================================
// FEATURE 2: Spoiler Hider
// ============================================

// Apply blur to existing comments containing "spoiler"
const allComments = document.querySelectorAll(".comment");
allComments.forEach(function (comment) {
  applySpoiler(comment);
});


function applySpoiler(comment) {
  const textEl = comment.querySelector(".comment__text");
  if (!textEl) return;

  const text = textEl.textContent.toLowerCase();

  if (text.includes("spoiler")) {
    comment.classList.add("comment--spoiler");

    comment.addEventListener("click", function () {
      comment.classList.add("comment--spoiler--revealed");
    });
  }
}


// ============================================
// FEATURE 3: Comment Form with Themed Rating
// ============================================

let selectedRating = 0;

const formRating = document.getElementById("form-rating");

if (formRating) {
  // Click to set rating (event delegation — buttons added by JS)
  formRating.addEventListener("click", function (event) {
    const btn = event.target.closest(".rating-icon");
    if (!btn) return;

    const value = parseInt(btn.dataset.value);
    selectedRating = value;
    fillRatingBlock(formRating, value);
  });

  // Hover preview
  formRating.addEventListener("mouseover", function (event) {
    const btn = event.target.closest(".rating-icon");
    if (!btn) return;

    const value = parseInt(btn.dataset.value);
    previewRatingBlock(formRating, value);
  });

  // Restore actual rating when mouse leaves
  formRating.addEventListener("mouseleave", function () {
    fillRatingBlock(formRating, selectedRating);
  });
}


function fillRatingBlock(container, value) {
  const icons = container.querySelectorAll(".rating-icon");
  const text = container.querySelector(".rating-text");

  for (let i = 0; i < icons.length; i++) {
    icons[i].classList.remove("rating-icon--preview");
    if (i < value) {
      icons[i].classList.add("rating-icon--filled");
    } else {
      icons[i].classList.remove("rating-icon--filled");
    }
  }

  if (text) {
    if (value > 0) {
      text.textContent = "Your rating: " + value + " of 5";
    } else {
      text.textContent = "Click to rate";
    }
  }
}


function previewRatingBlock(container, value) {
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


// --- Comment form submission ---
const commentForm = document.getElementById("comment-form");
const commentsList = document.getElementById("comments-list");

if (commentForm) {
  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    handleNewComment();
  });
}


function handleNewComment() {
  try {
    const nameInput = document.getElementById("comment-name");
    const textInput = document.getElementById("comment-text");

    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    // Module 4: validation chain
    if (name.length === 0 || text.length === 0) {
      alert("Please fill in both your name and review.");
      return;
    }

    if (text.length < 10) {
      alert("Your review must be at least 10 characters long.");
      return;
    }

    if (selectedRating === 0) {
      alert("Please rate the book before posting.");
      return;
    }

    // Read the icon from the form rating block
    const icon = formRating ? formRating.dataset.icon : "✦";

    const newComment = createCommentElement(name, text, selectedRating, icon);
    applySpoiler(newComment);

    commentsList.insertBefore(newComment, commentsList.firstChild);

    // Reset form
    nameInput.value = "";
    textInput.value = "";
    selectedRating = 0;
    fillRatingBlock(formRating, 0);

    console.log("Posted comment by", name, "rating:", selectedRating);
  } catch (error) {
    console.error("Could not post comment:", error);
    alert("Something went wrong. Please try again.");
  }
}


function createCommentElement(name, text, rating, icon) {
  const today = new Date();
  const months = ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"];
  const dateStr = months[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear();

  // Build rating string with filled + empty icons — Module 4
  let ratingStr = "";
  for (let i = 0; i < rating; i++) {
    ratingStr = ratingStr + icon;
  }

  const article = document.createElement("article");
  article.className = "comment";
  article.innerHTML =
    '<div class="comment__header">' +
      '<span class="comment__author">' + name + ' ✦</span>' +
      '<span class="comment__date">' + dateStr + '</span>' +
    '</div>' +
    '<div class="comment__rating">' + ratingStr + ' <span class="comment__rating-score">(' + rating + '/5)</span></div>' +
    '<p class="comment__text">' + text + '</p>';

  return article;
}


// ============================================
// FEATURE 4: Contact Form (About page)
// ============================================

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    handleContactSubmit();
  });
}


function handleContactSubmit() {
  try {
    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");
    const successBox = document.getElementById("contact-success");
    const successName = document.getElementById("contact-success-name");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (name.length === 0) {
      alert("Please tell me your name.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (message.length < 10) {
      alert("Your message is too short — at least 10 characters please.");
      return;
    }

    successName.textContent = name;
    successBox.hidden = false;

    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";

    console.log("Contact form sent by", name, "(" + email + ")");

    setTimeout(function () {
      successBox.hidden = true;
    }, 6000);
  } catch (error) {
    console.error("Contact form error:", error);
    alert("Something went wrong. Please try again.");
  }
}


// Manual email validator — Module 2 + Module 4
function isValidEmail(email) {
  if (email.length < 5) return false;
  if (email.indexOf("@") === -1) return false;
  if (email.indexOf(".") === -1) return false;

  const parts = email.split("@");
  if (parts.length !== 2) return false;
  if (parts[0].length === 0) return false;
  if (parts[1].indexOf(".") === -1) return false;

  return true;
}