function init(){
    var scene = new THREE.Scene();
    var gui = new dat.GUI();

    //scene.fog = new THREE.FogExp2(0xffffff,0.2);

    var box = getBox(1,1,1);
    box.position.y = box.geometry.parameters.height/2;

    var plane = getPlane(20);
    plane.rotation.x = Math.PI/2;
    plane.name = "plane-1";

    var pointLight = getPointLight(1);
    pointLight.position.y = 2;

    var sphere = getSphere(0.05);
    pointLight.add(sphere);

    gui.add(pointLight,'intensity',0,10);
    gui.add(pointLight.position,'y',0,5);

    scene.add(box);
    scene.add(plane);
    scene.add(pointLight);

    var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        1,
        1000
    );
    
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;
    camera.lookAt(new THREE.Vector3(0,0,0));

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setClearColor('rgb(120,120,120)');
    renderer.shadowMapEnabled = true;

    document.getElementById("webgl").appendChild(renderer.domElement);

    var controls = new THREE.OrbitControls(camera,renderer.domElement);
    update(renderer,scene,camera,controls);

    return scene;
}

function getBox(w,h,d){
    var geometry = new THREE.BoxGeometry(w,h,d);
    var material = new THREE.MeshPhongMaterial({
        color : 'rgb(120,120,120)'
    });

    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.castShadow = true;
    return mesh;
}

function getSphere(size){
    var geometry = new THREE.SphereGeometry(size,24,24);
    var material = new THREE.MeshBasicMaterial({
        color : 'rgb(255,255,255)'
    });

    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.castShadow = true;
    return mesh;
}

function getPlane(size){
    var geometry = new THREE.PlaneGeometry(size,size);
    var material = new THREE.MeshPhongMaterial({
        color : 'rgb(120,120,120)',
        side : THREE.DoubleSide
    });

    var mesh = new THREE.Mesh(
        geometry,
        material
    );
    mesh.receiveShadow = true;
    return mesh;
}

function getPointLight(intensity){
    var light = new THREE.PointLight(0xffffff,intensity);
    light.castShadow = true;
    return light;
}

function update(renderer,scene,camera,controls){
    renderer.render(
        scene,
        camera
    );
    controls.update();
    requestAnimationFrame(() => update(renderer,scene,camera,controls));
}

var scene = init();