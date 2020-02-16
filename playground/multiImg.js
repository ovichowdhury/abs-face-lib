import * as faceapi from 'face-api.js';




window.detectFace = async (inputId) => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('./models');
    let input = document.getElementById(inputId);
    const detections = await faceapi.detectAllFaces(input);
    if (detections.length > 0) {
        if (detections.length == 1) {
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

window.cropFace = async (inputId, outputId) => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('./models');
    let input = document.getElementById(inputId);
    let output = document.getElementById(outputId);
    const detections = await faceapi.detectAllFaces(input);
    const multi = document.getElementById("multiImg")
    if (detections.length > 0) {
        //console.log(detections);

        detections.map(res => {
            //console.log(res._box)

            const canvas = document.createElement('canvas');
            canvas.width = 700;
            canvas.height = 550;
            const context = canvas.getContext('2d');
            const x_axis = res._box.x - 80;
            const y_axis = res._box.y - 80;
            const width = res._box.width + 160;
            const height = res._box.height + 150;
            //console.log("X :", x_axis, "Y :", y_axis, "Width :", width, "Height :", height)
            // const destWidth = width;
            // const destHeight = height;
            // const destX = canvas.width / 2 - destWidth / 2;
            // const destY = canvas.height / 2 - destHeight / 2;

            context.drawImage(input, x_axis, y_axis, width, height, 0, 0, 350, 250)
            //context.drawImage(image, 0, 0, 500, 500)
            let img = document.createElement("img")
            // img.style.width = "150px"
            img.classList.add("col-sm-3")

            let imageRaw = canvas.toDataURL('image/png');
            //console.log(imageRaw)
            img.src = imageRaw;
            multi.appendChild(img)
            multi.appendChild(document.createElement("br"))
        })
        // document.body.appendChild(multi)

    }
    else {
        console.error("Face Not Found");
    }

}
