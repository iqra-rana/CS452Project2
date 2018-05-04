// Iqra Rana, 4/10/2018
// Jackson DeMeyers, 4/30/2018

let gl;

let chair1;
let chair2;
let table;
let crystal;
let camera;
let lights;

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
    gl.clearColor(0.8, 0.8, 0.8, 1.0);

    // create camera 
    const projectionParams = new ProjectionParams(PROJ_LEFT, PROJ_RIGHT, PROJ_TOP, PROJ_BOTTOM, PROJ_NEAR, PROJ_FAR);
    camera = new WebGlCamera(CAMERA_EYE, CAMERA_LOOK_AT, CAMERA_V_UP, projectionParams);

    // create lights
    const light1 = new WebGLLight(LIGHT_1_AMB, LIGHT_1_DIFF, LIGHT_1_SPEC, LIGHT_1_POS, 1);
    const light2 = new WebGLLight(LIGHT_2_AMB, LIGHT_2_DIFF, LIGHT_2_SPEC, LIGHT_2_POS, 2);
    lights = [light1, light2];

    // create shader program
    const program = initShaders(gl, "vShader", "fShader");
    const textureProgram = initShaders(gl, "vShaderTextured", "fShaderTextured");

    // setup textures
    const woodImg = document.getElementById("woodImg");
    const gemImg = document.getElementById("gemImg");

    const tableTexture = new TextureParams(TABLE_TEXTURE_COORDS, woodImg, 256);
    const crystalTexture = new TextureParams(CRYSTAL_TEXTURE_COORDS, gemImg, 256);

    // create objects
    const chairObjParams = new ObjectParams(CHAIR_TRIANGLES_NUM, CHAIR_VERTICES, CHAIR_INDEXLIST);
    const tableObjParams = new ObjectParams(TABLE_TRIANGLES_NUM, TABLE_VERTICES, TABLE_INDEXLIST);
    const crystalObjParams = new ObjectParams(CRYSTAL_TRIANGLES_NUM, CRYSTAL_VERTICES, CRYSTAL_INDEXLIST);

    const chair1TransParams = new TransformationParams(-70, 0, 22, 0, 1, 0);
    const chair2TransParams = new TransformationParams(60, 0, 0, 0, -.8, 0);
    const tableTransParams = new TransformationParams(-4, 0, 0, 0, .2, 0);
    const crystalTransParams = new TransformationParams(-1, 30, 20, 12, 12, 0);

    const lightParams = new LightingParams(AMBIENT, DIFFUSE, SPECULAR, SHININESS);

    chair1 = new WebGL3DObject(program, chairObjParams, chair1TransParams, camera, lightParams, null, null);
    chair2 = new WebGL3DObject(program, chairObjParams, chair2TransParams, camera, lightParams, null, null);
    table = new WebGL3DObject(textureProgram, tableObjParams, tableTransParams, camera, lightParams, tableTexture, null);
    crystal = new WebGL3DObject(textureProgram, crystalObjParams, crystalTransParams, camera, lightParams, crystalTexture, null);

    // begin rendering 
    render();
}

/**
 * Render all objects, lights, camera, etc... using RAF.
 */
function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    chair1.draw(lights);
    chair2.draw(lights);
    table.draw(lights);
    crystal.draw(lights);

    requestAnimFrame(render);
};
