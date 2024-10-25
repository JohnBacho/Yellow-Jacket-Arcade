// Function to check if the element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const threshold = 100;
  return rect.top <= window.innerHeight - threshold && rect.bottom >= 0;
}

// Function to handle the fade-in effect for game cards and podium items
function fadeInOnScroll() {
  const cards = document.querySelectorAll(".game-card");
  const podiums = document.querySelectorAll(".podium-item");

  // Fade in game cards
  cards.forEach((card) => {
      if (isInViewport(card)) {
          card.classList.add("fade-in");
      }
  });

  // Fade in podium items
  podiums.forEach((podium) => {
      if (isInViewport(podium)) {
          podium.classList.add("fade-in");
      }
  });
}

// Listen for the scroll event
window.addEventListener("scroll", fadeInOnScroll);

// Run once on load to catch elements that are in view
window.addEventListener("load", fadeInOnScroll);

  const toggleButton = document.getElementById("toggle-theme");
  const body = document.body;
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("section");
  const gameCards = document.querySelectorAll(".game-card");

  // Function to apply the dark mode based on stored preference
  function applyStoredTheme() {
    const isDarkMode = localStorage.getItem("dark-mode") === "true";
    if (isDarkMode) {
      body.classList.add("dark-mode");
      header.classList.add("dark-mode");
      sections.forEach((section) => section.classList.add("dark-mode"));
      gameCards.forEach((card) => card.classList.add("dark-mode"));
    }
  }

  toggleButton.addEventListener("click", () => {
    // Toggle dark mode class on body, header, sections, and game cards
    body.classList.toggle("dark-mode");
    header.classList.toggle("dark-mode");
    sections.forEach((section) => section.classList.toggle("dark-mode"));
    gameCards.forEach((card) => card.classList.toggle("dark-mode"));

    // Store the user's choice in localStorage
    localStorage.setItem("dark-mode", body.classList.contains("dark-mode"));
  });

  // Apply the stored theme on page load
  window.addEventListener("load", applyStoredTheme);




// search bar
  // Ensure the DOM is fully loaded before executing JavaScript
  document.addEventListener('DOMContentLoaded', function () {
    // Toggle visibility of the search input
    const searchIcon = document.getElementById('search-icon');
    const searchInput = document.getElementById('game-search');

    searchIcon.addEventListener('click', function () {
      if (searchInput.style.display === 'none' || searchInput.style.display === '') {
        searchInput.style.display = 'inline-block';
        searchInput.focus(); 
      } else {
        searchInput.style.display = 'none'; 
      }
    });
  });

  // Function to search and filter games
  function searchGames() {
    const input = document.getElementById('game-search').value.toLowerCase();
    const cards = document.querySelectorAll('.game-card');
    cards.forEach((card) => {
      const title = card.querySelector('.game-info h3').textContent.toLowerCase();
      if (title.includes(input)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  document.getElementById('game-search').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(function (card) {
        const gameTitle = card.querySelector('h3').textContent.toLowerCase();
        
        // Check if the game title matches the search term
        if (gameTitle.includes(searchTerm)) {
            card.classList.add('fade-in'); // Add fade-in class to make it visible
            card.style.display = 'block';  // Ensure the card is displayed
        } else {
            card.classList.remove('fade-in'); // Remove fade-in when it doesn't match
            card.style.display = 'none';     // Hide the card
        }
    });
});

function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 } // Controls where the confetti appears on the page
  });
}

// Add event listeners to each podium for confetti on click
document.querySelectorAll('.podium-item').forEach(function (podium) {
  podium.addEventListener('click', launchConfetti);
});

// Function to preload a link
// Efficient preload function
// Function to preload a link
function preloadLink(url, resourceType = 'fetch') {
  if (document.querySelector(`link[href="${url}"][rel="preload"]`)) {
    // If already preloaded, skip it
    return;
  }

  // Create a preload link element
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;

  // Optionally set the resource type if specified (like 'image', 'script', etc.)
  if (resourceType) {
    link.as = resourceType;
  }

  document.head.appendChild(link);
}

// Function to handle mouse enter event
function handleMouseEnter(event) {
  const linkElement = event.currentTarget.querySelector('a'); // Find the anchor inside the hovered card
  if (linkElement) {
    const url = linkElement.href;
    preloadLink(url); // Preload the resource when hovering over the card
  }
}

// Function to observe game cards or link containers
function observeGameCards(cards) {
  cards.forEach(card => {
    card.addEventListener('mouseenter', handleMouseEnter); // Add mouse enter event listener
  });
}

// Example usage: Observe elements containing the links you want to preload
observeGameCards(gameCards);


// Get references to the sidebar and menu icon
const sidebar = document.getElementById('mySidebar');
const menuIcon = document.getElementById('menu-icon');

// Function to close the sidebar
function closeSidebar() {
  sidebar.style.left = "-250px"; // Hide the sidebar by moving it off-screen
}

// Function to open the sidebar
function openSidebar() {
  sidebar.style.left = "0"; // Show the sidebar
}

// Toggle the sidebar
function toggleNav() {
  // Get the computed style of the sidebar
  const computedStyle = window.getComputedStyle(sidebar);
  
  // Check if the sidebar is currently hidden or visible
  if (computedStyle.left === "0px") {
    closeSidebar(); // Close the sidebar if it's currently open
  } else {
    openSidebar(); // Open the sidebar if it's currently closed
  }
}

// Add event listener to the menu icon for toggling the sidebar
menuIcon.addEventListener('click', toggleNav);

// Close the sidebar when clicking outside
document.addEventListener('click', function (event) {
  // Check if the clicked element is outside the sidebar and menu icon
  if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
    closeSidebar(); // Close the sidebar if the click is outside
  }
});