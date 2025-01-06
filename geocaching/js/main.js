///////////// PARTIE MAP

var map = L.map('map').setView([46.204391, 6.143158], 13);
let isViewing = true;
let changeMapMode = document.querySelector("#changeMapMode");
var markerActive = null;
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);

const ICON_HIGHLIGHTED = L.icon({
    iconUrl: "../img/marker-icon-2x-red.png"
});


const marker1 = L.marker([46.201311, 6.143000]).addTo(map);
marker1.bindPopup("<div class=\"markerDisplay\"><img id=\"imageObtained\" src=\"img/tempImage.jpg\"><h4>Capturé le dd/mm/aaaa</h4></div>");

function CreateMarker(e, src) {

    var lat,
        lon,
        zoom;

    lat = e.latlng.lat;
    lon = e.latlng.lng;
    zoom = map.getZoom();

    let newMarker = new L.Marker(new L.LatLng(lat, lon));
    newMarker.bindPopup("<img id=\"imageObtained\"> src=\""+src+"\"");
    map.addLayer(newMarker);
}

function eventManager(e) {
    console.log(e.target);

    console.log("onMapClick");
    

    resetActiveMarker();

    markerActive = L.marker(e.latlng).addTo(map);
    markerActive.setIcon(ICON_HIGHLIGHTED);
    // markerActive.addEventListener("click", onMapClickWithMarker);


    
}

function resetActiveMarker() {
    // cas: un marqueur est déjà actif et on clique à un autre endroit
    if (markerActive != null) {
        // s'il est déjà associé à une image, on se contente de mettre l'icône par défaut et de cacher l'image
        if (JSON.stringify(markerActive.getLatLng()) in localStorage) {
            markerActive.setIcon(ICON_DEFAULT);
            myCanvas.style.display = "none";
        }
        // s'il n'existe pas encore d'image associée à ce marqueur, on le supprime
        else {
            map.removeLayer(markerActive);
        }
    }

}

function changeMode(event){
    if (event.target.className == "toView"){
        isViewing = true;
        event.target.className = "toCreate";

        isCamOpened = true;
        camSpace.style.display = "flex";
        btnChangeCamera.style.display = "flex";
        btnShoot.style.display = "flex";
        cameraBox.srcObject = stream;

        modeText.innerHTML = "Appareil photo";
    }
    else {
        // close cam
        isCamOpened = false;
        camSpace.style.display = "none";
        btnChangeCamera.style.display = "none";
        btnShoot.style.display = "none";
        
        
        cameraBox.srcObject = null;
        /////
        isViewing = false;
        event.target.className = "toView";
        modeText.innerHTML = "Carte";
    }
}

map.on('click', eventManager);

changeMapMode.addEventListener("click", changeMode);

///////////// PARTIE CAMERA
let stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}});
// const trackId = stream.getVideoTracks()[0].id;
// let track = stream.getTrackById(trackId);
// console.log("getTrackById", stream.getTrackById(trackId))
let isCamOpened = false;
let cameraBox = document.querySelector("#cameraBox");
let camTools = document.querySelector("#camTools");
let canvas = document.querySelector("#canvas");
let btnTakePicture = document.querySelector("#btnShoot");
let btnChangeCamera  = document.querySelector("#btnChange");
let modeText = document.querySelector("#modeText");
let camSpace = document.querySelector("#camSpace");
let imageObtained = document.querySelector("#image");
let facing = "environment";

let isImageCreated = false;

canvas.width = cameraBox.videoWidth;
canvas.height = cameraBox.videoHeight;

let constraints = {
    video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: { exact: "selfie" }
    }
};

// if (localStorage.getItem("imgData") != null){
//     imageObtained.src = localStorage.getItem("image");
// }
// else {
//     imageObtained.src = localStorage.getItem("imgData");
// }


btnChangeCamera.addEventListener("click", SwitchToModeCam);
async function SwitchToModeCam(e)
{
    
    // console.log("avant: ", track.getConstraints());
    // track = stream.getVideoTracks()[0].facingMode = "environment";
    // //track = switchCameras(track, "back");
    
    if (!isCamOpened) {

    }

}

btnTakePicture.addEventListener("click", async () => {
    TakePicture()
});
btnChangeCamera.addEventListener("click", async () => {
    stream.getTracks().forEach(track => {
        track.stop();
    });
    if (facing == "environment"){
        facing = "selfie";
    }
    else {
        facing = "environment";
    }
    SwitchCamera(facing);
});

async function SwitchCamera(facing){
    stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: facing}});
    cameraBox.srcObject = stream;
}


function TakePicture() {
    canvas.width = cameraBox.videoWidth;
    canvas.height = cameraBox.videoHeight;
    canvas.getContext("2d").drawImage(cameraBox, 0, 0);
    let imgDataURL = canvas.toDataURL("img/").replace("image/", "img/octet-stream");;
    localStorage.setItem("imgData", imgDataURL)
    imageObtained.src = imgDataURL;
    window.location.href= imgDataURL;
    imageObtained = true;
    return imgDataURL;
}