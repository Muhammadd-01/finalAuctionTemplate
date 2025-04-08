// Sell Page JavaScript for AuctionHub

document.addEventListener("DOMContentLoaded", () => {
  // Sell Form Submission
  const sellForm = document.getElementById("sellForm")
  if (sellForm) {
    sellForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form values
      const itemTitle = document.getElementById("itemTitle").value.trim()
      const itemCategory = document.getElementById("itemCategory").value
      const itemDescription = document.getElementById("itemDescription").value.trim()
      const itemCondition = document.querySelector('input[name="itemCondition"]:checked')?.value
      const startingBid = document.getElementById("startingBid").value
      const reservePrice = document.getElementById("reservePrice").value
      const bidIncrement = document.getElementById("bidIncrement").value
      const auctionEnd = document.getElementById("auctionEnd").value
      const termsCheck = document.getElementById("termsCheck").checked

      // Simple validation
      let isValid = true

      if (
        !itemTitle ||
        !itemCategory ||
        !itemDescription ||
        !itemCondition ||
        !startingBid ||
        !bidIncrement ||
        !auctionEnd
      ) {
        isValid = false
      }

      if (!termsCheck) {
        document.getElementById("termsCheck").classList.add("is-invalid")
        isValid = false
      } else {
        document.getElementById("termsCheck").classList.remove("is-invalid")
      }

      // Check if images are uploaded
      const itemImages = document.getElementById("itemImages")
      if (itemImages.files.length === 0) {
        itemImages.classList.add("is-invalid")
        isValid = false
      } else {
        itemImages.classList.remove("is-invalid")
      }

      if (!isValid) {
        // Show error message
        const errorAlert = document.createElement("div")
        errorAlert.className = "alert alert-danger alert-dismissible fade show mt-3"
        errorAlert.innerHTML = `
                    <i class="fas fa-exclamation-circle me-2"></i>
                    Please fill in all required fields.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `

        sellForm.prepend(errorAlert)

        // Scroll to top of form
        sellForm.scrollIntoView({ behavior: "smooth" })

        return
      }

      // Simulate form submission
      const submitBtn = this.querySelector(".submit-btn")
      submitBtn.disabled = true
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Listing Item...'

      // Simulate API call
      setTimeout(() => {
        // Create success message
        const successMessage = document.createElement("div")
        successMessage.className = "alert alert-success mt-3"
        successMessage.innerHTML = `
                    <h4 class="alert-heading"><i class="fas fa-check-circle me-2"></i>Item Listed Successfully!</h4>
                    <p>Your item "${itemTitle}" has been listed for auction. You will be redirected to view your listing in a few seconds.</p>
                `

        // Replace form with success message
        sellForm.parentNode.replaceChild(successMessage, sellForm)

        // Redirect to item page after 3 seconds
        setTimeout(() => {
          window.location.href = "item.html"
        }, 3000)
      }, 2000)
    })
  }

  // Image Upload Preview
  const itemImages = document.getElementById("itemImages")
  const imagePreviewContainer = document.getElementById("imagePreviewContainer")

  if (itemImages && imagePreviewContainer) {
    itemImages.addEventListener("change", function () {
      // Clear previous previews
      imagePreviewContainer.innerHTML = ""

      // Check if files are selected
      if (this.files.length === 0) {
        return
      }

      // Limit to 5 images
      const maxImages = 5
      const filesToPreview = Array.from(this.files).slice(0, maxImages)

      // Create previews
      filesToPreview.forEach((file, index) => {
        // Check if file is an image
        if (!file.type.startsWith("image/")) {
          return
        }

        // Create preview element
        const preview = document.createElement("div")
        preview.className = "image-preview"

        // Create image element
        const img = document.createElement("img")
        img.file = file
        preview.appendChild(img)

        // Create remove button
        const removeBtn = document.createElement("div")
        removeBtn.className = "remove-image"
        removeBtn.innerHTML = '<i class="fas fa-times"></i>'
        removeBtn.addEventListener("click", () => {
          preview.remove()
        })
        preview.appendChild(removeBtn)

        // Add main image badge for first image
        if (index === 0) {
          const mainBadge = document.createElement("div")
          mainBadge.className = "main-image-badge"
          mainBadge.textContent = "Main"
          preview.appendChild(mainBadge)
        }

        // Add preview to container
        imagePreviewContainer.appendChild(preview)

        // Read file and set image source
        const reader = new FileReader()
        reader.onload = ((aImg) => (e) => {
          aImg.src = e.target.result
        })(img)
        reader.readAsDataURL(file)
      })

      // Show message if more than 5 images were selected
      if (this.files.length > maxImages) {
        const message = document.createElement("div")
        message.className = "alert alert-info mt-2"
        message.innerHTML = `<i class="fas fa-info-circle me-2"></i> Only the first ${maxImages} images will be used.`
        imagePreviewContainer.appendChild(message)
      }
    })
  }

  // Date-Time Picker Initialization
  const auctionEnd = document.getElementById("auctionEnd")
  if (auctionEnd) {
    // Set minimum date to tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    const tomorrowFormatted = tomorrow.toISOString().slice(0, 16)
    auctionEnd.min = tomorrowFormatted

    // Set default value to 7 days from now
    const defaultEnd = new Date()
    defaultEnd.setDate(defaultEnd.getDate() + 7)
    defaultEnd.setHours(12, 0, 0, 0)

    const defaultEndFormatted = defaultEnd.toISOString().slice(0, 16)
    auctionEnd.value = defaultEndFormatted
  }

  // Shipping Options Toggle
  const domesticShipping = document.getElementById("domesticShipping")
  const internationalShipping = document.getElementById("internationalShipping")
  const localPickup = document.getElementById("localPickup")
  const shippingCost = document.getElementById("shippingCost")

  if (domesticShipping && internationalShipping && localPickup && shippingCost) {
    // Function to update shipping cost field state
    function updateShippingCostState() {
      if (domesticShipping.checked || internationalShipping.checked) {
        shippingCost.disabled = false
        shippingCost.required = true
      } else {
        shippingCost.disabled = true
        shippingCost.required = false
        shippingCost.value = ""
      }
    }

    // Initial state
    updateShippingCostState()

    // Add event listeners
    domesticShipping.addEventListener("change", updateShippingCostState)
    internationalShipping.addEventListener("change", updateShippingCostState)

    // If only local pickup is selected, disable shipping cost
    localPickup.addEventListener("change", function () {
      if (this.checked && !domesticShipping.checked && !internationalShipping.checked) {
        shippingCost.disabled = true
        shippingCost.required = false
        shippingCost.value = ""
      } else {
        updateShippingCostState()
      }
    })
  }

  // Reserve Price Toggle
  const reservePrice = document.getElementById("reservePrice")
  if (reservePrice) {
    // Add tooltip explaining reserve price
    const reservePriceLabel = document.querySelector('label[for="reservePrice"]')
    if (reservePriceLabel) {
      reservePriceLabel.innerHTML +=
        ' <i class="fas fa-info-circle" data-bs-toggle="tooltip" title="A reserve price is the minimum amount you are willing to accept for your item. If the bidding doesn\'t reach this amount, you are not obligated to sell."></i>'

      // Initialize tooltip
      const tooltipTrigger = reservePriceLabel.querySelector("i")
      if (tooltipTrigger) {
        new bootstrap.Tooltip(tooltipTrigger)
      }
    }
  }
})
