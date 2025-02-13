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
    const draftContainer = document.getElementById("draft-container");
    fetch(db + "berita.json")
  .then(response => response.json())
  .then(data => {
    let drafts = [];

    // Filter berita dengan status "draft"
    for (let key in data) {
      let berita = data[key];
      if (berita.status === "draft") {
        // Simpan key agar nantinya bisa digunakan untuk update
        berita._key = key;
        drafts.push(berita);
      }
    }

    // Urutkan berita draft berdasarkan createdAt secara descending (berita terbaru di atas)
    drafts.sort((a, b) => {
      if (a.createdAt > b.createdAt) return -1;
      if (a.createdAt < b.createdAt) return 1;
      return 0;
    });

    // Jika ada lebih dari 3 berita draft, update berita yang lebih lama menjadi status "aktif"
    if (drafts.length > 3) {
      for (let i = 3; i < drafts.length; i++) {
        let beritaToUpdate = drafts[i];
        fetch(dbURL + "berita/" + beritaToUpdate._key + ".json", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "aktif" })
        })
        .then(res => res.json())
        .then(result => {
          console.log(`Status berita ${beritaToUpdate._key} diupdate menjadi aktif.`, result);
        })
        .catch(err => console.error("Error updating data:", err));
      }
      // Hanya ambil 3 berita draft terbaru untuk ditampilkan
      drafts = drafts.slice(0, 3);
    }

    // Tampilkan berita draft di halaman
    drafts.forEach(berita => {
      const card = document.createElement("div");
      card.className = "card";

      // Tampilkan banner
      const img = document.createElement("img");
      img.src = berita.banner;
      card.appendChild(img);

      // Tampilkan judul berita
      const title = document.createElement("h2");
      title.textContent = berita.titleBerita;
      card.appendChild(title);

      // Tampilkan informasi pembuat dan waktu
      const info = document.createElement("p");
      info.textContent = `👤 ${berita.createdBy}  🕒 ${berita.createdAt}`;
      card.appendChild(info);

      // Jika berita sudah diedit, tampilkan label "diedit"
      if (berita.edit && berita.edit === "iya") {
        const editedLabel = document.createElement("p");
        editedLabel.style.fontStyle = "italic";
        editedLabel.style.fontSize = "0.9em";
        editedLabel.textContent = "diedit";
        card.appendChild(editedLabel);
      }

      // Link menuju halaman detail berita
      const link = document.createElement("a");
      link.href = `../berita/detail.html?id=${berita.idBerita}`;
      link.textContent = "Baca Selengkapnya";
      card.appendChild(link);

      draftContainer.appendChild(card);
    });
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

