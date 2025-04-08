// Global JavaScript for AuctionHub

// Initialize AOS (Animate on Scroll)
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  })

  // Initialize all tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

  // Update all countdowns
  updateCountdowns()
  setInterval(updateCountdowns, 1000)

  // Initialize Back to Top button
  initBackToTop()

  // Initialize Global Search
  initGlobalSearch()

  // Initialize Watchlist Buttons
  initWatchlistButtons()

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })
})

// Countdown Timer Function
function updateCountdowns() {
  const countdownElements = document.querySelectorAll(".countdown")

  countdownElements.forEach((element) => {
    const endTime = new Date(element.getAttribute("data-time")).getTime()
    const now = new Date().getTime()
    const distance = endTime - now

    if (distance < 0) {
      element.innerHTML = "Auction Ended"
      element.classList.add("ended")
      return
    }

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    // Display the result
    let countdownText = ""

    if (days > 0) {
      countdownText += days + "d "
    }

    if (days > 0 || hours > 0) {
      countdownText += hours + "h "
    }

    if (days > 0 || hours > 0 || minutes > 0) {
      countdownText += minutes + "m "
    }

    countdownText += seconds + "s"

    element.innerHTML = countdownText

    // Add urgency class if less than 1 hour
    if (distance < 1000 * 60 * 60) {
      element.classList.add("urgent")
    }
  })
}

// Back to Top Button
function initBackToTop() {
  // Create back to top button
  const backToTopBtn = document.createElement("div")
  backToTopBtn.className = "back-to-top"
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  document.body.appendChild(backToTopBtn)

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("active")
    } else {
      backToTopBtn.classList.remove("active")
    }
  })

  // Scroll to top when clicked
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Global Search functionality
function initGlobalSearch() {
  const searchInputs = document.querySelectorAll(".navbar input[type='search']")

  if (searchInputs.length === 0) return

  searchInputs.forEach((searchInput) => {
    // Create search results container
    const searchForm = searchInput.closest("form")
    const searchResultsContainer = document.createElement("div")
    searchResultsContainer.className = "global-search-results"
    searchForm.appendChild(searchResultsContainer)

    // Add event listeners
    searchInput.addEventListener(
      "input",
      debounce(function () {
        const searchTerm = this.value.toLowerCase().trim()

        if (searchTerm.length < 2) {
          searchResultsContainer.classList.remove("show")
          return
        }

        // Fetch search results (simulated)
        fetchSearchResults(searchTerm).then((results) => {
          if (results.length > 0) {
            renderSearchResults(results, searchResultsContainer)
            searchResultsContainer.classList.add("show")
          } else {
            searchResultsContainer.innerHTML = `
            <div class="p-4 text-center">
              <i class="fas fa-search fa-2x mb-3 text-muted"></i>
              <p>No results found for "${searchTerm}"</p>
            </div>
          `
            searchResultsContainer.classList.add("show")
          }
        })
      }, 300),
    )

    // Close search results when clicking outside
    document.addEventListener("click", (e) => {
      if (!searchForm.contains(e.target)) {
        searchResultsContainer.classList.remove("show")
      }
    })

    // Handle form submission
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const searchTerm = searchInput.value.toLowerCase().trim()

      if (searchTerm.length < 2) return

      // Redirect to search results page
      window.location.href = `search-results.html?q=${encodeURIComponent(searchTerm)}`
    })
  })
}

// Simulated search results fetch
function fetchSearchResults(searchTerm) {
  // This would normally be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Sample data - in a real app, this would come from an API
      const allItems = [
        {
          id: 1,
          name: "Vintage Leica M3 Camera (1954)",
          category: "Electronics",
          price: "$1,250",
          image: "https://i.imgur.com/ZpJnFjN.jpg",
        },
        {
          id: 2,
          name: "First Edition Hemingway",
          category: "Books",
          price: "$3,500",
          image: "https://i.imgur.com/vZcuJXG.jpg",
        },
        {
          id: 3,
          name: "Victorian Writing Desk",
          category: "Furniture",
          price: "$2,800",
          image: "https://i.imgur.com/Yx0Qhph.jpg",
        },
        {
          id: 4,
          name: "Rolex Submariner 1968",
          category: "Watches",
          price: "$8,750",
          image: "https://i.imgur.com/Rl6Tk7r.jpg",
        },
        {
          id: 5,
          name: "19th Century Oil Painting",
          category: "Art",
          price: "$5,200",
          image: "https://i.imgur.com/Yx0Qhph.jpg",
        },
        {
          id: 6,
          name: "1794 Silver Dollar",
          category: "Coins",
          price: "$125,000",
          image: "https://i.imgur.com/vZcuJXG.jpg",
        },
        {
          id: 7,
          name: "Vintage Marantz Turntable",
          category: "Electronics",
          price: "$850",
          image: "https://i.imgur.com/ZpJnFjN.jpg",
        },
        {
          id: 8,
          name: "Harry Potter First Edition",
          category: "Books",
          price: "$12,750",
          image: "https://i.imgur.com/vZcuJXG.jpg",
        },
        {
          id: 9,
          name: "Antique Crystal Chandelier",
          category: "Furniture",
          price: "$5,750",
          image: "https://i.imgur.com/Yx0Qhph.jpg",
        },
        {
          id: 10,
          name: "1959 Gibson Les Paul",
          category: "Musical Instruments",
          price: "$175,500",
          image: "https://i.imgur.com/ZpJnFjN.jpg",
        },
        {
          id: 11,
          name: "Ming Dynasty Vase",
          category: "Antiques",
          price: "$45,000",
          image: "https://i.imgur.com/Yx0Qhph.jpg",
        },
        {
          id: 12,
          name: "Signed Stephen King Novel",
          category: "Books",
          price: "$850",
          image: "https://i.imgur.com/vZcuJXG.jpg",
        },
        {
          id: 13,
          name: "Apple Macintosh 128K",
          category: "Electronics",
          price: "$3,800",
          image: "https://i.imgur.com/ZpJnFjN.jpg",
        },
        {
          id: 14,
          name: "Mid-Century Dining Table",
          category: "Furniture",
          price: "$1,950",
          image: "https://i.imgur.com/Yx0Qhph.jpg",
        },
        {
          id: 15,
          name: "Vintage Chesterfield Sofa",
          category: "Furniture",
          price: "$3,200",
          image: "https://i.imgur.com/Yx0Qhph.jpg",
        },
      ]

      // Filter items based on search term
      const results = allItems.filter(
        (item) => item.name.toLowerCase().includes(searchTerm) || item.category.toLowerCase().includes(searchTerm),
      )

      // Limit to 5 results
      resolve(results.slice(0, 5))
    }, 300)
  })
}

