import * as faceapi from 'face-api.js';


window.detectFace = async (inputId) => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('./models');
    let input = document.getElementById(inputId);
    const detections = await faceapi.detectAllFaces(input);
    if(detections.length > 0) {
        if(detections.length == 1) {
            return {
                status: 1,
                message: "Single Face Found"
            }
        }
        else {
            return {
                status: detections.length,
                message: "Multiple Face Found"
            }
        }
            
    }
    else {
        return {
            status: 0,
            message: "No Face Found"
        }
    }
}
