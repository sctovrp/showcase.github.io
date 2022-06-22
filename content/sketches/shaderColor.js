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

        // if(key) console.log(key)
        console.log(p.key)
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
