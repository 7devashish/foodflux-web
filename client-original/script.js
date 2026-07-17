/*/ The URL of your local Node.js server
const API_URL = '/api/surplus';
const cardsContainer = document.getElementById('surplus-cards-container');

// 1. Fetch data from the backend
async function fetchSurplusFood() {
    try {
        // Look for a saved token in localStorage (we will set this up when we build Login)
        const token = localStorage.getItem('foodflux_token');
        
        const headers = {
            'Content-Type': 'application/json'
        };

        // If the user is logged in, attach their JWT "digital key"
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(API_URL, { headers });

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}: Not Authorized`);
        }

        const data = await response.json();
        renderCards(data);

    } catch (error) {
        console.warn("Could not fetch live data (Requires Login). Showing fallback aesthetic cards:", error.message);
        renderFallbackData();
    }
}

// 2. Render the data dynamically into HTML
function renderCards(posts) {
    cardsContainer.innerHTML = ''; // Clear the container

    if(posts.length === 0) {
         cardsContainer.innerHTML = '<p style="grid-column: span 3; text-align: center;">No surplus food available right now.</p>';
         return;
    }

    posts.forEach((post, index) => {
        // We alternate styles based on index to keep the modular, aesthetic design
        // 0 = White, 1 = Warm Cream, 2 = White, etc.
        const isWarm = index % 3 === 1; 
        const cardClass = isWarm ? 'card card-warm' : 'card card-white';
        const iconBgClass = isWarm ? 'bg-white' : '';
        const btnClass = isWarm ? 'arrow-btn btn-green-circle' : 'arrow-btn';

        // Format the date nicely
        const deadline = new Date(post.pickupDeadline).toLocaleDateString();

        // Build the HTML template for a single card
        const cardHTML = `
            <div class="${cardClass}">
                <div class="card-top">
                    <div class="icon-circle ${iconBgClass}">🍲</div>
                    <h3 class="card-title">${post.foodName}</h3>
                    <p class="card-desc">
                        <strong>Quantity:</strong> ${post.quantity} kg<br>
                        <strong>Location:</strong> ${post.location}<br>
                        <strong>Pickup By:</strong> ${deadline}
                    </p>
                </div>
                <div class="card-bottom">
                    <button class="${btnClass}" onclick="claimFood('${post._id}')" title="Claim Food">
                        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17l9.2-9.2M17 17V7H7"></path></svg>
                    </button>
                </div>
            </div>
        `;
        cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// 3. Fallback data just for design testing
function renderFallbackData() {
    const dummyData = [
        { _id: '1', foodName: 'Wedding Buffet Leftovers', quantity: 15, location: 'Downtown Hall', pickupDeadline: '2026-02-21' },
        { _id: '2', foodName: 'Fresh Baked Bread', quantity: 5, location: 'Sunrise Bakery', pickupDeadline: '2026-02-20' },
        { _id: '3', foodName: 'Corporate Lunch Boxes', quantity: 20, location: 'Tech Park', pickupDeadline: '2026-02-21' }
    ];
    renderCards(dummyData);
}

// 4. Placeholder function for the "Claim" button
function claimFood(id) {
    alert(`You clicked claim for Post ID: ${id}. We will build the PATCH request for this soon!`);
}

// Run the fetch function as soon as the page loads
window.addEventListener('DOMContentLoaded', fetchSurplusFood);*/