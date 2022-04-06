new p5((p) => {
    let img;

    p.preload = function () {
        img = p.loadImage("../../../1.jpg");
    }

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

    p.setup = function () {
        p.createCanvas(700, 500);
        p.image(img, 0, 0);
        gaussFilter();
    }
    p.draw = function () {
        // img.loadPixels();
        // for(let i = 0; i < img.width * img.height * 4; i+=4){
        //     for(let j = 0; j < 4; j++){
        //         if(j != 3)
        //             img.pixels[i + j] = (img.pixels[i + j]+j) % 255
        //     }
        // }
        // img.updatePixels();
        p.image(img, 0, 0);
        img.resize(700, 500);
    }

    function gaussFilter() {
        img.loadPixels();
        let sigma = 11;
        let matrix = gaussKernel(11, sigma, 1)

        for (let x = 0; x < img.width; x++) {
            for (let y = 0; y < img.height; y++) {
                let c = convolution(x, y, matrix, img);
                let loc = (y * img.width + x) * 4;

                img.pixels[loc] = p.red(c);
                img.pixels[loc + 1] = p.green(c);
                img.pixels[loc + 2] = p.blue(c);
                img.pixels[loc + 3] = 255; 
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
                let loc = (img.width * yloc + xloc) * 4;

                if (xloc > 0 && xloc < img.width && yloc > 0 && yloc < img.height) {
                    rTotal += (img.pixels[loc]) * matrix[i][j];
                    gTotal += (img.pixels[loc + 1]) * matrix[i][j];
                    bTotal += (img.pixels[loc + 2]) * matrix[i][j];
                }

            }
        }
        return p.color(rTotal, gTotal, bTotal);
    }
}, "softwareConvolution");
