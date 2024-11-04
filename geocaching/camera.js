    ///////////// PARTIE CAMERA
    let stream = await navigator.mediaDevices.getUserMedia({video: true});
    let isCamOpened = false;
    let cameraBox = document.querySelector("#cameraBox");
    let canvas = document.querySelector("#canvas");
    let btnOpenCamera = document.querySelector("#cam");
    let btnTakePicture = document.querySelector("#btnShoot");
    let btnChangeCamera  = document.querySelector("#btnChange");
    let camSpace = document.querySelector("#camSpace");

    canvas.width = cameraBox.videoWidth;
    canvas.height = cameraBox.videoHeight;

    let constraints = {
        video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: { exact: "environment" }
        }
    };

    btnOpenCamera.addEventListener("click", () => {
        
        if (!isCamOpened) {
            isCamOpened = true;
            camSpace.style.display = "flex";
            cameraBox.srcObject = stream;
        }
        else {
            isCamOpened = false;
            camSpace.style.display = "none";
            cameraBox.srcObject = {};
        }
    });
    btnTakePicture.addEventListener("click", () => {
        canvas.width = cameraBox.videoWidth;
        canvas.height = cameraBox.videoHeight;
        canvas.getContext("2d").drawImage(cameraBox, 0, 0);
        print(canvas.getDataURL());
    });
    btnChangeCamera.addEventListener("click", () => {
        constraints.video.facingMode.exact = "selfie";
    });
