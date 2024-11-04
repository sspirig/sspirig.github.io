"use strict";

let stream = await navigator.mediaDevices.getUserMedia({video: true});

let constraints = {
    video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: { exact: "environment" }
    }
};

let cameraBox = document.querySelector("#cameraBox");
let canvas = document.querySelector("#canvas");
let btnTakePicture = document.querySelector("#btnShoot");
let btnChangeCamera  = document.querySelector("#btnShoot");
cameraBox.srcObject = stream;

canvas.width = cameraBox.videoWidth;
canvas.height = cameraBox.videoHeight;

btnTakePicture.addEventListener("click", () => {
    canvas.width = cameraBox.videoWidth;
    canvas.height = cameraBox.videoHeight;
    canvas.getContext("2d").drawImage(cameraBox, 0, 0);
    print(canvas.getDataURL());
});
btnChangeCamera.addEventListener("click", () => {
    canvas.width = cameraBox.videoWidth;
    canvas.height = cameraBox.videoHeight;
    canvas.getContext("2d").drawImage(cameraBox, 0, 0);
    print(canvas.getDataURL());
});
