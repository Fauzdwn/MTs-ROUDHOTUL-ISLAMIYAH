var db = "https://mtsri-db-default-rtdb.firebaseio.com/";

function save() {
    fetch(db + "cms/-O5bXQPhmB4JHR2F9w5l.json", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titlehead: document.getElementById("title-hd").value,
            sloganhead: document.getElementById("slogan-hd").value,
            deskripsihead: document.getElementById("desk-hd").value,
            ctahead: document.getElementById("cta-hd").value,
            tentang: document.getElementById("tentang").value,
            visi: document.getElementById("visi").value,
            misi: document.getElementById("misi").value,
            jmlSantriLk: document.getElementById("jumlah-santri-lk").value,
            jmlSantriPr: document.getElementById("jumlah-santri-pr").value,
            jmlGuru: document.getElementById("jumlah-guru").value,
            deskFooter: document.getElementById("desk-footer").value,
            logo: document.getElementById("logo").value,
            headerBackground: document.getElementById("header-background").value,
            imglogoProfil: document.getElementById("logo-profil").value,
            imgProfil: document.getElementById("img-profil").value,
            imgFooter: document.getElementById("img-footer").value
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            alert("berhasil mengubah konten");
            location.reload();
        })
        .catch(error => console.error(error));
}
// fetch cms
fetch(db + "cms.json")
    .then(response => response.json())
    .then(data => {
        for (let key in data) {
            var val = data[key];
            document.getElementById("title-hd").value = val.titlehead;
            document.getElementById("slogan-hd").value = val.sloganhead;
            document.getElementById("desk-hd").value = val.deskripsihead;
            document.getElementById("cta-hd").value = val.ctahead;
            document.getElementById("tentang").value = val.tentang;
            document.getElementById("visi").value = val.visi;
            document.getElementById("misi").value = val.misi;
            document.getElementById("jumlah-santri-lk").value = val.jmlSantriLk;
            document.getElementById("jumlah-santri-pr").value = val.jmlSantriPr;
            document.getElementById("jumlah-guru").value = val.jmlGuru;
            document.getElementById("desk-footer").value = val.deskFooter;
            document.getElementById("logo").value = val.logo;
            document.getElementById("header-background").value = val.headerBackground;
            document.getElementById("logo-profil").value = val.imglogoProfil;
            document.getElementById("img-profil").value = val.imgProfil;
            document.getElementById("img-").value = val.imgFooter;
            
        }
    });

// fetch akun
fetch(db + "account.json")
    .then(response => response.json())
    .then(data => {
        var length = 0;
        for (let key in data) {
            length++;
        }
        document.getElementById("fill-acc").innerText = length;
    });
