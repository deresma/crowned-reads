// ============================================
// CROWNED READS — Book Detail Page Logic
// Module 2 (objects, arrays, strings),
// Module 3 (URL params), Module 4 (loops, if),
// Module 5 (functions), Module 6 (try/catch)
// ============================================

// --- DATA: Full info for every book ---
const booksData = {
  "caraval": {
    title: "Caraval",
    author: "Stephanie Garber",
    icon: "🎭",
    cover: "images/caraval.jpg",
    coverClass: "book-card__cover--caraval",
    tags: ["magical world", "slow burn", "sisters", "mystery"],
    description: [
      "Scarlett Dragna has never left the tiny island where she and her sister, Tella, live with their powerful, and cruel, father. Now Scarlett's father has arranged a marriage for her, and Scarlett thinks her dreams of seeing Caraval — the faraway, once-a-year performance where the audience participates in the show — are over.",
      "But this year, Scarlett's long-dreamt-of invitation finally arrives. With the help of a mysterious sailor, Tella whisks Scarlett away to the show. Only, the actual Caraval turns out to be far more sinister and magical than she had ever imagined."
    ],
    meta: { series: "Caraval (Book 1)", published: "2017", pages: "407" },
    sampleComments: [
      { name: "Luna", date: "March 12, 2026", text: "The atmosphere in this book is unmatched. Reading Caraval feels like stepping into a fever dream — magical, dangerous, and absolutely beautiful." },
      { name: "Aria", date: "February 28, 2026", text: "Stephanie Garber's writing is so visual. I could see every velvet curtain, every starry alleyway. The sister bond at the heart of the story made me cry." },
      { name: "Stella", date: "February 14, 2026", text: "SPOILER: I cannot believe what happens to Tella at the end of book one! The plot twist completely shattered me." }
    ]
  },
  "once-upon": {
    title: "Once Upon a Broken Heart",
    author: "Stephanie Garber",
    icon: "🌹",
    cover: "images/once-upon.jpg",
    coverClass: "book-card__cover--once-upon",
    tags: ["fated love", "fairy tale", "morally grey", "bargains"],
    description: [
      "Evangeline Fox grew up reading fairytales and believing in true love. When her stepsister announces she is to marry the love of Evangeline's life, she's desperate to stop the wedding — even if that means making a bargain with the mysterious, wickedly handsome Prince of Hearts.",
      "Three kisses, sealed by the Prince of Hearts. But careful what you wish for, because magic is never free. As Evangeline gets pulled deeper into a world of fated love and forbidden alliances, she begins to suspect that the Prince of Hearts might be the only one who can save her — or the one she should fear most."
    ],
    meta: { series: "Once Upon a Broken Heart (Book 1)", published: "2021", pages: "416" },
    sampleComments: [
      { name: "Iris", date: "April 02, 2026", text: "Jacks. That's the entire review. Stephanie Garber gave us the most delicious morally grey love interest in romantasy." },
      { name: "Selene", date: "March 18, 2026", text: "The prose reads like a fairy tale told in candlelight. Every chapter felt like a wish I didn't want to wake up from." },
      { name: "Calla", date: "March 03, 2026", text: "SPOILER: The ending completely flipped everything I thought about Apollo and Jacks. I started book two the same night." }
    ]
  },
  "fourth-wing": {
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    icon: "⚔️",
    cover: "images/fourth-wing.jpg",
    coverClass: "book-card__cover--fourth-wing",
    tags: ["dragons", "enemies to lovers", "academy", "war"],
    description: [
      "Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history. Now, the commanding general — also known as her tough-as-talons mother — has ordered Violet to join the hundreds of candidates striving to become the elite of Navarre: dragon riders.",
      "But when you're smaller than everyone else and your body is brittle, dragons aren't exactly known for being forgiving. With fewer dragons willing to bond than cadets, most would kill Violet to better their own chances — and Xaden Riorson, the most powerful and ruthless wingleader in the Riders Quadrant, would love nothing more than to see her dead."
    ],
    meta: { series: "The Empyrean (Book 1)", published: "2023", pages: "517" },
    sampleComments: [
      { name: "Bryce", date: "April 10, 2026", text: "I have not slept properly since I started this book. Xaden Riorson lives in my head rent-free and I have no plans to evict him." },
      { name: "Tessa", date: "March 22, 2026", text: "Violet is the kind of heroine I needed. Smart, fragile in body but iron in spirit, and she earns every single victory." },
      { name: "Nova", date: "February 15, 2026", text: "SPOILER: That last chapter. I closed the book, screamed into a pillow, and immediately preordered Iron Flame." }
    ]
  },
  "acotar": {
    title: "A Court of Thorns and Roses",
    author: "Sarah J. Maas",
    icon: "👑",
    cover: "images/acotar.jpg",
    coverClass: "book-card__cover--acotar",
    tags: ["faeries", "love triangle", "retelling", "courts"],
    description: [
      "When nineteen-year-old huntress Feyre kills a wolf in the woods, a beast-like creature arrives to demand retribution. Dragged to a treacherous magical land she knows about only from legends, Feyre discovers that her captor is not an animal, but Tamlin — one of the lethal, immortal faeries who once ruled her world.",
      "As she dwells on his estate, her feelings for Tamlin transform from icy hostility into a fiery passion that burns through every lie she's been told about the beautiful, dangerous world of the Fae. But an ancient, wicked shadow is growing — and Feyre must find a way to stop it, or doom Tamlin and his world forever."
    ],
    meta: { series: "A Court of Thorns and Roses (Book 1)", published: "2015", pages: "419" },
    sampleComments: [
      { name: "Rhea", date: "April 18, 2026", text: "Reading this series in order is the rite of passage for every romantasy fan. Book one sets the stage in the most beautiful, devastating way." },
      { name: "Maeve", date: "March 30, 2026", text: "Sarah J. Maas builds courts and characters that feel impossibly real. The world is cruel and lush all at once." },
      { name: "Velaria", date: "March 11, 2026", text: "SPOILER: Book one is just the prologue. Wait until you meet a certain High Lord of the Night Court. That's all I'm saying." }
    ]
  }
};


