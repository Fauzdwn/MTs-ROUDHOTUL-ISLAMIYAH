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
    password: pw,
    email: email
  };

  // Simpan ke Firebase Authentication
  fetch(
   // !hapus ini hapus biar aman soalnya
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

  const user = document.getElementById("form-u-login").value.trim(); // Username
  const pw = document.getElementById("form-p-login").value.trim(); // Password

  if (!user || !pw) {
    alert("Username dan Password wajib diisi!");
    return;
  }

  // Fetch data dari Firebase Realtime Database
  fetch("https://mtsri-db-default-rtdb.firebaseio.com/account.json")
    .then((res) => res.json())
    .then((data) => {
      let userFound = false;
      let passwordMatch = false;

      for (let key in data) {
        const val = data[key];
        if (val.username === user) {
          userFound = true; // Username ditemukan
          if (val.password === pw) {
            passwordMatch = true; // Password cocok
          }
          break; // Jika username ditemukan, hentikan loop
        }
      }

      if (!userFound) {
        alert("Username Anda tidak terdaftar.");
      } else if (!passwordMatch) {
        alert("Password Anda salah.");
      } else {
        // Login berhasil
        alert("Login berhasil! Selamat datang, " + user);
        localStorage.setItem("user", user); // Simpan data user di local storage
        window.location.href = "/"; // Redirect ke halaman utama
      }
    })
    .catch((error) => {
      console.error("Terjadi kesalahan saat login: ", error);
      alert("Error: Tidak dapat login.");
    });
});


// login google
const googleProvider = new firebase.auth.GoogleAuthProvider();

document.getElementById("google-login").addEventListener("click", () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;
        alert("Login berhasil! Selamat datang, " + user.displayName);
        console.log("User Info:", user);
        window.location.href = "/"; // Redirect ke halaman utama
      })
      .catch((error) => {
        console.error(error);
        alert("Error: " + error.message);
      });
  });
  
  // facebook login
  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  document.getElementById("facebook-login").addEventListener("click", () => {
    firebase.auth().signInWithPopup(facebookProvider)
      .then((result) => {
        const user = result.user;
        alert("Login berhasil! Selamat datang, " + user.displayName);
        console.log("User Info:", user);
        window.location.href = "/"; // Redirect ke halaman utama
      })
      .catch((error) => {
        console.error(error);
        alert("Error: " + error.message);
      });
  });
});
