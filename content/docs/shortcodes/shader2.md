# Convolución aplicada a shaders

## Introducción

### Shader

Es un programa informático que realiza cálculos gráficos escrito en un lenguaje de sombreado que se puede compilar independientemente. Es una tecnología que ha experimentado una rápida evolución destinada a proporcionar al programador una interacción con la unidad de procesamiento gráfico (GPU) hasta ahora imposible. Los sombreadores son utilizados para realizar transformaciones de vértices o coloreado de píxeles, entre otras labores, con el propósito de crear efectos especiales, como iluminación, fuego o niebla.

Fuente: [Sombreador - Wikipedia](https://es.wikipedia.org/wiki/Sombreador)

### GLSL

Son las siglas en ingles para openGL Shading Language, el cual es un lenguaje de alto nivel de sombreado con una sintaxis basada en el lenguaje de programación C y RenderMan. Desarrollado para su uso dentro de OpenGL, se ha enfocado en permitir altos niveles de paralelismo en su ejecución.

Fuente: [Getting started - What is a fragment shader?](https://thebookofshaders.com/01/)

Con el anterior marco teórico presente, el ejercicio presente es aprovechar el uso de shaders para crear programas que hagan calculos en paralelo, haciendo uso del lenguaje GLSL.

El ejercicio propuesto está en aplicar el filtro gaussiano y el filtro laplaciano a la imagen trabajada en la sección enfocada a convolución.

## Desarrollo

### Manejo en la instancia p5

Lo primero es definir la instancia p5 y las variables necesarias, así como la función generadora del filtro gaussiano. También se aplicó un filtro Laplaciano simple retomado de esta [pagina web](http://matematicas.uam.es/~fernando.chamizo/dark/d_simimf.html). 

{{< details "Función del kernel de Gauss" >}}
```js
new p5((p) => {
    function gaussKernel(size, sigma, k) {
        let value = 0.0;
        let kernel = [...Array(size)].map(e => Array(size).fill(value));

        let sum = 0;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let x = i - (size - 1) / 2.0;
                let y = j - (size - 1) / 2.0;
                kernel[i][j] = k * Math.exp(((Math.pow(x, 2) + Math.pow(y, 2)) / ((2 * Math.pow(sigma, 2)))) * (-1));
                sum += kernel[i][j];
            }
        }
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                kernel[i][j] /= sum;

            }
        }
        vector = [].concat(...kernel)
        return vector;
    }

    // ...
}
```
{{< /details >}}

Luego en la función ``preload()`` de p5 hacemos referencia al archivo donde tenemos el shader y la imagen que deseamos modificar

{{< details "Función preload" >}}
```js
p.preload = function () {
    conShader = p.readShader('./../../../sketches/shaders/mask.frag', { varyings: Tree.texcoords2 });
    img = p.loadImage("../../../2.png");
}
```
{{< /details >}}

Ahora bien, tenemos que transmitir mediante variables uniformes datos importantes para poder realizar la convolución en el shader.
Es importante recordar que el shader se aplica a todos los píxeles que se encuentran en la imagen, facilitándonos el proceso de iterar a través de la misma.

En esta situación, debemos pues es enviar:

- La imagen que deseamos modificar.
- El kernel que contiene los valores correctos para aplicar el filtro.
- El desplazamiento dentro del kernel para aplicar correctamente los valores del kernel en la imagen, es decir su desplazamiento relativo dentro de la imagen.

Esto podremos apreciarlo en la siguiente función:

{{< details "Función fragment" >}}
```js
function fragment() {
    // define shader
    p.shader(conShader);

    // send img and mask
    conShader.setUniform('texture', img);
    conShader.setUniform('mask', mask);
    conShader.setUniform('maskSharpening', maskSharpening);

    // define and send texOffset
    texOffset = [1 / img.width, 1 / img.height]
    conShader.setUniform('texOffset', texOffset)
}
```
{{< /details >}}

Ahora bien, dentro de la función ``setup()`` definimos el espacio de trabajo y las banderas que vamos a utilizar para saber cuál filtro se va a mandar.

{{< details "Función setup" >}}
```js
p.setup = function () {
    p.createCanvas(700, 500, p.WEBGL);
    p.noStroke();
    p.textureMode(p.NORMAL);

    // define and send filter
    filter = p.createCheckbox('gaussian filter', false);
    filter2 = p.createCheckbox('sharpening filter', false);
    filter3 = p.createCheckbox('both filters', false);

    filter.style('color', 'white');
    filter.input(() => conShader.setUniform('filter', filter.checked()));
    filter2.style('color', 'white');
    filter2.input(() => conShader.setUniform('filter', filter2.checked()));
    filter3.style('color', 'white');
    filter3.input(() => conShader.setUniform('filter', filter3.checked()));
}
```
{{< /details >}}

Por último, en la función ``draw()``, actualizaremos el espacio de trabajo y las variables según la elección de filtro que vayamos a utilizar.

{{< details "Función draw" >}}
```js
p.draw = function () {
    p.background(0);
    p.quad(-p.width / 2, -p.height / 2, p.width / 2, -p.height / 2, p.width / 2, p.height / 2, -p.width / 2, p.height / 2);
        
    fragment(mask)
    if (filter.checked()) {
        // create mask
        mask = gaussKernel(3, 50, 1);
    }
    if (filter2.checked()) {
            
        mask = maskSharpening;
    }
    if (filter3.checked()) {
        if (mask.length == 0) {
            mask = Array(maskSharpening.length).fill(1);
        }
        let newMask = [];
        for (let index = 0; index < mask.length; index++) {
            newMask.push(mask[index] + maskSharpening[index])
        }
        mask = newMask;
    }
}
```
{{< /details >}}

### Manejo en el shader

Dentro del archivo ``.frag``, debemos de hacer coincidir el nombre de aquellas variables uniformes que mandamos desde la instancia p5.

{{< details "Variables en .frag" >}}
```frag
precision mediump float;

uniform sampler2D texture;
uniform vec2 texOffset;
// holds the 3x3 kernel
uniform float mask[9];

uniform bool filter;

// we need our interpolated tex coord
varying vec2 texcoords2;
```
{{< /details >}}

En la función ``main()`` es obtener los valores respectivos de la imagen en las coordinadas correctas que se reflejan al superponer el kernel. Luego con estos valores, multiplicamos los valores de la imagen con los del kernel.

Una vez hecho esto, se aplica los valores obtenidos sobre la imagen.

{{< details "Función main" >}}
```frag
void main() {
    // 1. Use offset to move along texture space.
    vec2 tc0 = texcoords2 + vec2(-texOffset.s, -texOffset.t);
    vec2 tc1 = texcoords2 + vec2(         0.0, -texOffset.t);
    vec2 tc2 = texcoords2 + vec2(+texOffset.s, -texOffset.t);
    vec2 tc3 = texcoords2 + vec2(-texOffset.s,          0.0);
  
    vec2 tc4 = texcoords2 + vec2(         0.0,          0.0);
    vec2 tc5 = texcoords2 + vec2(+texOffset.s,          0.0);
    vec2 tc6 = texcoords2 + vec2(-texOffset.s, +texOffset.t);
    vec2 tc7 = texcoords2 + vec2(         0.0, +texOffset.t);
    vec2 tc8 = texcoords2 + vec2(+texOffset.s, +texOffset.t);

    // 2. Sample texel neighbours within the rgba array
    vec4 rgba[9];
    rgba[0] = texture2D(texture, tc0);
    rgba[1] = texture2D(texture, tc1);
    rgba[2] = texture2D(texture, tc2);
    rgba[3] = texture2D(texture, tc3);
    rgba[4] = texture2D(texture, tc4);
    rgba[5] = texture2D(texture, tc5);
    rgba[6] = texture2D(texture, tc6);
    rgba[7] = texture2D(texture, tc7);
    rgba[8] = texture2D(texture, tc8);

    // 3. Apply convolution kernel
    vec4 convolution;
    for (int i = 0; i < 9; i++) {
        convolution += rgba[i]*mask[i];
    }

    // 4. Set color from convolution or let img without modification
    if (filter) {
        gl_FragColor = vec4(convolution.rgb, 1.0); 
    } else {
        gl_FragColor = rgba[4];
    }
}
```
{{< /details >}}


## Resultados

La implementación anteriormente descrita se encuentra en este lienzo aplicado a una imagen.

{{< p5-div autoplay="true" sketch="../../../sketches/shader2img.js" lib1="../../../sketches/p5.treegl.js" >}}

En este lienzo se encuentra la implementación se esta aplicando a un video.

{{< p5-div autoplay="true" sketch="../../../sketches/shader2.js" lib1="../../../sketches/p5.treegl.js" >}}

Ahora si se compara con la implementación realizada anteriormente en este blog, claramente se puede ver la diferencia en el framerate, incluso, en el hecho de visualizar ambos lienzos con el efecto activado sin ningún inconveniente o disminución en el framerate.

{{< button relref="/docs/shortcodes/convolutionVideo" >}}Convolución aplicada a video{{< /button >}}


## Conclusiones y trabajos futuros

Podemos concluir que el uso de shaders hace más eficiente la implementación de convoluciones en archivos de imágenes o video, cumpliendo así, una meta de estudio propuesta anteriormente para ambos aspectos. Queda pues, la invitación a revisar su uso en otros aspectos, que permitan realizar proyectos de diversa índole temática y técnica.
