new p5((p) => {
    let video;
    let font;

    p.preload = function () {
        video = p.createVideo("../../../fingers.mov");
        font = p.loadFont("https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf");
    }

    p.setup = function () {
        p.createCanvas(320, 240);
        console.log(video.size());
        video.loop();
        video.hide();
        p.background(255);
        p.textFont(font, 10);
        // p.noStroke();
        // p.fill(0);

    }

    p.draw = function () {
        // video.pause()
        gaussFilter();
        let fr = p.frameRate();
        p.text( "frame rate: " + fr, -150, -100 );
        // video.loop()
    }

    function gaussKernel(size, sigma, k) {
        let value = 0.0; // by default
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

    function gaussFilter() {
        video.loadPixels();
        // p.loadPixels();
        let sigma = 11;
        let matrix = gaussKernel(11, sigma, 1)

        for (let x = 0; x < p.width; x++) {
            for (let y = 0; y < p.height; y++) {
                let c = convolution(x, y, matrix, video);
                let loc = (y * p.width + x) * 4;

                p.fill(c)
                p.stroke(c)
                p.point(x, y)

                // p.pixels[loc] = p.red(c);
                // p.pixels[loc + 1] = p.green(c);
                // p.pixels[loc + 2] = p.blue(c);
                // p.pixels[loc + 3] = 255;
            }
        }
        // p.updatePixels();
    }

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

}, "convolutionVideo");