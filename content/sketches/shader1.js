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
