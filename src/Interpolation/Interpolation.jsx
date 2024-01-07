import NewtonPolynom from './interpolation/methods/NewtonPolynom';
import Canvas from './graph2D/Canvas';
import { useRef, useState } from 'react';
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

    const newtonPoly = new NewtonPolynom(points);
    const defineYbyNewtonPoly = newtonPoly.defineYbyNewtonPoly.bind(newtonPoly);

    let cells = {
        display: 'inline-block',
        width: "35px",
        height: "25px",
        border: "1px solid black",
        padding: "5px",
    };

    const [yValue, setYValue] = useState("...")

    const inputRef = useRef();
    const yFuncOutput = () => {
        const x = inputRef.current;
        console.log(x.value - 0);
        setYValue(defineYbyNewtonPoly(x.value - 0));
    }

    return (
        <div style={{ display: "grid", gridTemplateRows: "auto" }}>
            <h2 style={{ marginLeft: "0px", marginRight: "auto", marginBottom: "10px"}}>Таблица значений</h2>
            <div style={{ width: (points.length + 1) * 55 }}>
                <div style={cells}>x</div>
                {points.map((value, i) => <div key={i} style={cells}>{value.x.toString()}</div>)}
            </div>
            <div style={{ width: (points.length + 1) * 55 }}>
                <div style={cells}>y</div>
                {points.map((value, i) => <div key={i} style={cells}>{Math.round(value.y * 100) / 100}</div>)}
            </div>
            <h2 style={{ marginLeft: "0px", marginRight: "auto", marginBottom: "10px"}}>Интерполяционный многочлен Ньютона:</h2>
            <p>{newtonPoly.polynomInStr()}</p>
            <h2 style={{ marginLeft: "0px", marginRight: "auto", marginBottom: "10px"}}>Значение функции:</h2>
            <div style={{ display: "grid", gridTemplateColumns: "25px 25px 10px 50px 30px", marginLeft: "auto", marginRight: "auto", marginBottom: "10px" }}>
                <td>N{'('}</td>
                <input ref={inputRef} style={{ width: "15px", padding: "2px" }} />
                <td style={{ padding: "0px" }}>{')'}</td>
                <div id="getY" style={{ width: "50px", backgroundColor: "#42c264" }} onClick={yFuncOutput}>=</div>
                <td style={{ padding: "auto" }}>{yValue}</td>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "50px" }}>
                <Canvas></Canvas>
                <div style={{ margingLeft: "100px" }}>
                    <h4 style={{ color: "black" }}>Сплайн</h4>
                    <h4 style={{ color: "blue" }}>Среднеквадратичное приближение</h4>
                    <h4 style={{ color: "red" }}>Функция через полином Ньютона</h4>
                </div>
            </div>
        </div >
    );
}
export default Interpolation;