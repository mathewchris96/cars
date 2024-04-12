// Handle user login
function handleLogin(event) {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const userInfo = Object.fromEntries(formData.entries());
  
  // Check if the credentials match the hardcoded admin credentials
  if (userInfo.username === "admin@123" && userInfo.password === "123") {
    // Redirect to index.html if credentials match
    window.location.href = "index.html";
  } else {
    // Display an error message and prevent redirection if credentials do not match
    console.error('Error: Invalid credentials');
    alert('Invalid username or password. Please try again.');
  }
  
  // Reset form
  loginForm.reset();
}

// Assuming 'loginForm' is already defined and selected from the DOM
// Add an event listener to the 'login-form' to invoke the 'handleLogin' function upon form submission