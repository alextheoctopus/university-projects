import React, { useRef, useEffect } from 'react'
import ParabolicSpline from '../interpolation/methods/ParabolicSpline';
import NewtonPolynom from '../interpolation/methods/NewtonPolynom';
import BestRmsFitFunction from '../interpolation/methods/BestRmsFitFunction';

const Canvas = props => {

    const canvasRef = useRef(null)

    const WINDOW = {
        LEFT: -5,
        BOTTOM: -5,
        WIDTH: 10,
        HEIGHT: 10
    }

    const width = 600;
    const height = 600;

    const xs = (x) => (x - WINDOW.LEFT) / WINDOW.WIDTH * width 
    const ys = (y) => (height - (y - WINDOW.BOTTOM) / WINDOW.HEIGHT * height)

    const clear = (context) => {
        context.fillStyle = '#FFFFFF'
        context.beginPath()
        context.fillRect(0, 0, width, height);
        context.fill()
    }

    const pointFunc = (x, y, color = '#f00', size = 2, context) => {
        context.strokeStyle = color;
        context.fillStyle = color;
        context.lineWidth = 2;
        context.beginPath();
        context.arc(xs(x), ys(y), size, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
    }

    const line = (x1, y1, x2, y2, color, context) => {
        context.strokeStyle = color;
        context.fillStyle = color;

        context.beginPath();
        context.moveTo(xs(x1), ys(y1));
        context.lineTo(xs(x2), ys(y2));
        context.stroke();
    }

    const text = (x, y, text, color, context) => {
        context.strokeStyle = color;
        context.font = '11px Courier';
        context.strokeText(text, xs(x), ys(y));
    }

    const printOXY = (context) => {
        const x = WINDOW.LEFT;
        const y = WINDOW.BOTTOM;
        for (let i = 0; i < x + WINDOW.WIDTH; i++) {
            line(i, y + WINDOW.HEIGHT, i, y, '#ababab', context);
            text(i + 0.01, 0.3, i, 'grey', context);
        }
        for (let i = -1; i > x; i -= 1) {
            line(i, y + WINDOW.HEIGHT, i, y, '#ababab', context);
            text(i, 0.3, i, 'grey', context);
        }
        for (let i = 1; i < y + WINDOW.HEIGHT; i++) {
            line(x, i, x + WINDOW.WIDTH, i, '#ababab', context);
            text(0.02, i + 0.1, i, 'grey', context);
        }
        for (let i = -1; i > y; i -= 1) {
            line(x, i, x + WINDOW.WIDTH, i, '#ababab', context);
            text(0.02, i + 0.1, i, 'grey', context);
        }

        line(0, 0, 0, y + WINDOW.HEIGHT, 'black', context);    //ось у
        line(0, y, 0, 0, 'black', context);
        line(0, 0, x + WINDOW.WIDTH, 0, 'black', context);     //ось х
        line(x, 0, 0, 0, 'black', context);
    }

    const printFunction = (f, color, x1 = WINDOW.LEFT, x2 = WINDOW.LEFT + WINDOW.WIDTH, context) => {
        const dx = WINDOW.WIDTH / 300;
        if (x1 > x2) {
            const t = x1;
            x1 = x2;
            x2 = t;
        }
        while (x1 < x2 && x1 < 2) {
            line(x1, f(x1), x1 + dx, f(x1 + dx), color, context);
            x1 += dx;
        }
    }

    const point = (x, y) => {
        return { x, y }
    }

    let m = 9;
    let k = 10;
    let N = 29;

    const points = [
        point(0.1, 0.2 * N),
        point(0.2, 0.3 * m),
        point(0.3, 0.5 * k),
        point(0.4, 0.6 * N),
        point(0.5, 0.7 * m),
        point(0.6, k),
        point(0.7, 0.8 * N),
        point(0.8, 1.2 * k),
        point(0.9, 1.3 * m),
        point(1.0, N),
    ]

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        //Our first draw

        clear(context);

        printOXY(context);
        points.forEach(point => pointFunc(point.x, point.y, "#f00", 2, context));

        const parabolicSpline = new ParabolicSpline(points);
        const newtonPoly = new NewtonPolynom(points);
        const rmsFitFunc = new BestRmsFitFunction(points);
        const defineYbyNewtonPoly = newtonPoly.defineYbyNewtonPoly.bind(newtonPoly);
        printFunction(defineYbyNewtonPoly, 'red', WINDOW.LEFT, WINDOW.LEFT + WINDOW.WIDTH, context);

        const defineParabolicSpline = parabolicSpline.defineParabolicSpline.bind(parabolicSpline);
        printFunction(defineParabolicSpline, 'black', WINDOW.LEFT, WINDOW.LEFT + WINDOW.WIDTH, context);

        const defineBestRmsFitFunc = rmsFitFunc.defineBestRmsFitFunc.bind(rmsFitFunc);
        printFunction(defineBestRmsFitFunc, 'blue', WINDOW.LEFT, WINDOW.LEFT + WINDOW.WIDTH, context);
    }, [clear, printOXY, printFunction, pointFunc]);

    return <canvas ref={canvasRef} width="600" height="600" {...props} />
}

export default Canvas;