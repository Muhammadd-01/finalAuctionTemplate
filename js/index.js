// Index Page JavaScript for AuctionHub

import Swiper from "swiper/bundle"
import "swiper/css/bundle"
import AOS from "aos"
import "aos/dist/aos.css"
import * as bootstrap from "bootstrap"

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS Animation
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  })

  // Initialize Hero Slider
  const heroSwiper = new Swiper(".heroSwiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".heroSwiper .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".heroSwiper .swiper-button-next",
      prevEl: ".heroSwiper .swiper-button-prev",
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  })

  // Initialize Hot Auctions Slider
  const hotAuctionsSwiper = new Swiper(".hotAuctionsSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".hotAuctionsSwiper .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".hotAuctionsSwiper .swiper-button-next",
      prevEl: ".hotAuctionsSwiper .swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  })

  // Initialize Testimonials Slider
  const testimonialSwiper = new Swiper(".testimonialSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".testimonialSwiper .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  })

  // Back to Top Button
  const backToTopButton = document.getElementById("backToTop")

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

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Newsletter Form Submission
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const emailInput = this.querySelector("input[type='email']")
      const email = emailInput.value.trim()

      if (!email) return

      // Disable form elements
      emailInput.disabled = true
      const submitBtn = this.querySelector("button[type='submit']")
      submitBtn.disabled = true
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'

      // Simulate API call
      setTimeout(() => {
        // Show success message
        const successMessage = document.createElement("div")
        successMessage.className = "alert alert-success mt-3"
        successMessage.innerHTML = `
          <i class="fas fa-check-circle me-2"></i>
          Thank you for subscribing! We've sent a confirmation email to <strong>${email}</strong>.
        `
        newsletterForm.appendChild(successMessage)

        // Reset form
        emailInput.value = ""
        emailInput.disabled = false
        submitBtn.disabled = false
        submitBtn.innerHTML = "Subscribe"

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMessage.remove()
        }, 5000)
      }, 1500)
    })
  }

  // Featured Items Animation
  const featuredItems = document.querySelectorAll("#featured .item-card")
  if (featuredItems.length > 0) {
    featuredItems.forEach((item, index) => {
      item.setAttribute("data-aos", "fade-up")
      item.setAttribute("data-aos-delay", (index % 3) * 100 + 100)
    })
  }

  // Initialize watch buttons
  initWatchlistButtons()

  // Add hover effects to category cards
  const categoryCards = document.querySelectorAll(".category-card")
  if (categoryCards.length > 0) {
    categoryCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.querySelector("img").style.transform = "scale(1.1)"
      })

      card.addEventListener("mouseleave", function () {
        this.querySelector("img").style.transform = "scale(1)"
      })
    })
  }

  // Add dynamic countdown color change
  // Countdown Timer
  const countdownElements = document.querySelectorAll(".countdown")

  function updateCountdowns() {
    countdownElements.forEach((element) => {
      const endTime = new Date(element.getAttribute("data-time")).getTime()
      const now = new Date().getTime()
      const distance = endTime - now

      if (distance < 0) {
        element.innerHTML = "Auction Ended"
        element.classList.add("text-danger")
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      let countdownText = ""

      if (days > 0) {
        countdownText += `${days}d `
      }

      countdownText += `${hours}h ${minutes}m ${seconds}s`

      element.innerHTML = countdownText

      // Add urgent class if less than 1 hour remaining
      if (distance < 1000 * 60 * 60) {
        element.classList.add("urgent")
      } else {
        element.classList.remove("urgent")
      }
    })
  }

  // Initial update
  updateCountdowns()

  // Update every second
  setInterval(updateCountdowns, 1000)

  // Add trending items
  addTrendingItems()

  // Global Search
  const searchForm = document.querySelector(".search-form")
  const searchInput = document.getElementById("globalSearch")
  const searchResults = document.getElementById("searchResults")
  const searchResultsContainer = document.getElementById("searchResultsContainer")

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const searchTerm = searchInput.value.trim().toLowerCase()

    if (searchTerm.length < 2) {
      return
    }

    // Simulate search results
    const items = document.querySelectorAll(".item-card")
    const results = []

    items.forEach((item) => {
      const category = item.getAttribute("data-category")
      const name = item.getAttribute("data-name")

      if ((category && category.includes(searchTerm)) || (name && name.includes(searchTerm))) {
        results.push(item.cloneNode(true))
      }
    })

    // Display results
    searchResultsContainer.innerHTML = ""

    if (results.length > 0) {
      results.forEach((result) => {
        searchResultsContainer.appendChild(result)
      })
      searchResults.classList.remove("d-none")
    } else {
      searchResultsContainer.innerHTML = '<div class="col-12"><p>No results found for "' + searchTerm + '"</p></div>'
      searchResults.classList.remove("d-none")
    }

    // Scroll to results
    searchResults.scrollIntoView({ behavior: "smooth" })
  })

  // Watch Button Functionality
  const watchButtons = document.querySelectorAll(".watch-btn")

  watchButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const icon = this.querySelector("i")

      if (icon.classList.contains("far")) {
        icon.classList.remove("far")
        icon.classList.add("fas")
        icon.style.color = "#b80afc"

        // Show toast notification
        showToast("Item added to your watchlist!")
      } else {
        icon.classList.remove("fas")
        icon.classList.add("far")
        icon.style.color = ""

        // Show toast notification
        showToast("Item removed from your watchlist!")
      }
    })
  })

  // Toast Notification Function
  function showToast(message) {
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
})

