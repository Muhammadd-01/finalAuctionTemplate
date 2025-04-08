// Item Details Page JavaScript for AuctionHub

import Swiper from "swiper/bundle"
import "swiper/css/bundle"
import * as bootstrap from "bootstrap"

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Item Image Swiper
  const itemSwiper = new Swiper(".itemSwiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    navigation: {
      nextEl: ".itemSwiper .swiper-button-next",
      prevEl: ".itemSwiper .swiper-button-prev",
    },
    pagination: {
      el: ".itemSwiper .swiper-pagination",
      clickable: true,
    },
    thumbs: {
      swiper: {
        el: ".itemThumbnailSwiper",
        slidesPerView: 5,
        spaceBetween: 10,
        watchSlidesProgress: true,
        breakpoints: {
          320: {
            slidesPerView: 3,
          },
          576: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
        },
      },
    },
  })

  // Auction Countdown Timer
  const auctionCountdown = document.getElementById("auctionCountdown")
  if (auctionCountdown) {
    const endTime = new Date("2023-12-31T23:59:59").getTime()

    function updateCountdown() {
      const now = new Date().getTime()
      const distance = endTime - now

      if (distance < 0) {
        auctionCountdown.innerHTML = "Auction Ended"
        auctionCountdown.classList.add("ended")

        // Show auction ended message
        const bidForm = document.querySelector(".bid-form")
        if (bidForm) {
          bidForm.innerHTML = `
                        <div class="alert alert-warning mb-0">
                            <i class="fas fa-gavel me-2"></i>
                            <strong>Auction Ended</strong>
                            <p class="mb-0">This auction has ended. The winning bid was $1,250.00.</p>
                        </div>
                    `
        }

        return
      }

      // Time calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      // Display the result
      auctionCountdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`

      // Add urgency class if less than 1 hour
      if (distance < 1000 * 60 * 60) {
        auctionCountdown.classList.add("urgent")
      }
    }

    // Update countdown immediately and then every second
    updateCountdown()
    setInterval(updateCountdown, 1000)
  }

  // Bid Form Submission
  const placeBidForm = document.getElementById("placeBidForm")
  if (placeBidForm) {
    placeBidForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const bidAmount = document.getElementById("bidAmount").value
      const minBid = 1275 // Current bid + increment

      if (!bidAmount || Number.parseFloat(bidAmount) < minBid) {
        // Show error message
        const errorAlert = document.createElement("div")
        errorAlert.className = "alert alert-danger mt-3"
        errorAlert.innerHTML = `
                    <i class="fas fa-exclamation-circle me-2"></i>
                    Please enter a bid of at least $${minBid.toFixed(2)}.
                `

        // Remove any existing error messages
        const existingError = placeBidForm.querySelector(".alert-danger")
        if (existingError) {
          existingError.remove()
        }

        placeBidForm.appendChild(errorAlert)
        return
      }

      // Simulate bid submission
      const bidBtn = this.querySelector(".bid-btn")
      bidBtn.disabled = true
      bidBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Placing Bid...'

      // Simulate API call
      setTimeout(() => {
        // Create bid confirmation modal
        const modalHTML = `
                    <div class="modal fade" id="bidConfirmationModal" tabindex="-1" aria-labelledby="bidConfirmationModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="bidConfirmationModalLabel">Bid Confirmation</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="text-center mb-4">
                                        <i class="fas fa-check-circle text-success fa-4x mb-3"></i>
                                        <h4>Your bid has been placed!</h4>
                                        <p>You are now the highest bidder for this item.</p>
                                    </div>
                                    <div class="bid-details">
                                        <div class="row mb-2">
                                            <div class="col-6 text-muted">Item:</div>
                                            <div class="col-6">Vintage Leica M3 Camera (1954)</div>
                                        </div>
                                        <div class="row mb-2">
                                            <div class="col-6 text-muted">Your Bid:</div>
                                            <div class="col-6">$${Number.parseFloat(bidAmount).toFixed(2)}</div>
                                        </div>
                                        <div class="row mb-2">
                                            <div class="col-6 text-muted">Auction Ends:</div>
                                            <div class="col-6">Dec 31, 2023 at 11:59 PM EST</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <a href="current-bidding.html" class="btn btn-primary">View My Bids</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `

        // Append modal to body
        document.body.insertAdjacentHTML("beforeend", modalHTML)

        // Show modal
        const bidConfirmationModal = new bootstrap.Modal(document.getElementById("bidConfirmationModal"))
        bidConfirmationModal.show()

        // Update current bid display
        const currentBidElement = document.querySelector(".current-bid")
        if (currentBidElement) {
          currentBidElement.textContent = `$${Number.parseFloat(bidAmount).toFixed(2)}`
        }

        // Reset form
        bidBtn.disabled = false
        bidBtn.innerHTML = '<i class="fas fa-gavel me-2"></i>Place Bid'
        document.getElementById("bidAmount").value = ""

        // Update minimum bid text
        const formText = placeBidForm.querySelector(".form-text")
        if (formText) {
          const newMinBid = Number.parseFloat(bidAmount) + 25
          formText.textContent = `Minimum bid: $${newMinBid.toFixed(2)} (current bid + $25.00)`
        }

        // Remove any error messages
        const errorAlert = placeBidForm.querySelector(".alert-danger")
        if (errorAlert) {
          errorAlert.remove()
        }

        // Update bid history modal
        const bidHistoryModal = document.getElementById("bidHistoryModal")
        if (bidHistoryModal) {
          const bidHistoryTable = bidHistoryModal.querySelector("tbody")
          if (bidHistoryTable) {
            const newRow = document.createElement("tr")
            newRow.innerHTML = `
                            <td>You</td>
                            <td>$${Number.parseFloat(bidAmount).toFixed(2)}</td>
                            <td>${new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
                        `
            bidHistoryTable.insertBefore(newRow, bidHistoryTable.firstChild)
          }
        }
      }, 1500)
    })
  }

  // Watch Button Toggle
  const watchBtn = document.querySelector(".watch-btn")
  if (watchBtn) {
    watchBtn.addEventListener("click", function () {
      this.classList.toggle("active")

      if (this.classList.contains("active")) {
        this.innerHTML = '<i class="fas fa-heart"></i> Watching'

        // Show toast notification
        const toastHTML = `
                    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header">
                                <i class="fas fa-heart text-danger me-2"></i>
                                <strong class="me-auto">Item Added to Watchlist</strong>
                                <small>Just now</small>
                                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div class="toast-body">
                                Vintage Leica M3 Camera has been added to your watchlist.
                            </div>
                        </div>
                    </div>
                `

        // Append toast to body
        document.body.insertAdjacentHTML("beforeend", toastHTML)

        // Show toast
        const toast = new bootstrap.Toast(document.querySelector(".toast"))
        toast.show()
      } else {
        this.innerHTML = '<i class="far fa-heart"></i> Watch'
      }
    })
  }

  // Initialize Similar Items Swiper
  const similarItemsSwiper = new Swiper(".similarItemsSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: ".similarItemsSwiper .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".similarItemsSwiper .swiper-button-next",
      prevEl: ".similarItemsSwiper .swiper-button-prev",
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  })

  // Seller Contact Form
  const contactSellerBtn = document.querySelector('a[href="#"][class*="contact-seller"]')
  if (contactSellerBtn) {
    contactSellerBtn.addEventListener("click", (e) => {
      e.preventDefault()

      // Create modal dynamically
      const modalHTML = `
                <div class="modal fade" id="contactSellerModal" tabindex="-1" aria-labelledby="contactSellerModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="contactSellerModalLabel">Contact Seller</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="contactSellerForm">
                                    <div class="mb-3">
                                        <label for="messageSubject" class="form-label">Subject</label>
                                        <input type="text" class="form-control" id="messageSubject" value="Question about Vintage Leica M3 Camera (1954)" required>
                                    </div>
                                    <div class="mb-3">
                                        <label for="messageBody" class="form-label">Message</label>
                                        <textarea class="form-control" id="messageBody" rows="5" required></textarea>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary" id="sendMessageBtn">Send Message</button>
                            </div>
                        </div>
                    </div>
                </div>
            `

      // Append modal to body
      document.body.insertAdjacentHTML("beforeend", modalHTML)

      // Show modal
      const contactSellerModal = new bootstrap.Modal(document.getElementById("contactSellerModal"))
      contactSellerModal.show()

      // Handle send message button
      const sendMessageBtn = document.getElementById("sendMessageBtn")
      sendMessageBtn.addEventListener("click", function () {
        const subject = document.getElementById("messageSubject").value.trim()
        const message = document.getElementById("messageBody").value.trim()

        if (!subject || !message) {
          return
        }

        // Disable button and show loading state
        this.disabled = true
        this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...'

        // Simulate sending message
        setTimeout(() => {
          // Hide modal
          contactSellerModal.hide()

          // Show success message
          const successToast = `
                        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div class="toast-header">
                                    <i class="fas fa-check-circle text-success me-2"></i>
                                    <strong class="me-auto">Message Sent</strong>
                                    <small>Just now</small>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                                <div class="toast-body">
                                    Your message has been sent to the seller. They will respond to you via email.
                                </div>
                            </div>
                        </div>
                    `

          // Append toast to body
          document.body.insertAdjacentHTML("beforeend", successToast)

          // Show toast
          const toast = new bootstrap.Toast(document.querySelector(".toast"))
          toast.show()

          // Remove modal from DOM after hiding
          document.getElementById("contactSellerModal").remove()
        }, 1500)
      })
    })
  }
})
