const menuIcon = document.getElementById("menu-icon");
const menuList = document.getElementById("menu-list");

menuIcon.addEventListener("click", () => {
  menuList.classList.toggle("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
    var db = "https://mtsri-db-default-rtdb.firebaseio.com/";
    // fetch cms
    fetch(db + "cms.json")
        .then(response => response.json())
        .then(data => {
            for (let key in data) {
                var val = data[key];
                document.getElementById("judulHeader").textContent =
                    val.titlehead;
                document.getElementById("sloganHeader").textContent =
                    val.sloganhead;
                document.getElementById("deskHeader").textContent =
                    val.deskripsihead;
                document.getElementById("ctaHeader").innerHTML =
                    val.ctahead +
                    "<span class='bi bi-arrow-right mx-2'></span>";
                document.getElementById("IsiProfil").textContent = val.tentang;
                document.getElementById("visi").textContent = val.visi;
                document.getElementById("misi").textContent = val.misi;
                document.getElementById("jumlah-santri-pr").textContent =
                    val.jmlSantriPr;
                document.getElementById("jumlah-santri-lk").textContent =
                    val.jmlSantriLk;
                document.getElementById("jumlah-guru").textContent =
                    val.jmlGuru;
                document.getElementById("desk-footer").textContent =
                    val.deskFooter;
                // document.getElementById("logo").src = val.logo;
                // document.querySelector("#logo-profil").style.background = 'url(' + val.headerBackground + ')';
                // document.getElementById("logo-profil").src = val.imglogoProfil;
                // document.getElementById("imgProfil").src = val.imgProfil;
                // document.getElementById("img-footer").src = val.imgFooter;
            }
        })
        .catch(error => console.error("Error fetching data:", error));
    // fetch berita
    fetch(db + "berita.json")
        .then(response => response.json())
        .then(data => {
            for (let key in data) {
                var val = data[key];
                var newElement = document.createElement("div")
                newElement.classList.add("news-card")
                newElement.addEventListener("click", () => {
                  window.location.href = "/berita/" + val.idBerita
                })
                newElement.innerHTML = `
                <img src="${val.banner}" class="w-100 mb-2 rounded-1" alt="">
                <h3>${val.titleBerita}</h3>
                <p>
                    Baca Detail
                </p>
                `
                document.getElementById("body-berita").appendChild(newElement)
            }
        })
        .catch(error => console.error("Error fetching data:", error));
});

var isLogin = localStorage.getItem("user");
if (isLogin) {
    document.querySelector(".login-false").style.display = "none";
    document.querySelector(".login-true").style.display = "flex";
} else {
    document.querySelector(".login-false").style.display = "flex";
    document.querySelector(".login-true").style.display = "none";
}

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("pw");
    alert("success logout");
    location.reload();
}

