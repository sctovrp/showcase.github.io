new p5((p) => {
    let imgCamo;
    let xPan;
    let yPan;
    let xTank;

    p.preload = function () {
        imgCamo = p.loadImage("../../../sketches/camouflage-green.jpg")
    }
    p.setup = function () {
        p.createCanvas(600, 450, p.WEBGL);

        xPan = p.createSlider(-600,600, 100,1);
        yPan = p.createSlider(-450,450, 50,1);

        xTank = p.createSlider(-400, 400, 0,1);

        xPan.position(0,4400,0);
        yPan.position(0,4420,0);

        xTank.position(200,4400,0);
        
        p.createEasyCam();
        document.oncontextmenu = function () { return false; }
    }

    function orrugaD1(x,y,z) {
        p.push()
        p.noFill()
        p.translate(x + xTank.value(),y,z)
        p.beginShape();
        p.vertex(0, 0, 0);
        
        p.vertex(-10,0,0);
        p.vertex(-10,-10,0);
        p.vertex(-20,-10,0);
        p.vertex(-20,0,0);
        p.vertex(-30,0,0);
        p.vertex(-30,-10,0);
        p.vertex(-40,-10,0);
        p.vertex(-40,0,0);
        p.vertex(-50,0,0);
        p.vertex(-50,-10,0);
        p.vertex(-60,-10,0);
        p.vertex(-60,0,0);
        p.vertex(-70,0,0);
        p.vertex(-70,-10,0);
        p.vertex(-80,-10,0);
        p.vertex(-80,0,0);
        p.vertex(-90,0,0);
        p.vertex(-90,-10,0);
        p.vertex(-100,-10,0);
        p.vertex(-100,0,0);
        p.vertex(-110,0,0);
        p.vertex(-110,-10,0);
        p.vertex(-120,-10,0);
        p.vertex(-120,0,0);
        p.vertex(-130,0,0);
        p.vertex(-130,-10,0);
        p.vertex(-140,-10,0);
        p.vertex(-140,0,0);
        p.vertex(-150,0,0);
        p.vertex(-150,-10,0);
        p.vertex(-160,-10,0);
        p.vertex(-160,0,0);
        p.vertex(-170,0,0);
        p.vertex(-170,-10,0);
        p.vertex(-180,-10,0);
        p.vertex(-180,0,0);
        p.vertex(-190,0,0);
        p.vertex(-190,-10,0);
        p.vertex(-200,-10,0);
        p.vertex(-200,0,0);
        p.vertex(-210,0,0);
        p.vertex(-210,-10,0);
        p.vertex(-220,-10,0);
        p.vertex(-220,0,0);
        p.vertex(-230,0,0);
        p.vertex(-230,-10,0);
        p.vertex(-240,-10,0);
        p.vertex(-240,0,0);
        p.vertex(-250,0,0);
        p.vertex(-250,-10,0);
        p.vertex(-260,-10,0);
        p.vertex(-260,0,0);
        p.vertex(-270,0,0);
        p.vertex(-270,-10,0);
        p.vertex(-280,-10,0);
        p.vertex(-280,0,0);
        p.vertex(-290,0,0);
        p.vertex(-290,-10,0);
              
        p.vertex(-285,-15,0);
        p.vertex(-280,-20,0);
        p.vertex(-285,-25,0);
        p.vertex(-280,-30,0);
        p.vertex(-275,-25,0);
        p.vertex(-270,-30,0);
        p.vertex(-275,-35,0);
        p.vertex(-270,-40,0);
        p.vertex(-265,-35,0);
        p.vertex(-260,-40,0);
        p.vertex(-265,-45,0);
        p.vertex(-260,-50,0);
        p.vertex(-255,-45,0);
        p.vertex(-250,-50,0);
        p.vertex(-255,-55,0);
        p.vertex(-250,-60,0);
        p.vertex(-245,-55,0);
        p.vertex(-240,-60,0);
        p.vertex(-245,-65,0);
        p.vertex(-240,-70,0);
        p.vertex(-235,-65,0);
        p.vertex(-230,-70,0);
        p.vertex(-235,-75,0);
        p.vertex(-230,-80,0);
        p.vertex(-225,-75,0);
        p.vertex(-220,-80,0);
        p.vertex(-225,-85,0);
        p.vertex(-220,-90,0);
        p.vertex(-215,-85,0);
        p.vertex(-210,-90,0);
        p.vertex(-215,-95,0);
        p.vertex(-210,-100,0);
        p.vertex(-204,-93,0);

        p.vertex(-200, -100, 0);

        p.vertex(-190,-100,0);
        p.vertex(-190,-90,0);
        p.vertex(-180,-90,0);
        p.vertex(-180,-100,0);
        p.vertex(-170,-100,0);
        p.vertex(-170,-90,0);
        p.vertex(-160,-90,0);
        p.vertex(-160,-100,0);
        p.vertex(-150,-100,0);
        p.vertex(-150,-90,0);
        p.vertex(-140,-90,0);
        p.vertex(-140,-100,0);
        p.vertex(-130,-100,0);
        p.vertex(-130,-90,0);
        p.vertex(-120,-90,0);
        p.vertex(-120,-100,0);
        p.vertex(-110,-100,0);
        p.vertex(-110,-90,0);
        p.vertex(-100,-90,0);
        p.vertex(-100,-100,0);
        p.vertex(-90,-100,0);
        p.vertex(-90,-90,0);
        p.vertex(-80,-90,0);
        p.vertex(-80,-100,0);
        p.vertex(-70,-100,0);
        p.vertex(-70,-90,0);
        p.vertex(-60,-90,0);
        p.vertex(-60,-100,0);
        p.vertex(-50,-100,0);
        p.vertex(-50,-90,0);
        p.vertex(-40,-90,0);
        p.vertex(-40,-100,0);
        p.vertex(-30,-100,0);
        p.vertex(-30,-90,0);
        p.vertex(-20,-90,0);
        p.vertex(-20,-100,0);
        p.vertex(-10,-100,0);
        p.vertex(-10,-90,0);
        p.vertex(0,-90,0);
        p.vertex(0,-100,0);
        p.vertex(10,-100,0);
        p.vertex(10,-90,0);
        p.vertex(20,-90,0);
        p.vertex(20,-100,0);
        p.vertex(30,-100,0);
        p.vertex(30,-90,0);
        p.vertex(40,-90,0);
        p.vertex(40,-100,0);
        p.vertex(50,-100,0);
        p.vertex(50,-90,0);
        p.vertex(60,-90,0);
        p.vertex(60,-100,0);
        p.vertex(70,-100,0);
        p.vertex(70,-90,0);
        p.vertex(80,-90,0);
        p.vertex(80,-100,0);
        p.vertex(90,-100,0);
        
        p.vertex(90,-90,0);
        p.vertex(85,-85,0);
        p.vertex(90,-80,0);
        p.vertex(85,-75,0);
        p.vertex(80,-80,0);
        p.vertex(75,-75,0);
        p.vertex(80,-70,0);
        p.vertex(75,-65,0);
        p.vertex(70,-70,0);
        p.vertex(65,-65,0);
        p.vertex(70,-60,0);
        p.vertex(65,-55,0);
        p.vertex(60,-60,0);
        p.vertex(55,-55,0);
        p.vertex(60,-50,0);
        p.vertex(55,-45,0);
        p.vertex(50,-50,0);
        p.vertex(45,-45,0);
        p.vertex(50,-40,0);
        p.vertex(45,-35,0);
        p.vertex(40,-40,0);
        p.vertex(35,-35,0);
        p.vertex(40,-30,0);
        p.vertex(35,-25,0);
        p.vertex(30,-30,0);
        p.vertex(25,-25,0);
        p.vertex(30,-20,0);
        p.vertex(25,-15,0);       
        p.vertex(20,-20,0);
        p.vertex(15,-15,0);
        p.vertex(20,-10,0);
        p.vertex(15,-5,0);
        p.vertex(10,-10,0);
        p.vertex(5,-5,0);
        
        // arriba esta una cara completa
        // aca abajo vamos con la otra cara

        p.vertex(0, 0, 30);

        p.vertex(-10,0,30);
        p.vertex(-10,-10,30);
        p.vertex(-20,-10,30);
        p.vertex(-20,0,30);
        p.vertex(-30,0,30);
        p.vertex(-30,-10,30);
        p.vertex(-40,-10,30);
        p.vertex(-40,0,30);
        p.vertex(-50,0,30);
        p.vertex(-50,-10,30);
        p.vertex(-60,-10,30);
        p.vertex(-60,0,30);
        p.vertex(-70,0,30);
        p.vertex(-70,-10,30);
        p.vertex(-80,-10,30);
        p.vertex(-80,0,30);
        p.vertex(-90,0,30);
        p.vertex(-90,-10,30);
        p.vertex(-100,-10,30);
        p.vertex(-100,0,30);
        p.vertex(-110,0,30);
        p.vertex(-110,-10,30);
        p.vertex(-120,-10,30);
        p.vertex(-120,0,30);
        p.vertex(-130,0,30);
        p.vertex(-130,-10,30);
        p.vertex(-140,-10,30);
        p.vertex(-140,0,30);
        p.vertex(-150,0,30);
        p.vertex(-150,-10,30);
        p.vertex(-160,-10,30);
        p.vertex(-160,0,30);
        p.vertex(-170,0,30);
        p.vertex(-170,-10,30);
        p.vertex(-180,-10,30);
        p.vertex(-180,0,30);
        p.vertex(-190,0,30);
        p.vertex(-190,-10,30);
        p.vertex(-200,-10,30);
        p.vertex(-200,0,30);
        p.vertex(-210,0,30);
        p.vertex(-210,-10,30);
        p.vertex(-220,-10,30);
        p.vertex(-220,0,30);
        p.vertex(-230,0,30);
        p.vertex(-230,-10,30);
        p.vertex(-240,-10,30);
        p.vertex(-240,0,30);
        p.vertex(-250,0,30);
        p.vertex(-250,-10,30);
        p.vertex(-260,-10,30);
        p.vertex(-260,0,30);
        p.vertex(-270,0,30);
        p.vertex(-270,-10,30);
        p.vertex(-280,-10,30);
        p.vertex(-280,0,30);
        p.vertex(-290,0,30);
        p.vertex(-290,-10,30);
           
        p.vertex(-285,-15,30);
        p.vertex(-280,-20,30);
        p.vertex(-285,-25,30);
        p.vertex(-280,-30,30);
        p.vertex(-275,-25,30);
        p.vertex(-270,-30,30);
        p.vertex(-275,-35,30);
        p.vertex(-270,-40,30);
        p.vertex(-265,-35,30);
        p.vertex(-260,-40,30);
        p.vertex(-265,-45,30);
        p.vertex(-260,-50,30);
        p.vertex(-255,-45,30);
        p.vertex(-250,-50,30);
        p.vertex(-255,-55,30);
        p.vertex(-250,-60,30);
        p.vertex(-245,-55,30);
        p.vertex(-240,-60,30);
        p.vertex(-245,-65,30);
        p.vertex(-240,-70,30);
        p.vertex(-235,-65,30);
        p.vertex(-230,-70,30);
        p.vertex(-235,-75,30);
        p.vertex(-230,-80,30);
        p.vertex(-225,-75,30);
        p.vertex(-220,-80,30);
        p.vertex(-225,-85,30);
        p.vertex(-220,-90,30);
        p.vertex(-215,-85,30);
        p.vertex(-210,-90,30);
        p.vertex(-215,-95,30);
        p.vertex(-210,-100,30);
        p.vertex(-204,-93,30);

        p.vertex(-200, -100, 30);

        p.vertex(-190,-100,30);
        p.vertex(-190,-90,30);
        p.vertex(-180,-90,30);
        p.vertex(-180,-100,30);
        p.vertex(-170,-100,30);
        p.vertex(-170,-90,30);
        p.vertex(-160,-90,30);
        p.vertex(-160,-100,30);
        p.vertex(-150,-100,30);
        p.vertex(-150,-90,30);
        p.vertex(-140,-90,30);
        p.vertex(-140,-100,30);
        p.vertex(-130,-100,30);
        p.vertex(-130,-90,30);
        p.vertex(-120,-90,30);
        p.vertex(-120,-100,30);
        p.vertex(-110,-100,30);
        p.vertex(-110,-90,30);
        p.vertex(-100,-90,30);
        p.vertex(-100,-100,30);
        p.vertex(-90,-100,30);
        p.vertex(-90,-90,30);
        p.vertex(-80,-90,30);
        p.vertex(-80,-100,30);
        p.vertex(-70,-100,30);
        p.vertex(-70,-90,30);
        p.vertex(-60,-90,30);
        p.vertex(-60,-100,30);
        p.vertex(-50,-100,30);
        p.vertex(-50,-90,30);
        p.vertex(-40,-90,30);
        p.vertex(-40,-100,30);
        p.vertex(-30,-100,30);
        p.vertex(-30,-90,30);
        p.vertex(-20,-90,30);
        p.vertex(-20,-100,30);
        p.vertex(-10,-100,30);
        p.vertex(-10,-90,30);
        p.vertex(0,-90,30);
        p.vertex(0,-100,30);
        p.vertex(10,-100,30);
        p.vertex(10,-90,30);
        p.vertex(20,-90,30);
        p.vertex(20,-100,30);
        p.vertex(30,-100,30);
        p.vertex(30,-90,30);
        p.vertex(40,-90,30);
        p.vertex(40,-100,30);
        p.vertex(50,-100,30);
        p.vertex(50,-90,30);
        p.vertex(60,-90,30);
        p.vertex(60,-100,30);
        p.vertex(70,-100,30);
        p.vertex(70,-90,30);
        p.vertex(80,-90,30);
        p.vertex(80,-100,30);
        p.vertex(90,-100,30);
        
        p.vertex(90,-90,30);
        p.vertex(85,-85,30);
        p.vertex(90,-80,30);
        p.vertex(85,-75,30);
        p.vertex(80,-80,30);
        p.vertex(75,-75,30);
        p.vertex(80,-70,30);
        p.vertex(75,-65,30);
        p.vertex(70,-70,30);
        p.vertex(65,-65,30);
        p.vertex(70,-60,30);
        p.vertex(65,-55,30);
        p.vertex(60,-60,30);
        p.vertex(55,-55,30);
        p.vertex(60,-50,30);
        p.vertex(55,-45,30);
        p.vertex(50,-50,30);
        p.vertex(45,-45,30);
        p.vertex(50,-40,30);
        p.vertex(45,-35,30);
        p.vertex(40,-40,30);
        p.vertex(35,-35,30);
        p.vertex(40,-30,30);
        p.vertex(35,-25,30);
        p.vertex(30,-30,30);
        p.vertex(25,-25,30);
        p.vertex(30,-20,30);
        p.vertex(25,-15,30);       
        p.vertex(20,-20,30);
        p.vertex(15,-15,30);
        p.vertex(20,-10,30);
        p.vertex(15,-5,30);
        p.vertex(10,-10,30);
        p.vertex(5,-5,30);

        p.endShape(p.CLOSE);
        p.pop();
    }

    function casco1() {
        p.push()
        p.texture(imgCamo); 
        p.textureMode(p.NORMAL);
        p.translate(xTank.value(), 0,0)
        p.beginShape();
        p.vertex(0, -80, 60, 0, 0);
        p.vertex(-100, -80, 60, 1, 0);
        p.vertex(-90, -120, 70, 1, 1);
        p.vertex(-10, -120, 70, 0, 1);
        p.endShape(p.CLOSE);
        p.pop();
    }

    function casco2() {
        p.push()
        p.texture(imgCamo); 
        p.textureMode(p.NORMAL);
        p.translate(xTank.value(), 0,0)
        p.beginShape();
        p.vertex(0, -80, 140, 0, 0);
        p.vertex(-100, -80, 140, 1, 0);
        p.vertex(-90, -120, 130, 1, 1);
        p.vertex(-10, -120, 130, 0, 1);
        p.endShape(p.CLOSE);
        p.pop();
    }

    function casco3() {
        p.push()
        p.texture(imgCamo); 
        p.textureMode(p.NORMAL);
        p.translate(xTank.value(), 0,0)
        p.beginShape();
        p.vertex(-100, -80, 60, 0, 0);
        p.vertex(-100, -80, 140, 1, 0);
        p.vertex(-90, -120, 130, 1, 1);
        p.vertex(-90, -120, 70, 0, 1);
        p.endShape(p.CLOSE);
        p.pop();
    }

    function casco4() {
        p.push()
        p.texture(imgCamo); 
        p.textureMode(p.NORMAL);
        p.translate(xTank.value(), 0,0)
        p.beginShape();
        p.vertex(0, -80, 60, 0, 0);
        p.vertex(0, -80, 140, 1, 0);
        p.vertex(-10, -120, 130, 1, 1);
        p.vertex(-10, -120, 70, 0, 1);
        p.endShape(p.CLOSE);
        p.pop();
    }

    function casco5() {
        p.push()
        p.texture(imgCamo); 
        p.textureMode(p.NORMAL);
        p.translate(xTank.value(), 0,0)
        p.beginShape();
        p.vertex(-10, -120, 70, 0, 0);
        p.vertex(-90, -120, 70, 1, 0);
        p.vertex(-90, -120, 130, 1, 1);
        p.vertex(-10, -120, 130, 0, 1);
        p.endShape(p.CLOSE);
        p.pop();
    }

    function coraza1() {
        p.push()
        p.texture(imgCamo); 
        p.textureMode(p.NORMAL);
        p.translate(-90 + xTank.value(),-50, 103);
        p.box(190, 60, 110);
        p.pop()
    }

    function wheels(x,y,z) {
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

    function sphereRef() {
        p.push()
        p.texture(imgCamo); 
        p.textureMode(p.NORMAL);
        p.translate(80,-50,-50)
        p.sphere(40)
        p.pop()
    }
    p.draw = function () {
        p.background(250);
        
        p.translate(xPan.value(), yPan.value(), 0)
        
        sphereRef()

        orrugaD1(0,0,17)
        wheels(-10,-50, 20)
        wheels(-100,-50, 20)
        wheels(-190,-50, 20)
        casco1()
        casco2()
        casco3()
        casco4()
        casco5()
        coraza1()
        orrugaD1(0,0,160)
        wheels(-10,-50, 185)
        wheels(-100,-50, 185)
        wheels(-190,-50, 185) 
        cannon(-135,-100, 100)
    }

}, "sceneGraph");