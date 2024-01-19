import { useRef } from "react";
const GenerateMatrix = (props) => {
    const column = props.column;
    const stroke = props.stroke;
    const matrix = column * stroke;
    const arrInputs = useRef([
        Array(column).fill(0),
        Array(stroke).fill(0),
        Array(matrix).fill(0)
    ]);
    return (<>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(" + column + ",45px)" }}>
            {Array.from({ length: matrix }, (_, i) =>
                <input key={i}
                    ref={arrInputs[2][i]}//заполняются коэффициенты
                    onChange={event => handleInputChange(i, event)}
                    style={{ height: "40px" }}></input>)}
        </div>
    </>);
}
export default GenerateMatrix;