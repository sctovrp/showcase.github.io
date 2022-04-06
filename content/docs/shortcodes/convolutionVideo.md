# Convolución aplicada a un video

## Definición del problema

Dado un archivo de imagen, se le debe realizar un enmascaramiento visual, que resulte en la aplicación de un efecto mediante el uso de máscaras de convolución.

## Sustento teórico

## Procesamiento de imágenes

Debemos empezar definiendo una imagen digital como una función bidimensional donde se tiene un número finito de elementos llamados píxeles, cada uno de ellos teniendo una localización y valor definidos.

Con esto en mente podemos definir el procesamiento de imágenes como el reconocimiento de imágenes 2D, 3D y secuencias de imágenes, análisis, manipulación, transmisión y otras áreas relacionadas, todas ellas haciendo uso de un algoritmo preestablecido. Dentro de las áreas que abarca esta área nos interesa la del procesamiento del color.

Fuente: [Procesamiento de imágenes digitales](http://alojamientos.us.es/gtocoma/pid/introduccion.html)

### ¿Qué es una máscara de convolución?

Con el fin de realizar un procesamiento del color que poseen las imágenes digitales, se hace uso de la convolución. Esta se define como el proceso de añadir cada elemento de la imagen a sus vecinos locales, luego de ser operados por un kernel. Esta operación no es una operación corriente de multiplicación de matrices, sino que se define de la siguiente manera:

{{< katex display >}}
(\begin{bmatrix}
a & b & c\\
d & e & f\\
g & h & i\\
\end{bmatrix}
*
\begin{bmatrix}
1 & 2 & 3\\
4 & 5 & 6\\
7 & 8 & 9\\
\end{bmatrix})
[2, 2] = 
(i \cdot 1) +
(h \cdot 2) +
(g \cdot 3) +
(f \cdot 4) +
(e \cdot 5) +
(d \cdot 6) +
(c \cdot 7) +
(b \cdot 8) + 
(a \cdot 9)
{{< /katex >}}

Tenemos que la matriz de la derecha es nuestro kernel, la de la izquierda es una porción de la imagen, la operación seria invertir alguna de las dos matrices (normalmente suele ser el kernel). Arriba se hace un ejemplo rápido para las coordenadas {{< katex >}}[2, 2]{{< /katex >}}

Generalmente podríamos hablar que en términos de sumatorias, la convolución se describe como:

{{< katex display >}}
\begin{bmatrix}
x_{11} & x_{12} & \cdots & x_{1n}\\
x_{21} & x_{22} & \cdots & x_{21}\\
\vdots & \vdots & \ddots & \vdots\\
x_{n1} & x_{n3} & \cdots & x_{mn}\\
\end{bmatrix}
*
\begin{bmatrix}
y_{11} & y_{12} & \cdots & y_{1n}\\
y_{21} & y_{22} & \cdots & y_{21}\\
\vdots & \vdots & \ddots & \vdots\\
y_{n1} & y_{n3} & \cdots & y_{mn}\\
\end{bmatrix}
=
\sum_{i=0}^{m-1}\sum_{i=0}^{n-1}x_{(m-i)(n-j)} \cdot y_{(1-i)(1-j)}
{{< /katex >}}

### Difuminado gaussiano

Mediante la implementación de la convolución podemos aplicar efectos a las imágenes digitales objetivos, en esta ocasión hemos decidió aplicar el difuminado gaussiano. En esta caso, como manejamos dos dimensiones en las operaciones, la formula se describe de la siguiente forma:

{{< katex display >}}
G(x, y) = \dfrac{1}{\sqrt{2 \pi \sigma}}\exp(-\dfrac{x^2 + y^2}{2 \sigma^2})
{{< /katex >}}

Esto nos permite generar un kernel que aplica de forma más eficiente el efecto a causa de los valores más exactos. Por ejemplo:

{{< katex display >}}
\begin{bmatrix}
0.00296902 & 0.0133062 & 0.0219382 & 0.0133062 & 0.00296902 \\
0.0133062 & 0.0596343 & 0.0983203  & 0.0596343 & 0.0133062 \\        
0.0219382 & 0.0983203  & 0.162103  & 0.0983203 & 0.0219382 \\ 
0.0133062 & 0.0596343  & 0.0983203 & 0.0596343 & 0.0133062 \\   
0.00296902 & 0.0133062 & 0.0219382 & 0.0133062 & 0.00296902 \\
\end{bmatrix}
{{< /katex >}}

Fuente: [Gaussian blur](https://en.wikipedia.org/wiki/Gaussian_blur)

## Implementación de la convolución

Empezamos por revisar la función que genera el kernel gaussiano, la cual recibe un tamaño del kernel, un sigma y una constante multiplicativa k. En esta ocasión los valores serán de 11, 11 y 1 respectivamente. La función se basa en esta [implementación](https://www.geeksforgeeks.org/gaussian-filter-generation-c/).


{{< expand >}}
```js
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
    return kernel;
}
```
{{< /expand >}}

Ahora procedemos a cargar el video y preparar lo para aplicarle el efecto.

{{< expand >}}
```js
let video;

p.preload = function () {
    video = p.createVideo("../../../fingers.mov");
}

p.setup = function () {
    p.createCanvas(320, 240);
    video.loop();
    video.hide();
    p.background(255)
}

p.draw = function () {
    video.pause()
    gaussFilter();
    video.loop()
}
```
{{< /expand >}}

Ahora si, la implementación de la convolución plantea que se deban recorrer cada uno de los píxeles de los canales presentes en la video (en este caso, son cuatro: Red, Green, Blue, Alpha) y estos multiplicarlos con los valores que se encuentran en el kernel gaussiano que tengamos creado, para luego de haber hecho esto, se actualicen los valores de la imagen.

Para esto implementamos una función gaussFilter() que cargue el arreglo de pixeles y los envíe a la función convolution(), para luego poder modificar los valores en la video.

Es importante mencionar que en este caso, el video está siendo procesado frame por frame para seguir con la misma lógica que manejábamos en la implementación a imágenes.

{{< expand >}}
```js
function gaussFilter() {
    video.loadPixels();
    
    let sigma = 11;
    let matrix = gaussKernel(11, sigma, 1)

    for (let x = 0; x < p.width; x++) {
        for (let y = 0; y < p.height; y++) {
            let c = convolution(x, y, matrix, video);
            let loc = (y * p.width + x) * 4;
            p.fill(c)
            p.stroke(c)
            p.point(x, y)
        }
    }
}
```
{{< /expand >}}

Ahora en la función convolution(), la cual recibe las posiciones de los arreglos de los pixeles a modificar, el kernel como una matriz y el frame para poder obtener los valores a retornar de los pixeles ya con el efecto aplicado.

{{< expand >}}
```js
function convolution(x, y, matrix, video) {
    let rTotal = 0.0;
    let gTotal = 0.0;
    let bTotal = 0.0;
    let h = Math.floor(matrix.length / 2);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            let xloc = (x + i - h);
            let yloc = (y + j - h);
            let loc = (p.width * yloc + xloc) * 4;

            if (xloc > 0 && xloc < p.width && yloc > 0 && yloc < p.height) {
                rTotal += (video.pixels[loc]) * matrix[i][j];
                gTotal += (video.pixels[loc + 1]) * matrix[i][j];
                bTotal += (video.pixels[loc + 2]) * matrix[i][j];
            }
        }
    }
    return p.color(rTotal, gTotal, bTotal);
}
```
{{< /expand >}}

### Conclusiones y trabajo futuro

Podemos concluir que la aplicación de una máscara a través de la implementación de una convolución sobre una video a cada uno de los frames es realizable, fácil de comprender matemáticamente, pero que es posible que requiera de una implementación paralela para poder obtener valores de forma más rápida, esto se acentúa más, ya que tiene que renderizar cada uno de los frames modificados y al se una implementación secuencial. 

# Uso de función creada por el estudiante
Esta implementación de convolución la realizamos de forma secuencial, acá podemos apreciar que con los valores ingresados, el efecto es mucho más notorio, y por lo tanto, es más versátil para permitir graduar acorde el contexto que tan intenso es el efecto.

También recordar que es más lenta la visualización del video y es altamente posible que se demore en renderizar.

{{< p5-div autoplay="true" sketch="../../../sketches/convolutionVideo.js" >}}
