# Project 2: INTERACTING OBJECTS
### Iqra Rana, Jackson DeMeyers, Matthew Michaels
#### 5/8/2018

DESCRIPTION:
	This project displays a wooden table, two chairs on its either side and a crystal on top of it. The chairs are specular illuminated in green and yellow lights and the crystal is red textured. All the objects, one at a time, can be translated and rotated in four directions. Translation takes place in left, right, forward (into the scene) and backward (away from the scene) directions. Rotation takes place in positive x and y; and negative x and y directions.


CONTROLS:
	After an object is selected, it can be transformed using following controls

	* Translations
		A - Left
		D - Right
		W - Forward (into scene)
		S - Back (toward screen)

	* Rotations
		UpArrow - Positive X
		DownArrow - Negative X
		RightArrow - Positive Y
		LeftArrow - Negative Y


IMPLEMENTATION:
	The source code is divided into three main groups: objects, WebGL3D and main html and js files.
	1. objects: This group defines three distinct objects of the scene: chair, cube (table) and tetrahedron (crystal). Each of the js files return vertices and faces (indexList), cube and tetrahedron return their respective textured coordinates as well.
	
	2. WebGL3D: This group defines classes WebGLCamera, WebGLLight, WebGL3DObject and another sub-group called params. 
		a) Camera defines eye, at and vup vectors and M, M inverse transformed and perspective projection matrices. 
		b) Light defines ambient, diffuse and specular reflections and position of the two lights used to illuminate chairs.
		c) 3DObject renders the shape through camera using lookat approach. It uses textures, transformation controls, camera and lighting in the rendering process.
		d) params define 5 different kind of parameters: transformation, lighting, texture, projection and object. Transformation params define translation and rotation variables. Lighting params define ambient, diffuse, specular and shininess variables.
	
	3. 	a) constants.js defines all the constant variables used in project2.js
		b) projec2.js sets up the WebGL viewport and creates objects of the scene. It creates camera, lights and objects and sets up table's and crystal's textures in its initGL() function. It also sets up keys for object transformations. It also sets up radio button selection menu that lets the user to select the object they wish to transform. The resetObjs() function resets the objects in the scene to their original position.
		c) project2.html brings the objects and the scene on display. It sets up vertex and fragment shaders and calls the initGL function from projec2.js.


