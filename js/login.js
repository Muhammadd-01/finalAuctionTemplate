// Login Page JavaScript for AuctionHub

document.addEventListener("DOMContentLoaded", () => {
  // Login Form Submission
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const emailInput = document.getElementById("emailInput")
      const passwordInput = document.getElementById("passwordInput")
      const loginError = document.getElementById("loginError")

      const email = emailInput.value.trim()
      const password = passwordInput.value.trim()

      // Simple validation
      if (!email || !password) {
        loginError.classList.remove("d-none")
        return
      }

      // Hide error message
      loginError.classList.add("d-none")

      // Simulate login process
      const loginBtn = this.querySelector(".login-btn")
      loginBtn.disabled = true
      loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Logging in...'

      // Simulate API call
      setTimeout(() => {
        // For demo purposes, check for a demo account
        if (email === "demo@example.com" && password === "password") {
          // Successful login
          window.location.href = "index.html"
        } else {
          // Failed login
          loginError.classList.remove("d-none")
          loginBtn.disabled = false
          loginBtn.innerHTML = '<i class="fas fa-sign-in-alt me-2"></i>Login'

          // Shake effect for error
          loginForm.classList.add("shake")
          setTimeout(() => {
            loginForm.classList.remove("shake")
          }, 500)
        }
      }, 1500)
    })
  }

  // Remember Me Checkbox
  const rememberMeCheckbox = document.getElementById("rememberMe")
  if (rememberMeCheckbox) {
    // Check if there's a saved email
    const savedEmail = localStorage.getItem("rememberedEmail")
    if (savedEmail) {
      document.getElementById("emailInput").value = savedEmail
      rememberMeCheckbox.checked = true
    }

    rememberMeCheckbox.addEventListener("change", function () {
      if (this.checked) {
        const email = document.getElementById("emailInput").value.trim()
        if (email) {
          localStorage.setItem("rememberedEmail", email)
        }
      } else {
        localStorage.removeItem("rememberedEmail")
      }
    })
  }

  // Social Login Buttons
  const socialButtons = document.querySelectorAll(".social-btn")
  socialButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      // Disable button and show loading state
      this.disabled = true
      const originalContent = this.innerHTML
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'

      // Simulate social login
      setTimeout(() => {
        // Reset button
        this.disabled = false
        this.innerHTML = originalContent

        // Show message
        const message = document.createElement("div")
        message.className = "alert alert-info mt-3"
        message.innerHTML = '<i class="fas fa-info-circle me-2"></i> Social login is not available in this demo.'

        loginForm.before(message)

        // Remove message after 3 seconds
        setTimeout(() => {
          message.remove()
        }, 3000)
      }, 1500)
    })
  })

  // Forgot Password Link
  const forgotPasswordLink = document.querySelector(".forgot-password")
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault()

      // Create modal dynamically
      const modalHTML = `
                <div class="modal fade" id="forgotPasswordModal" tabindex="-1" aria-labelledby="forgotPasswordModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="forgotPasswordModalLabel">Reset Password</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>Enter your email address and we'll send you a link to reset your password.</p>
                                <form id="resetPasswordForm">
                                    <div class="mb-3">
                                        <label for="resetEmail" class="form-label">Email address</label>
                                        <input type="email" class="form-control" id="resetEmail" required>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary" id="sendResetLinkBtn">Send Reset Link</button>
                            </div>
                        </div>
                    </div>
                </div>
            `

      // Append modal to body
      document.body.insertAdjacentHTML("beforeend", modalHTML)

      // Show modal
      const forgotPasswordModalElement = document.getElementById("forgotPasswordModal")
      const forgotPasswordModal = new bootstrap.Modal(forgotPasswordModalElement)
      forgotPasswordModal.show()

      // Handle reset link button
      const sendResetLinkBtn = document.getElementById("sendResetLinkBtn")
      sendResetLinkBtn.addEventListener("click", function () {
        const resetEmail = document.getElementById("resetEmail").value.trim()

        if (!resetEmail) {
          return
        }

        // Disable button and show loading state
        this.disabled = true
        this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...'

        // Simulate sending reset link
        setTimeout(() => {
          // Hide modal
          forgotPasswordModal.hide()

          // Show success message
          const successMessage = document.createElement("div")
          successMessage.className = "alert alert-success mt-3"
          successMessage.innerHTML = `<i class="fas fa-check-circle me-2"></i> Password reset link has been sent to ${resetEmail}.`

          loginForm.before(successMessage)

          // Remove modal from DOM after hiding
          document.getElementById("forgotPasswordModal").remove()

          // Remove success message after 5 seconds
          setTimeout(() => {
            successMessage.remove()
          }, 5000)
        }, 1500)
      })
    })
  }
})
