const url_login =
  'https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/login?';
const url_listLaporan =
  'https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/laporan/kader?id=';
const url_sendLaporan =
  'https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/laporan';
const url_jenis_penyakit =
  'https://ciumbuleuit-puskesmas.000webhostapp.com/index.php/laporan/jenis_penyakit';

//fetch data login dari webservice
async function get_loginData(data) {
  try {
    let response = await fetch(url_login + data);
    let result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

//fetch data daftar laporan berdasarkan user ID dari webservice
async function get_daftarLaporan(user_id) {
  try {
    let response = await fetch(url_listLaporan + user_id);
    let result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

//mengirim data laporan yang sudah dibuat ke webservice
async function send_laporanData(post_body) {
  try {
    let response = await fetch(url_sendLaporan, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: post_body,
    });
    let result = await response.text();
    let msg = console.log(result);
    let status_code = await response.status;
    return status_code;
  } catch (error) {
    console.log(error);
  }
}

//mendapatkan data jenis penyakit pada komponen buat laporan
async function get_jenisPenyakit() {
  try {
    let response = await fetch(url_jenis_penyakit);
    let result = response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export {get_loginData};
export {get_daftarLaporan};
export {send_laporanData};
export {get_jenisPenyakit};
