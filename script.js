// Check if an element is in the viewport
const isInViewport = (element, threshold = 100) => {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight - threshold && rect.bottom >= 0;
};

// Handle the fade-in effect for game cards and podium items
const fadeInOnScroll = () => {
  document.querySelectorAll(".game-card, .podium-item").forEach((item) => {
    if (isInViewport(item)) item.classList.add("fade-in");
  });
};

// Apply dark mode based on stored preference
const applyStoredTheme = () => {
  const isDarkMode = localStorage.getItem("dark-mode");
  if (isDarkMode === null || isDarkMode === "true") {
    document.body.classList.add("dark-mode");
    document.querySelector("header").classList.add("dark-mode");
    document.querySelectorAll("section, .game-card").forEach((el) =>
      el.classList.add("dark-mode")
    );
  }
};

// Toggle dark mode on button click
document.getElementById("toggle-theme").addEventListener("click", () => {
  ["body", "header", "section", ".game-card"].forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) =>
      el.classList.toggle("dark-mode")
    );
  });
  localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
});

// Toggle search input visibility
const searchInput = document.getElementById("game-search");
searchInput.style.display = 'none'; // Ensure it starts hidden

document.getElementById("search-icon").addEventListener("click", () => {
  searchInput.style.display = (searchInput.style.display === 'none') ? 'inline-block' : 'none';
  if (searchInput.style.display === 'inline-block') searchInput.focus();
});



// Filter game cards based on search input
document.getElementById("game-search").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  document.querySelectorAll(".game-card").forEach((card) => {
    const title = card.querySelector(".game-info h3").textContent.toLowerCase();
    card.style.display = title.includes(searchTerm) ? "block" : "none";
    card.classList.toggle("fade-in", title.includes(searchTerm));
  });
});

// Launch confetti on podium item click
document.querySelectorAll(".podium-item").forEach((podium) => {
  podium.addEventListener("click", (event) => {
    const originX = event.clientX / window.innerWidth;
    const originY = event.clientY / window.innerHeight;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: originX, y: originY },
    });
  });
});

// Preload link on hover
const preloadLink = (url, resourceType = 'fetch') => {
  if (!document.querySelector(`link[href="${url}"][rel="preload"]`)) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = resourceType;
    document.head.appendChild(link);
  }
};

// Observe game cards for hover preloading
document.querySelectorAll(".game-card").forEach((card) => {
  card.addEventListener("mouseenter", (event) => {
    const linkElement = event.currentTarget.querySelector("a");
    if (linkElement) preloadLink(linkElement.href);
  });
});

// Sidebar toggle functions
const sidebar = document.getElementById('mySidebar');
const toggleNav = () => {
  const isOpen = window.getComputedStyle(sidebar).left === "0px";
  sidebar.style.left = isOpen ? "-250px" : "0";
};

// Event listeners for sidebar
document.getElementById("menu-icon").addEventListener("click", toggleNav);
document.addEventListener("click", (event) => {
  if (!sidebar.contains(event.target) && !event.target.closest('#menu-icon')) {
    sidebar.style.left = "-250px";
  }
});

// Initial load and scroll event listeners
window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", () => {
  fadeInOnScroll();
  applyStoredTheme();
});