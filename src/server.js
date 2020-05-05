import React, {Component} from 'react';
import {AppRegistry, View, Text, TextInput, ScrollView} from 'react-native';

const url_login =
  'http://my-rest-api.000webhostapp.com/puskesmas-api/index.php/login?';
const url_listLaporan =
  'http://my-rest-api.000webhostapp.com/puskesmas-api/index.php/laporan?idUser=';
const url_sendLaporan =
  'http://my-rest-api.000webhostapp.com/puskesmas-api/index.php/laporan';
const url_jenis_penyakit =
  'http://my-rest-api.000webhostapp.com/puskesmas-api/index.php/laporan/jenis_penyakit';

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