// Function to add trending items dynamically
function addTrendingItems() {
  const featuredSection = document.getElementById("featured")
  if (!featuredSection) return

  // Create trending section
  const trendingSection = document.createElement("section")
  trendingSection.id = "trending"
  trendingSection.className = "py-5"
  trendingSection.innerHTML = `
    <div class="container">
      <h2 class="section-title" data-aos="fade-up">Trending Now</h2>
      <div class="row" id="trendingItems">
        <!-- Trending items will be added here -->
      </div>
    </div>
  `

  // Insert after featured section
  featuredSection.parentNode.insertBefore(trendingSection, featuredSection.nextSibling)

  // Add trending items
  const trendingItems = [
    {
      name: "Rare Gold Coin Collection",
      description: "Set of 5 rare gold coins from the 19th century, certified and graded.",
      price: "$8,500",
      image: "https://i.imgur.com/vZcuJXG.jpg",
      endTime: "2023-12-26T18:30:00",
      bids: 19,
    },
    {
      name: "Vintage Polaroid Camera",
      description: "1970s Polaroid SX-70 Land Camera in working condition with original case.",
      price: "$350",
      image: "https://i.imgur.com/ZpJnFjN.jpg",
      endTime: "2023-12-25T14:15:00",
      bids: 7,
    },
    {
      name: "Antique Pocket Watch",
      description: "18k gold pocket watch from 1890 with intricate engravings and original chain.",
      price: "$2,750",
      image: "https://i.imgur.com/Rl6Tk7r.jpg",
      endTime: "2023-12-27T10:00:00",
      bids: 12,
    },
    {
      name: "First Edition Comic Book",
      description: "Rare first edition superhero comic book from 1962 in protective sleeve.",
      price: "$4,200",
      image: "https://i.imgur.com/vZcuJXG.jpg",
      endTime: "2023-12-24T23:45:00",
      bids: 15,
    },
  ]

  const trendingItemsContainer = document.getElementById("trendingItems")
  if (trendingItemsContainer) {
    trendingItems.forEach((item, index) => {
      const endTime = new Date(item.endTime)
      const now = new Date()
      const distance = endTime - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

      let timeLeft = ""
      if (days > 0) {
        timeLeft += days + "d "
      }
      timeLeft += hours + "h " + minutes + "m"

      const itemHTML = `
        <div class="col-md-6 col-lg-3 mb-4 item-card" data-aos="fade-up" data-aos-delay="${index * 100}" data-category="trending" data-name="${item.name}">
          <div class="card h-100">
            <div class="card-img-container">
              <img src="${item.image}" class="card-img-top" alt="${item.name}">
              <div class="time-left">
                <i class="fas fa-clock me-1"></i>
                <span class="countdown" data-time="${item.endTime}">${timeLeft}</span>
              </div>
              <div class="bid-count">
                <i class="fas fa-gavel me-1"></i>
                <span>${item.bids} bids</span>
              </div>
              <button class="btn btn-sm btn-outline-light watch-btn position-absolute top-0 end-0 m-2">
                <i class="far fa-heart"></i>
              </button>
            </div>
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="bid-info">
                  <span class="current-bid">${item.price}</span>
                  <small class="text-muted">Current Bid</small>
                </div>
                <a href="item.html" class="btn btn-primary">Bid Now</a>
              </div>
            </div>
          </div>
        </div>
      `

      trendingItemsContainer.innerHTML += itemHTML
    })

    // Initialize watch buttons for trending items
    initWatchlistButtons()
  }
}

// Function to initialize watchlist buttons (implementation not provided in updates)
function initWatchlistButtons() {
  const watchButtons = document.querySelectorAll(".watch-btn")

  watchButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const icon = this.querySelector("i")

      if (icon.classList.contains("far")) {
        icon.classList.remove("far")
        icon.classList.add("fas")
        icon.style.color = "#b80afc"

        // Show toast notification
        showToast("Item added to your watchlist!")
      } else {
        icon.classList.remove("fas")
        icon.classList.add("far")
        icon.style.color = ""

        // Show toast notification
        showToast("Item removed from your watchlist!")
      }
    })
  })
}
