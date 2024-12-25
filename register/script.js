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
    email: email
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

  const email = document.getElementById("form-e-login").value.trim(); // Email
  const pw = document.getElementById("form-p-login").value.trim(); // Password

  if (!email || !pw) {
    alert("Email dan Password wajib diisi!");
    return;
  }

  // Firebase Authentication Login
  firebase.auth().signInWithEmailAndPassword(email, pw)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Login berhasil! Selamat datang, " + user.email);
      window.location.href = "/"; // Redirect ke halaman utama
    })
    .catch((error) => {
      const errorCode = error.code;
      console.error("Error Code: ", errorCode);
console.error("Error Message: ", error.message);



      // Cek kode error dan tampilkan pesan sesuai
      switch (errorCode) {
        case "auth/user-not-found":
          alert("Akun Anda tidak terdaftar.");
          break;
        case "auth/wrong-password":
          alert("Password Anda salah.");
          break;
        case "auth/invalid-email":
          alert("Format email tidak valid.");
          break;
        case "auth/invalid-login-credentials": // Handle custom error (tidak lazim dari Firebase)
          alert("Akun Anda tidak terdaftar.");
          break;
        case "auth/too-many-requests":
          alert("Terlalu banyak percobaan login. Silakan coba lagi nanti.");
          break;
        default:
          alert("Terjadi kesalahan: " + error.message);
      }
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