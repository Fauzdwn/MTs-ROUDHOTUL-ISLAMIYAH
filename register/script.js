// Modal logic
const modal = document.getElementById("reset-password-modal");
const btn = document.getElementById("forgot-password-btn");
const span = document.querySelector(".close");
const form = document.getElementById("reset-password-form");

// Open modal
btn.onclick = function () {
  modal.style.display = "block";
};

// Close modal when clicking "X"
span.onclick = function () {
  modal.style.display = "none";
};

// Close modal when clicking outside the modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Submit reset password
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("reset-email").value;

  if (!email) {
    alert("Please enter your email address!");
    return;
  }

  // Call Firebase API to send reset password email
  fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDS4s-wVugqVY9lJMFLjNcVF7g1PeVsavg",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email: email,
      }),
    }
  )
    .then((response) => {
      if (response.ok) {
        alert("Password reset email sent! Please check your inbox.");
        modal.style.display = "none"; // Close the modal
      } else {
        return response.json().then((err) => {
          throw new Error(err.error.message);
        });
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Error: " + err.message);
    });
});




document.addEventListener("DOMContentLoaded", () => {
document.querySelector(".sign-up-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Ambil nilai dari input form
  var user = document.getElementById("form-u").value; // Username
  var email = document.getElementById("form-e").value; // Email
  var pw = document.getElementById("form-p").value; // Password

  if (!email || !pw || !user) {
    alert("User, Email dan Password wajib diisi!");
    return;
  }

  // Data untuk Firebase Authentication
  var authData = {
    email: email,
    password: pw,
    returnSecureToken: true,
  };

  // Data untuk Firebase Realtime Database
  var data = {
    "user-id": Math.floor(Math.random() * 10000), // ID unik
    username: user,
    email: email,
    password: pw,
  };

  // Simpan ke Firebase Authentication
  fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDS4s-wVugqVY9lJMFLjNcVF7g1PeVsavg",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    }
  )
    .then((authRes) => {
      if (authRes.ok) {
        // Jika berhasil, simpan data user ke Realtime Database
        return fetch(
          "https://mtsri-db-default-rtdb.firebaseio.com/account.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
      } else {
        return authRes.json().then((err) => {
          throw new Error(err.error.message);
        });
      }
    })
    .then((dbRes) => {
      if (dbRes.ok) {
        alert("Registrasi berhasil!");
        document.querySelector(".container").classList.remove("sign-up-mode"); // Beralih ke mode login
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Error: " + err.message);
    });
});




  // Event untuk Form Login
  document.querySelector(".sign-in-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Ambil nilai dari input form login
    var user = document.getElementById("form-u-login").value; // Username
    var pw = document.getElementById("form-p-login").value; // Password
    var forgot = document.getElementById("forgot");
    var email = document.getElementById("reset-mail").value;
    
    // sistem reset Password
    forgot.onClik = () => {
      firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    alert('Berhasil mengirim reset Password ke ' + email);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
    };

    fetch("https://mtsri-db-default-rtdb.firebaseio.com/account.json")
      .then((res) => res.json())
      .then((data) => {
        var userFound = false;
        for (let key in data) {
          var val = data[key];
          if (val.username === user && val.password === pw) {
            userFound = true;
          }
        }
        if (userFound) {
          localStorage.setItem("user", user);
          localStorage.setItem("password", pw);
          alert("Login berhasil!");
          window.location.href = "/"; // Redirect ke halaman utama
        } else {
          alert("Username atau Password salah!");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error: Tidak dapat login.");
      });
  });
});
