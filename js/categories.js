// Categories Pages JavaScript for AuctionHub

document.addEventListener("DOMContentLoaded", () => {
  // Filter functionality
  const sortOptions = document.getElementById("sortOptions")
  const categorySearch = document.getElementById("categorySearch")
  const priceRange = document.getElementById("priceRange")

  // Get category-specific filter elements
  const bookType = document.getElementById("bookType")
  const furnitureType = document.getElementById("furnitureType")
  const electronicsType = document.getElementById("electronicsType")
  const condition = document.getElementById("condition")
  const era = document.getElementById("era")

  // Get container elements
  const booksContainer = document.getElementById("booksContainer")
  const furnitureContainer = document.getElementById("furnitureContainer")
  const electronicsContainer = document.getElementById("electronicsContainer")

  // Function to apply filters
  function applyFilters(container) {
    if (!container) return

    const items = container.querySelectorAll(".item-card")
    let visibleCount = 0

    items.forEach((item) => {
      let shouldShow = true

      // Apply search filter
      if (categorySearch && categorySearch.value.trim() !== "") {
        const searchTerm = categorySearch.value.toLowerCase().trim()
        const itemTitle = item.querySelector(".card-title").textContent.toLowerCase()
        const itemDesc = item.querySelector(".card-text").textContent.toLowerCase()

        if (!itemTitle.includes(searchTerm) && !itemDesc.includes(searchTerm)) {
          shouldShow = false
        }
      }

      // Apply price range filter
      if (priceRange && priceRange.value !== "all") {
        const priceText = item.querySelector(".current-bid").textContent
        const price = Number.parseFloat(priceText.replace(/[^0-9.-]+/g, ""))

        const [minPrice, maxPrice] = priceRange.value
          .split("-")
          .map((p) => (p === "+" ? Number.POSITIVE_INFINITY : Number.parseFloat(p)))

        if (price < minPrice || (maxPrice !== Number.POSITIVE_INFINITY && price > maxPrice)) {
          shouldShow = false
        }
      }

      // Apply category-specific filters
      if (bookType && container === booksContainer && bookType.value !== "all") {
        // This would need data attributes on the items for real implementation
        // For demo, we'll just show/hide randomly
        if (Math.random() > 0.7) {
          shouldShow = false
        }
      }

      if (furnitureType && container === furnitureContainer && furnitureType.value !== "all") {
        // This would need data attributes on the items for real implementation
        if (Math.random() > 0.7) {
          shouldShow = false
        }
      }

      if (electronicsType && container === electronicsContainer && electronicsType.value !== "all") {
        // This would need data attributes on the items for real implementation
        if (Math.random() > 0.7) {
          shouldShow = false
        }
      }

      if (condition && condition.value !== "all") {
        // This would need data attributes on the items for real implementation
        if (Math.random() > 0.7) {
          shouldShow = false
        }
      }

      if (era && era.value !== "all") {
        // This would need data attributes on the items for real implementation
        if (Math.random() > 0.7) {
          shouldShow = false
        }
      }

      // Show or hide item
      if (shouldShow) {
        item.style.display = ""
        visibleCount++
      } else {
        item.style.display = "none"
      }
    })

    // Show no results message if needed
    let noResultsMsg = container.querySelector(".no-results-message")

    if (visibleCount === 0) {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement("div")
        noResultsMsg.className = "col-12 text-center py-5 no-results-message"
        noResultsMsg.innerHTML = `
                    <i class="fas fa-search fa-3x mb-3 text-muted"></i>
                    <h3>No items found</h3>
                    <p>Try adjusting your filters to find what you're looking for.</p>
                    <button class="btn btn-outline-primary mt-3 reset-filters-btn">
                        <i class="fas fa-undo me-2"></i>Reset Filters
                    </button>
                `
        container.appendChild(noResultsMsg)

        // Add event listener to reset button
        const resetBtn = noResultsMsg.querySelector(".reset-filters-btn")
        resetBtn.addEventListener("click", resetFilters)
      }
    } else if (noResultsMsg) {
      noResultsMsg.remove()
    }
  }

  // Function to reset all filters
  function resetFilters() {
    if (sortOptions) sortOptions.value = "ending-soon"
    if (categorySearch) categorySearch.value = ""
    if (priceRange) priceRange.value = "all"
    if (bookType) bookType.value = "all"
    if (furnitureType) furnitureType.value = "all"
    if (electronicsType) electronicsType.value = "all"
    if (condition) condition.value = "all"
    if (era) era.value = "all"

    // Apply filters after reset
    if (booksContainer) applyFilters(booksContainer)
    if (furnitureContainer) applyFilters(furnitureContainer)
    if (electronicsContainer) applyFilters(electronicsContainer)
  }

  // Add event listeners to filter controls
  if (sortOptions) {
    sortOptions.addEventListener("change", function () {
      // Sort items based on selected option
      const container = booksContainer || furnitureContainer || electronicsContainer
      if (!container) return

      const items = Array.from(container.querySelectorAll(".item-card"))

      // Sort items based on selected option
      items.sort((a, b) => {
        const priceA = Number.parseFloat(a.querySelector(".current-bid").textContent.replace(/[^0-9.-]+/g, ""))
        const priceB = Number.parseFloat(b.querySelector(".current-bid").textContent.replace(/[^0-9.-]+/g, ""))

        switch (this.value) {
          case "price-low":
            return priceA - priceB
          case "price-high":
            return priceB - priceA
          case "ending-soon":
            // For demo, we'll just use the existing order
            return 0
          case "newly-listed":
            // For demo, we'll just reverse the existing order
            return -1
          case "bids":
            // For demo, we'll just use random sorting
            return Math.random() - 0.5
          default:
            return 0
        }
      })

      // Reorder items in the DOM
      items.forEach((item) => {
        container.appendChild(item)
      })
    })
  }

  if (categorySearch) {
    categorySearch.addEventListener("input", () => {
      const container = booksContainer || furnitureContainer || electronicsContainer
      if (container) applyFilters(container)
    })
  }

  if (priceRange) {
    priceRange.addEventListener("change", () => {
      const container = booksContainer || furnitureContainer || electronicsContainer
      if (container) applyFilters(container)
    })
  }

  if (bookType) {
    bookType.addEventListener("change", () => {
      if (booksContainer) applyFilters(booksContainer)
    })
  }

  if (furnitureType) {
    furnitureType.addEventListener("change", () => {
      if (furnitureContainer) applyFilters(furnitureContainer)
    })
  }

  if (electronicsType) {
    electronicsType.addEventListener("change", () => {
      if (electronicsContainer) applyFilters(electronicsContainer)
    })
  }

  if (condition) {
    condition.addEventListener("change", () => {
      const container = booksContainer || furnitureContainer || electronicsContainer
      if (container) applyFilters(container)
    })
  }

  if (era) {
    era.addEventListener("change", () => {
      if (furnitureContainer) applyFilters(furnitureContainer)
    })
  }

  // Pagination functionality
  const paginationLinks = document.querySelectorAll(".pagination .page-link")
  paginationLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove active class from all links
      paginationLinks.forEach((l) => {
        l.parentElement.classList.remove("active")
      })

      // Add active class to clicked link
      if (!this.parentElement.classList.contains("disabled")) {
        this.parentElement.classList.add("active")
      }

      // Scroll to top of listings
      const listingsSection = document.querySelector(".category-listings")
      if (listingsSection) {
        listingsSection.scrollIntoView({ behavior: "smooth" })
      }
    })
  })
})
