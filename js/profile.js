// Profile Page JavaScript for AuctionHub

document.addEventListener("DOMContentLoaded", () => {
  // Edit Profile Button
  const editProfileBtn = document.querySelector(".edit-profile-btn")
  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", (e) => {
      e.preventDefault()

      // Activate settings tab
      const settingsTab = document.getElementById("settings-tab")
      if (settingsTab) {
        settingsTab.click()
      }
    })
  }

  // Edit Avatar Button
  const editAvatarBtn = document.querySelector(".edit-avatar-btn")
  if (editAvatarBtn) {
    editAvatarBtn.addEventListener("click", (e) => {
      e.preventDefault()

      // Create file input
      const fileInput = document.createElement("input")
      fileInput.type = "file"
      fileInput.accept = "image/*"
      fileInput.style.display = "none"
      document.body.appendChild(fileInput)

      // Trigger file input click
      fileInput.click()

      // Handle file selection
      fileInput.addEventListener("change", function () {
        if (this.files && this.files[0]) {
          const reader = new FileReader()

          reader.onload = (e) => {
            // Update avatar image
            const avatarImg = document.querySelector(".profile-avatar img")
            if (avatarImg) {
              avatarImg.src = e.target.result
            }

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
                                        Profile picture updated successfully.
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
          }

          reader.readAsDataURL(this.files[0])
        }

        // Remove file input
        document.body.removeChild(fileInput)
      })
    })
  }

  // Personal Info Form
  const personalInfoForm = document.getElementById("personalInfoForm")
  if (personalInfoForm) {
    personalInfoForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Disable submit button and show loading state
      const submitBtn = this.querySelector('button[type="submit"]')
      submitBtn.disabled = true
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Saving...'

      // Simulate saving settings
      setTimeout(() => {
        // Reset button
        submitBtn.disabled = false
        submitBtn.innerHTML = "Save Changes"

        // Show success message
        const successAlert = document.createElement("div")
        successAlert.className = "alert alert-success alert-dismissible fade show mt-3"
        successAlert.innerHTML = `
                    <i class="fas fa-check-circle me-2"></i>
                    Personal information has been updated successfully.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `

        // Add success message to form
        personalInfoForm.appendChild(successAlert)

        // Update profile name and bio
        const profileName = document.querySelector(".profile-name")
        const profileBio = document.querySelector(".profile-bio")

        if (profileName) {
          profileName.textContent = document.getElementById("fullName").value
        }

        if (profileBio) {
          profileBio.textContent = document.getElementById("bio").value
        }

        // Update location in profile meta
        const locationBadge = document.querySelector(".profile-meta .badge:nth-child(2)")
        if (locationBadge) {
          locationBadge.textContent = "Location: " + document.getElementById("location").value
        }

        // Scroll to success message
        successAlert.scrollIntoView({ behavior: "smooth" })

        // Remove success message after 5 seconds
        setTimeout(() => {
          successAlert.remove()
        }, 5000)
      }, 1500)
    })
  }

  // Password Form
  const passwordForm = document.getElementById("passwordForm")
  if (passwordForm) {
    passwordForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const currentPassword = document.getElementById("currentPassword").value
      const newPassword = document.getElementById("newPassword").value
      const confirmPassword = document.getElementById("confirmPassword").value

      // Simple validation
      if (!currentPassword || !newPassword || !confirmPassword) {
        return
      }

      if (newPassword !== confirmPassword) {
        // Show error message
        const errorAlert = document.createElement("div")
        errorAlert.className = "alert alert-danger alert-dismissible fade show mt-3"
        errorAlert.innerHTML = `
                    <i class="fas fa-exclamation-circle me-2"></i>
                    New password and confirm password do not match.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `

        // Remove any existing error messages
        const existingError = passwordForm.querySelector(".alert-danger")
        if (existingError) {
          existingError.remove()
        }

        passwordForm.appendChild(errorAlert)
        return
      }

      // Disable submit button and show loading state
      const submitBtn = this.querySelector('button[type="submit"]')
      submitBtn.disabled = true
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Updating...'

      // Simulate saving settings
      setTimeout(() => {
        // Reset button
        submitBtn.disabled = false
        submitBtn.innerHTML = "Update Password"

        // Reset form
        passwordForm.reset()

        // Show success message
        const successAlert = document.createElement("div")
        successAlert.className = "alert alert-success alert-dismissible fade show mt-3"
        successAlert.innerHTML = `
                    <i class="fas fa-check-circle me-2"></i>
                    Password has been updated successfully.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `

        // Add success message to form
        passwordForm.appendChild(successAlert)

        // Scroll to success message
        successAlert.scrollIntoView({ behavior: "smooth" })

        // Remove success message after 5 seconds
        setTimeout(() => {
          successAlert.remove()
        }, 5000)
      }, 1500)
    })
  }

  // Watchlist Item Remove Buttons
  const removeWatchBtns = document.querySelectorAll(".remove-watch-btn")
  removeWatchBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const watchlistItem = this.closest(".col-md-4")
      if (watchlistItem) {
        // Add fade-out animation
        watchlistItem.style.transition = "opacity 0.3s ease"
        watchlistItem.style.opacity = "0"

        // Remove item after animation
        setTimeout(() => {
          watchlistItem.remove()

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
                                    Item removed from watchlist.
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
        }, 300)
      }
    })
  })

  // Listings Tabs
  const listingsTabs = document.getElementById("listingsTabs")
  if (listingsTabs) {
    const pills = listingsTabs.querySelectorAll(".nav-link")
    pills.forEach((pill) => {
      pill.addEventListener("click", function () {
        // Update active state
        pills.forEach((p) => p.classList.remove("active"))
        this.classList.add("active")

        // Show corresponding tab content
        const tabId = this.getAttribute("data-bs-target").substring(1)
        const tabContent = document.getElementById(tabId)

        if (tabContent) {
          // Hide all tab contents
          const allTabContents = document.querySelectorAll("#listingsTabsContent .tab-pane")
          allTabContents.forEach((content) => {
            content.classList.remove("show", "active")
          })

          // Show selected tab content
          tabContent.classList.add("show", "active")
        }
      })
    })
  }

  // Bids Tabs
  const bidsTabs = document.getElementById("bidsTabs")
  if (bidsTabs) {
    const pills = bidsTabs.querySelectorAll(".nav-link")
    pills.forEach((pill) => {
      pill.addEventListener("click", function () {
        // Update active state
        pills.forEach((p) => p.classList.remove("active"))
        this.classList.add("active")

        // Show corresponding tab content
        const tabId = this.getAttribute("data-bs-target").substring(1)
        const tabContent = document.getElementById(tabId)

        if (tabContent) {
          // Hide all tab contents
          const allTabContents = document.querySelectorAll("#bidsTabsContent .tab-pane")
          allTabContents.forEach((content) => {
            content.classList.remove("show", "active")
          })

          // Show selected tab content
          tabContent.classList.add("show", "active")
        }
      })
    })
  }

  // Feedback Tabs
  const feedbackTabs = document.getElementById("feedbackTabs")
  if (feedbackTabs) {
    const pills = feedbackTabs.querySelectorAll(".nav-link")
    pills.forEach((pill) => {
      pill.addEventListener("click", function () {
        // Update active state
        pills.forEach((p) => p.classList.remove("active"))
        this.classList.add("active")

        // Show corresponding tab content
        const tabId = this.getAttribute("data-bs-target").substring(1)
        const tabContent = document.getElementById(tabId)

        if (tabContent) {
          // Hide all tab contents
          const allTabContents = document.querySelectorAll("#feedbackTabsContent .tab-pane")
          allTabContents.forEach((content) => {
            content.classList.remove("show", "active")
          })

          // Show selected tab content
          tabContent.classList.add("show", "active")
        }
      })
    })
  }
})
