# opengl-texturemapping

## Description

This project demonstrates texture mapping in OpenGL using GLSL vertex and fragment shaders. The project features an animation of a salmon swimming in a sine wave, which can be altered by the user based on keyboard input. The vertex shader is used to define the position of the salmon's vertices based on the sine wave, and the fragment shader is used to paint the salmon's eye on after it's vertices positions are set by the vertex shader. Both shaders feature per-fragment lighting.

This assignment was based off of skeleton code provided by OSU's Intro to Computer Graphics course that was fairly large. As a way for employers to view the code I created efficiently, the files containing the code I contributed to the skeleton repository have been left in the root directory, while the entire project, including both my work and the skeleton code, is in the ``src`` directory.

A video demonstrating the code's functionality can be found [here](https://media.oregonstate.edu/media/t/1_yo5u70r2)

This project was created by Cade Wisecaver (wisecavc@oregonstate.edu) from skeleton code provided by Oregon State University

## Main File (sample.cpp) Implementation

### Core Functionality

The vertex data making up the salmon originates from the ``salmon.obj`` file (can be found in ``/src``). The main program in ``sample.cpp`` initializes the vertices in ``salmon.obj`` into a display list, and initializes the salmon.vert and salmon.frag shaders into a GLSLProgram object. Alongside initializing these objects, the main responsibility of the ``sample.cpp`` file is to re-draw the scene using the Display() function. Every time that is done, the shader program is activated, and the display list is called so that the vertices are drawn into the scene to the specifications provided by the shader.

### User Input Controls

The speed, amplitude, and frequency of the salmon's sine-wave like movement are controlled initialized to 0.5 when the animation starts. These values can be modified by the user with the following keyboard buttons (capital casse-insensitive):

- **A**: Increases amplitude by a factor of 0.05 per press
- **Z**: Decreases amplitude by a factor of 0.05 per press

- **S**: Increases speed by a factor of 0.05 per press
- **X**: Decreases speed by a factor of 0.05 per press

- **F**: Increases frequency by a factor of 0.05 per press
- **V**: Decreases frequency by a factor of 0.05 per press

- **R**: Runs the Reset() function and resets the animation with default values

## Vertex Shader (salmon.vert) Implementation

The vertex shader recieves values representing the runtime of the animation and 3 user controlled multipliers. It is responsible for applying a sine wave affected by the 4 passed arguments to the x coordinate of a vertex in the salmon.obj file. Afterwards, it passes the texture coordinates, the normal vector, the eye vector, and the light vector to the fragment shader.

Input:
- **uTime**: a uniform float that's value is cycled between 0 and 1, incremented in every cycle in the Animate() function in ``sample.cpp``. Acts as the variable that changes the value produced by the sine function in the vertex shader, changing the x-coordinate of the vertex on the salmon.
- **uAmp**: a uniform float that's value is set by the user's keyboard input. Acts as a multiplier on the sine function in the vertex shader to control the x-axis amplitude of the wave in which the salmon swims.
- **uSpeed**: a uniform float that's value is set by the user's keyboard input. Acts as a multiplier on the ``uTime`` variable in the vertex shader to control the playback speed of the animation.
- **uFreq**: a uniform float that's value is set by the user's keyboard input. Acts as a multiplier on the sine function in the vertex shader to control the frequency of the sin wave the salmon swims in, generating more bends in the salmon's swimming pattern as the value increases.

Output:
- **vST**: the texture coordinates of the current vertex, passed to salmon.frag
- **vN**: the normal vector of the current vertex, passed to salmon.frag
- **vE**: the eye vector of the current vertex, passed to salmon.frag
- **vL**: the light vector of the current vertex, passed to salmon.frag

### Fragment Shader (salmon.frag) Implementation

The fragment shader textures the vertices of the salmon with hard-coded color values. The shader textures the salmon’s eye a different color than the rest of it's body. The space constituting the eye where the alternate color should be applied is determined by measuring the euclidean distance between a given vertex's ST coordinates and the estimated ST coordinates of the center of the salmon's eye (S = 0.91, T = 0.65). If the euclidean distance is less than the length of the radius, the given vertex is considered to be a part of the eye, and the current fragment is colored in salmon-colored. Pre-fragment lighting is also implemented during this shader's process.

Input:
- **vST**: the texture coordinates of the current vertex, received directly from the vertex shader
- **vN**: the normal vector of the current vertex, received directly from the vertex shader
- **vE**: the eye vector of the current vertex, received directly from the vertex shader
- **vL**: the light vector of the current vertex, received directly from the vertex shader
- **uKa**: uniform variable defined in ``sample.cpp`` that contains the Ambient Reflection Coefficient for use in per-fragment lighting
- **uKd**: uniform variable defined in ``sample.cpp`` that contains the Diffuse Reflection Coefficient for use in per-fragment lighting
- **uKs**: uniform variable defined in ``sample.cpp`` that contains the Specular Reflection Coefficient for use in per-fragment lighting
- **uShininess**: uniform variable defined in ``sample.cpp`` that contains a value affecting the salmon's shininess for use in per-fragment lighting
