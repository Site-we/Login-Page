document.addEventListener("DOMContentLoaded", function() {
  // Check if session token exists – auto redirect if already logged in
  const existingToken = localStorage.getItem("sessionToken");
  if (existingToken) {
    window.location.href = "admin.html";
    return;
  }

  const loginForm = document.querySelector("form");

  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const usernameInput = document.querySelector("input[type='text']");
    const passwordInput = document.querySelector("input[type='password']");
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    fetch("user.json")
      .then(response => response.json())
      .then(data => {
        const user = data.admin.find(user => user.username === username && user.password === password);
        if (user) {
          // Generate session token and store it
          const sessionToken = Math.random().toString(36).substr(2);
          localStorage.setItem("sessionToken", sessionToken);
          sessionStorage.setItem("user", username);

          // Redirect
          window.location.href = "admin.html";
        } else {
          alert("Invalid username or password.");
        }
      })
      .catch(error => console.error("Error fetching user data:", error));
  });
});
