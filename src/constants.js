// objects constants
const CHAIR_TRIANGLES_NUM = 4871;
const CHAIR_INDEXLIST = getChairFaces();
const CHAIR_VERTICES = getChairVertices();

const TABLE_TRIANGLES_NUM = 12;
const TABLE_INDEXLIST = getTableFaces();
const TABLE_VERTICES = getTableVertices();

const CRYSTAL_TRIANGLES_NUM = 4;
const CRYSTAL_INDEXLIST = getTetrahedronFaces();
const CRYSTAL_VERTICES = getTetrahedronVertices();

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
const PROJ_LEFT = -100.0;
const PROJ_RIGHT = 100.0;
const PROJ_TOP = 110.0;
const PROJ_BOTTOM = -110.0; 
const PROJ_NEAR = 100.0;
const PROJ_FAR = 250.0;

const CAMERA_EYE = vec3(30.0, 80.0, 130.0);
const CAMERA_LOOK_AT = vec3(0.0, 0.0, 0.0);
const CAMERA_V_UP = vec3(0.0, 1.0, 0.0);
