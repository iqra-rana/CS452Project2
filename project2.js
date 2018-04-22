// Name: Iqra Rana
// Date: 4/10/2018

var gl;
var numVertices;
var numTriangles;
var myShaderProgram;

var e, a, vup, d, n, k, u, l, v;

var M;
var Muniform;

var left, right;

var P_orth, P_persp;

var projection_orth, projection_persp;
var projectionFlag = 1;

var ambient, diffuse, specular;
var shininess;

var light1 = 1, light2 = 1;
var specularFlag = 1;

function initGL(){
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.enable(gl.DEPTH_TEST);
    gl.viewport( 0, 0, 512, 512 );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    myShaderProgram = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( myShaderProgram );

    
    numVertices = 2440;
    numTriangles = 4871;
    vertices = getVertices(); // vertices and faces are defined in object.js
    indexList = getFaces();
    
    
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexList), gl.STATIC_DRAW);
    
    var verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
	
	var vertices1 = [vec4( -.2,  .2, -.2,  1), // p0
                    vec4( -.2, -.2, -.2,  1), // p1
                    vec4(  .2, -.2, -.2,  1), // p2
                    vec4(  .2,  .2, -.2,  1), // p3
                    vec4(  .2,  .2,  .2,  1), // p4
                    vec4( -.2,  .2,  .2,  1), // p5
                    vec4( -.2, -.2,  .2,  1), // p6
                    vec4(  .2, -.2,  .2,  1)];  // p7

    // Colors at Vertices of Cube
    var vertexColors1 = [vec4( 0.0, 0.0, 1.0, 1.0), // p0
                        vec4( 0.0, 1.0, 0.0, 1.0), // p1
                        vec4( 1.0, 0.0, 0.0, 1.0), // p2
                        vec4( 1.0, 1.0, 0.0, 1.0), // p3
                        vec4( 1.0, 0.0, 1.0, 1.0), // p4
                        vec4( 0.0, 1.0, 1.0, 1.0), // p5
                        vec4( 1.0, 1.0, 1.0, 1.0), // p6
                        vec4( 0.3, 0.3, 0.3, 1.0)]; // p7

    // Every face on the cube is divided into two triangles,
    // each triangle is described by three indices into
    // the array "vertices"
    var indexList1 = [0, 1, 3,
                     1, 2, 3,
                     6, 5, 7,
                     4, 7, 5,
                     0, 6, 1,
                     5, 6, 0,
                     2, 4, 3,
                     2, 7, 4,
                     0, 4, 5,
                     0, 3, 4,
                     2, 1, 6,
                     2, 6, 7];
	
    
    var vertexPosition = gl.getAttribLocation(myShaderProgram,"vertexPosition");
    gl.vertexAttribPointer( vertexPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vertexPosition );
	
	render();
	drawObject();
	
					 
	var vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices1), gl.STATIC_DRAW );
	/*
	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indexList1), gl.STATIC_DRAW);*/
}

// Write a script for changing the perspective / orthographic flag
// using a button here
function changeProjection() {
	if(projectionFlag == 1) {
		projectionFlag = 0;
	}
	else {
		projectionFlag = 1;
	}
}

// Write a script for switching on / off the first light source flag
// using a button here
function startOrStopLight1() {
	if(light1 == 1) {
		light1 = 0;
	}
	else {
		light1 = 1;
	}
}


// Write a script for switching on / off the second light source flag
// using a button here
function startOrStopLight2() {
	if(light2 == 1) {
		light2 = 0;
	}
	else {
		light2 = 1;
	}
}

function startOrStopSpecular() {
	if(specularFlag == 1) {
		specularFlag = 0;
		console.log("Specular Flag Off");
	}
	else {
		specularFlag = 1;
		console.log("Specular Flag On");
	}
}