// Render search results
function renderSearchResults(results, container) {
  let html = ""

  results.forEach((item) => {
    html += `
      <a href="item.html?id=${item.id}" class="search-result-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="result-details">
          <h6>${item.name}</h6>
          <p>${item.category}</p>
        </div>
        <div class="result-price">${item.price}</div>
      </a>
    `
  })

  html += `
    <div class="p-3 text-center">
      <a href="search-results.html?q=${encodeURIComponent(document.querySelector('.navbar input[type="search"]').value)}" class="btn btn-sm btn-primary">
        View All Results
      </a>
    </div>
  `

  container.innerHTML = html
}

// Debounce function to limit how often a function can be called
function debounce(func, wait) {
  let timeout
  return function () {
    const args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

// Mobile menu toggle
const navbarToggler = document.querySelector(".navbar-toggler")
if (navbarToggler) {
  navbarToggler.addEventListener("click", () => {
    document.body.classList.toggle("mobile-nav-active")
  })
}

// Form validation
const forms = document.querySelectorAll(".needs-validation")
if (forms.length > 0) {
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add("was-validated")
      },
      false,
    )
  })
}

// Add to watchlist functionality
function initWatchlistButtons() {
  const watchButtons = document.querySelectorAll(".watch-btn")

  watchButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("active")

      if (this.classList.contains("active")) {
        this.innerHTML = '<i class="fas fa-heart"></i>'
        showToast("Item added to your watchlist!", "success")
      } else {
        this.innerHTML = '<i class="far fa-heart"></i>'
        showToast("Item removed from your watchlist", "info")
      }
    })
  })
}

// Toast notification
function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toast-container")

  if (!toastContainer) {
    const container = document.createElement("div")
    container.id = "toast-container"
    container.className = "position-fixed bottom-0 end-0 p-3"
    container.style.zIndex = "1050"
    document.body.appendChild(container)
  }

  const toast = document.createElement("div")
  toast.className = `toast align-items-center text-white bg-${type} border-0`
  toast.setAttribute("role", "alert")
  toast.setAttribute("aria-live", "assertive")
  toast.setAttribute("aria-atomic", "true")

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"} me-2"></i>
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `

  document.getElementById("toast-container").appendChild(toast)

  const bsToast = new bootstrap.Toast(toast, {
    autohide: true,
    delay: 3000,
  })

  bsToast.show()

  // Remove toast after it's hidden
  toast.addEventListener("hidden.bs.toast", function () {
    this.remove()
  })
}

// Back to Top Button
const backToTopButton = document.getElementById("backToTop")

if (backToTopButton) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("active")
    } else {
      backToTopButton.classList.remove("active")
    }
  })

  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Toast Notification Function
window.showToast = (message) => {
  const toastContainer = document.createElement("div")
  toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3"

  const toast = document.createElement("div")
  toast.className = "toast"
  toast.setAttribute("role", "alert")
  toast.setAttribute("aria-live", "assertive")
  toast.setAttribute("aria-atomic", "true")

  toast.innerHTML = `
        <div class="toast-header">
            <i class="fas fa-bell me-2" style="color: #b80afc;"></i>
            <strong class="me-auto">AuctionHub</strong>
            <small>Just now</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `

  toastContainer.appendChild(toast)
  document.body.appendChild(toastContainer)

  const bsToast = new bootstrap.Toast(toast)
  bsToast.show()

  // Remove from DOM after hiding
  toast.addEventListener("hidden.bs.toast", () => {
    document.body.removeChild(toastContainer)
  })
}
