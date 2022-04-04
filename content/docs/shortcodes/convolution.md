# Convolution

Definition of convolution

## Implementation of convolution


<!-- 
{{< p5-div sketch="../../../sketches/scintillating.js" >}} -->

Texto previo descriptivo muy tramador de convolución.

{{< tabs "convolution" >}}
{{< tab "hardware implementation" >}} 
# Uso de la función incorporada de p5.js
Aqui no hay mucho misterio, funcion de la referencia de p5.js

    {{< p5-div sketch="../../../sketches/hardwareConvolution.js" >}}
{{< /tab >}}

{{< tab "software implementation" >}} 
# Uso de funcion creada por el grupo de trabajo
Esta implementacion de convolución la realizamos de forma secuencial,
disfrutenla porque es lenta

# Generacion del kernel
Para la generacion del kernel del filtro gaussiano, utilizamos la funcion
descrita en este link (link de wikipedia donde se explica a fondo)
y su implementacion que se encuentra en este [repositorio github](https://github.com/sidorares/gaussian-convolution-kernel)
    {{< p5-div sketch="../../../sketches/softwareConvolution.js" >}}
{{< /tab >}}
{{< /tabs >}}

