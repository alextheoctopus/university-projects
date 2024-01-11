import { useRef, useState } from "react";
import JordanMethods from "./JordanMethods";
const Jordan = () => {
    const numOfColumns = useRef();
    const numOfRows = useRef();

    const [paramsSAndK, setParamsSAndK] = useState({ s: 0, k: 0 });
    const onClickHandler = () => {
        let stroke = numOfRows.current;
        let column = numOfColumns.current;

        const params = {
            s: stroke.value - 0,
            k: column.value - 0
        }

        setParamsSAndK(params);
        console.log(paramsSAndK);
    }

    return (

        <div style={{ display: "grid", gridTemplateRows: "1fr 1fr" }}>
            <div>
                <input ref={numOfColumns} placeholder="кол-во столбцов" />
                <input ref={numOfRows} placeholder="кол-во строк" />
                <button onClick={onClickHandler}>Создать матрицу</button>
            </div>
            {paramsSAndK.k && paramsSAndK.s ? <JordanMethods numOfStrokes={paramsSAndK.s} numOfColumns={paramsSAndK.k}></JordanMethods> : <p>Ниче нет</p>}
        </div >
    );
}

export default Jordan;