new p5((p) => {
    let img;
    let input;

    function hypotenuse(x1, y1, x2, y2) {
        var xSquare = Math.pow(x1 - x2, 2);
        var ySquare = Math.pow(y1 - y2, 2);
        return Math.sqrt(xSquare + ySquare);
    }

    /*
     * Generates a kernel used for the gaussian blur effect.
     *
     * @param dimension is an odd integer
     * @param sigma is the standard deviation used for our gaussian function.
     *
     * @returns an array with dimension^2 number of numbers, all less than or equal
     *   to 1. Represents our gaussian blur kernel.
     */
    function generateGaussianKernel(dimension, sigma) {
        if (!(dimension % 2) || Math.floor(dimension) !== dimension || dimension < 3) {
            throw new Error(
                'The dimension must be an odd integer greater than or equal to 3'
            );
        }
        var kernel = [];

        var twoSigmaSquare = 2 * sigma * sigma;
        var centre = (dimension - 1) / 2;

        for (var i = 0; i < dimension; i++) {
            for (var j = 0; j < dimension; j++) {
                var distance = hypotenuse(i, j, centre, centre);

                // The following is an algorithm that came from the gaussian blur
                // wikipedia page [1].
                //
                // http://en.wikipedia.org/w/index.php?title=Gaussian_blur&oldid=608793634#Mechanics
                var gaussian = (1 / Math.sqrt(
                    Math.PI * twoSigmaSquare
                )) * Math.exp((-1) * (Math.pow(distance, 2) / twoSigmaSquare));

                kernel.push(gaussian);
            }
        }

        // Returns the unit vector of the kernel array.
        var sum = kernel.reduce(function (c, p) { return c + p; });
        return kernel.map(function (e) { return e / sum; });
    }


    p.setup = function () {
        p.createCanvas(700, 500);
        img = p.loadImage("../../../1.jpg");
        img.resize(700, 500);
        let sigma = 1;
        let kernel = generateGaussianKernel(5, sigma);
        console.log(typeof(kernel))
        /* [[0.00296902,    0.0133062,    0.0219382,    0.0133062,    0.00296902],    
[0.0133062,    0.0596343,    0.0983203,    0.0596343,    0.0133062],    
[0.0219382,    0.0983203,    0.162103,    0.0983203,    0.0219382],    
[0.0133062,    0.0596343,    0.0983203,    0.0596343,    0.0133062],    
[0.00296902,    0.0133062,    0.0219382,    0.0133062,    0.00296902]] */
    }

    p.draw = function () {
        img.filter(p.GRAY);
        p.image(img, 0, 0);
        img.resize(700, 500);
    }

}, "hardwareConvolution");