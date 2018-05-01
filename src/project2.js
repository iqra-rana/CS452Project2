// Iqra Rana, 4/10/2018
// Jackson DeMeyers, 4/30/2018

let gl;

let chair1;
let chair2;
let camera;
let lights;

// chair constants
const CHAIR_VERTICES_NUM = 2440;
const CHAIR_TRIANGLES_NUM = 4871;
const CHAIR_INDEXLIST = getFaces();
const CHAIR_VERTICES = getVertices();
const CAMERA_EYE = vec3(30.0, 80.0, 130.0);
const CAMERA_LOOK_AT = vec3(0.0, 0.0, 0.0);
const CAMERA_V_UP = vec3(0.0, 1.0, 0.0);

const AMBIENT = vec3(0.5, 0.77, 0.6);
const DIFFUSE = vec3(0.5, 0.9, 0.36);
const SHININESS = 20.0;
const SPECULAR = vec3(0.8, 0.8, 0.8);

// light 1 constants
const LIGHT_1_POS = vec3(0.0, 0.0, 0.6);
const LIGHT_1_AMB = vec3(0.1, 0.1, 0.1);
const LIGHT_1_DIFF = vec3(0.8, 0.8, 0.8);
const LIGHT_1_SPEC = vec3(0.8, 0.8, 0.8);

// light 2 constants
const LIGHT_2_POS = vec3(0.1, 0.0, 0.0);
const LIGHT_2_AMB = vec3(0.2, 0.2, 0.2);
const LIGHT_2_DIFF = vec3(1.0, 1.0, 0.6);
const LIGHT_2_SPEC = vec3(1.0, 0.77, 1.0);

// camera constants
const PROJ_LEFT = -100.0; //-40
const PROJ_RIGHT = 100.0; //40
const PROJ_TOP = 110.0; //60
const PROJ_BOTTOM = -110.0; //-40
const PROJ_NEAR = 60.0; //60
const PROJ_FAR = 195.0; //195

/**
 * Setup the WebGL viewport and create the objects for the scene.
 * Calls render(). Used on onload on html body (entry point).
 */
function initGL() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, 512, 512);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // create camera 
    const projectionParams = new ProjectionParams(PROJ_LEFT, PROJ_RIGHT, PROJ_TOP, PROJ_BOTTOM, PROJ_NEAR, PROJ_FAR);
    camera = new WebGlCamera(CAMERA_EYE, CAMERA_LOOK_AT, CAMERA_V_UP, projectionParams);

    // create lights
    const light1 = new WebGLLight(LIGHT_1_AMB, LIGHT_1_DIFF, LIGHT_1_SPEC, LIGHT_1_POS, true);
    const light2 = new WebGLLight(LIGHT_2_AMB, LIGHT_2_DIFF, LIGHT_2_SPEC, LIGHT_2_POS, true);
    lights = [light1, light2];

    // create chairs
    const chairObjParams = new ObjectParams(CHAIR_TRIANGLES_NUM, CHAIR_VERTICES, CHAIR_INDEXLIST);
    const chairLightParams = new LightingParams(AMBIENT, DIFFUSE, SPECULAR, SHININESS);
    const chair1Program = initShaders(gl, "vertex-shader", "fragment-shader");
    const chair2Program = initShaders(gl, "vertex-shaderChair2", "fragment-shaderChair2");
    chair1 = new WebGL3DObject(chair1Program, chairObjParams, camera, chairLightParams, null, null);
    chair2 = new WebGL3DObject(chair2Program, chairObjParams, camera, chairLightParams, null, null);

    render();
}

/**
 * Render all objects, lights, camera, etc... using RAF.
 */
function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    chair1.draw(lights);
    chair2.draw(lights);

    requestAnimFrame(render);
};
