import ParabolicSpline from './interpolation/methods/ParabolicSpline';
import NewtonPolynom from './interpolation/methods/NewtonPolynom';
import BestRmsFitFunction from './interpolation/methods/BestRmsFitFunction';
// import Graph from './graph2D/Graph';
import Canvas from './graph2D/Canvas';
import { useRef } from 'react';
const Interpolation = () => {
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

    // const parabolicSpline = new ParabolicSpline(points);
    const newtonPoly = new NewtonPolynom(points);
    // const rmsFitFunc = new BestRmsFitFunction(points);
    // const graph = Graph(WINDOW);

    // graph.clear();
    // graph.printOXY();
    // points.forEach(point => graph.point(point.x, point.y))

    // const defineYbyNewtonPoly = newtonPoly.defineYbyNewtonPoly.bind(newtonPoly);


    // const defineParabolicSpline = parabolicSpline.defineParabolicSpline.bind(parabolicSpline);

    // const defineBestRmsFitFunc = rmsFitFunc.defineBestRmsFitFunc.bind(rmsFitFunc);


    // {
    //     const table = document.querySelector('table');
    //     let strX = points.reduce((str, point) => str + `<td>${point.x}</td>`, '')
    //     let strY = points.reduce((str, point) => str + `<td>${Math.round(point.y * 100) / 100}</td>`, '')
    // document.getElementById('pointsOutput').appendChild(table);
    // document.getElementById('coordX').innerHTML += strX
    // document.getElementById('coordY').innerHTML += strY
    // document.querySelectorAll('td').forEach(elem => {
    //     elem.style.border = '1px solid'
    // })
    // }

    // document.getElementById('newtonPolyOutput').innerHTML += newtonPoly.polynomInStr();

    // document.getElementById('getY').addEventListener('click', () => {
    //     let x = document.getElementById('xInput').value - 0;
    //     document.getElementById('yOutput').innerHTML = newtonPoly.defineYbyNewtonPoly(x);
    // })
    let cells = {
        display: 'inline-block',
        width: "35px",
        height: "25px",
        border: "1px solid black",
        padding: "5px",
    };
    const inputRef = useRef();
    const yFuncOutput = () => {
        const x = inputRef.current;
        console.log(x.value);
       let y = newtonPoly.defineYbyNewtonPoly(x);
       console.log(y);
    }

    return (
        <div style={{ display: "grid", gridTemplateRows: "auto" }}>
            <h2>Таблица значений</h2>
            <div style={{ width: (points.length + 1) * 55 }}>
                <div style={cells}>x</div>
                {points.map((value, i) => <div key={i} style={cells}>{value.x.toString()}</div>)}
            </div>
            <div style={{ width: (points.length + 1) * 55 }}>
                <div style={cells}>y</div>
                {points.map((value, i) => <div key={i} style={cells}>{Math.round(value.y * 100) / 100}</div>)}
            </div>
            <h2>Интерполяционный многочлен Ньютона:</h2>
            <p>{newtonPoly.polynomInStr()}</p>
            <p>N{'('}<input ref={inputRef} style={{ width: "30px" }}/>{')'}
                <button id="getY" style={{ background: "#574de3" }} onClick={yFuncOutput}>=</button>

            </p>
            <Canvas></Canvas>
            <h4 style={{ color: "black" }}>Сплайн</h4>
            <h4 style={{ color: "blue" }}>Среднеквадратичное приближение</h4>
            <h4 style={{ color: "red" }}>Функция через полином Ньютона</h4>
            {/* // document.getElementById('getY').addEventListener('click', () => {
    //     let x = document.getElementById('xInput').value - 0;
    //     document.getElementById('yOutput').innerHTML = newtonPoly.defineYbyNewtonPoly(x);
    // }) */}

        </div>
    );
}
export default Interpolation;