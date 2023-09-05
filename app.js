// Load Cesium Viewer
const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
});

// Function to load 3D model
function loadModel(modelPath) {
    viewer.entities.removeAll();

    const position = Cesium.Cartesian3.fromDegrees(-75.62898254394531, 40.02804946899414, 0);
    const heading = Cesium.Math.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    const entity = viewer.entities.add({
        name: '3D Model',
        position: position,
        orientation: orientation,
        model: {
            uri: modelPath,
        },
    });

    viewer.trackedEntity = entity;
}

// File input event
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = '.glb,.fbx,.stl,.obj';
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const modelPath = URL.createObjectURL(file);
        loadModel(modelPath);
    }
});

// Trigger file input on button click
const uploadButton = document.createElement('button');
uploadButton.textContent = 'Upload Model';
uploadButton.addEventListener('click', () => {
    fileInput.click();
});

// Add buttons to the page
document.body.appendChild(uploadButton);