function render(){
    // WORK ON THIS LAB IN TWO ITERATIONS
    // In the first iteration, do Steps 1 and 2 (i.e., do the Viewing portion)
    // and try to determine if you can see a silhouette (i.e., a filled outline)
    // of the chair. You will not see any inner detail, but you will at least know
    // that the chair is within the viewport. Make sure while doing this step
    // to apply the modelview and projection matrices in the vertex shader
    
    // In the second iteration, do Steps 3.1 (normal calculation and light setup), 3.2 (vertex
    // shader calculations for lighting, and steps 3.3 (fragment shader calculations
    // for lighting) so you can see the inner detail of the chair
    
    // FOLLOWING LINES IN STEPS 1 AND 2 NEED CODE FOR EACH COMMENT
    
    
    // Step 1: Position the camera using the look at method
    
    // Define eye (use vec3 in MV.js)
	e = vec3(30.0, 80.0, 130.0);
    
    // Define at point (use vec3 in MV.js)
	a = vec3(0.0, 0.0, 0.0);
    
    // Define vup vector (use vec3 in MV.js)
	vup = vec3(0.0, 1.0, 0.0);
    
    // Obtain n (use subtract and normalize in MV.js)
	d = subtract(e, a); //e-a
	n = normalize(d, 0);
    
    // Obtain u (use cross and normalize in MV.js)
	k = cross(vup, n);
	u = normalize(k, 0);
    
    // Obtain v (use cross and normalize in MV.js)
	l = cross(n, u);
	v = normalize(l, 0);
    
    // Set up Model-View matrix M and send M as uniform to shader
	
	M = [ u[0], 								v[0], 								  n[0], 							   0.0,
		  u[1], 								v[1], 								  n[1], 							   0.0,
		  u[2], 								v[2], 								  n[2], 							   0.0,
		 -(e[0]*u[0])-(e[1]*u[1])-(e[2]*u[2]), -(e[0]*v[0])-(e[1]*v[1])-(e[2]*v[2]), -(e[0]*n[0])-(e[1]*n[1])-(e[2]*n[2]), 1.0];
				 
	Muniform = gl.getUniformLocation(myShaderProgram, "M");
	gl.uniformMatrix4fv(Muniform, false, flatten(M));

     
    // Step 2: Set up orthographic and perspective projections
    
    // Define left plane
	left = -200.0; //-40
    
    // Define right plane
	right = 200.0; //40
    
    // Define top plane
	var top = 230.0; //60
    
    // Define bottom plane
	var bottom = -220.0; //-40
    
    // Define near plane
	var near = 60.0; //60
    
    // Define far plane
	var far = 195.0; //195
    
    // Set up orthographic projection matrix P_orth using above planes
	P_orth = [ 2/(right-left), 				  0.0, 			  			     0.0, 			   	       0.0,
			   0.0, 			  			  2/(top-bottom), 			     0.0, 			   		   0.0,
			   0.0, 			  			  0.0, 			 			    -(2/(far-near)), 		   0.0,
			  -((left+right)/(right-left)),  -((top+bottom)/(top-bottom)),  -((far+near)/(far-near)),  1.0];
    
    // Set up perspective projection matrix P_persp using above planes
	P_persp = [ (2*near)/(right-left), 	    0.0, 					     0.0, 					     0.0,
			    0.0,				  	    (2*near)/(top-bottom), 	     0.0, 					     0.0,
			    (right+left)/(right-left),  (top+bottom)/(top-bottom),  -((far+near)/(far-near)),   -1.0,
			    0.0, 					    0.0, 					    -((2*far*near)/(far-near)),  0.0];
    
    // Use a flag to determine which matrix to send as uniform to shader
    // flag value should be changed by a button that switches between
    // orthographic and perspective projections
	
	gl.uniform1i(gl.getUniformLocation(myShaderProgram, "projectionFlag"), projectionFlag);
	
	projection_orth = gl.getUniformLocation(myShaderProgram, "projection_orth");
	gl.uniformMatrix4fv(projection_orth, false, flatten(P_orth));
	
	projection_persp = gl.getUniformLocation(myShaderProgram, "projection_persp");
	gl.uniformMatrix4fv(projection_persp, false, flatten(P_persp));	
    
    
    // Step 3.1: Normals for lighting calculations
    
    // Create face normals using faces and vertices by calling getFaceNormals
    var faceNormals = getFaceNormals( vertices, indexList, numTriangles );
    
    // Create vertex normals using faces, vertices, and face normals
    // by calling getVertexNormals
    var vertexNormals = getVertexNormals( vertices, indexList, faceNormals, numVertices, numTriangles );
    
    // Following code sets up the normals buffer (NOTE: THERE IS AN INTENTIONAL
    // MISTAKE HERE, YOU WILL NEED TO FIND IT AND FIX IT!!)
    var normalsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexNormals), gl.STATIC_DRAW);
    
    var vertexNormal = gl.getAttribLocation(myShaderProgram, "vertexNormal");
    gl.vertexAttribPointer( vertexNormal, 3, gl.FLOAT, false, 0, 0 ); //changed from 4 to 3
    gl.enableVertexAttribArray( vertexNormal );
    
    // Set up coefficients for the object
    // (ambient coefficients, diffuse coefficients,
    // specular coefficients, shininess)
    // and send them as uniform variables to the shader program (NEEDS CODE)
	ambient = vec3(0.5, 0.77, 0.6);
	diffuse = vec3(0.5, 0.9, 0.36);
	specular = vec3(0.8, 0.8, 0.8);
	shininess = 20.0;
	
	if(specularFlag == 1){
		specular = vec3(0.8, 0.8, 0.8);
		lightSpecular1 = vec3(0.8, 0.8, 0.8);
		lightSpecular2 = vec3(1.0, 0.77, 1.0);
	}
	else{
		specular = vec3(0.0, 0.0, 0.0);
		lightSpecular1 = vec3(0.0, 0.0, 0.0);
		lightSpecular2 = vec3(0.0, 0.0, 0.0);
	}
	
	gl.uniform3fv(gl.getUniformLocation(myShaderProgram, "ambient"), flatten(ambient));
    gl.uniform3fv(gl.getUniformLocation(myShaderProgram, "diffuse"), flatten(diffuse));
    gl.uniform3fv(gl.getUniformLocation(myShaderProgram, "specular"), flatten(specular));
	gl.uniform1f(gl.getUniformLocation(myShaderProgram, "shininess"), shininess);
    
    // Set up the first light source and send the variables
    // to the shader program (NEEDS CODE, VARIABLES DEPEND ON LIGHT TYPE)
	var lightPosition1 = vec3(0.0, 0.0, 0.6);
	var lightAmbient1 = vec3(0.1, 0.1, 0.1);
	var lightDiffuse1 = vec3(0.8, 0.8, 0.8);
	var lightSpecular1 = vec3(0.8, 0.8, 0.8);
	
    
    // Set up the second light source and send the variables
    // to the shader program (NEEDS CODE, VARIABLES DEPEND ON LIGHT TYPE)
	var lightPosition2 = vec3(0.1, 0.0, 0.0);
	var lightAmbient2 = vec3(0.2, 0.2, 0.2);
	var lightDiffuse2 = vec3(1.0, 1.0, 0.6);
	var lightSpecular2 = vec3(1.0, 0.77, 1.0);
	
    // Initialize up on/off flags for the both light sources. These
    // flags should be controlled using buttons

	gl.uniform1i(gl.getUniformLocation(myShaderProgram, "light1"), light1);
	gl.uniform1i(gl.getUniformLocation(myShaderProgram, "light2"), light2);
	
	
	gl.uniform3fv(gl.getUniformLocation(myShaderProgram, "lightAmbient1"), flatten(lightAmbient1));
    gl.uniform3fv(gl.getUniformLocation(myShaderProgram, "lightDiffuse1"), flatten(lightDiffuse1));
    gl.uniform3fv(gl.getUniformLocation(myShaderProgram, "lightSpecular1"), flatten(lightSpecular1));
	
    gl.uniform3fv(gl.getUniformLocation(myShaderProgram, "lightPosition1"), flatten(lightPosition1));

    
	gl.uniform3fv(gl.getUniformLocation(myShaderProgram, "lightAmbient2"), flatten(lightAmbient2));
    gl.uniform3fv(gl.getUniformLocation(myShaderProgram, "lightDiffuse2"), flatten(lightDiffuse2));
    gl.uniform3fv(gl.getUniformLocation(myShaderProgram, "lightSpecular2"), flatten(lightSpecular2));
	
	gl.uniform3fv(gl.getUniformLocation(myShaderProgram, "lightPosition2"), flatten(lightPosition2));
    
    // You will need to have an additional uniform variable for the
    // modelview inverse transpose that gets applied to the vertex normal.
    // Figure out the modelview inverse transpose and send it to the
    // shader program as a uniform (NEEDS CODE)
	var M_inv_transpose = [ u[0], u[1], u[2], 0.0,
							v[0], v[1], v[2], 0.0,
							n[0], n[1], n[2], 0.0,
							e[0], e[1], e[2], 1.0];
								
	var MInverseTransposeUniform = gl.getUniformLocation(myShaderProgram, "M_inv_transpose");
	gl.uniformMatrix4fv(MInverseTransposeUniform, false, flatten(M_inv_transpose));
    
	drawObject();
    requestAnimFrame(render);

};

