# Shaders - Ejercicio 1 

En este ejercicio podemos ver 2 implementaciones básicas referentes a los fragment shaders retomadas del [blog](https://visualcomputing.github.io/docs/shaders/programming_paradigm/) preparado para la clase de Computación Visual del profesor Jean Pierre Charalambos Hernandez, a través de este enlace se accede al [blog](https://visualcomputing.github.io/docs/shaders/programming_paradigm/).

## Ejemplo basico

Acá nos basamos en las coordenadas baricéntricas y los canales de colores RGB-CMYK para ver la primera implementación de esta técnica, a través de shaders, esto en el archivo ``color.frag``, dicho código está retomado del blog del profesor en la sección referente a shaders.

Fuente: [Código base para shaders](https://visualcomputing.github.io/docs/shaders/coloring/)


{{< details color.frag >}}
```frag
// welcome to your first ever shader :)
// in glsl it is mandatory to define a precision!
precision mediump float;

// define color model: rgb (default) or cmy (its complementary)
uniform bool cmy;

// interpolated color is emitted from the vertex shader
// where the variable is defined in the same exact way
// see your console!
varying vec4 color4;

void main() {
  // Observe:
  // 1. All colors are normalized thus vec3(1.0, 1.0, 1.0) gives white
  // which is the same as vec3(1.0)
  // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Vector_constructors
  // 2. Use always the decimal digit as in vec3(1.0). Doing it otherwise
  // could lead to errors.
  // 3. color4.rgb builds a vec3 with the first three components of color4
  // (which is a vec4) this is refer to as 'swizzling'
  // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling
  gl_FragColor = cmy ? vec4((vec3(1.0) - color4.rgb), color4.a) : color4;
}
```
{{< /details >}}

{{< details Implementación >}}
```js
new p5((p) => {
    let colorShader;
    let cmy;
    let v1, v2, v3;

    p.preload = function() {
        // The vertex shader defines how vertices are projected onto clip space.
        // Most of the times a projection and modelview matrix are needed for this
        // (see: https://visualcomputing.github.io/docs/shaders/programming_paradigm/).
        // Here, however, we are going to:
        // 1. Define the triangle vertices directly in clip space, thus bypassing
        // both of these matrices (matrices: Tree.NONE). The p5 mandelbrot vertex
        // shader does just the same: https://p5js.org/reference/#/p5/loadShader
        // 2. Interpolate vertex color data (varyings: Tree.color4). Note that
        // color data is defined in a per vertex basis with the fill command below.
        // Have a look at the generated vertex shader in the console!
        // readShader: https://github.com/VisualComputing/p5.treegl#handling
        colorShader = p.readShader('./../../../sketches/shaders/color.frag', { matrices: 0, varyings: 1 << 0 });
    }

    p.setup = function() {
        // shaders require WEBGL mode to work
        p.createCanvas(300, 300, p.WEBGL);
        // https://p5js.org/reference/#/p5/shader
        p.shader(colorShader);
        randomizeTriangle();
    }

    p.draw = function() {
        p.background(0);
        // the fill command is used to define the colors
        // (to be interpolated) in a per-vertex basis
        p.beginShape(p.TRIANGLES);
        p.fill('red');
        p.vertex(v1.x, v1.y);
        p.fill('green');
        p.vertex(v2.x, v2.y);
        p.fill('blue');
        p.vertex(v3.x, v3.y);
        p.endShape();
    }

    // vertices are given directly in clip-space,
    // i.e., both x and y vertex coordinates ∈ [-1..1]
    function randomizeTriangle() {
        v1 = p5.Vector.random2D();
        console.log(v1)
        v2 = p5.Vector.random2D();
        v3 = p5.Vector.random2D();
    }

    p.keyTyped = function() {
        if (p.key == 'c') {
            cmy = !cmy;
            // https://p5js.org/reference/#/p5.Shader/setUniform
            colorShader.setUniform('cmy', cmy);
        }
        if (p.key == 'r') {
            randomizeTriangle();
        }
    }
}, "shaderColor");
```
{{< /details >}}

{{< p5-div sketch="../../../sketches/shaderColor.js" lib2="../../../sketches/p5.treegl.js" style="position: relative;" >}}

## Luma

Acá lo que se propone es aplicar el filtro Luma, modificando la textura de la imagen a través de ``texcoords2``, lo cual nos permite agilizar la modificación de los píxeles de la imagen, en seguida podemos encontrar los códigos utilizados para la implementación respectiva.

{{< details luma.frag >}}
```frag
precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = grey_scale ? vec4((vec3(luma(texel.rgb))), 1.0) : texel;
}
```
{{< /details >}}

{{< details Implementación >}}
```js
new p5((p) => {
    let lumaShader;
    let img;
    let grey_scale;

    p.preload = function () {
        lumaShader = p.readShader('./../../../sketches/shaders/luma.frag', { varyings: Tree.texcoords2 });
        img = p.loadImage("../../../1.jpg");
    }

    p.setup = function () {
        p.createCanvas(700, 500, p.WEBGL);
        p.noStroke();
        p.textureMode(p.NORMAL);
        p.shader(lumaShader);
        grey_scale = p.createCheckbox('luma', false);
        
        grey_scale.style('color', 'white');
        grey_scale.input(() => lumaShader.setUniform('grey_scale', grey_scale.checked()));
        lumaShader.setUniform('texture', img);
    }

    p.draw = function () {
        p.background(0);
        p.quad(-p.width / 2, -p.height / 2, p.width / 2, -p.height / 2, p.width / 2, p.height / 2, -p.width / 2, p.height / 2);
    }

}, "shader1");
```
{{< /details >}}

{{< p5-div sketch="../../../sketches/shader1.js" lib1="../../../sketches/p5.treegl.js" style="position: relative;" >}}

Ya para revisar el uso de shaders aplicados a una convolución podemos encontrarlo aquí.

{{< button relref="/docs/shortcodes/shader2" >}}Convolución aplicada en shaders{{< /button >}}