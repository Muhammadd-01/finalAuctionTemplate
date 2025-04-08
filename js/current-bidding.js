// Current Bidding Page JavaScript for AuctionHub

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Bootstrap (if not already initialized)
  const bootstrap = window.bootstrap

  // Tab switching functionality
  const activeBidsBtn = document.getElementById("activeBidsBtn")
  const wonBidsBtn = document.getElementById("wonBidsBtn")
  const lostBidsBtn = document.getElementById("lostBidsBtn")

  const activeBidsSection = document.getElementById("activeBidsSection")
  const wonBidsSection = document.getElementById("wonBidsSection")
  const lostBidsSection = document.getElementById("lostBidsSection")

  if (activeBidsBtn && wonBidsBtn && lostBidsBtn && activeBidsSection && wonBidsSection && lostBidsSection) {
    activeBidsBtn.addEventListener("click", () => {
      // Update button states
      activeBidsBtn.classList.add("active")
      wonBidsBtn.classList.remove("active")
      lostBidsBtn.classList.remove("active")

      // Show/hide sections
      activeBidsSection.classList.remove("d-none")
      wonBidsSection.classList.add("d-none")
      lostBidsSection.classList.add("d-none")
    })

    wonBidsBtn.addEventListener("click", () => {
      // Update button states
      activeBidsBtn.classList.remove("active")
      wonBidsBtn.classList.add("active")
      lostBidsBtn.classList.remove("active")

      // Show/hide sections
      activeBidsSection.classList.add("d-none")
      wonBidsSection.classList.remove("d-none")
      lostBidsSection.classList.add("d-none")
    })

    lostBidsBtn.addEventListener("click", () => {
      // Update button states
      activeBidsBtn.classList.remove("active")
      wonBidsBtn.classList.remove("active")
      lostBidsBtn.classList.add("active")

      // Show/hide sections
      activeBidsSection.classList.add("d-none")
      wonBidsSection.classList.add("d-none")
      lostBidsSection.classList.remove("d-none")
    })
  }

  // Increase Bid Modal Functionality
  const increaseBidModal = document.getElementById("increaseBidModal")
  if (increaseBidModal) {
    increaseBidModal.addEventListener("show.bs.modal", function (event) {
      // Get the button that triggered the modal
      const button = event.relatedTarget

      // Extract info from data attributes if needed
      // For demo, we'll use hardcoded values
      const currentBid = 1250
      const minBid = currentBid + 25

      // Update modal content
      const currentBidAmount = this.querySelector("#currentBidAmount")
      const newBidAmount = this.querySelector("#newBidAmount")

      if (currentBidAmount) {
        currentBidAmount.value = currentBid.toLocaleString("en-US", { minimumFractionDigits: 2 })
      }

      if (newBidAmount) {
        newBidAmount.min = minBid
        newBidAmount.value = minBid

        // Update form text
        const formText = newBidAmount.nextElementSibling
        if (formText) {
          formText.textContent = `Enter an amount greater than $${minBid.toLocaleString("en-US", { minimumFractionDigits: 2 })} (current bid + $25.00)`
        }
      }
    })

    // Handle increase bid button
    const increaseBidBtn = increaseBidModal.querySelector(".modal-footer .btn-primary")
    if (increaseBidBtn) {
      increaseBidBtn.addEventListener("click", function () {
        const newBidAmount = document.getElementById("newBidAmount").value
        const minBid = 1275 // Current bid + increment

        if (!newBidAmount || Number.parseFloat(newBidAmount) < minBid) {
          return
        }

        // Disable button and show loading state
        this.disabled = true
        this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...'

        // Simulate API call
        setTimeout(() => {
          // Hide modal
          const modal = bootstrap.Modal.getInstance(increaseBidModal)
          modal.hide()

          // Show success message
          const successAlert = document.createElement("div")
          successAlert.className = "alert alert-success alert-dismissible fade show"
          successAlert.innerHTML = `
                        <i class="fas fa-check-circle me-2"></i>
                        Your bid has been increased to $${Number.parseFloat(newBidAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    `

          // Add success message to page
          const container = document.querySelector(".container")
          container.insertBefore(successAlert, container.firstChild)

          // Reset button
          this.disabled = false
          this.innerHTML = "Increase Bid"

          // Update bid amount in table
          const bidRow = document.querySelector("tr:first-child")
          if (bidRow) {
            const bidAmountCell = bidRow.querySelector("td:nth-child(2)")
            const currentBidCell = bidRow.querySelector("td:nth-child(3)")

            if (bidAmountCell && currentBidCell) {
              bidAmountCell.textContent = `$${Number.parseFloat(newBidAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
              currentBidCell.textContent = `$${Number.parseFloat(newBidAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
            }
          }

          // Scroll to top of page
          window.scrollTo({ top: 0, behavior: "smooth" })
        }, 1500)
      })
    }
  }

  // Bid Again Modal Functionality
  const bidAgainModal = document.getElementById("bidAgainModal")
  if (bidAgainModal) {
    bidAgainModal.addEventListener("show.bs.modal", function (event) {
      // Get the button that triggered the modal
      const button = event.relatedTarget

      // Extract info from data attributes if needed
      // For demo, we'll use hardcoded values
      const currentBid = 5200
      const yourLastBid = 5100
      const minBid = currentBid + 100

      // Update modal content
      const outbidAmount = this.querySelector("#outbidAmount")
      const yourLastBidInput = this.querySelector("#yourLastBid")
      const newOutbidAmount = this.querySelector("#newOutbidAmount")

      if (outbidAmount) {
        outbidAmount.value = currentBid.toLocaleString("en-US", { minimumFractionDigits: 2 })
      }

      if (yourLastBidInput) {
        yourLastBidInput.value = yourLastBid.toLocaleString("en-US", { minimumFractionDigits: 2 })
      }

      if (newOutbidAmount) {
        newOutbidAmount.min = minBid
        newOutbidAmount.value = minBid

        // Update form text
        const formText = newOutbidAmount.nextElementSibling
        if (formText) {
          formText.textContent = `Enter an amount greater than $${minBid.toLocaleString("en-US", { minimumFractionDigits: 2 })} (current bid + $100.00)`
        }
      }
    })

    // Handle bid again button
    const bidAgainBtn = bidAgainModal.querySelector(".modal-footer .btn-primary")
    if (bidAgainBtn) {
      bidAgainBtn.addEventListener("click", function () {
        const newBidAmount = document.getElementById("newOutbidAmount").value
        const minBid = 5300 // Current bid + increment

        if (!newBidAmount || Number.parseFloat(newBidAmount) < minBid) {
          return
        }

        // Disable button and show loading state
        this.disabled = true
        this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...'

        // Simulate API call
        setTimeout(() => {
          // Hide modal
          const modal = bootstrap.Modal.getInstance(bidAgainModal)
          modal.hide()

          // Show success message
          const successAlert = document.createElement("div")
          successAlert.className = "alert alert-success alert-dismissible fade show"
          successAlert.innerHTML = `
                        <i class="fas fa-check-circle me-2"></i>
                        Your bid of $${Number.parseFloat(newBidAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })} has been placed.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    `

          // Add success message to page
          const container = document.querySelector(".container")
          container.insertBefore(successAlert, container.firstChild)

          // Reset button
          this.disabled = false
          this.innerHTML = "Place Bid"

          // Update bid status in table
          const bidRow = document.querySelector(".outbid-table tr:first-child")
          if (bidRow) {
            // Move row to highest bidder table
            const highestBidderTable = document.querySelector(".bidding-table:not(.outbid-table) tbody")
            if (highestBidderTable) {
              const newRow = bidRow.cloneNode(true)

              // Update bid amount and status
              const bidAmountCell = newRow.querySelector("td:nth-child(2)")
              const currentBidCell = newRow.querySelector("td:nth-child(3)")
              const statusCell = newRow.querySelector("td:nth-child(4)")
              const actionsCell = newRow.querySelector("td:nth-child(6)")

              if (bidAmountCell && currentBidCell) {
                bidAmountCell.textContent = `$${Number.parseFloat(newBidAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                currentBidCell.textContent = `$${Number.parseFloat(newBidAmount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
              }

              if (statusCell) {
                statusCell.innerHTML = '<span class="badge bg-success">Highest Bidder</span>'
              }

              if (actionsCell) {
                actionsCell.innerHTML = `
                                    <div class="btn-group btn-group-sm" role="group">
                                        <a href="item.html" class="btn btn-outline-primary">View</a>
                                        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#increaseBidModal">Increase</button>
                                    </div>
                                `
              }

              highestBidderTable.insertBefore(newRow, highestBidderTable.firstChild)

              // Remove row from outbid table
              bidRow.remove()
            }
          }

          // Scroll to top of page
          window.scrollTo({ top: 0, behavior: "smooth" })
        }, 1500)
      })
    }
  }
})
