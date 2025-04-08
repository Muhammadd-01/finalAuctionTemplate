// Search Results Page JavaScript for AuctionHub

document.addEventListener("DOMContentLoaded", () => {
    // Get search query from URL
    const urlParams = new URLSearchParams(window.location.search)
    const searchQuery = urlParams.get("q")
  
    // Update page title and description
    const searchResultsTitle = document.getElementById("searchResultsTitle")
    const searchResultsDescription = document.getElementById("searchResultsDescription")
    const searchResultsContainer = document.getElementById("searchResultsContainer")
    const loadingIndicator = document.getElementById("loadingIndicator")
    const noResultsMessage = document.getElementById("noResultsMessage")
    const searchPagination = document.getElementById("searchPagination")
  
    // Declare updateCountdowns (assuming it's defined elsewhere and needs to be accessible here)
    let updateCountdowns
  
    if (searchResultsTitle && searchQuery) {
      searchResultsTitle.textContent = `Search Results for "${searchQuery}"`
    }
  
    if (searchResultsDescription && searchQuery) {
      searchResultsDescription.textContent = `Showing auction items matching "${searchQuery}"`
    }
  
    // Set the search input value to the query
    const searchInput = document.getElementById("globalSearch")
    if (searchInput && searchQuery) {
      searchInput.value = searchQuery
    }
  
    // Fetch search results
    if (searchQuery) {
      fetchSearchResults(searchQuery)
    } else {
      // If no search query, show popular items
      loadingIndicator.classList.add("d-none")
      searchResultsTitle.textContent = "Popular Items"
      searchResultsDescription.textContent = "Browse our most popular auction items"
      fetchPopularItems()
    }
  
    // Filter functionality
    const sortOptions = document.getElementById("sortOptions")
    const categoryFilter = document.getElementById("categoryFilter")
    const conditionFilter = document.getElementById("condition")
    const priceRangeFilter = document.getElementById("priceRange")
  
    // Add event listeners to filters
    if (sortOptions) {
      sortOptions.addEventListener("change", () => {
        applyFilters()
      })
    }
  
    if (categoryFilter) {
      categoryFilter.addEventListener("change", () => {
        applyFilters()
      })
    }
  
    if (conditionFilter) {
      conditionFilter.addEventListener("change", () => {
        applyFilters()
      })
    }
  
    if (priceRangeFilter) {
      priceRangeFilter.addEventListener("change", () => {
        applyFilters()
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
  
          // Scroll to top of listings
          searchResultsContainer.scrollIntoView({ behavior: "smooth" })
  
          // Simulate loading new page
          loadingIndicator.classList.remove("d-none")
          searchResultsContainer.innerHTML = ""
  
          setTimeout(() => {
            loadingIndicator.classList.add("d-none")
            renderSearchResults(getSearchResults())
          }, 800)
        }
      })
    })
  
    // Function to fetch search results
    function fetchSearchResults(query) {
      // Show loading indicator
      loadingIndicator.classList.remove("d-none")
      searchResultsContainer.innerHTML = ""
  
      // Simulate API call
      setTimeout(() => {
        const results = getSearchResults()
  
        // Hide loading indicator
        loadingIndicator.classList.add("d-none")
  
        if (results.length > 0) {
          renderSearchResults(results)
          searchPagination.classList.remove("d-none")
        } else {
          noResultsMessage.classList.remove("d-none")
        }
      }, 1200)
    }
  
    // Function to fetch popular items
    function fetchPopularItems() {
      // Simulate API call
      setTimeout(() => {
        const results = getPopularItems()
        renderSearchResults(results)
        searchPagination.classList.remove("d-none")
      }, 800)
    }
  
    // Function to render search results
    function renderSearchResults(results) {
      let html = ""
  
      results.forEach((item) => {
        html += `
          <div class="col-md-4 col-lg-3 mb-4 item-card" data-category="${item.category.toLowerCase()}" data-price="${item.numericPrice}" data-condition="${item.condition.toLowerCase()}">
            <div class="card h-100">
              <div class="card-img-container">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="time-left">
                  <i class="fas fa-clock me-1"></i>
                  <span class="countdown" data-time="${item.endTime}">${item.timeLeft}</span>
                </div>
                ${
                  item.bidCount
                    ? `
                <div class="bid-count">
                  <i class="fas fa-gavel me-1"></i>
                  <span>${item.bidCount} bids</span>
                </div>
                `
                    : ""
                }
              </div>
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="bid-info">
                    <span class="current-bid">${item.price}</span>
                    <small class="text-muted">Current Bid</small>
                  </div>
                  <a href="item.html?id=${item.id}" class="btn btn-primary">Bid Now</a>
                </div>
              </div>
            </div>
          </div>
        `
      })
  
      searchResultsContainer.innerHTML = html
  
      // Initialize countdowns
      if (typeof updateCountdowns === "function") {
        updateCountdowns()
      }
    }
  
    // Function to apply filters
    function applyFilters() {
      const sortBy = sortOptions ? sortOptions.value : "relevance"
      const category = categoryFilter ? categoryFilter.value : "all"
      const condition = conditionFilter ? conditionFilter.value : "all"
      const priceRange = priceRangeFilter ? priceRangeFilter.value : "all"
  
      // Show loading indicator
      loadingIndicator.classList.remove("d-none")
      searchResultsContainer.innerHTML = ""
  
      // Simulate API call with filters
      setTimeout(() => {
        let results = getSearchResults()
  
        // Apply category filter
        if (category !== "all") {
          results = results.filter((item) => item.category.toLowerCase() === category)
        }
  
        // Apply condition filter
        if (condition !== "all") {
          results = results.filter((item) => item.condition.toLowerCase() === condition)
        }
  
        // Apply price range filter
        if (priceRange !== "all") {
          const [minPrice, maxPrice] = priceRange
            .split("-")
            .map((p) => (p === "+" ? Number.POSITIVE_INFINITY : Number(p)))
          results = results.filter((item) => {
            const price = item.numericPrice
            return price >= minPrice && (maxPrice === Number.POSITIVE_INFINITY || price <= maxPrice)
          })
        }
  
        // Apply sorting
        results.sort((a, b) => {
          switch (sortBy) {
            case "price-low":
              return a.numericPrice - b.numericPrice
            case "price-high":
              return b.numericPrice - a.numericPrice
            case "ending-soon":
              return new Date(a.endTime) - new Date(b.endTime)
            case "newly-listed":
              return new Date(b.listedDate) - new Date(a.listedDate)
            case "bids":
              return b.bidCount - a.bidCount
            default:
              return 0
          }
        })
  
        // Hide loading indicator
        loadingIndicator.classList.add("d-none")
  
        if (results.length > 0) {
          renderSearchResults(results)
          noResultsMessage.classList.add("d-none")
          searchPagination.classList.remove("d-none")
        } else {
          noResultsMessage.classList.remove("d-none")
          searchPagination.classList.add("d-none")
        }
      }, 800)
    }
  
    // Sample data for search results
    function getSearchResults() {
      return [
        {
          id: 1,
          name: "Vintage Leica M3 Camera (1954)",
          description: "A rare 1954 Leica M3 camera in excellent condition with original leather case.",
          category: "Electronics",
          condition: "Good",
          price: "$1,250",
          numericPrice: 1250,
          image: "https://i.imgur.com/ZpJnFjN.jpg",
          endTime: "2023-12-31T23:59:59",
          timeLeft: "2d 5h 30m",
          bidCount: 12,
          listedDate: "2023-12-15T10:00:00",
        },
        {
          id: 2,
          name: "First Edition Hemingway",
          description: "A first edition of 'The Old Man and the Sea' signed by Ernest Hemingway.",
          category: "Books",
          condition: "Good",
          price: "$3,500",
          numericPrice: 3500,
          image: "https://i.imgur.com/vZcuJXG.jpg",
          endTime: "2023-12-25T10:00:00",
          timeLeft: "1d 2h 15m",
          bidCount: 8,
          listedDate: "2023-12-10T14:30:00",
        },
        {
          id: 3,
          name: "Victorian Writing Desk",
          description: "Beautiful Victorian oak writing desk from 1875 with original brass hardware.",
          category: "Furniture",
          condition: "Good",
          price: "$2,800",
          numericPrice: 2800,
          image: "https://i.imgur.com/Yx0Qhph.jpg",
          endTime: "2023-12-28T15:30:00",
          timeLeft: "3d 8h 45m",
          bidCount: 15,
          listedDate: "2023-12-12T09:15:00",
        },
        {
          id: 4,
          name: "Rolex Submariner 1968",
          description: "Vintage Rolex Submariner with original box and papers.",
          category: "Jewelry",
          condition: "Excellent",
          price: "$8,750",
          numericPrice: 8750,
          image: "https://i.imgur.com/Rl6Tk7r.jpg",
          endTime: "2023-12-24T18:00:00",
          timeLeft: "12h 45m",
          bidCount: 24,
          listedDate: "2023-12-17T11:30:00",
        },
        {
          id: 5,
          name: "19th Century Oil Painting",
          description: "Landscape oil painting by renowned artist Thomas Cole.",
          category: "Art",
          condition: "Good",
          price: "$5,200",
          numericPrice: 5200,
          image: "https://i.imgur.com/Yx0Qhph.jpg",
          endTime: "2023-12-23T20:15:00",
          timeLeft: "6h 30m",
          bidCount: 18,
          listedDate: "2023-12-08T16:45:00",
        },
        {
          id: 6,
          name: "1794 Silver Dollar",
          description: "Extremely rare 1794 Flowing Hair Silver Dollar in VF condition.",
          category: "Collectibles",
          condition: "Fair",
          price: "$125,000",
          numericPrice: 125000,
          image: "https://i.imgur.com/vZcuJXG.jpg",
          endTime: "2023-12-23T22:00:00",
          timeLeft: "8h 15m",
          bidCount: 32,
          listedDate: "2023-12-01T10:00:00",
        },
        {
          id: 7,
          name: "Vintage Marantz Turntable",
          description: "1970s Marantz 6300 turntable in excellent working condition with original dust cover.",
          category: "Electronics",
          condition: "Good",
          price: "$850",
          numericPrice: 850,
          image: "https://i.imgur.com/ZpJnFjN.jpg",
          endTime: "2023-12-26T14:30:00",
          timeLeft: "2d 6h 45m",
          bidCount: 8,
          listedDate: "2023-12-13T09:30:00",
        },
        {
          id: 8,
          name: "Harry Potter First Edition",
          description: "First edition of 'Harry Potter and the Philosopher's Stone' with rare printing error.",
          category: "Books",
          condition: "Excellent",
          price: "$12,750",
          numericPrice: 12750,
          image: "https://i.imgur.com/vZcuJXG.jpg",
          endTime: "2023-12-27T15:30:00",
          timeLeft: "3d 7h 45m",
          bidCount: 15,
          listedDate: "2023-12-05T14:00:00",
        },
        {
          id: 9,
          name: "Antique Crystal Chandelier",
          description: "French crystal and bronze chandelier, circa 1920, with 12 lights and original wiring.",
          category: "Furniture",
          condition: "Good",
          price: "$5,750",
          numericPrice: 5750,
          image: "https://i.imgur.com/Yx0Qhph.jpg",
          endTime: "2023-12-27T09:30:00",
          timeLeft: "3d 1h 45m",
          bidCount: 10,
          listedDate: "2023-12-07T11:15:00",
        },
        {
          id: 10,
          name: "1959 Gibson Les Paul",
          description: "Rare 1959 Gibson Les Paul Standard with sunburst finish.",
          category: "Collectibles",
          condition: "Good",
          price: "$175,500",
          numericPrice: 175500,
          image: "https://i.imgur.com/ZpJnFjN.jpg",
          endTime: "2023-12-24T09:30:00",
          timeLeft: "19h 45m",
          bidCount: 15,
          listedDate: "2023-11-24T10:00:00",
        },
        {
          id: 11,
          name: "Ming Dynasty Vase",
          description: "Authentic Ming Dynasty blue and white porcelain vase, 15th century.",
          category: "Art",
          condition: "Fair",
          price: "$45,000",
          numericPrice: 45000,
          image: "https://i.imgur.com/Yx0Qhph.jpg",
          endTime: "2023-12-24T14:00:00",
          timeLeft: "1d 0h 15m",
          bidCount: 9,
          listedDate: "2023-12-04T16:30:00",
        },
        {
          id: 12,
          name: "Signed Stephen King Novel",
          description: "Limited edition of 'The Stand' signed by Stephen King with custom slipcase.",
          category: "Books",
          condition: "Like New",
          price: "$850",
          numericPrice: 850,
          image: "https://i.imgur.com/vZcuJXG.jpg",
          endTime: "2023-12-26T09:15:00",
          timeLeft: "2d 1h 30m",
          bidCount: 7,
          listedDate: "2023-12-14T13:45:00",
        },
      ]
    }
  
    // Sample data for popular items
    function getPopularItems() {
      return [
        {
          id: 13,
          name: "Apple Macintosh 128K",
          description: "Original 1984 Apple Macintosh 128K computer with keyboard, mouse, and software.",
          category: "Electronics",
          condition: "Good",
          price: "$3,800",
          numericPrice: 3800,
          image: "https://i.imgur.com/ZpJnFjN.jpg",
          endTime: "2023-12-29T12:00:00",
          timeLeft: "5d 4h 15m",
          bidCount: 14,
          listedDate: "2023-12-09T10:30:00",
        },
        {
          id: 14,
          name: "Mid-Century Dining Table",
          description: "Danish teak dining table by Hans Wegner, 1960s, with two extension leaves.",
          category: "Furniture",
          condition: "Excellent",
          price: "$1,950",
          numericPrice: 1950,
          image: "https://i.imgur.com/Yx0Qhph.jpg",
          endTime: "2023-12-25T20:00:00",
          timeLeft: "1d 12h 15m",
          bidCount: 8,
          listedDate: "2023-12-11T09:00:00",
        },
        {
          id: 15,
          name: "Vintage Chesterfield Sofa",
          description: "1930s English Chesterfield sofa in oxblood leather with button tufting and brass nailheads.",
          category: "Furniture",
          condition: "Good",
          price: "$3,200",
          numericPrice: 3200,
          image: "https://i.imgur.com/Yx0Qhph.jpg",
          endTime: "2023-12-26T12:30:00",
          timeLeft: "2d 4h 45m",
          bidCount: 11,
          listedDate: "2023-12-10T15:45:00",
        },
        {
          id: 16,
          name: "French Gilded Mirror",
          description: "19th century French Louis XVI style gilded mirror with ornate carvings and original glass.",
          category: "Furniture",
          condition: "Good",
          price: "$2,400",
          numericPrice: 2400,
          image: "https://i.imgur.com/Yx0Qhph.jpg",
          endTime: "2023-12-30T16:45:00",
          timeLeft: "6d 9h 00m",
          bidCount: 6,
          listedDate: "2023-12-08T11:30:00",
        },
        {
          id: 17,
          name: "Art Deco Dresser",
          description: "1930s Art Deco waterfall dresser with mirror, walnut veneer and bakelite handles.",
          category: "Furniture",
          condition: "Good",
          price: "$1,650",
          numericPrice: 1650,
          image: "https://i.imgur.com/Yx0Qhph.jpg",
          endTime: "2023-12-28T11:15:00",
          timeLeft: "4d 3h 30m",
          bidCount: 9,
          listedDate: "2023-12-12T14:00:00",
        },
        {
          id: 18,
          name: "Vintage Nikon F2 Camera",
          description: "1975 Nikon F2 with 50mm lens and original case.",
          category: "Electronics",
          condition: "Good",
          price: "$850",
          numericPrice: 850,
          image: "https://i.imgur.com/ZpJnFjN.jpg",
          endTime: "2023-12-29T18:00:00",
          timeLeft: "5d 10h 15m",
          bidCount: 7,
          listedDate: "2023-12-14T09:30:00",
        },
        {
          id: 19,
          name: "Leica Summilux Lens",
          description: "Rare Leica Summilux 50mm f/1.4 lens in excellent condition.",
          category: "Electronics",
          condition: "Excellent",
          price: "$1,100",
          numericPrice: 1100,
          image: "https://i.imgur.com/ZpJnFjN.jpg",
          endTime: "2023-12-27T12:30:00",
          timeLeft: "3d 4h 45m",
          bidCount: 5,
          listedDate: "2023-12-15T16:00:00",
        },
        {
          id: 20,
          name: "Vintage Film Collection",
          description: "Collection of 10 rolls of expired Kodak and Fuji film from the 1980s.",
          category: "Collectibles",
          condition: "Good",
          price: "$125",
          numericPrice: 125,
          image: "https://i.imgur.com/ZpJnFjN.jpg",
          endTime: "2023-12-26T09:15:00",
          timeLeft: "2d 1h 30m",
          bidCount: 4,
          listedDate: "2023-12-16T10:45:00",
        },
      ]
    }
  })
  