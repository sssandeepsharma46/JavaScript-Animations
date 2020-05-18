import { Canvas2dGraphics } from './sandy-canvas-module.js';
const canvas = document.getElementById('canvas'),
    Canvas2dGraphicsObj = new Canvas2dGraphics(canvas),
    WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;
canvas.width = WIDTH;
canvas.height = HEIGHT - 20;
canvas.style.background = '#000';
document.body.style.margin = 0;

//Variables
let theta = 0,
    yPosArr = [],
    numOfCircle = 40;

//function draw fourier series
function fourierSeries() {
    let x = 0,
        y = 0;
    Canvas2dGraphicsObj.Save();
    Canvas2dGraphicsObj.Translate(WIDTH / 3, HEIGHT / 2);

    for (let i = 0; i < numOfCircle; i++) {
        let n = i+1;// i * 2 + 1;
        let prevX=x,
            prevY=y;
        let circleRadius = 80 * 4 / (n * Math.PI);
        x += circleRadius * Math.cos(n * theta);
        y += circleRadius * Math.sin(n * theta);

        if (i == numOfCircle - 1) {
            yPosArr.unshift(y);
        }


        //draw axis
        Canvas2dGraphicsObj.StrokeLine(0, 0, WIDTH - WIDTH / 3, 0, '#fff', 4);

        //draw circles
        Canvas2dGraphicsObj.StrokeCircle(prevX, prevY, circleRadius, 0, 2 * Math.PI, false, '#fff', 2.5);

        //draw point on the circumference
        Canvas2dGraphicsObj.FillCircle(x, y, 4, 0, 2 * Math.PI, false, '#fff');

        //draw the line from center of circle to point on circumference
        Canvas2dGraphicsObj.StrokeLine(prevX,prevY, x, y, '#fff', 2);

        if (i == numOfCircle - 1) {
            //translate the canvas context
            Canvas2dGraphicsObj.Save();
            Canvas2dGraphicsObj.Translate(250, 0);
            //draw the plotting line
            Canvas2dGraphicsObj.StrokeLine(x - 250, y, 0, yPosArr[0], '#fff', 2.5);

            //draw the curve
            for (let i = 0; i < yPosArr.length; i++) {
                //draw the point of curve
                Canvas2dGraphicsObj.FillCircle(i*0.5, yPosArr[i], 4, 0, 2 * Math.PI, false, '#fff');
            }
        }

    }
    Canvas2dGraphicsObj.Restore();
    Canvas2dGraphicsObj.Restore();
}

//function animation
function animateFourierSeries() {
    Canvas2dGraphicsObj.ClearCanvas(0, 0, WIDTH, HEIGHT);
    fourierSeries();
    theta -= 0.01;
    requestAnimationFrame(animateFourierSeries);
}
animateFourierSeries();