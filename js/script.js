"use strict"
let url = "https://restcountries.com/v3.1/all";
let html = "";
let countries = await ReadAllCountries();
console.log(countries);
const countryList = document.querySelector("#country-list");
countries.forEach(elem => {
    html += `<h3>${elem["translations"]["fra"]["official"]}</h3><img src=\"${elem["flags"]["png"]}\" alt="${elem["name"]["common"]}">
    <hr>`
});
countryList.innerHTML = html;

async function ReadAllCountries()
{
    const response = await fetch(url);
    const json = await response.json();
    return json;
}