// ============================================
// READ URL PARAMETER (Module 3 — user input via URL)
// ============================================

function getBookIdFromURL() {
  // URLSearchParams reads ?id=caraval from the URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // If no id or invalid, default to caraval
  if (!id || !booksData[id]) {
    return "caraval";
  }
  return id;
}


// ============================================
// RENDER THE BOOK PAGE (Module 5 — function)
// ============================================

function renderBook(bookId) {
  try {
    const book = booksData[bookId];
    if (!book) {
      console.error("Unknown book id:", bookId);
      return;
    }

    // --- Update page title ---
    document.getElementById("page-title").textContent = book.title + " — Crowned Reads";

    // --- Cover ---
    const coverEl = document.getElementById("book-cover");
    coverEl.className = "book-detail__cover " + book.coverClass;
    const coverImg = document.getElementById("book-cover-img");
    coverImg.src = book.cover;
    coverImg.alt = book.title + " book cover";

    // --- Title and author ---
    document.getElementById("book-title").textContent = book.title;
    document.getElementById("book-author").textContent = "by " + book.author;

    // --- Tags (Module 4: for loop) ---
    const tagsEl = document.getElementById("book-tags");
    tagsEl.innerHTML = "";
    for (let i = 0; i < book.tags.length; i++) {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = book.tags[i];
      tagsEl.appendChild(span);
    }

    // --- Description paragraphs ---
    const descEl = document.getElementById("book-description");
    descEl.innerHTML = "";
    for (let i = 0; i < book.description.length; i++) {
      const p = document.createElement("p");
      p.className = "book-detail__description";
      p.textContent = book.description[i];
      descEl.appendChild(p);
    }

    // --- Meta ---
    const metaEl = document.getElementById("book-meta");
    metaEl.innerHTML =
      '<p><strong>Series:</strong> ' + book.meta.series + '</p>' +
      '<p><strong>Published:</strong> ' + book.meta.published + '</p>' +
      '<p><strong>Pages:</strong> ' + book.meta.pages + '</p>';

    // --- Sample comments ---
    renderSampleComments(book.sampleComments);

    // --- Themed rating in the form ---
    renderFormRating(book.icon);

    // --- Highlight active book in selector ---
    highlightActiveSelector(bookId);

    console.log("Rendered book:", bookId);
  } catch (error) {
    console.error("Could not render book page:", error);
  }
}


function renderSampleComments(comments) {
  const list = document.getElementById("comments-list");
  list.innerHTML = "";

  for (let i = 0; i < comments.length; i++) {
    const c = comments[i];
    const article = document.createElement("article");
    article.className = "comment";
    article.innerHTML =
      '<div class="comment__header">' +
        '<span class="comment__author">' + c.name + ' ✦</span>' +
        '<span class="comment__date">' + c.date + '</span>' +
      '</div>' +
      '<p class="comment__text">' + c.text + '</p>';

    list.appendChild(article);
  }
}


// Build a 5-icon themed rating inside the comment form
function renderFormRating(icon) {
  const ratingEl = document.getElementById("form-rating");
  if (!ratingEl) return;

  ratingEl.innerHTML = "";
  ratingEl.dataset.icon = icon;

  for (let i = 1; i <= 5; i++) {
    const btn = document.createElement("button");
    btn.type = "button"; // prevents form submit on click
    btn.className = "rating-icon";
    btn.dataset.value = i;
    btn.setAttribute("aria-label", "Rate " + i + " of 5");
    btn.textContent = icon;
    ratingEl.appendChild(btn);
  }

  const text = document.createElement("span");
  text.className = "rating-text";
  text.textContent = "Click to rate";
  ratingEl.appendChild(text);
}


function highlightActiveSelector(bookId) {
  const links = document.querySelectorAll(".book-selector__link");
  for (let i = 0; i < links.length; i++) {
    if (links[i].dataset.id === bookId) {
      links[i].classList.add("book-selector__link--active");
    } else {
      links[i].classList.remove("book-selector__link--active");
    }
  }
}


// ============================================
// INITIALIZE
// ============================================

const currentBookId = getBookIdFromURL();
renderBook(currentBookId);