// FOLLOWING CODE SKELETON FOR getFaceNormals() NEEDS TO BE COMPLETED
function getFaceNormals( vertices, indexList, numTriangles ) {
    // array of face normals
    var faceNormals = [];
    var faceNormal = [];
    
    // Following lines iterate over triangles
    for (var i = 0; i < numTriangles; i++) {
        // Following lines give you three vertices for each face of the triangle
        var p0 = vec3( vertices[indexList[3*i]][0],
                      vertices[indexList[3*i]][1],
                      vertices[indexList[3*i]][2]);
        
        var p1 = vec3( vertices[indexList[3*i+1]][0],
                      vertices[indexList[3*i+1]][1],
                      vertices[indexList[3*i+1]][2]);
        
        var p2 = vec3( vertices[indexList[3*i+2]][0],
                      vertices[indexList[3*i+2]][1],
                      vertices[indexList[3*i+2]][2]);
        
        // Calculate vector from p0 to p1 ( use subtract function in MV.js, NEEDS CODE )
		var p01 = subtract(p1, p0); //p1-p0
        
        // Calculate vector from p0 to p2 ( use subtract function, NEEDS CODE )
		var p02 = subtract(p2, p0); //p2-p0
        
        // Calculate face normal as the cross product of the above two vectors
        // (use cross function in MV.js, NEEDS CODE )
		faceNormal = cross(p01, p02);
        
        // normalize face normal (use normalize function in MV.js, NEEDS CODE)
		faceNormal = normalize(faceNormal, 0);
        
        // Following line pushes the face normal into the array of face normals
        faceNormals.push( faceNormal );
    }
    
    // Following line returns the array of face normals
    return faceNormals;
}

