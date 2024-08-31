document.addEventListener('DOMContentLoaded', () => {
    var db = "https://mtsri-db-default-rtdb.firebaseio.com/"
    fetch(db + "cms.json")
    .then(response => response.json())
    .then(data => {
        for (let key in data) {
            var val = data[key];
            document.getElementById("judulHeader").textContent = val.titlehead;
            document.getElementById("sloganHeader").textContent = val.sloganhead;
            document.getElementById("deskHeader").textContent = val.deskripsihead;
            document.getElementById("ctaHeader").textContent = val.ctahead;
        }
    })
    .catch(error => console.error('Error fetching data:', error));
});
