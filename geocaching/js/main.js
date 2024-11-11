///////////// PARTIE MAP
var map = L.map('map').setView([46.204391, 6.143158], 13);
let isViewing = true;
let changeMapMode = document.querySelector("#changeMapMode");

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);

const marker1 = L.marker([46.201311, 6.143000]).addTo(map);
marker1.bindPopup("<img id=\"imageObtained\"> src=\"\"");

function CreateMarker(e) {

    var lat,
        lon,
        zoom;

    lat = e.latlng.lat;
    lon = e.latlng.lng;
    zoom = map.getZoom();

    let newMarker = new L.Marker(new L.LatLng(lat, lon));
    newMarker.bindPopup("<img id=\"imageObtained\"> src=\"\"");
    map.addLayer(newMarker);
}

function eventManager(e) {
    console.log(e.target);
    
    if (!isViewing)
    {
        SwitchToModeCam(e)
        if (isImageCreated)
        {

        }
        CreateMarker(e);
    }
    
}


map.on('click', eventManager);

changeMapMode.addEventListener("click", event =>{
    if (event.target.className == "toView"){
        isViewing = true;
        event.target.className = "toCreate";
        event.target.innerHTML = "Mode Créer";
    }
    else {
        isViewing = false;
        event.target.className = "toView";
        event.target.innerHTML = "Mode Vue";
    }
});

///////////// PARTIE CAMERA
let stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}});
// const trackId = stream.getVideoTracks()[0].id;
// let track = stream.getTrackById(trackId);
// console.log("getTrackById", stream.getTrackById(trackId))
let isCamOpened = false;
let cameraBox = document.querySelector("#cameraBox");
let camTools = document.querySelector("#camTools");
let canvas = document.querySelector("#canvas");
let btnOpenCamera = document.querySelector("#camBtn");
let btnTakePicture = document.querySelector("#btnShoot");
let btnChangeCamera  = document.querySelector("#btnChange");

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
function SwitchToModeCam(e)
{
    
    // console.log("avant: ", track.getConstraints());
    // track = stream.getVideoTracks()[0].facingMode = "environment";
    // //track = switchCameras(track, "back");
    
    if (!isCamOpened) {
        isCamOpened = true;
        
        camSpace.style.display = "flex";
        btnChangeCamera.style.display = "flex";
        btnShoot.style.display = "flex";
        btnOpenCamera.style.height = "8vh";
        btnOpenCamera.src = "./img/close.png";
        cameraBox.srcObject = stream;
    }
    else {
        isCamOpened = false;
        camSpace.style.display = "none";
        btnChangeCamera.style.display = "none";
        btnShoot.style.display = "none";
        
        btnOpenCamera.src = "./img/cam.png";
        btnOpenCamera.style.height = "10vh";
        cameraBox.srcObject = null;
    }
    btnTakePicture.addEventListener("click", () => {
        canvas.width = cameraBox.videoWidth;
        canvas.height = cameraBox.videoHeight;
        canvas.getContext("2d").drawImage(cameraBox, 0, 0);
        let imgDataURL = canvas.getDataURL("img/jpg");
        localStorage.setItem("imgData", imgDataURL)
        imageObtained.src = imgDataURL;
    });
    btnChangeCamera.addEventListener("click", () => {
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
}

async function SwitchCamera(facing){
    stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: facing}});
    cameraBox.srcObject = stream;
}