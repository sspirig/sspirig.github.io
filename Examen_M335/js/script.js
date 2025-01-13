/**
 * Projet: Examen M335
 * Fichier: script.js
 * Auteur: Santiago Spirig
 * Date: 16.12.2024
 */
"use strict";

const main = document.querySelector("main");
const carsList = main.querySelector("#carsList");
let apiURL = "car.php";
let htmlToInsert = "";
let cars = await SelectAllCars();
console.log(cars);

// RefreshHtmlList(cars);

function RefreshHtmlList(cars) {
    cars.forEach(elem => {
        htmlToInsert += `<div class="row" id="${elem[""]}">`; 
    });
}


async function SelectAllCars() {
    const response = await fetch(apiURL);
    const json = await response.json();
    return json;
}