// FOLLOWING CODE SKELETON FOR getVertexNormals() NEEDS TO BE COMPLETED
function getVertexNormals( vertices, indexList, faceNormals, numVertices, numTriangles ) {
    var vertexNormals = [];
    
    // Iterate over all vertices
    for ( var j = 0; j < numVertices; j++) {
        
        // Initialize the vertex normal for the j-th vertex
        var vertexNormal = vec3( 0.0, 0.0, 0.0 );
        
        // Iterate over all the faces to find if this vertex belongs to
        // a particular face        
        for ( var i = 0; i < numTriangles; i++ ) {
            
            // The condition of the following if statement should check
            // if the j-th vertex belongs to the i-th face
            if ( j == indexList[3*i] ||  j == indexList[3*i+1] || j == indexList[3*i+2]) { // NEEDS CODE IN PARENTHESES
                
                // Update the vertex normal (NEEDS CODE)
				vertexNormal = add( vertexNormal, faceNormals[i] ); //?
            }
        }
		
		// Normalize the vertex normal here (NEEDS CODE)
		vertexNormal = normalize(vertexNormal);
        
        
        // Following line pushes the vertex normal into the vertexNormals array
        vertexNormals.push( vertexNormal );
    }
    
    return vertexNormals;
    
}

function drawObject() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.drawElements( gl.TRIANGLES, 3 * numTriangles, gl.UNSIGNED_SHORT, 0 );
};

