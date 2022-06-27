new p5((p) => {
    let conShader;
    let img;
    let filter;
    let filter2;
    let filter3;
    let defaultMaskValues = [];
    let mask = [];
    let maskSharpening = [0, -1, 0, -1, 4, -1, 0, -1, 0]
    let texOffset;
    let font;

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

    p.preload = function () {
        conShader = p.readShader('./../../../sketches/shaders/mask.frag', { varyings: Tree.texcoords2 });
        // image source: https://en.wikipedia.org/wiki/HSL_and_HSV#/media/File:Fire_breathing_2_Luc_Viatour.jpg
        img = p.loadImage("../../../1.jpg");
    }

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
        // p.textFont('Helvetica');
        // p.text("Frame Count with frameRate " + p.int(p.getFrameRate()), 100, 100);
    }

}, "shader2img");
