// Notifications Page JavaScript for AuctionHub

document.addEventListener("DOMContentLoaded", () => {
  // Filter notifications by type
  const allNotificationsBtn = document.getElementById("allNotificationsBtn")
  const biddingNotificationsBtn = document.getElementById("biddingNotificationsBtn")
  const sellingNotificationsBtn = document.getElementById("sellingNotificationsBtn")
  const accountNotificationsBtn = document.getElementById("accountNotificationsBtn")

  const notificationItems = document.querySelectorAll(".notification-item")

  if (
    allNotificationsBtn &&
    biddingNotificationsBtn &&
    sellingNotificationsBtn &&
    accountNotificationsBtn &&
    notificationItems.length > 0
  ) {
    // Show all notifications
    allNotificationsBtn.addEventListener("click", () => {
      // Update button states
      allNotificationsBtn.classList.add("active")
      biddingNotificationsBtn.classList.remove("active")
      sellingNotificationsBtn.classList.remove("active")
      accountNotificationsBtn.classList.remove("active")

      // Show all notifications
      notificationItems.forEach((item) => {
        item.style.display = ""
      })
    })

    // Show only bidding notifications
    biddingNotificationsBtn.addEventListener("click", () => {
      // Update button states
      allNotificationsBtn.classList.remove("active")
      biddingNotificationsBtn.classList.add("active")
      sellingNotificationsBtn.classList.remove("active")
      accountNotificationsBtn.classList.remove("active")

      // Filter notifications
      notificationItems.forEach((item) => {
        if (item.getAttribute("data-type") === "bidding") {
          item.style.display = ""
        } else {
          item.style.display = "none"
        }
      })
    })

    // Show only selling notifications
    sellingNotificationsBtn.addEventListener("click", () => {
      // Update button states
      allNotificationsBtn.classList.remove("active")
      biddingNotificationsBtn.classList.remove("active")
      sellingNotificationsBtn.classList.add("active")
      accountNotificationsBtn.classList.remove("active")

      // Filter notifications
      notificationItems.forEach((item) => {
        if (item.getAttribute("data-type") === "selling") {
          item.style.display = ""
        } else {
          item.style.display = "none"
        }
      })
    })

    // Show only account notifications
    accountNotificationsBtn.addEventListener("click", () => {
      // Update button states
      allNotificationsBtn.classList.remove("active")
      biddingNotificationsBtn.classList.remove("active")
      sellingNotificationsBtn.classList.remove("active")
      accountNotificationsBtn.classList.add("active")

      // Filter notifications
      notificationItems.forEach((item) => {
        if (item.getAttribute("data-type") === "account") {
          item.style.display = ""
        } else {
          item.style.display = "none"
        }
      })
    })
  }

  // Mark notifications as read
  const markReadBtns = document.querySelectorAll(".mark-read-btn")
  markReadBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const notificationItem = this.closest(".notification-item")
      if (notificationItem) {
        notificationItem.classList.remove("unread")
        this.remove()
      }
    })
  })

  // Mark all notifications as read
  const markAllReadBtn = document.getElementById("markAllReadBtn")
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener("click", () => {
      const unreadNotifications = document.querySelectorAll(".notification-item.unread")
      unreadNotifications.forEach((notification) => {
        notification.classList.remove("unread")
        const markReadBtn = notification.querySelector(".mark-read-btn")
        if (markReadBtn) {
          markReadBtn.remove()
        }
      })

      // Show success message
      const successToast = `
                <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header">
                            <i class="fas fa-check-circle text-success me-2"></i>
                            <strong class="me-auto">Success</strong>
                            <small>Just now</small>
                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                            All notifications have been marked as read.
                        </div>
                    </div>
                </div>
            `

      // Append toast to body
      document.body.insertAdjacentHTML("beforeend", successToast)

      // Show toast
      const toastEl = document.querySelector(".toast")
      const toast = new bootstrap.Toast(toastEl)
      toast.show()
    })
  }

  // Load more notifications
  const loadMoreBtn = document.getElementById("loadMoreBtn")
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      // Disable button and show loading state
      this.disabled = true
      this.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Loading...'

      // Simulate loading more notifications
      setTimeout(() => {
        // Create new notifications
        const newNotifications = `
                    <div class="notification-item" data-type="bidding">
                        <div class="notification-icon bg-primary">
                            <i class="fas fa-gavel"></i>
                        </div>
                        <div class="notification-content">
                            <div class="notification-header">
                                <h5 class="notification-title">New auction matching your interests</h5>
                                <span class="notification-time">1 week ago</span>
                            </div>
                            <p class="notification-text">A new auction for <a href="item.html">Vintage Polaroid Camera</a> has been listed that matches your interests.</p>
                            <div class="notification-actions">
                                <a href="item.html" class="btn btn-sm btn-primary">View Auction</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="notification-item" data-type="account">
                        <div class="notification-icon bg-success">
                            <i class="fas fa-gift"></i>
                        </div>
                        <div class="notification-content">
                            <div class="notification-header">
                                <h5 class="notification-title">Special offer</h5>
                                <span class="notification-time">1 week ago</span>
                            </div>
                            <p class="notification-text">Enjoy reduced seller fees this weekend! List your items before Sunday to take advantage of this offer.</p>
                            <div class="notification-actions">
                                <a href="sell.html" class="btn btn-sm btn-primary">Sell an Item</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="notification-item" data-type="selling">
                        <div class="notification-icon bg-info">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="notification-content">
                            <div class="notification-header">
                                <h5 class="notification-title">Price trend alert</h5>
                                <span class="notification-time">2 weeks ago</span>
                            </div>
                            <p class="notification-text">Vintage cameras like yours are trending higher in price. Consider listing your items now.</p>
                            <div class="notification-actions">
                                <a href="sell.html" class="btn btn-sm btn-primary">List an Item</a>
                            </div>
                        </div>
                    </div>
                `

        // Add new notifications to the list
        const notificationsList = document.querySelector(".notifications-list")
        notificationsList.insertAdjacentHTML("beforeend", newNotifications)

        // Reset button
        this.disabled = false
        this.innerHTML = '<i class="fas fa-sync-alt me-1"></i> Load More'

        // Apply current filter
        const activeFilterBtn = document.querySelector('.btn-group [role="group"] .active')
        if (activeFilterBtn) {
          activeFilterBtn.click()
        }
      }, 1500)
    })
  }

  // Notification Settings Form
  const notificationSettingsForm = document.getElementById("notificationSettingsForm")
  if (notificationSettingsForm) {
    notificationSettingsForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Disable submit button and show loading state
      const submitBtn = this.querySelector('button[type="submit"]')
      submitBtn.disabled = true
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Saving...'

      // Simulate saving settings
      setTimeout(() => {
        // Reset button
        submitBtn.disabled = false
        submitBtn.innerHTML = "Save Settings"

        // Show success message
        const successAlert = document.createElement("div")
        successAlert.className = "alert alert-success alert-dismissible fade show mt-3"
        successAlert.innerHTML = `
                    <i class="fas fa-check-circle me-2"></i>
                    Notification settings have been saved successfully.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `

        // Add success message to form
        notificationSettingsForm.appendChild(successAlert)

        // Scroll to success message
        successAlert.scrollIntoView({ behavior: "smooth" })

        // Remove success message after 5 seconds
        setTimeout(() => {
          successAlert.remove()
        }, 5000)
      }, 1500)
    })
  }
})
