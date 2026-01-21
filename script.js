const modelNaiveBayes = {
    prior: { layak: 0.5, tidak_layak: 0.5 },
    likelihood: {
        penghasilan: {
            rendah: { layak: 0.85, tidak_layak: 0.10 },
            sedang: { layak: 0.30, tidak_layak: 0.40 },
            tinggi: { layak: 0.05, tidak_layak: 0.80 }
        },
        tanggungan: {
            sedikit: { layak: 0.15, tidak_layak: 0.60 },
            sedang:  { layak: 0.40, tidak_layak: 0.40 },
            banyak:  { layak: 0.80, tidak_layak: 0.10 }
        },
        pekerjaan: {
            pengangguran:     { layak: 0.95, tidak_layak: 0.05 },
            buruh_tani:       { layak: 0.80, tidak_layak: 0.15 },
            buruh_kasar:      { layak: 0.75, tidak_layak: 0.20 },
            pedagang_kecil:   { layak: 0.50, tidak_layak: 0.35 },
            ojek_online:      { layak: 0.40, tidak_layak: 0.40 },
            karyawan:         { layak: 0.20, tidak_layak: 0.60 },
            pns_tetap:        { layak: 0.01, tidak_layak: 0.95 }
        },
        // Likelihood Kondisi Fisik
        kondisi_rumah: {
            kumuh:      { layak: 0.90, tidak_layak: 0.05 },
            rusak:      { layak: 0.70, tidak_layak: 0.20 },
            sederhana:  { layak: 0.30, tidak_layak: 0.50 },
            bagus:      { layak: 0.10, tidak_layak: 0.70 },
            mewah:      { layak: 0.01, tidak_layak: 0.95 }
        },
        // Likelihood Status Kepemilikan
        status_milik: {
            numpang:       { layak: 0.85, tidak_layak: 0.10 },
            kost:          { layak: 0.70, tidak_layak: 0.25 },
            sewa_rumah:    { layak: 0.40, tidak_layak: 0.50 },
            milik_sendiri: { layak: 0.25, tidak_layak: 0.60 }
        }
    }
};

function hitungNaiveBayes() {
    const gaji = parseInt(document.getElementById('penghasilan').value);
    const tanggungan = parseInt(document.getElementById('tanggungan').value);
    const kerja = document.getElementById('pekerjaan').value;
    const kondisi = document.getElementById('kondisi_rumah').value;
    const milik = document.getElementById('status_milik').value;

    if (isNaN(gaji) || isNaN(tanggungan)) {
        alert("Mohon lengkapi data numerik!"); return;
    }

    // Discretization
    let kGaji = gaji < 1000000 ? 'rendah' : (gaji <= 3000000 ? 'sedang' : 'tinggi');
    let kTang = tanggungan < 2 ? 'sedikit' : (tanggungan <= 4 ? 'sedang' : 'banyak');

    // Hitung Skor
    let P_L = modelNaiveBayes.prior.layak * modelNaiveBayes.likelihood.penghasilan[kGaji].layak *
              modelNaiveBayes.likelihood.tanggungan[kTang].layak *
              modelNaiveBayes.likelihood.pekerjaan[kerja].layak *
              modelNaiveBayes.likelihood.kondisi_rumah[kondisi].layak *
              modelNaiveBayes.likelihood.status_milik[milik].layak;

    let P_T = modelNaiveBayes.prior.tidak_layak * modelNaiveBayes.likelihood.penghasilan[kGaji].tidak_layak *
              modelNaiveBayes.likelihood.tanggungan[kTang].tidak_layak *
              modelNaiveBayes.likelihood.pekerjaan[kerja].tidak_layak *
              modelNaiveBayes.likelihood.kondisi_rumah[kondisi].tidak_layak *
              modelNaiveBayes.likelihood.status_milik[milik].tidak_layak;

    // Output
    let total = P_L + P_T;
    let persentaseL = ((P_L / total) * 100).toFixed(2);
    let persentaseT = ((P_T / total) * 100).toFixed(2);

    const resultBox = document.getElementById('result');
    resultBox.className = "result-box " + (P_L > P_T ? "layak" : "tidak-layak");
    resultBox.classList.remove('hidden');

    document.getElementById('output-text').innerText = P_L > P_T ? "LAYAK MENERIMA" : "TIDAK LAYAK";
    document.getElementById('prob-layak').innerText = persentaseL;
    document.getElementById('prob-tidak').innerText = persentaseT;
}