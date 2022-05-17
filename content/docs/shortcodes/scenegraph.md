# Grafo de escena

## Definición del problema

Dado unos objetos en un espacio tridimensional, demostrar el uso del grafo de escena, modificando dichos objetos de manera independiente

## Sustento teórico

### Grafos

Los grafos son un conjunto de objetos llamados vértices o nodos unidos por enlaces llamados aristas o arcos, que permiten representar relaciones binarias entre elementos de un conjunto. Son objeto de estudio de la teoría de grafos.

Fuente: [Grafos](https://es.wikipedia.org/wiki/Grafo)

### Gráficos 3D

Los gráficos en 3D son gráficos que utilizan una representación tridimensional de datos geométricos (a menudo cartesianos) que se almacenan en el computador con el fin de realizar cálculos y representar su resultado. Se compone de varias partes:

{{< hint info >}}
### Modelado:
La etapa de modelado consiste en dar forma a objetos individuales que luego serán usados en la escena creada. Esto se puede realizar por medio de representación poligonal o definidos por curvas matemáticas. 
{{< /hint >}}

{{< hint info >}}
### Composición de escena: 
Esta etapa trata de distribuir los diferentes elementos (objetos, luces, cámaras...) en una escena que será utilizada para producir una imagen estática o una animación.  
{{< /hint >}}

{{< hint info >}}
### Animación: 
La animación en 3D es un proceso complejo, porque conlleva la realización previa de otros procesos como el diseño y modelado del objeto a animar. Consiste en la deformación o movimiento de los objetos de un modelo 3D a lo largo del tiempo. Para que haya animación, esta deformación o movimiento debe variar en algún aspecto respecto al tiempo: cambio de luces y formas, movimiento de objetos y cámaras, etc. Los objetos se pueden animar a partir de:

- Transformaciones básicas en los tres ejes (X, Y, Z), rotación, escala y traslación.
- Modificaciones en formas
{{< /hint >}}

Fuente: [Gráficos 3D por computadora](https://es.wikipedia.org/wiki/Gráficos_3D_por_computadora)

### Grafo de escena

Es grafo como estructura de datos referente a la representación gráfica de objetos geométricos compuestos (o escenas 3D completas)
que ordenan lógicamente sus nodos con la información de cada uno de los elementos geométricos deseados. Esta estructura organizada como un árbol n-ario en la cual se permite cualquier cantidad de nodos hijos, pero solo un nodo padre, facilitando que cuando se realice una operación sobre un nodo, esta se propague a todos los nodos hijos.

{{< mermaid id="grafo1" class="text-center">}}
stateDiagram-v2
    Avatar --> Tronco
    Tronco --> Cabeza
    Tronco --> Brazos
    Tronco --> Piernas
{{< /mermaid >}}

Fuentes: [Creación interactiva de grafos de escena para Aplicaciones Gráficas 3D](https://repositorio.uniandes.edu.co/bitstream/handle/1992/23488/u295637.pdf?sequence=1)

## Implementación

### Definición del grafo de escena

Primero definimos nuestro grafo de escena juntos con los objetos a modificar. Nuestros Objetos van a ser un tanque y una pelota, los cuales son creados por nosotros.

Sus transformaciones (animaciones) serán las siguientes:

- Girar la cámara y poder hacer zoom.
- Mover el tanque hacia adelante y hacia atrás.
- Cambiar el sentido de rotación de las llantas.
- Trasladar todo el escenario.
- Siempre rotará sobre su eje el cañón de nuestro tanque.
- Debe de haber una esfera que ninguna traslación afecte.

Ahora si, nuestro grafo es el siguiente:

{{< mermaid id="grafo2" class="text-center">}}
stateDiagram-v2
    Mundo --> Escena
    Escena --> Esfera
    Escena --> Tanque
    Escena --> Cámara
    Tanque --> Ruedas
    Tanque --> Cañón
{{< /mermaid >}}

### Código de la implementación

Lo primero que tenemos que hacer es definir nuestro cámara, así como sliders de ayuda para poder realizar todas las translaciones pedidas.

{{< expand >}}
```js
p.setup = function () {
    p.createCanvas(600, 450, p.WEBGL);

    xPan = p.createSlider(-600,600, 100,1);
    yPan = p.createSlider(-450,450, 50,1);

    xTank = p.createSlider(-400, 400, 0,1);

    xPan.position(0,550,0);
    yPan.position(0,580,0);

    xTank.position(200,550,0);
    
    p.createEasyCam();
    document.oncontextmenu = function () { return false; }
}
```
{{< /expand >}}

Luego definimos cada una de las partes del tanque, este código nos permitirá generar las orugas y el cuerpo del mismo. Acá podemos ver como en las translaciones agregamos los valores a variar, junto a otras modificaciones como por ejemplo, si tendrán esta textura o no, su posición inicial, su sentido de rotación, etc. 

Es importante mencionar el uso de las funciones integradas en ``p5.js`` de ``push()`` y ``pop()``, para poder navegar a través del grafo de escena y modificar los objetos deseados.

#### Oruga
{{< expand >}}
```js
function orruga(x,y,z) {
    p.push()
    p.noFill()
    p.translate(x + xTank.value(),y,z)
    p.beginShape();
    p.vertex(0, 0, 0);
    // more vertex added
    p.endShape()
    p.pop()
}
```
{{< /expand >}}

#### Casco
{{< expand >}}
```js
function casco() {
    p.push()
    p.texture(imgCamo); 
    p.textureMode(p.NORMAL);
    p.translate(xTank.value(), 0,0)
    p.beginShape();
    p.vertex(0, 0, 0, 0, 0);
    // more vertex added
    p.endShape(p.CLOSE);
    p.pop();
}
```
{{< /expand >}}

#### Coraza
{{< expand >}}
```js
function coraza() {
    p.push()
    p.texture(imgCamo); 
    p.textureMode(p.NORMAL);
    p.translate(-90 + xTank.value(),-50, 103);
    p.box(190, 60, 110);
    p.pop()
}
```
{{< /expand >}}

#### LLantas
{{< expand >}}
```js
function llantas(x,y,z) {
    p.push()
    p.fill("#09304a")
    p.translate(x + xTank.value(),y,z)
    p.rotateZ(1.5708)
    p.rotateX(1.5708)
    if(xPan.value() > 0){
        p.rotateY(p.frameCount * 0.01)
    }
    else{
        p.rotateY(p.frameCount * -0.01)
    }
    p.cylinder(30, 50)
    p.pop()
}
```
{{< /expand >}}

#### Cañón
{{< expand >}}
```js
function cannon(x,y,z){
    p.push()
    p.fill("#e8c517")
    p.translate(x + xTank.value(),y,z)
    p.rotateZ(1.5708)
    // p.rotateX(1.5708)
    p.rotateY(p.frameCount * 0.01)
    p.cylinder(15, 80)
    p.pop()
}
```
{{< /expand >}}

#### Esfera inmóvil
{{< expand >}}
```js
function sphereRef() {
    p.push()
    p.texture(imgCamo); 
    p.textureMode(p.NORMAL);
    p.translate(80,-50,-50)
    p.sphere(40)
    p.pop()
}
```
{{< /expand >}}

Luego ya procedemos a invocar dichos elementos según lo necesitemos dentro de la función ``draw()``, así como realizar la translación de toda la escena.

{{< expand >}}
```js
p.draw = function () {
    p.background(250);
    
    p.translate(xPan.value(), yPan.value(), 0)
    
    sphereRef()

    orruga(0,0,17)
    llanta(-10,-50, 20)
    llanta(-100,-50, 20)
    llanta(-190,-50, 20)
    casco()
    coraza()
    orruga(0,0,160)
    llanta(-10,-50, 185)
    llanta(-100,-50, 185)
    llanta(-190,-50, 185) 
    cannon(-135,-100, 100)
}
```
{{< /expand >}}

## Conclusiones y trabajo futuro

Podemos concluir que el grafo de escena es una herramienta muy útil a la hora de realizar gráficos en computadora y aplicarles modificaciones a cada unos de los objetos presentes, permitiendo que se hereden las modificaciones, simplificando el código y el entendimiento del desarrollo de este tipo de trabajos.

En trabajos futuros, se propone desarrollar más grafos de escena con otras estructuras, en donde la escena y la cámara no estén sujetas. También la mejora de gráficos e interacción del usuario con dichos gráficos.

## Escena 3D

Esta es la escena descrita anteriormente, los sliders de la izquierda son para aplicar las transformaciones a toda la escena, el de la derecha es para mover el tanque sobre el eje x.

{{< p5-div sketch="../../../sketches/sceneGraph.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" >}}

Movimiento de la escena / Movimiento del tanque en eje x
<!-- 
# diagrama del Scene Graph

Recordemos que había algo de como sacar grafos en md para agregarlo por aquí.

# Ejemplo

para incluir la libreria de treegl y easycam tenemos que agregar en la etiqueta de abajo lib"#"="direccion puesta en la instalacion".

Una muestra de esto seria tal que lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.min.js" -->

<!-- 
{{< p5-iframe sketch="/sketches/trees/3dbrush.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="475" >}} -->
