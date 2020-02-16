import * as faceapi from 'face-api.js';


window.detectFace = async (inputId) => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('./models');
    let input = document.getElementById(inputId);
    const detections = await faceapi.detectAllFaces(input);
    //console.log(detections)
    if (detections.length > 0) {
        if (detections.length == 1) {
            cropFace(input, detections)

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

window.cropFace = async (image, detections) => {
    //console.log(image)
    //console.log(detections)
    const canvas = document.createElement('canvas');
    canvas.width = 750;
    canvas.height = 550;
    const context = canvas.getContext('2d');
    const x_axis = detections[0].box.x - 80;
    const y_axis = detections[0].box.y - 80;
    const width = detections[0].box.width + 160;
    const height = detections[0].box.height + 150;
    //console.log("X :", x_axis, "Y :", y_axis, "Width :", width, "Height :", height)
    const destWidth = width;
    const destHeight = height;
    const destX = canvas.width / 2 - destWidth / 2;
    const destY = canvas.height / 2 - destHeight / 2;
    context.drawImage(image, x_axis, y_axis, width, height, destWidth, destHeight, destX, destY)
    //context.drawImage(image, 0, 0, 500, 500)

    let imageRaw = canvas.toDataURL('image/png');
    //console.log(imageRaw)
    image.src = imageRaw;



}
