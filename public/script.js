document.addEventListener('DOMContentLoaded', function() {
    const loadingOverlay = document.getElementById('loading-overlay');
    // Tampilkan overlay putih dan spinner
    loadingOverlay.style.display = 'none';

  // URL API JSON yang telah Anda buat
  const apiUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=ToKBhhttFn92maVI7erGHEy4y6vzI_vLOYZdaT-a3TsAkLlpkOJniDUKIUadKwlGcm_m9EeGqs-vNA-NVQtr7Madz-LE_A_Mm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCZOpiEnfz5TZfrp2nGU4BEw6uIsROeHHFKro8HWVrV8v9glmAgVfj2DRgTCzrCwLnRa7R_KgPAEt_kCaNoZnK_6LcvpFaYXDQ&lib=MnA_RtjAvg-lWr-OWFsKKlC3xNIJWkbbe';
       
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Mengambil data dari Sheet1
      const sitePengaturan = data.SitePengaturan[0];
    
      // pengaturan display
    //  document.getElementById('nav').style.display = sitePengaturan.DisplayNavbar;
      document.getElementById('header').style.display= sitePengaturan.DisplayHeader;
      document.getElementById('body').style.display= sitePengaturan.DisplayBody;
      document.getElementById('footer').style.display= sitePengaturan.DisplayFooter;


// pengaturan bawaan
const pengaturanBawaan = data.PengaturanBawaan[0];

document.body.style.backgroundColor = pengaturanBawaan.WarnaBackground;

document.body.style.fontFamily = pengaturanBawaan.NamaFont;


// header
const header = data.Header[0];
document.getElementById('judulHeader').innerText = header.JudulBesar;
document.getElementById('deskripsiHeader').innerText = header.DeskripsiJudul;
document.getElementById('img1').src = header.img1;
document.getElementById('img2').src = header.img2;
document.getElementById('img3').src = header.img3;

// profil
const bodyhome = data.BodyHome[0];
document.getElementById('JudulProfil').innerText = bodyhome.JudulProfil;
document.getElementById('IsiProfil').innerText = bodyhome.DeskripsiProfil;
document.getElementById('imgbanner').src = bodyhome.ImgBanner;
//jumlah bagian
document.getElementById('jumlahcewek').innerText = bodyhome.Santriwati;
document.getElementById('jumlahcowok').innerText = bodyhome.Santriwan;
document.getElementById('jumlahguru').innerText = bodyhome.Guru;
// konten unggulan
document.getElementById('JudulKeunggulan1').innerText = bodyhome.JudulKeunggulan1 ;
document.getElementById('deskripsiunggulan1').innerText = bodyhome.DeskripsiKeunggulan1 ;
document.getElementById('JudulKeunggulan2').innerText = bodyhome.JudulKeunggulan2 ;
document.getElementById('deskripsiunggulan2').innerText = bodyhome.DeskripsiKeunggulan2 ;
document.getElementById('JudulKeunggulan3').innerText = bodyhome.JudulKeunggulan3 ;
document.getElementById('deskripsiunggulan3').innerText = bodyhome.DeskripsiKeunggulan3 ;
// kata alumni
document.getElementById('namaAlumni1').innerText = bodyhome.NamaAlumni1;
document.getElementById('fotoAlumni1').src = bodyhome.FotoAlumni1;
document.getElementById('kataAlumni1').innerText = bodyhome.KataAlumni1;
document.getElementById('namaAlumni2').innerText = bodyhome.NamaAlumni2;
document.getElementById('fotoAlumni2').src = bodyhome.FotoAlumni2;
document.getElementById('kataAlumni2').innerText = bodyhome.KataAlumni2;
document.getElementById('namaAlumni3').innerText = bodyhome.NamaAlumni3;
document.getElementById('fotoAlumni3').src = bodyhome.FotoAlumni3;
document.getElementById('kataAlumni3').innerText = bodyhome.KataAlumni3;

        // Sembunyikan overlay setelah data berhasil dimuat
        loadingOverlay.style.display = 'none';
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Sembunyikan overlay meskipun terjadi error
        loadingOverlay.style.display = 'none';
      });
  });
  
// Element untuk animasi header
const headerText = document.querySelector('.header-content');
const headerImage = document.querySelector('.header-image');

// Tambahkan kelas untuk animasi navbar dan header saat halaman dimuat
window.addEventListener('load', () => {
    // Tambahkan kelas ke nav untuk memicu animasi slide down
   // document.querySelector('nav').classList.add('visible');

    // Tambahkan kelas ke teks dan gambar header untuk memicu animasi mereka
    headerText.classList.add('animate');
    headerImage.classList.add('animate');
});

// Fungsi untuk animasi hitung cepat
function animateCount(element, start, end, duration) {
    let startTime = null;

    function countStep(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = currentTime - startTime;
        const rate = progress / duration;
        const currentCount = Math.floor(start + rate * (end - start));

        if (currentCount <= end) {
            element.innerText = currentCount;
            requestAnimationFrame(countStep);
        } else {
            element.innerText = end;
        }
    }

    requestAnimationFrame(countStep);
}

// Intersection Observer untuk memulai animasi hitung cepat saat elemen terlihat
const counters = document.querySelectorAll('.item-icon span');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const endValue = parseInt(counter.innerText);
            animateCount(counter, 0, endValue, 3000); // Durasi animasi 2000ms (2 detik)
            observer.unobserve(counter); // Hentikan pengamatan setelah animasi berjalan
        }
    });
}, {
    threshold: 1.0 // Memastikan elemen sepenuhnya terlihat sebelum memulai animasi
});

// Mulai mengamati elemen
counters.forEach(counter => observer.observe(counter));