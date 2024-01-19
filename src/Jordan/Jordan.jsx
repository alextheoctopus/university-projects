import { useRef, useState } from "react";
import JordanMethods from "./JordanMethods";
import GenerateMatrix from "./GenrateMatrix";
const Jordan = () => {
    //количество полей ввода= количество переменных и уравнений
    const numOfColumns = useRef(0);
    const numOfRows = useRef();
    //разрещающие столбец и строка
    const column = useRef();
    const stroke = useRef();
    const [paramsSAndK, setParamsSAndK] = useState({ stroke: 0, column: 0 });
    const [openJordan, setOpenJordan] = useState(false);
    const [newInputs, setNewInputs] = useState();

    const onClickHandler = () => {
        let stroke = numOfRows.current.value - 0;
        let column = numOfColumns.current.value - 0;
        setParamsSAndK({ stroke: stroke, column: column });
        console.log(paramsSAndK);
    }

    const arrInputs = useRef([
        Array(paramsSAndK.column).fill(0),
        Array(paramsSAndK.stroke).fill(0),
        Array(paramsSAndK).fill(0)
    ]);

    // const arrInputs = useRef([Array(paramsSAndK).fill(0)]);
    console.log(paramsSAndK, arrInputs.current[2]);
    const handleInputChange = (index, event) => {
        // Обработчик изменения значения инпута
        const value = event.target.value;
        // Сохраняем значение в массиве
        arrInputs.current[2][index] = value - 0;
    }

    return (
        <div style={{ display: "grid", gridTemplateRows: "1fr 1fr" }}>
            <div>
                <input ref={numOfColumns} placeholder="кол-во столбцов" />
                <input ref={numOfRows} placeholder="кол-во строк" />
                <button onClick={onClickHandler}>Создать матрицу</button>
            </div>
            {paramsSAndK ? <p>Задайте матрицу коэффициентов:</p> : ''}
            <div style={{ margin: "auto" }}>

                {paramsSAndK ?
                    <GenerateMatrix column={paramsSAndK.column} stroke={paramsSAndK.stroke}></GenerateMatrix>
                    // <div style={{ display: "grid", gridTemplateRows: "40px 100%" }}>
                    //     {Array.from({ length: 4 }, (_, i) =>
                    //         <input key={i}
                    //             ref={arrInputs[0][i]}//заполняются коэффициенты
                    //             onChange={event => handleInputChange(i, event)}
                    //             style={{ height: "40px" }}></input>)}
                    //     <div style={{ display: "grid", gridTemplateColumns: "repeat(" + numOfColumns.current.value + ",45px)" }}>
                    //         {Array.from({ length: paramsSAndK }, (_, i) =>
                    //             <input key={i}
                    //                 ref={arrInputs[2][i]}//заполняются коэффициенты
                    //                 onChange={event => handleInputChange(i, event)}
                    //                 style={{ height: "40px" }}></input>)}
                    //     </div>
                    // </div>
                    // <div style={{ display: "grid", gridTemplateColumns: "repeat(" + numOfColumns.current.value + ",45px)" }}>
                    //     {Array.from({ length: paramsSAndK.column * paramsSAndK.stroke }, (_, i) =>
                    //         <input key={i}
                    //             ref={arrInputs[2][i]}//заполняются коэффициенты
                    //             onChange={event => handleInputChange(i, event)}
                    //             style={{ height: "40px" }}></input>)}
                    // </div>
                    // :
                    // newInputs ? Array.from({ length: newInputs.length }, (_, i) =>
                    //     <input key={i} placeholder={newInputs[i].value} ></input>) :
                    : ''}
                {/* сделать сюда условие с newInputs еще и брать из них value в placeholder */}

            </div>
            {arrInputs.current.value ? <div style={{ display: "grid", gridTemplateColumns: "250px 50px 50px 85px", gridGap: "10px" }}>
                <p style={{ textAlign: "center" }}>Задайте разрешающий элемент:</p>
                <input ref={column} style={{ marginTop: "auto", marginBottom: "auto", height: "30px" }}></input>
                <input ref={stroke} style={{ marginTop: "auto", marginBottom: "auto", height: "30px" }}></input>
                <button onClick={() => setOpenJordan(true)} style={{ marginTop: "auto", marginBottom: "auto", height: " 30px " }}>Рассчитать</button>
            </div> : ''}

            {openJordan ? <JordanMethods inputs={arrInputs.current} column={column} stroke={stroke} setNewInputs={setNewInputs} /> : ''}
        </div >
    );
}

export default Jordan;