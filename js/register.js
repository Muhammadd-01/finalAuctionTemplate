// Register Page JavaScript for AuctionHub

document.addEventListener("DOMContentLoaded", () => {
  // Register Form Submission
  const registerForm = document.getElementById("registerForm")
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const firstNameInput = document.getElementById("firstNameInput")
      const lastNameInput = document.getElementById("lastNameInput")
      const usernameInput = document.getElementById("usernameInput")
      const emailInput = document.getElementById("emailInput")
      const passwordInput = document.getElementById("passwordInput")
      const confirmPasswordInput = document.getElementById("confirmPasswordInput")
      const termsCheck = document.getElementById("termsCheck")

      const firstName = firstNameInput.value.trim()
      const lastName = lastNameInput.value.trim()
      const username = usernameInput.value.trim()
      const email = emailInput.value.trim()
      const password = passwordInput.value.trim()
      const confirmPassword = confirmPasswordInput.value.trim()

      // Simple validation
      let isValid = true

      if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
        isValid = false
      }

      if (password !== confirmPassword) {
        confirmPasswordInput.classList.add("is-invalid")
        isValid = false
      } else {
        confirmPasswordInput.classList.remove("is-invalid")
      }

      if (!termsCheck.checked) {
        termsCheck.classList.add("is-invalid")
        isValid = false
      } else {
        termsCheck.classList.remove("is-invalid")
      }

      if (!isValid) {
        // Shake effect for error
        registerForm.classList.add("shake")
        setTimeout(() => {
          registerForm.classList.remove("shake")
        }, 500)
        return
      }

      // Simulate registration process
      const registerBtn = this.querySelector(".register-btn")
      registerBtn.disabled = true
      registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Creating Account...'

      // Simulate API call
      setTimeout(() => {
        // Successful registration
        // Redirect to success page or show success message

        // Create success message
        const successMessage = document.createElement("div")
        successMessage.className = "alert alert-success mt-3"
        successMessage.innerHTML = `
                    <h4 class="alert-heading"><i class="fas fa-check-circle me-2"></i>Registration Successful!</h4>
                    <p>Your account has been created successfully. You will be redirected to the login page in a few seconds.</p>
                `

        // Replace form with success message
        registerForm.parentNode.replaceChild(successMessage, registerForm)

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          window.location.href = "login.html"
        }, 3000)
      }, 2000)
    })
  }

  // Password Strength Meter
  const passwordInput = document.getElementById("passwordInput")
  const passwordStrength = document.getElementById("passwordStrength")
  const passwordProgress = document.querySelector(".password-strength .progress-bar")

  if (passwordInput && passwordStrength && passwordProgress) {
    passwordInput.addEventListener("input", function () {
      const password = this.value
      let strength = 0
      let status = ""

      // Check password length
      if (password.length >= 8) {
        strength += 25
      }

      // Check for lowercase letters
      if (password.match(/[a-z]/)) {
        strength += 25
      }

      // Check for uppercase letters
      if (password.match(/[A-Z]/)) {
        strength += 25
      }

      // Check for numbers or special characters
      if (password.match(/[0-9]/) || password.match(/[^a-zA-Z0-9]/)) {
        strength += 25
      }

      // Update progress bar
      passwordProgress.style.width = strength + "%"

      // Update strength text and progress bar color
      if (strength <= 25) {
        status = "Weak"
        passwordProgress.className = "progress-bar bg-danger"
      } else if (strength <= 50) {
        status = "Fair"
        passwordProgress.className = "progress-bar bg-warning"
      } else if (strength <= 75) {
        status = "Good"
        passwordProgress.className = "progress-bar bg-info"
      } else {
        status = "Strong"
        passwordProgress.className = "progress-bar bg-success"
      }

      // Update strength text
      passwordStrength.textContent = status
    })
  }

  // Username Availability Check
  const usernameInput = document.getElementById("usernameInput")
  if (usernameInput) {
    usernameInput.addEventListener("blur", function () {
      const username = this.value.trim()

      if (username.length < 3) {
        return
      }

      // Simulate checking username availability
      this.classList.add("is-loading")

      // Simulate API call
      setTimeout(() => {
        this.classList.remove("is-loading")

        // For demo purposes, consider some usernames as taken
        const takenUsernames = ["admin", "user", "test", "johndoe", "janedoe"]

        if (takenUsernames.includes(username.toLowerCase())) {
          this.classList.add("is-invalid")
        } else {
          this.classList.remove("is-invalid")
          this.classList.add("is-valid")
        }
      }, 1000)
    })
  }

  // Social Register Buttons
  const socialButtons = document.querySelectorAll(".social-btn")
  socialButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      // Disable button and show loading state
      this.disabled = true
      const originalContent = this.innerHTML
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'

      // Simulate social registration
      setTimeout(() => {
        // Reset button
        this.disabled = false
        this.innerHTML = originalContent

        // Show message
        const message = document.createElement("div")
        message.className = "alert alert-info mt-3"
        message.innerHTML = '<i class="fas fa-info-circle me-2"></i> Social registration is not available in this demo.'

        registerForm.before(message)

        // Remove message after 3 seconds
        setTimeout(() => {
          message.remove()
        }, 3000)
      }, 1500)
    })
  })

  // Confirm Password Validation
  const confirmPasswordInput = document.getElementById("confirmPasswordInput")
  if (passwordInput && confirmPasswordInput) {
    confirmPasswordInput.addEventListener("input", function () {
      if (passwordInput.value !== this.value) {
        this.classList.add("is-invalid")
      } else {
        this.classList.remove("is-invalid")
        this.classList.add("is-valid")
      }
    })
  }
})
