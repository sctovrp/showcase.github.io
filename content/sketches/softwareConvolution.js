new p5((p) => {
    let img;
    let input;
    let w = 80;

    const matrix = [[-1, -1, -1],
    [-1, 9, -1],
    [-1, -1, -1]];
    let first_time = false
    p.setup = function () {
        /* input = p.createFileInput(handleFile); */
        /* input.position(0, 0); */
        img = p.loadImage("../../../1.jpg");
        img.resize(700, 500);

        p.createCanvas(700, 500);
        
        p.pixelDensity(1);
        console.log(matrix.length, matrix[0].length)
    }
    p.draw = function () {
        /* img.filter(p.GRAY); */
        img.resize(700, 500);
        p.image(img, 0, 0);
        img.loadPixels();

        
        for (let x = 0; x < img.width; x++) {
            for (let y = 0; y < img.height; y++) {
                let c = convolution(x, y, matrix, img);
                let loc = (x + y * img.width) * 4;

                img.pixels[loc] = p.red(c);
                img.pixels[loc + 1] = p.green(c);
                img.pixels[loc + 2] = p.blue(c);
                img.pixels[loc + 3] = p.alpha(c); 
            }
        }
        img.updatePixels();
    }

    function convolution(x, y, matrix, img) {
        let rTotal = 0.0;
        let gTotal = 0.0;
        let bTotal = 0.0;
        let h = Math.floor(matrix.length / 2);

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix.length; j++) {
                let xloc = (x + i - h);
                let yloc = (y + j - h);
                let loc = (xloc + img.width * yloc) * 4;
                loc = p.constrain(loc, 0, img.pixels.length - 1);

                rTotal += (img.pixels[loc]) * matrix[i][j];
                gTotal += (img.pixels[loc] + 1) * matrix[i][j];
                bTotal += (img.pixels[loc] + 2) * matrix[i][j];
            }
        }
        rTotal = p.constrain(rTotal, 0, 255);
        gTotal = p.constrain(rTotal, 0, 255);
        bTotal = p.constrain(rTotal, 0, 255);

        return p.color(rTotal, gTotal, bTotal);
    }

    /* if (img) {
            p.background(img);
            p.image(img, 0, 0);
            img.filter(GRAY);
            p.image(img, 0, 0);
            console.log(img)
        } else {
            p.background(0);
        } */

    function handleFile(file) {
        if (file.type === 'image') {
            img = p.createImg(file.data, '');
        } else {
            img = null;
        }
    }
}, "softwareConvolution");
