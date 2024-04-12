// script.js for Car Auction Website

// Define the API URL
const API_URL = '/api/cars';

// DOM Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const carListings = document.getElementById('car-listings');
const bidForm = document.getElementById('bid-form');
const logoutButton = document.getElementById('logout-button');

// Event Listeners
document.addEventListener('DOMContentLoaded', fetchCarListings);
loginForm.addEventListener('submit', handleLogin);
registerForm.addEventListener('submit', handleRegister);
bidForm.addEventListener('submit', placeBid);
logoutButton.addEventListener('click', handleLogout);

// Fetch car listings from the server
function fetchCarListings() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      displayCarListings(data);
    })
    .catch(error => console.error('Error fetching car listings:', error));
}

// Display car listings on the page
function displayCarListings(cars) {
  carListings.innerHTML = ''; // Clear current listings
  cars.forEach(car => {
    const carElement = document.createElement('div');
    carElement.className = 'car-listing';
    carElement.innerHTML = `
      <h3>${car.make} ${car.model}</h3>
      <p>Type: ${car.type}</p>
      <p>Starting Bid: $${car.startingBid}</p>
      <button onclick="showBidForm('${car.id}')">Place Bid</button>
    `;
    carListings.appendChild(carElement);
  });
}

// Show bid form for a specific car
function showBidForm(carId) {
  bidForm.style.display = 'block';
  bidForm.carId.value = carId;
}

// Handle user login
function handleLogin(event) {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const userInfo = Object.fromEntries(formData.entries());
  // Implement login logic here, e.g., fetch to server
  console.log('Logging in:', userInfo);
  // Reset form
  loginForm.reset();
}

// Handle user registration
function handleRegister(event) {
  event.preventDefault();
  const formData = new FormData(registerForm);
  const userInfo = Object.fromEntries(formData.entries());
  // Implement registration logic here, e.g., fetch to server
  console.log('Registering:', userInfo);
  // Reset form
  registerForm.reset();
}

// Place a bid on a car
function placeBid(event) {
  event.preventDefault();
  const bidInfo = {
    carId: bidForm.carId.value,
    bidAmount: bidForm.bidAmount.value,
  };
  // Implement bid logic here, e.g., fetch to server
  console.log('Placing bid:', bidInfo);
  // Reset form
  bidForm.reset();
  bidForm.style.display = 'none';
}

// Handle user logout
function handleLogout() {
  // Implement logout logic here
  console.log('User logged out');
  // Optionally, redirect or refresh the page
}

// Utility functions or additional logic can be added below