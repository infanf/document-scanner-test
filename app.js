document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const snapButton = document.getElementById('snap');

    // Access the device camera and stream to video element
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            console.error("Error accessing the camera: ", err);
        });

    snapButton.addEventListener('click', () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        
        // Process the captured image using jscanify
        jscanify.process(imageData)
            .then(result => {
                console.log("Document scanned successfully: ", result);
                // Handle the result (e.g., display, save, etc.)
            })
            .catch(err => {
                console.error("Error scanning document: ", err);
            });
    });
});
