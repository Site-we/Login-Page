document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.querySelector("form");
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const usernameInput = document.querySelector("input[type='text']");
    const passwordInput = document.querySelector("input[type='password']");
    const username = usernameInput.value;
    const password = passwordInput.value;

    fetch("user.json")
      .then(response => response.json())
      .then(data => {
        const user = data.users.find(user => user.username === username && user.password === password);
        if (user) {
          window.location.href = "user.html";
        } else {
          alert("Invalid username or password.");
        }
      })
      .catch(error => console.error("Error fetching user data:", error));
  });
});
