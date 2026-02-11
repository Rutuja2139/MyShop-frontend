
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = document.getElementById("submitBtn") || document.getElementById("loginBtn");
    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;

    btn.innerText = "VERIFYING...";
    btn.disabled = true;

    try {
     
      const response = await fetch(LOGIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailValue, password: passwordValue })
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        const userData = { 
            name: data.name, 
            email: emailValue 
        };
        localStorage.setItem("manualUser", JSON.stringify(userData));
        
        alert(`Access Granted. Welcome back, ${data.name}.`);
        window.location.href = "index.html";
      } else {
        alert("Unauthorized: Invalid Identity or Credential.");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert("System Error: Backend is offline.");
    } finally {
      btn.innerText = "SIGN IN";
      btn.disabled = false;
    }
  });
}